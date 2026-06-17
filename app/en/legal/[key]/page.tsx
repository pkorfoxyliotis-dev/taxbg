import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LegalDocument } from "@/components/legal-document"
import { getLegalPage } from "@/content/legal"
import { legalNavItems, type LegalRouteKey } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

const keys = legalNavItems.map((i) => i.key)

type Props = { params: Promise<{ key: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { key } = await params
  if (!keys.includes(key as LegalRouteKey)) return {}
  const page = getLegalPage(key as LegalRouteKey)
  return buildPageMetadata({
    title: page.titleEn,
    description: page.descriptionEn,
    path: `/en/legal/${key}`,
    locale: "en",
    noIndex: false,
  })
}

export default async function EnLegalPage({ params }: Props) {
  const { key } = await params
  if (!keys.includes(key as LegalRouteKey)) notFound()
  const page = getLegalPage(key as LegalRouteKey)
  return (
    <section className="section legal-page-wrap">
      <LegalDocument page={page} locale="en" />
    </section>
  )
}
