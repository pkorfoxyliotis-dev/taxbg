import type { Metadata } from "next"
import Link from "next/link"
import { getServiceById } from "@/content/services"
import { pathFor, routes, servicePath } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

const service = getServiceById("web")!

export const metadata: Metadata = buildPageMetadata({
  title: service.titleEl,
  description: service.shortEl,
  path: servicePath(service.slug),
  alternatePath: `/en/services/${service.slug.en}`,
})

export default function WebServicesPage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>{service.titleEl}</h1>
        <p>{service.descriptionEl}</p>
      </div>
      <ul className="feature-list" style={{ maxWidth: "36rem", margin: "0 auto 2rem" }}>
        {service.featuresEl.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="prose-muted" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Πλήρης κατάλογος agentic web υπηρεσιών — ξεχωριστός ιστότοπος σύντομα.
      </p>
      <div style={{ textAlign: "center" }}>
        <Link href={pathFor(routes.contact)} className="btn-primary">
          Επικοινωνήστε μαζί μας
        </Link>
      </div>
    </section>
  )
}
