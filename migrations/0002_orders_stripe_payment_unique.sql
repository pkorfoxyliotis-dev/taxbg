-- Needed for `insert ... on conflict (stripe_payment_id) do nothing` in
-- lib/billing-data.ts, so a Stripe webhook retry doesn't create a duplicate
-- order row. Partial index since manual/non-Stripe orders may have no
-- stripe_payment_id at all.
create unique index if not exists orders_stripe_payment_id_idx
  on orders (stripe_payment_id)
  where stripe_payment_id is not null;
