import type { Metadata } from "next"
import Link from "next/link"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { JsonLd } from "@/components/json-ld"
import { getServiceById } from "@/content/services"
import { pathFor, routes, servicePath } from "@/content/routes"
import { buildPageMetadata, serviceJsonLd } from "@/lib/seo"
import { formatEur, quoteTier } from "@/lib/pricing"

const service = getServiceById("accounting")!

export const metadata: Metadata = buildPageMetadata({
  title: service.titleEl,
  description: service.shortEl,
  path: servicePath(service.slug),
  alternatePath: `/en/services/${service.slug.en}`,
})

export default function AccountingPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd(service.titleEl, service.descriptionEl, servicePath(service.slug))}
      />
      <section className="hero" style={{ padding: "3rem 1.5rem" }}>
        <div className="hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <span className="hero-eyebrow">{service.heroHighlightEl}</span>
            <h1>{service.titleEl}</h1>
            <p className="hero-lead">{service.descriptionEl}</p>
            <Link href={pathFor(routes.portal)} className="btn-primary">
              Συνδρομή πελάτη
            </Link>
          </div>
        </div>
      </section>

      <ClientPlatformShowcase locale="el" showCta={false} />

      <section className="section">
        <ul className="feature-list">
          {service.featuresEl.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy)", margin: "2rem 0 1rem" }}>
          Συνδρομές
        </h2>
        <div className="pricing-grid">
          {service.tiers.map((tier) => {
            const quote = quoteTier("accounting", tier.id)
            return (
              <div key={tier.id} className="pricing-card">
                <h3>{tier.nameEl}</h3>
                <p className="pricing-amount">
                  {quote ? formatEur(quote.totalEur) : `${tier.priceEur}€`}
                </p>
                {quote?.advanceDiscountApplied && (
                  <span className="pricing-discount">-10% προπληρωμή</span>
                )}
                <p className="prose-muted" style={{ marginTop: "0.75rem" }}>
                  {tier.descriptionEl}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
