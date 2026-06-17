import type { Metadata } from "next"
import { ImageSlider } from "@/components/image-slider"
import { ServiceCard } from "@/components/service-card"
import { servicesSlides } from "@/content/sliders"
import { services } from "@/content/services"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Services — TaxBG",
  description: "Company formation, accounting and web services in Bulgaria.",
  path: `/en/${routes.services.en}`,
  locale: "en",
  alternatePath: pathFor(routes.services),
})

export default function EnServicesPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-head">
          <h1>Services</h1>
        </div>
        <ImageSlider slides={servicesSlides} locale="en" variant="section" />
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="service-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} locale="en" />
          ))}
        </div>
      </section>
    </>
  )
}
