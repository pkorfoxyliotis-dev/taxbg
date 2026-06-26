import type { Metadata } from "next"
import { PricingCalculator } from "@/components/pricing-calculator"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Τιμές — TaxBG.eu",
  description:
    "Τιμές ίδρυσης εταιρείας στη Βουλγαρία και λογιστικής υποστήριξης. All-inclusive — χωρίς κρυφά κόστη.",
  path: pathFor(routes.pricing),
  alternatePath: `/en/${routes.pricing.en}`,
})

export default function PricingPage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Τιμές</h1>
        <p>
          Διαλέξτε τι σας ενδιαφέρει. Θα δείτε την τιμή και τι ακριβώς περιλαμβάνεται —
          χωρίς εκπλήξεις μετά.
        </p>
      </div>
      <PricingCalculator />
    </section>
  )
}
