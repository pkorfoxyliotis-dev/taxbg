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
  title: "Client Portal — TaxBG Cloud Platform",
  description:
    "Free cloud portal for accounting subscribers: 24/7 company monitoring, invoicing, bank reconciliation, AI documents and NAP obligation tracking.",
  path: `/en/${routes.portal.en}`,
  locale: "en",
  alternatePath: pathFor(routes.portal),
})

export default async function EnPortalPage() {
  const member = await getCurrentMember()
  if (member) {
    return <PortalDashboard member={member} locale="en" />
  }

  const copy = platformCopy("en")

  return (
    <>
      <section className="hero" style={{ padding: "3rem 1.5rem" }}>
        <div className="hero-inner" style={{ gridTemplateColumns: "1fr" }}>
          <span className="hero-eyebrow">{copy.badge}</span>
          <h1>TaxBG Client Portal</h1>
          <p className="hero-lead">{copy.lead}</p>
        </div>
      </section>

      <ClientPlatformShowcase locale="en" showCta={false} compact />

      <section className="section">
        <div className="guide-card" style={{ maxWidth: "420px", margin: "0 auto 2rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Log in
          </h2>
          <LoginForm locale="en" />
          <div style={{ marginTop: "1rem" }}>
            <GoogleSigninButton locale="en" />
          </div>
        </div>
        <div className="guide-card" style={{ maxWidth: "420px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Create account
          </h2>
          <SignupForm locale="en" />
        </div>
      </section>
    </>
  )
}
