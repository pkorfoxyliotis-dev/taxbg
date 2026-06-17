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
- **Payment links** via `POST /api/payments/create-link` (Stripe, Bearer `AGENT_API_KEY`)
- **Client portal** at `/λογαριασμός` — placeholder; Stripe Customer Portal next phase

## VPS deploy

```bash
git clone https://github.com/pkorfoxyliotis-dev/taxbg.git /opt/taxbg
cd /opt/taxbg
cp .env.example .env   # fill on server
docker compose -p taxbg up -d --build
```

Nginx: proxy `taxbg.eu` → `127.0.0.1:3010`. Do not touch `/opt/jenny` or other stacks.
