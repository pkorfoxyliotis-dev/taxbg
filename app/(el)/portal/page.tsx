import type { Metadata } from "next"
import { GoogleSigninButton } from "@/components/auth/google-signin-button"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { PortalDashboard } from "@/components/portal-dashboard"
import { platformCopy } from "@/content/client-platform"
import { pathFor, routes } from "@/content/routes"
import { getCurrentMember } from "@/lib/auth"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Πύλη Πελάτη — Cloud πλατφόρμα TaxBG",
  description:
    "Δωρεάν cloud πύλη για συνδρομητές λογιστικής: παρακολούθηση εταιρείας 24/7, τιμολόγηση, τραπεζικός λογαριασμός, AI παραστατικά και πρόοδος υποχρεώσεων ΝΑΠ.",
  path: pathFor(routes.portal),
  alternatePath: `/en/${routes.portal.en}`,
})

export default async function PortalPage() {
  const member = await getCurrentMember()
  if (member) {
    return <PortalDashboard member={member} locale="el" />
  }

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
        <div className="guide-card" style={{ maxWidth: "420px", margin: "0 auto 2rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Σύνδεση
          </h2>
          <LoginForm locale="el" />
          <div style={{ marginTop: "1rem" }}>
            <GoogleSigninButton locale="el" />
          </div>
        </div>
        <div className="guide-card" style={{ maxWidth: "420px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Δημιουργία λογαριασμού
          </h2>
          <SignupForm locale="el" />
        </div>
      </section>
    </>
  )
}
