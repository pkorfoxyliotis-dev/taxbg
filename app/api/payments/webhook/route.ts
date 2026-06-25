import {
  insertNotification,
  insertOrder,
  updateSubscriptionStatusByStripeId,
  upsertSubscriptionFromStripe,
} from "@/lib/billing-data"
import { stripe } from "@/lib/stripe"
import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"

function periodEnd(sub: Stripe.Subscription): Date | null {
  const ts = (sub as unknown as { current_period_end?: number }).current_period_end
  return ts ? new Date(ts * 1000) : null
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!webhookSecret) {
    return NextResponse.json({ error: "stripe_webhook_unconfigured" }, { status: 503 })
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 })
  }

  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = stripe().webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const memberId = session.metadata?.memberId
        const serviceId = session.metadata?.serviceId
        const tierId = session.metadata?.tierId
        if (!memberId || !serviceId || !tierId) break

        if (session.mode === "subscription" && session.subscription) {
          const subscriptionId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id
          const subscription = await stripe().subscriptions.retrieve(subscriptionId)
          await upsertSubscriptionFromStripe({
            memberId,
            serviceId,
            tierId,
            stripeSubscriptionId: subscription.id,
            status: subscription.status,
            currentPeriodEnd: periodEnd(subscription),
          })
          await insertNotification({
            memberId,
            type: "subscription_started",
            title: "Η συνδρομή ενεργοποιήθηκε",
            body: `${serviceId} — ${tierId}`,
          })
        } else if (session.mode === "payment") {
          await insertOrder({
            memberId,
            serviceId,
            tierId,
            amountEur: (session.amount_total ?? 0) / 100,
            status: "paid",
            stripePaymentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id ?? session.id,
          })
          await insertNotification({
            memberId,
            type: "order_paid",
            title: "Η πληρωμή ολοκληρώθηκε",
            body: `${serviceId} — ${tierId}`,
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscriptionStatusByStripeId(
          subscription.id,
          subscription.status,
          periodEnd(subscription)
        )
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscriptionStatusByStripeId(subscription.id, "canceled", null)
        break
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = (invoice as unknown as { subscription?: string | { id: string } })
          .subscription
        const subId = typeof subscriptionId === "string" ? subscriptionId : subscriptionId?.id
        if (!subId) break
        const subscription = await stripe().subscriptions.retrieve(subId)
        const memberId = subscription.metadata?.memberId
        const serviceId = subscription.metadata?.serviceId
        const tierId = subscription.metadata?.tierId
        if (!memberId || !serviceId || !tierId) break

        await insertOrder({
          memberId,
          serviceId,
          tierId,
          amountEur: (invoice.amount_paid ?? 0) / 100,
          status: "paid",
          stripePaymentId: invoice.id,
        })
        break
      }

      default:
        break
    }
  } catch (err) {
    console.error("Stripe webhook handler error", event.type, err)
    return NextResponse.json({ error: "webhook_handler_failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
