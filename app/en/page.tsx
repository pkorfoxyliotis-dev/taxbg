import Link from "next/link"
import { OpenAgentButton } from "@/components/open-agent-button"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { GoogleReviewsSection } from "@/components/google-reviews-section"
import { HomeHero } from "@/components/home-hero"
import { ServiceCard } from "@/components/service-card"
import { pathFor, routes } from "@/content/routes"
import { services } from "@/content/services"

export default function EnHomePage() {
  const featured = services.filter((s) => s.featured)

  return (
    <>
      <HomeHero locale="en" />

      <ClientPlatformShowcase locale="en" />

      <section className="section">
        <div className="section-head">
          <h2>Our Services</h2>
          <p>Focused on what you actually need — formation and accounting in Bulgaria.</p>
        </div>
        <div className="service-grid">
          {featured.map((s) => (
            <ServiceCard key={s.id} service={s} locale="en" />
          ))}
        </div>
      </section>

      <GoogleReviewsSection locale="en" />

      <section className="guide-banner">
        <div className="guide-banner-inner">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy)" }}>
              Not sure where to start?
            </h2>
            <p className="prose-muted">
              3–4 steps, price range without personal details — then the agent completes
              qualification and onboarding.
            </p>
          </div>
          <div className="guide-banner-actions">
            <Link href={pathFor(routes.guide, "en")} className="btn-secondary">
              Price wizard
            </Link>
            <OpenAgentButton locale="en" />
          </div>
        </div>
      </section>
    </>
  )
}
