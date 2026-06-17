import type { Metadata } from "next"
import { GuideWizard } from "@/components/guide-wizard"
import guide from "@/content/guide.json"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Price wizard — TaxBG",
  description:
    "TaxBG price wizard: all-inclusive formation, accounting tiers (services, EU trade, e-shop, import/export). Indicative range — agent confirms.",
  path: `/en/${routes.guide.en}`,
  locale: "en",
  alternatePath: pathFor(routes.guide),
})

export default function EnGuidePage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Price wizard</h1>
        <p className="prose-muted">
          Formation → Accounting → services / EU trade / e-shop / import-export.
          Price range without personal details — then the agent completes qualification.
        </p>
      </div>
      <GuideWizard guide={guide} locale="en" />
    </section>
  )
}
