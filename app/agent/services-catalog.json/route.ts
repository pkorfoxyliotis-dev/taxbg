import { services } from "@/content/services"
import { servicePath } from "@/content/routes"
import { siteUrl } from "@/lib/seo"
import { NextResponse } from "next/server"

/**
 * Services index for agent keyword search / RAG ingestion — equivalent to a
 * product catalog, but for services. Computed live from content/services.ts
 * on every request, so it auto-updates whenever a service or price changes;
 * there is no separate file to regenerate or forget to rebuild.
 */
export const dynamic = "force-dynamic"

export async function GET() {
  const base = siteUrl()
  const items = services.map((s) => ({
    id: s.id,
    title: s.titleEl,
    titleEn: s.titleEn,
    url: `${base}${servicePath(s.slug)}`,
    urlEn: `${base}/en/services/${s.slug.en}`,
    problem: s.problemEl,
    problemEn: s.problemEn,
    why: s.whyEl,
    whyEn: s.whyEn,
    solution: s.solutionEl,
    solutionEn: s.solutionEn,
    tiers: s.tiers.map((t) => ({
      id: t.id,
      name: t.nameEl,
      nameEn: t.nameEn,
      priceEur: Math.round(t.priceEur * 100) / 100,
      period: t.period,
    })),
    keywords: [...s.seoKeywordsEl, ...s.seoKeywordsEn],
    search: [
      s.titleEl,
      s.titleEn,
      s.problemEl,
      s.problemEn,
      s.solutionEl,
      s.solutionEn,
      ...s.seoKeywordsEl,
      ...s.seoKeywordsEn,
    ]
      .join(" ")
      .toLowerCase(),
  }))

  return NextResponse.json(
    {
      schema_version: "1.0",
      siteId: "taxbg",
      generatedAt: new Date().toISOString(),
      count: items.length,
      usage: {
        el: "Κατάλογος υπηρεσιών για αναζήτηση λέξεων-κλειδιών από agents/LLMs. Κάθε υπηρεσία περιγράφεται ως πρόβλημα→γιατί→λύση — αυτόνομα, χωρίς εξάρτηση από άλλη σελίδα.",
        en: "Services index for agent/LLM keyword search. Each entry is problem→why→solution, self-contained — readable without any other page loaded.",
      },
      services: items,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  )
}
