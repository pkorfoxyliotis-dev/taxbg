import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Inactive Company in Bulgaria — Obligations & Costs 2026 | TaxBG.eu",
  description:
    "Cost of maintaining a dormant Bulgarian company: from €25/month. What filing obligations remain and when keeping it is smarter than closing it.",
  robots: { index: false, follow: false },
}

export default function EnCostInactivePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Dormant Bulgarian Company</p>
        <h1>Inactive Company in Bulgaria</h1>
        <p className="seo-page-lead">
          Have a Bulgarian company you're not currently using? That does not mean zero
          obligations. The Bulgarian tax authority (NRA) requires an annual nil return
          even with no activity — and VIES-registered companies must also file monthly
          VAT returns. Here is what it costs and what happens if you do nothing.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>What "inactive" means legally</h2>
          <p>
            A company is inactive when it issues no invoices and carries out no
            commercial activity. This does <strong>not</strong> mean no filings:
            the NRA requires a yearly declaration of nil activity, and if VIES
            registration is active, monthly VAT returns are also mandatory.
          </p>
        </section>

        <section className="seo-section">
          <h2>Monthly cost</h2>
          <div className="seo-price-compare">
            <div className="seo-price-compare-item">
              <span className="seo-price">€40</span>
              <span className="seo-price-label">/ month</span>
              <p>Inactive with VIES</p>
              <p className="seo-price-note">
                Company stays VIES-registered — you can resume trading at any time
                without going through a new registration.
              </p>
            </div>
            <div className="seo-price-compare-item">
              <span className="seo-price">€25</span>
              <span className="seo-price-label">/ month</span>
              <p>Inactive without VIES</p>
              <p className="seo-price-note">
                If you need VIES again later, a new registration takes time and
                carries its own process cost.
              </p>
            </div>
          </div>
        </section>

        <section className="seo-section">
          <h2>The risk of doing nothing</h2>
          <p>
            Many owners assume an idle company needs no attention. This is one of the
            most common and costly mistakes — the NRA charges interest and penalties
            for missing declarations, even at zero turnover. The annual nil return is
            not optional.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Have a dormant company?</h3>
          <p>Tell us the situation — we'll tell you immediately what's outstanding and what it costs.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Contact us →
            </Link>
            <Link href="/en/pricing/company-closure-bulgaria" className="btn-ghost-dark">
              Alternative: close the company
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
