import { getServiceById } from "@/content/services"
import { quoteTier } from "@/lib/pricing"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

/**
 * Create Stripe Payment Link for extra services (server-only).
 * Requires STRIPE_SECRET_KEY. Used by n8n ops workflow or admin.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim()
  if (!secret) {
    return NextResponse.json({ error: "stripe_unconfigured" }, { status: 503 })
  }

  const apiKey = process.env.AGENT_API_KEY?.trim()
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (apiKey && auth !== apiKey) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const body = (await req.json()) as {
    serviceId?: string
    tierId?: string
    customerEmail?: string
    description?: string
    amountEur?: number
  }

  let amountCents: number
  let label: string

  if (body.serviceId && body.tierId) {
    const quote = quoteTier(body.serviceId, body.tierId)
    const service = getServiceById(body.serviceId)
    if (!quote || !service) {
      return NextResponse.json({ error: "invalid_service_or_tier" }, { status: 400 })
    }
    amountCents = Math.round(quote.totalEur * 100)
    label = `${service.titleEl} — ${quote.labelEl}`
  } else if (body.amountEur && body.amountEur > 0) {
    amountCents = Math.round(body.amountEur * 100)
    label = body.description ?? "TaxBG — Extra service"
  } else {
    return NextResponse.json({ error: "serviceId+tierId or amountEur required" }, { status: 400 })
  }

  const stripe = new Stripe(secret)

  const product = await stripe.products.create({ name: label })
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: amountCents,
    currency: "eur",
  })

  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    ...(body.customerEmail
      ? { metadata: { customer_email: body.customerEmail } }
      : {}),
    metadata: {
      siteId: "taxbg",
      serviceId: body.serviceId ?? "custom",
      tierId: body.tierId ?? "custom",
    },
  })

  return NextResponse.json({
    url: link.url,
    id: link.id,
    amountEur: amountCents / 100,
  })
}
