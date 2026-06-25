# TaxBG Services — Architecture

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| Payments | Stripe (payment links + subscriptions) |
| Agent | n8n on VPS (`agents.taxbg.eu`) |
| Deploy | Docker on VPS (`/opt/taxbg`) |

**No Medusa** — services catalog in `content/services.ts`, not products.

## Agent discovery (corrected from eshop)

Public at **domain root** (not inside `/agent/`):

```
/llms.txt              ← LLM index
/llms_full.txt         ← full documentation
/identity.json         ← agent identity & disclosure
```

Machine APIs under `/agent/`:

```
/agent/site-tree.json
/agent/capabilities.json
/agent/guide.json
```

Chat proxy (no AI keys in browser):

```
POST /api/agent/chat   → n8n webhook
POST /api/agent/lead   → n8n webhook
GET  /api/pricing      → service quotes
POST /api/payments/create-link  → Stripe (server + API key)
```

## Bilingual URLs

| Greek (canonical) | English |
|-------------------|---------|
| `/` | `/en` |
| `/υπηρεσίες` | `/en/services` |
| `/υπηρεσίες/ίδρυση-εταιρείας-βουλγαρία` | `/en/services/company-formation-bulgaria` |
| `/υπηρεσίες/λογιστική-βουλγαρία` | `/en/services/accounting-bulgaria` |
| `/οδηγός` | `/en/guide` |
| `/τιμές` | `/en/pricing` |
| `/επικοινωνία` | `/en/contact` |
| `/λογαριασμός` | `/en/account` |

Middleware rewrites Greek paths → internal ASCII routes.

## Main services (focused)

1. **Ίδρυση Εταιρείας στη Βουλγαρία** — formation packages
2. **Λογιστική Βουλγαρία** — monthly/annual subscription (-10% advance)
3. **Web/Agentic** — short section only (separate site later)

## n8n integration

Import workflows from `migration/agents/`. Set in `.env`:

```env
AGENT_CHAT_URL=https://agents.taxbg.eu/webhook/taxbg/chat
AGENT_LEAD_WEBHOOK_URL=https://agents.taxbg.eu/webhook/taxbg/lead
AGENT_API_KEY=<shared-secret>
```

Webhook body from storefront:

```json
{
  "message": "string",
  "sessionId": "pub_<uuid>",
  "siteId": "taxbg",
  "agentId": "taxbg-assistant",
  "agentRole": "public",
  "locale": "el",
  "canonicalHost": "https://taxbg.eu"
}
```

## Subscriptions & payments

- **10% discount** on annual accounting prepayment (`ADVANCE_PAYMENT_DISCOUNT` in `content/services.ts`)
- **Payment links** via `POST /api/payments/create-link` (Stripe, Bearer `AGENT_API_KEY`) — for ad-hoc/owner-initiated charges, not tied to a member account
- **Member checkout** via `POST /api/payments/checkout-session` (requires logged-in member) — `tier.period === "once"` creates a one-time Checkout Session, `"month"/"year"` creates a subscription. Triggered from `components/checkout-button.tsx` on the pricing table.
- **Webhook** at `POST /api/payments/webhook` — verifies `STRIPE_WEBHOOK_SECRET`, handles `checkout.session.completed`, `customer.subscription.updated/deleted`, `invoice.paid`. Writes to `subscriptions`/`orders`/`notifications` via `lib/billing-data.ts` (write-only; `lib/member-data.ts` stays read-only for member-facing routes — that split is deliberate, only the webhook handler can mutate billing state).
- **Stripe Dashboard setup needed:** add an endpoint at `https://taxbg.eu/api/payments/webhook` listening for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid` — copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
- **Client portal** at `/λογαριασμός` — real login/signup/dashboard now (see below), no Stripe Customer Portal self-service yet (members can't self-cancel/update payment method).

## Client portal & member auth

Own dedicated Postgres (`docker-compose.yml` service `db`, port `127.0.0.1:5434`,
volume `taxbg_postgres_data`) — not shared with topenzymes' Postgres or any
other stack. Schema in `migrations/0001_init.sql`, applied via
`npm run db:migrate` (plain SQL + `scripts/migrate.mjs`, no ORM).

Tables: `members`, `oauth_identities`, `sessions`, `subscriptions`, `orders`,
`notifications`.

Auth (`lib/auth.ts`, `app/api/auth/*`):
- Email + password — bcrypt hash, 30-day DB-backed session token in an
  httpOnly cookie (`taxbg_session`), hashed again with `SESSION_SECRET`
  before storage so a DB dump alone doesn't yield usable tokens.
- Google OAuth (`/api/auth/google/start` → `/api/auth/google/callback`) —
  plain `fetch` against Google's OAuth2 endpoints, no auth library.
  Requires `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`.
- **Member alias is Greek-script only** (`GREEK_ALIAS_REGEX` in
  `lib/auth.ts`) — a Google sign-in with no Greek alias hint gets a
  generated placeholder alias the member can change later.

Not yet built: subscriptions/orders/notifications API routes (tables exist,
no endpoints read/write them yet), and the actual `/λογαριασμός` UI for
signup/login/dashboard.

**After pulling these changes:** `npm install` (adds `pg`, `bcryptjs` —
lockfile wasn't regenerated from the VPS since no Node is available there)
and `npm run db:migrate` before first deploy.

## VPS deploy

```bash
git clone https://github.com/pkorfoxyliotis-dev/taxbg.git /opt/taxbg
cd /opt/taxbg
cp .env.example .env   # fill on server
docker compose -p taxbg up -d --build
npm run db:migrate      # first deploy only, or after new migrations
```

Nginx: proxy `taxbg.eu` → `127.0.0.1:3010`. Do not touch `/opt/jenny` or other stacks.
