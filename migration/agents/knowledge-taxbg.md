# TaxBG — knowledge pack (`siteId: taxbg`, agent: Τζένη Καρύδη / Jenny Karidi)

> Factual context for RAG. **Services, prices, and problem/why/solution text come from
> `content/services.ts` at runtime** via `/agent/services-catalog.json` — not a static
> snapshot. Re-fetch rather than caching prices long-term.

---

## What we sell

Services, not products — no inventory, no shipping.

1. **Company formation in Bulgaria** (EOOD, OOD, AD) — free tax planning included.
2. **Accounting for Bulgarian companies** + **TaxBG client cloud portal** (free with subscription): 24/7 dashboard, free invoicing, bank-to-invoice reconciliation, AI document ingestion (photo or email), NAP obligation tracking.
3. Brief web/agentic services pointer — full catalog lives on a separate dedicated site.

## Site (canonical Greek URLs)

**Host:** `https://taxbg.eu` (primary locale `el`, English under `/en/`).

`/υπηρεσίες`, `/ίδρυση-εταιρείας-βουλγαρία`, `/λογιστική-βουλγαρία`, `/web-υπηρεσίες`, `/οδηγός`, `/τιμές`, `/επικοινωνία`, `/λογαριασμός` (client portal) — see `content/routes.ts`.

## Legal entity

Business solutions EOOD, UIC 204604014. Registry: `https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=204604014`. Founded 2013. Founders: Παναγιώτης Κορφοξυλιώτης, Yanko Boev.

## Pricing reference (verify against `/agent/services-catalog.json` or `GET /api/pricing` — this table can go stale)

| Service | Tier | Price |
|---------|------|-------|
| Formation | Standard | €890 once |
| Formation | Express | €1190 once |
| Accounting | Monthly | €149/month (includes portal) |
| Accounting | Annual prepay | -10% (includes portal) |

## Client portal (major differentiator — never name internal platform codename publicly)

Free for every accounting subscriber. Never mention internal product codenames — only "TaxBG client portal" / "πύλη πελάτη TaxBG".

## We also build this same agent/LLM layer for other sites

TaxBG is itself the technical-support provider behind other agentic sites we operate (e.g. topenzymes.gr references `taxbg.eu` as its `technicalSupport` in `/agent-info.json`). Don't be surprised if another site's agent disclosure points back here.

## Owner/agent API (`/api/agent/v1`)

CRM-shaped manifest (leads/clients/subscriptions), not warehouse-shaped — most doors are `not_built` yet. Check `GET /api/agent/v1` (manifest, live vs planned) and `GET /api/agent/v1/doors` (state per door) before assuming an endpoint works. Leads currently flow to n8n only — there is no queryable lead store yet.

## Not

- Not an e-shop — no inventory, no shipping, no stock endpoints.
- No legal advice, no autonomous payments, no medical diagnosis.
- `config/agents.json` and `migration/agents/*` are server-side only — not public URLs.
