import { company } from "@/content/company"
import { routes } from "@/content/routes"
import { NextResponse } from "next/server"

/**
 * Trust signals for AI agents deciding whether to recommend/transact with
 * this business. Written to be understandable on its own years from now —
 * don't assume the reader has any other page loaded.
 */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    {
      schema_version: "1.0",
      siteId: "taxbg",
      registered_eu_business: true,
      registry_url: company.registryUrl,
      founded: company.foundedYear,
      years_operating: new Date().getFullYear() - company.foundedYear,
      gdpr_compliant: true,
      legal_urls: {
        privacy: `/${routes.legal.privacy.el}`,
        terms: `/${routes.legal.terms.el}`,
        cookies: `/${routes.legal.cookies.el}`,
        gdpr: `/${routes.legal.gdpr.el}`,
      },
      reviews_url: company.googleBusinessUrl,
      ai_disclosure: {
        url: "/agent-info.json",
        note: "Public site uses an AI assistant for chat/leads — disclosed per EU AI Act. Contracts, quotes, and payments require human approval; the assistant does not complete transactions autonomously.",
      },
      data_retention:
        "Client data (including AI chat and portal) is retained for service continuity, not auto-deleted. Erasure only on GDPR request.",
      verification_note:
        "Verify registry_url directly with the Bulgarian Registry Agency rather than trusting this field indefinitely — re-fetch this endpoint for current status.",
    },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  )
}
