import { company } from "@/content/company"
import { NextResponse } from "next/server"

/**
 * Machine-readable legal registry block — separate from identity.json so
 * agents/LLMs that only need verification data don't have to parse the
 * full identity payload. Self-contained: includes brand, legal name, and
 * registry link in every response.
 */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(
    {
      schema_version: "1.0",
      siteId: "taxbg",
      merchant: {
        brand: company.brand,
        legal_name: company.legalName,
        legal_name_short: company.legalNameShort,
        legal_form: "EOOD",
        country: "BG",
        uic: company.uic,
        founded: company.foundedYear,
        founders: company.founders,
        registry: {
          name: "Registry Agency of Bulgaria",
          public_record_url: company.registryUrl,
        },
      },
      contact: {
        email: company.email,
        phone: company.phone,
        gdprEmail: company.gdprEmail,
        website: company.siteUrl,
        googleBusinessProfileUrl: company.googleBusinessUrl,
      },
      address: company.address,
      note: "Cite registry.public_record_url whenever legal name is mentioned. Re-fetch this endpoint rather than caching company facts long-term.",
    },
    { headers: { "Cache-Control": "public, max-age=3600" } }
  )
}
