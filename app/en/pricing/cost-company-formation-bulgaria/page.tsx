import type { Metadata } from "next"
import Link from "next/link"
import { REGISTRATION_INCLUDES } from "@/content/pricing-data"

export const metadata: Metadata = {
  title: "Cost of Company Formation in Bulgaria 2026 — TaxBG.eu",
  description:
    "Full cost of forming a Bulgarian company (EOOD/OOD): €750 all-inclusive. What's included, what other offices charge extra, and the full process.",
  robots: { index: false, follow: false },
}

export default function EnCostFormationPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Company Formation in Bulgaria</p>
        <h1>Cost of Company Formation in Bulgaria</h1>
        <p className="seo-page-lead">
          Forming a Bulgarian limited liability company (EOOD for sole owners, OOD for
          multiple shareholders) costs €750 at TaxBG — one price, everything included.
          No separate invoice for the bank account, tax ID, or VIES registration.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Why entrepreneurs choose Bulgaria</h2>
          <p>
            Bulgaria has the lowest corporate tax rate in the EU: 10% on profits and
            5% withholding tax on dividends. For freelancers, IT professionals and
            e-commerce operators, invoicing through a Bulgarian company means an
            effective tax rate of 14.5% instead of 25–45% elsewhere in Europe.
          </p>
          <p>
            As a full EU member, Bulgaria supports VIES, reverse-charge VAT, and OSS
            — all the tools needed for cross-border business within the single market.
          </p>
        </section>

        <section className="seo-section">
          <h2>What €750 includes</h2>
          <ul className="seo-list seo-list--check">
            {REGISTRATION_INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="seo-section">
          <h2>What other offices charge extra for</h2>
          <p>
            Many providers advertise formation from €400–500 but exclude the bank
            capital account fees (€200–350), the ЛНЧ tax ID issuance, and VIES
            registration. The final bill regularly exceeds our all-inclusive price.
          </p>
        </section>

        <section className="seo-section">
          <h2>Fast-track: VIES active from day two</h2>
          <p>
            Standard formation takes 10–14 working days to appear in VIES. If you have
            a B2B client that requires an active VIES number immediately, the fast-track
            option (€950) activates your VIES status from the second working day.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Ready to form a company?</h3>
          <p>Get in touch — we respond in Greek, English, or Bulgarian.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Contact us →
            </Link>
            <Link href="/en/pricing/accounting-cost-bulgaria" className="btn-ghost-dark">
              See accounting costs
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
