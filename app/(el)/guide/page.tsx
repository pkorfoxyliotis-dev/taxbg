import type { Metadata } from "next"
import { GuideWizard } from "@/components/guide-wizard"
import guide from "@/content/guide.json"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Εκτίμηση τιμής — TaxBG",
  description:
    "Οδηγός τιμών TaxBG: ίδρυση all-inclusive, λογιστική (υπηρεσίες, εμπόριο ΕΕ, e-shop, import/export). Ενδεικτικό εύρος — ο agent επιβεβαιώνει.",
  path: pathFor(routes.guide),
  alternatePath: `/en/${routes.guide.en}`,
})

export default function GuidePage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Εκτίμηση τιμής</h1>
        <p>
          Formation → Accounting → υπηρεσίες / εμπόριο ΕΕ / e-shop / import-export.
          Εύρος τιμής χωρίς στοιχεία — μετά ο agent ολοκληρώνει qualification.
        </p>
      </div>
      <GuideWizard guide={guide} locale="el" />
    </section>
  )
}
