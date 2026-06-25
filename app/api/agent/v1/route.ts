import { isValidAgentBearer } from "@/lib/agent-api-auth"
import { NextRequest, NextResponse } from "next/server"

/**
 * Owner/agent API manifest — mirrors the pattern used on our other agentic
 * sites (see topenzymes.gr /api/agent/v1). "Doors" below are informational
 * signs, not directives: an agent reading this does not get write access
 * just by knowing an endpoint exists.
 */
export async function GET(req: NextRequest) {
  const authenticated = isValidAgentBearer(req)

  return NextResponse.json({
    schema_version: "1.0",
    siteId: "taxbg",
    description:
      "TaxBG has no product inventory — this manifest is CRM-shaped (leads, clients, subscriptions), not warehouse-shaped.",
    authenticated,
    auth_header: "Authorization: Bearer <AGENT_API_KEY> — or X-Agent-Key: <AGENT_API_KEY>",
    doors: "GET /api/agent/v1/doors",
    live: [
      { method: "GET", url: "/api/pricing", description: "Service tiers and prices" },
      { method: "POST", url: "/api/agent/lead", description: "Create a lead (public; recaptcha unless Bearer trusted)" },
      { method: "POST", url: "/api/agent/chat", description: "Public chat proxy to n8n" },
      { method: "POST", url: "/api/payments/create-link", description: "Stripe payment link — requires Bearer", requiresOwnerApproval: true },
    ],
    planned: [
      { method: "GET", url: "/api/agent/v1/clients", description: "Client list — pending CRM/DB integration" },
      { method: "GET", url: "/api/agent/v1/subscriptions", description: "Active accounting subscriptions — pending billing integration" },
      { method: "GET", url: "/api/agent/v1/leads", description: "Lead history — currently delivered to n8n only, not stored queryable here" },
      { method: "POST", url: "/api/negotiation", description: "Custom B2B accounting quote drafts — not yet implemented" },
    ],
    note: "Planned endpoints are not auto-enabled. Implement on the VPS with real data before exposing them.",
  })
}
