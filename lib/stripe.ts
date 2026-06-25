import Stripe from "stripe"

const g = globalThis as unknown as { __taxbgStripe?: Stripe }

/** Single Stripe client for the process — avoids re-instantiating per request. */
export function stripe(): Stripe {
  if (!g.__taxbgStripe) {
    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not set")
    g.__taxbgStripe = new Stripe(secret)
  }
  return g.__taxbgStripe
}
