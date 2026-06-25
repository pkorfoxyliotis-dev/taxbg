import { db } from "@/lib/db"

/**
 * Write-side of subscriptions/orders — only ever called from the Stripe
 * webhook handler (lib/member-data.ts stays read-only for member-facing
 * routes). Keeping these separate makes it obvious which code path can
 * mutate billing state.
 */

export async function upsertSubscriptionFromStripe(input: {
  memberId: string
  serviceId: string
  tierId: string
  stripeSubscriptionId: string
  status: string
  currentPeriodEnd: Date | null
}): Promise<void> {
  await db().query(
    `insert into subscriptions
       (member_id, service_id, tier_id, status, stripe_subscription_id, current_period_end)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (stripe_subscription_id) do update
       set status = excluded.status,
           current_period_end = excluded.current_period_end,
           updated_at = now()`,
    [
      input.memberId,
      input.serviceId,
      input.tierId,
      input.status,
      input.stripeSubscriptionId,
      input.currentPeriodEnd,
    ]
  )
}

export async function updateSubscriptionStatusByStripeId(
  stripeSubscriptionId: string,
  status: string,
  currentPeriodEnd: Date | null
): Promise<void> {
  await db().query(
    `update subscriptions
     set status = $2, current_period_end = $3, updated_at = now()
     where stripe_subscription_id = $1`,
    [stripeSubscriptionId, status, currentPeriodEnd]
  )
}

export async function insertOrder(input: {
  memberId: string
  serviceId: string
  tierId: string
  amountEur: number
  status: string
  stripePaymentId: string | null
}): Promise<void> {
  await db().query(
    `insert into orders (member_id, service_id, tier_id, amount_eur, status, stripe_payment_id)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (stripe_payment_id) where stripe_payment_id is not null do nothing`,
    [input.memberId, input.serviceId, input.tierId, input.amountEur, input.status, input.stripePaymentId]
  )
}

export async function insertNotification(input: {
  memberId: string
  type: string
  title: string
  body?: string | null
}): Promise<void> {
  await db().query(
    `insert into notifications (member_id, type, title, body)
     values ($1, $2, $3, $4)`,
    [input.memberId, input.type, input.title, input.body ?? null]
  )
}
