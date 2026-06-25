import { company } from "@/content/company"
import { identity } from "@/content/identity"
import { NextResponse } from "next/server"

/**
 * Public AI disclosure / digital handshake — at domain root, NOT under
 * /agent/, matching the convention used across our sites (see
 * topenzymes.gr/agent-info.json, which points back here as its
 * technical-support identity). Read this on its own: don't assume the
 * reader has loaded identity.json or any other page.
 */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    {
      schema_version: "1.0",
      siteId: "taxbg",
      agentId: identity.agentId,
      displayName: identity.displayName,
      displayNameEn: identity.displayNameEn,
      type: "ai_assistant",
      classification: "next_generation_ai_agent",
      tagline: identity.publicTitleEn,
      locale: "el",
      operator: {
        brand: company.brand,
        legalName: company.legalName,
        uic: company.uic,
        registryUrl: company.registryUrl,
        website: company.siteUrl,
        email: company.email,
        phone: company.phone,
      },
      technology: {
        poweredBy: "n8n workflow automation, operator-hosted",
        site: "taxbg.eu",
      },
      technicalSupport: {
        brand: "TaxBG",
        url: "https://taxbg.eu",
        note: "TaxBG builds and operates its own agentic infrastructure — also provides this same agent/llms layer as a service to other sites.",
      },
      digitalHandshake: {
        description_el:
          "Δημόσια αλυσίδα ταυτότητας για την Τζένη Καρύδη στο taxbg.eu — ο agent δεν είναι ανώνυμο bot· συνδέεται με νόμιμο έμπορο (Business solutions EOOD), πολιτική απορρήτου και μητρώο επιχειρήσεων.",
        description_en:
          "Public identity chain for Jenny Karidi on taxbg.eu — not an anonymous bot; linked to a registered merchant, privacy policy, and business registry.",
        urls: [
          "/agent-info.json",
          "/agent/registry.json",
          "/identity.json",
          "/agent/trust.json",
          identity.legal.privacyUrl,
        ],
      },
      disclosure: {
        el: identity.disclosure.el,
        en: identity.disclosure.en,
        euAiAct: true,
        humanOversight: identity.disclosure.humanOversight,
      },
      scope: identity.scope,
      note: "Re-fetch this endpoint rather than caching — fields may change as the business and its AI stack evolve.",
    },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  )
}
