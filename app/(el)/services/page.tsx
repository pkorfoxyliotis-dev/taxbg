import type { Metadata } from "next"
import { ImageSlider } from "@/components/image-slider"
import { ServiceCard } from "@/components/service-card"
import { servicesSlides } from "@/content/sliders"
import { services } from "@/content/services"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Υπηρεσίες TaxBG — Βουλγαρία",
  description:
    "Ίδρυση εταιρείας στη Βουλγαρία, λογιστική υποστήριξη και web υπηρεσίες από την TaxBG.",
  path: pathFor(routes.services),
  alternatePath: `/en/${routes.services.en}`,
})

export default function ServicesPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <h1>Υπηρεσίες</h1>
          <p>
            Επαγγελματικές υπηρεσίες για επιχειρήσεις στη Βουλγαρία — χωρίς
            περιττό «θόρυβο», μόνο ό,τι χρειάζεστε.
          </p>
        </div>
        <ImageSlider slides={servicesSlides} locale="el" variant="section" />
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="service-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </>
  )
}
