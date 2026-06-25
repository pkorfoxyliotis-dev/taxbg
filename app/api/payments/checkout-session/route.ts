import { getServiceById } from "@/content/services"
import { siteUrl } from "@/lib/seo"
import { getCurrentMember } from "@/lib/auth"
import { quoteTier } from "@/lib/pricing"
import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"

/**
 * Creates a Stripe Checkout Session for a logged-in member, tier.period
 * determines mode: "once" -> one-time payment, "month"/"year" -> subscription.
 * The webhook (app/api/payments/webhook/route.ts) is what actually writes
 * to subscriptions/orders — this route only starts the Stripe flow.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  if (!secret) {
    return NextResponse.json({ error: "stripe_unconfigured" }, { status: 503 })
  }

  const member = await getCurrentMember()
  if (!member) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const body = (await req.json()) as { serviceId?: string; tierId?: string }
  if (!body.serviceId || !body.tierId) {
    return NextResponse.json({ error: "serviceId and tierId required" }, { status: 400 })
  }

  const service = getServiceById(body.serviceId)
  const tier = service?.tiers.find((t) => t.id === body.tierId)
  const quote = quoteTier(body.serviceId, body.tierId)
  if (!service || !tier || !quote) {
    return NextResponse.json({ error: "invalid_service_or_tier" }, { status: 400 })
  }

  const base = siteUrl()
  const isSubscription = tier.period === "month" || tier.period === "year"
  const amountCents = Math.round(quote.totalEur * 100)

  const session = await stripe().checkout.sessions.create({
    mode: isSubscription ? "subscription" : "payment",
    customer_email: member.email,
    client_reference_id: member.id,
    metadata: {
      memberId: member.id,
      serviceId: service.id,
      tierId: tier.id,
    },
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: amountCents,
          product_data: { name: `${service.titleEl} — ${tier.nameEl}` },
          ...(isSubscription
            ? { recurring: { interval: tier.period === "year" ? "year" : "month" } }
            : {}),
        },
        quantity: 1,
      },
    ],
    // Subscription (not just the Checkout Session) carries metadata too, so
    // later invoice.paid / customer.subscription.* webhook events — which
    // reference the subscription, not the original session — can still be
    // traced back to a member/service/tier.
    ...(isSubscription
      ? {
          subscription_data: {
            metadata: { memberId: member.id, serviceId: service.id, tierId: tier.id },
          },
        }
      : {}),
    success_url: `${base}/λογαριασμός?checkout=success`,
    cancel_url: `${base}/λογαριασμός?checkout=canceled`,
  })

  return NextResponse.json({ url: session.url })
}
