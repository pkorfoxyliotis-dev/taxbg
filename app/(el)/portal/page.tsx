import type { Metadata } from "next"
import Link from "next/link"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { platformCopy } from "@/content/client-platform"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Πύλη Πελάτη — Cloud πλατφόρμα TaxBG",
  description:
    "Δωρεάν cloud πύλη για συνδρομητές λογιστικής: παρακολούθηση εταιρείας 24/7, τιμολόγηση, τραπεζικός λογαριασμός, AI παραστατικά και πρόοδος υποχρεώσεων ΝΑΠ.",
  path: pathFor(routes.portal),
  alternatePath: `/en/${routes.portal.en}`,
})

export default function PortalPage() {
  const copy = platformCopy("el")

  return (
    <>
      <section className="hero" style={{ padding: "3rem 1.5rem" }}>
        <div className="hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <span className="hero-eyebrow">{copy.badge}</span>
          <h1>Πύλη Πελάτη TaxBG</h1>
          <p className="hero-lead">{copy.lead}</p>
        </div>
      </section>

      <ClientPlatformShowcase locale="el" showCta={false} compact />

      <section className="section">
        <div className="guide-card" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Σύνδεση πελατών
          </h2>
          <p className="prose-muted" style={{ marginBottom: "1.25rem" }}>
            Η πύλη ενεργοποιείται αυτόματα με τη συνδρομή λογιστικής. Οι
            υπάρχοντες πελάτες λαμβάνουν πρόσβαση μέσω ασφαλούς σύνδεσης —
            επικοινωνήστε μαζί μας για ενεργοποίηση λογαριασμού.
          </p>
          <ul className="feature-list">
            <li>Δωρεάν τιμολόγηση — χωρίς ξεχωριστό κόστος</li>
            <li>Φωτογραφία παραστατικού από κινητό → AI agent</li>
            <li>Email τιμολογίων & τραπεζικών → αυτόματη καταχώρηση</li>
            <li>Παρακολούθηση υποχρεώσεων ΝΑΠ σε πραγματικό χρόνο</li>
          </ul>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Link href={pathFor(routes.contact)} className="btn-primary">
              Ενεργοποίηση πρόσβασης
            </Link>
            <Link href="/υπηρεσίες/λογιστική-βουλγαρία" className="btn-secondary">
              Πακέτα λογιστικής
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
