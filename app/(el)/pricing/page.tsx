import type { Metadata } from "next"
import { PricingTable } from "@/components/pricing-table"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Τιμές — TaxBG",
  description:
    "Τιμολόγηση ίδρυσης εταιρείας στη Βουλγαρία και λογιστικών συνδρομών. Έκπτωση 10% για ετήσια προπληρωμή.",
  path: pathFor(routes.pricing),
  alternatePath: `/en/${routes.pricing.en}`,
})

export default function PricingPage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Τιμές</h1>
        <p>
          Διαφανείς τιμές για τις κύριες υπηρεσίες μας. Έκπτωση 10% για ετήσια
          προπληρωμή λογιστικής συνδρομής.
        </p>
      </div>
      <PricingTable locale="el" />
    </section>
  )
}
