# TaxBG Services Site

Modern bilingual (Greek/English) services website for **taxbg.eu** — company formation & accounting in Bulgaria. Agentic chat via n8n on your VPS.

**Repository:** [github.com/pkorfoxyliotis-dev/taxbg](https://github.com/pkorfoxyliotis-dev/taxbg) (public)

## Quick start

```powershell
cd C:\dev\Taxbg
copy .env.example .env.local
npm install
npm run dev
```

| URL | Page |
|-----|------|
| http://localhost:3002 | Αρχική (Greek) |
| http://localhost:3002/οδηγός | Έξυπνος οδηγός |
| http://localhost:3002/υπηρεσίες/ίδρυση-εταιρείας-βουλγαρία | Ίδρυση |
| http://localhost:3002/en | English home |
| http://localhost:3002/identity.json | Public agent identity |
| http://localhost:3002/llms.txt | LLM index |

**Local ports:** TaxBG `3002` · topenzymes web `3001` · Medusa `9000`. If `npm run dev` says another server is running, run `npm run dev:stop` first.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Key difference from the eshop (topenzymes):

- **No Medusa** — services in `content/services.ts`
- **`/identity.json` and `/llms.txt` at domain root** (not under `/agent/`)
- **Greek canonical URLs** with `/en/` for English
- **n8n** at `agents.taxbg.eu` for agent logic

## n8n setup

1. Login to **agents.taxbg.eu**
2. Import `migration/agents/n8n-taxbg-chat-workflow.json`
3. Set `.env.local`:

```env
AGENT_CHAT_URL=https://agents.taxbg.eu/webhook/taxbg/chat
AGENT_LEAD_WEBHOOK_URL=https://agents.taxbg.eu/webhook/taxbg/lead
AGENT_API_KEY=your-secret
```

Agent role prompt: `migration/agents/role-taxbg.md`

## VPS deploy

```bash
git clone https://github.com/pkorfoxyliotis-dev/taxbg.git /opt/taxbg
cd /opt/taxbg
cp .env.example .env
docker compose -p taxbg up -d --build
```

Web binds `127.0.0.1:3010` — add nginx server block for taxbg.eu.

## Services & pricing

Edit `content/services.ts` for tiers and copy. **10% discount** for annual accounting prepayment is automatic in `lib/pricing.ts`.

Payment links: `POST /api/payments/create-link` (requires `STRIPE_SECRET_KEY` + `AGENT_API_KEY`).

## SEO

- Greek URLs as canonical (`hreflang` el/en)
- `sitemap.xml`, `robots.txt`, JSON-LD on service pages
- Agent discovery: `/llms.txt`, `/identity.json`, `/agent/site-tree.json`

## Photo sliders (WebP, no CDN)

Home and services pages use `ImageSlider` with self-hosted **WebP** in `public/images/`:

| Folder | Use |
|--------|-----|
| `public/images/home/` | Hero slider (4 slides) |
| `public/images/services/` | Services page slider (3 slides) |

Slide copy & paths: `content/sliders.ts`. Replace photos:

1. Drop PNG sources in `assets/sources/`
2. Run `npm run images:sliders` (uses `sharp` → WebP)

PNG sources are gitignored; committed WebP files ship with the site — no external CDN.
