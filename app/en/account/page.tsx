import type { Metadata } from "next"
import Link from "next/link"
import { ClientPlatformShowcase } from "@/components/client-platform-showcase"
import { platformCopy } from "@/content/client-platform"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Client Portal — TaxBG Cloud Platform",
  description:
    "Free cloud portal for accounting subscribers: 24/7 company monitoring, invoicing, bank reconciliation, AI documents and NAP obligation tracking.",
  path: `/en/${routes.portal.en}`,
  locale: "en",
  alternatePath: pathFor(routes.portal),
})

export default function EnPortalPage() {
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
        <div className="guide-card" style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "var(--navy)" }}>
            Client access
          </h2>
          <p className="prose-muted" style={{ marginBottom: "1.25rem" }}>
            The portal is included with your accounting subscription. Existing
            clients receive secure login credentials — contact us to activate
            your account.
          </p>
          <Link href={pathFor(routes.contact, "en")} className="btn-primary">
            Request access
          </Link>
        </div>
      </section>
    </>
  )
}
