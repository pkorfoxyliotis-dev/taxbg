import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Company Closure in Bulgaria — Cost & Process 2026 | TaxBG.eu",
  description:
    "Closing a Bulgarian company (EOOD/OOD): €850 one-time fee, minimum 6-month liquidation process. What must be settled before you can start.",
  robots: { index: false, follow: false },
}

export default function EnCostClosurePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Liquidation & Dissolution</p>
        <h1>Closing a Company in Bulgaria</h1>
        <p className="seo-page-lead">
          Dissolving a Bulgarian limited liability company is a formal legal process
          with a statutory minimum duration of 6 months. Here is what it costs, how
          it works, and what must be in order before it can begin.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Closure vs. keeping it dormant — which makes sense?</h2>
          <p>
            A dormant company costs €25–40/month to stay tax-compliant. If you never
            plan to use it again, closure is cheaper in the long run — but it requires
            a one-time cost and at least 6 months of process. If there is any chance
            you will reactivate within the next 2–3 years, keeping it dormant is
            usually the better call.
          </p>
        </section>

        <section className="seo-section">
          <h2>Cost of closure</h2>
          <div className="seo-price-highlight">
            <span className="seo-price">€850</span>
            <span className="seo-price-label">one-time</span>
          </div>
          <p>
            Includes: full liquidation procedure, removal from the Commercial Register,
            VIES, and NRA.
          </p>
          <p>
            <strong>Prerequisite:</strong> zero outstanding liabilities to the tax
            authority — liquidation cannot begin while tax or social security debts exist.
          </p>
        </section>

        <section className="seo-section">
          <h2>How long does it take</h2>
          <p>
            Bulgarian law sets a minimum liquidation period of 6 months from the date
            the dissolution decision is published in the Commercial Register. This
            window gives creditors time to file any claims against the company.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Need to close a company?</h3>
          <p>Contact us first — we'll check what's outstanding before we start.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Contact us →
            </Link>
            <Link href="/en/pricing/inactive-company-bulgaria" className="btn-ghost-dark">
              Alternative: keep it dormant
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
