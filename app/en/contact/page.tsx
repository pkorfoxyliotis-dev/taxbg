import type { Metadata } from "next"
import { AgentWidget } from "@/components/agent-widget"
import { ContactFormFallback } from "@/components/contact-form-fallback"
import { ContactLocation } from "@/components/contact-location"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Agent — TaxBG",
  description:
    "Talk to the TaxBG AI agent for company formation or accounting in Bulgaria. 24/7 qualification and price range.",
  path: `/en/${routes.contact.en}`,
  alternatePath: pathFor(routes.contact),
})

export default function ContactPageEn() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <h1>Talk to the Agent</h1>
          <p>
            The agent qualifies you, gives a price range, and guides onboarding.
            The form is fallback only.
          </p>
        </div>
      </section>
      <section className="contact-page-body section">
        <div className="contact-page-grid">
          <ContactLocation locale="en" />
          <div className="contact-page-main">
            <AgentWidget locale="en" variant="embed" />
            <ContactFormFallback locale="en" />
          </div>
        </div>
      </section>
    </div>
  )
}
