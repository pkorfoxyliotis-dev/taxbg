-- Client portal core schema. Applied by scripts/migrate.mjs.
create extension if not exists pgcrypto;

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text, -- null when the member only ever used Google sign-in
  alias text not null unique
    check (alias ~ '^[Α-Ωα-ωΆΈΉΊΌΎΏάέήίόύώϊϋΐΰ0-9_]{2,32}$'),
  locale text not null default 'el',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists oauth_identities (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  provider text not null,
  provider_user_id text not null,
  created_at timestamptz not null default now(),
  unique (provider, provider_user_id)
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  token_hash text not null unique,
  user_agent text,
  ip text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists sessions_member_id_idx on sessions(member_id);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  service_id text not null,
  tier_id text not null,
  status text not null default 'active', -- active | past_due | canceled
  stripe_subscription_id text unique,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_member_id_idx on subscriptions(member_id);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  service_id text not null,
  tier_id text not null,
  amount_eur numeric(10, 2) not null,
  status text not null default 'pending', -- pending | paid | failed | refunded
  stripe_payment_id text,
  created_at timestamptz not null default now()
);

create index if not exists orders_member_id_idx on orders(member_id);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_member_id_idx on notifications(member_id);
