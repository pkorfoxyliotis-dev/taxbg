import Link from "next/link"
import { OpenAgentButton } from "@/components/open-agent-button"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { GoogleReviewsSection } from "@/components/google-reviews-section"
import { ImageSlider } from "@/components/image-slider"
import { ServiceCard } from "@/components/service-card"
import { homeSlides } from "@/content/sliders"
import { pathFor, routes } from "@/content/routes"
import { services } from "@/content/services"

export default function HomePage() {
  const featured = services.filter((s) => s.featured)

  return (
    <>
      <ImageSlider slides={homeSlides} locale="el" variant="hero" />

      <section className="benefits-strip">
        <div className="benefits-inner">
          <div className="benefit-item">
            <strong>Δωρεάν</strong>
            <span>Φορολογικός σχεδιασμός</span>
          </div>
          <div className="benefit-item">
            <strong>EL / EN</strong>
            <span>Επικοινωνία</span>
          </div>
          <div className="benefit-item">
            <strong>100%</strong>
            <span>Προέλεγχος παραστατικών</span>
          </div>
          <div className="benefit-item">
            <strong>24/7</strong>
            <span>Cloud πύλη πελάτη</span>
          </div>
        </div>
      </section>

      <ClientPlatformShowcase locale="el" />

      <section className="section">
        <div className="section-head">
          <h2>Οι Υπηρεσίες μας</h2>
          <p>
            Εστιάζουμε σε ό,τι χρειάζεστε πραγματικά — ίδρυση εταιρείας και
            λογιστική στη Βουλγαρία.
          </p>
        </div>
        <div className="service-grid">
          {featured.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <GoogleReviewsSection locale="el" />

      <section className="guide-banner">
        <div className="guide-banner-inner">
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--navy)", marginBottom: "0.5rem" }}>
              Δεν ξέρετε από πού να ξεκινήσετε;
            </h2>
            <p className="prose-muted">
              3–4 βήματα, εύρος τιμής χωρίς στοιχεία — μετά ο agent ολοκληρώνει
              qualification και onboarding.
            </p>
          </div>
          <div className="guide-banner-actions">
            <Link href={pathFor(routes.guide)} className="btn-secondary">
              Εκτίμηση τιμής
            </Link>
            <OpenAgentButton locale="el" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="section-head">
          <h2>Web & Agentic Υπηρεσίες</h2>
          <p>
            Σύντομη επισκόπηση — ο πλήρης κατάλογος θα είναι σε ξεχωριστό
            ιστότοπο σύντομα.
          </p>
        </div>
        <ServiceCard service={services.find((s) => s.id === "web")!} />
      </section>
    </>
  )
}
