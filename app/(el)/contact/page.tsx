import type { Metadata } from "next"
import { AgentWidget } from "@/components/agent-widget"
import { ContactFormFallback } from "@/components/contact-form-fallback"
import { ContactLocation } from "@/components/contact-location"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Agent — TaxBG",
  description:
    "Μιλήστε με τον AI agent της TaxBG για ίδρυση εταιρείας ή λογιστική στη Βουλγαρία. 24/7 qualification και εκτίμηση τιμής.",
  path: pathFor(routes.contact),
  alternatePath: `/en/${routes.contact.en}`,
})

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <h1>Μίλα με τον Agent</h1>
          <p>
            Ο agent κάνει qualification, δίνει εύρος τιμής και σε οδηγεί στο onboarding.
            Η φόρμα είναι μόνο fallback.
          </p>
        </div>
      </section>
      <section className="contact-page-body section">
        <div className="contact-page-grid">
          <ContactLocation locale="el" />
          <div className="contact-page-main">
            <AgentWidget locale="el" variant="embed" />
            <ContactFormFallback locale="el" />
          </div>
        </div>
      </section>
    </div>
  )
}
