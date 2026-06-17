import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LegalDocument } from "@/components/legal-document"
import { getLegalPage } from "@/content/legal"
import { legalNavItems, legalPath, type LegalRouteKey } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

const keys = legalNavItems.map((i) => i.key)

type Props = { params: Promise<{ key: string }> }

export function generateStaticParams() {
  return keys.map((key) => ({ key }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params
  if (!keys.includes(key as LegalRouteKey)) return {}
  const page = getLegalPage(key as LegalRouteKey)
  const route = legalNavItems.find((i) => i.key === key)!
  return buildPageMetadata({
    title: page.titleEl,
    description: page.descriptionEl.replace(/\{\{LEGAL_ENTITY\}\}/g, "TaxBG"),
    path: legalPath(route, "el"),
    alternatePath: legalPath(route, "en"),
    noIndex: false,
  })
}

export default async function LegalPage({ params }: Props) {
  const { key } = await params
  if (!keys.includes(key as LegalRouteKey)) notFound()
  const page = getLegalPage(key as LegalRouteKey)
  return (
    <section className="section legal-page-wrap">
      <LegalDocument page={page} locale="el" />
    </section>
  )
}
