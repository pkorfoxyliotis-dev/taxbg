-- Owner/admin accounts — deliberately separate from members. No public
-- signup route; create the first admin with scripts/seed-admin.mjs.
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  display_name text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists admin_sessions (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid not null references admin_users(id) on delete cascade,
  token_hash text not null unique,
  user_agent text,
  ip text,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_sessions_admin_id_idx on admin_sessions(admin_id);
