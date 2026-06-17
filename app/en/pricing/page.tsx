import type { Metadata } from "next"
import { PricingTable } from "@/components/pricing-table"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing — TaxBG",
  description: "Transparent pricing for formation and accounting. 10% annual prepayment discount.",
  path: `/en/${routes.pricing.en}`,
  locale: "en",
  alternatePath: pathFor(routes.pricing),
})

export default function EnPricingPage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Pricing</h1>
      </div>
      <PricingTable locale="en" />
    </section>
  )
}
