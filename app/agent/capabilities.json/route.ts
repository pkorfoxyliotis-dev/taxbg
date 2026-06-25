import { identity } from "@/content/identity"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json({
    schema_version: "1.0",
    siteId: "taxbg",
    agentId: identity.agentId,
    public: {
      chat: "POST /api/agent/chat",
      lead: "POST /api/agent/lead",
      pricing: "GET /api/pricing",
      guide: "GET /agent/guide.json",
      servicesCatalog: "GET /agent/services-catalog.json",
      registry: "GET /agent/registry.json",
      trust: "GET /agent/trust.json",
      agentDisclosure: "GET /agent-info.json",
      siteTree: "GET /agent/site-tree.json",
    },
    serverOnly: {
      paymentLinks: "POST /api/payments/create-link",
      note: "Requires Bearer AGENT_API_KEY",
    },
    agent_api_v1: {
      manifest: "GET /api/agent/v1",
      doors: "GET /api/agent/v1/doors",
      auth_header: "Authorization: Bearer <AGENT_API_KEY>",
      note: "CRM-shaped (leads/clients/subscriptions), not warehouse-shaped — most doors are not_built yet, see manifest for live vs planned",
    },
    modes: identity.scope.modes,
    excludes: identity.scope.excludes,
    subscriptions: true,
    advanceDiscount: "10%",
    n8nHost: "agents.taxbg.eu",
    clientPortal: {
      brand: "TaxBG Client Portal",
      includedWith: "accounting_subscription",
      features: [
        "24_7_dashboard",
        "free_invoicing",
        "bank_reconciliation",
        "ai_invoice_photo",
        "ai_invoice_email",
        "nap_obligation_tracking",
      ],
      pioneer: "first_in_bulgaria_integrated_solution",
    },
  })
}
