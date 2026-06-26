import type { Metadata } from "next"
import Link from "next/link"
import { ACCOUNTING_FEATURES } from "@/content/pricing-data"

export const metadata: Metadata = {
  title: "Accounting Cost in Bulgaria 2026 — TaxBG.eu",
  description:
    "Monthly accounting for a Bulgarian company: from €110/month for services, e-commerce, and wholesale. Annual financial statements always included.",
  robots: { index: false, follow: false },
}

export default function EnCostAccountingPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Accounting in Bulgaria</p>
        <h1>Accounting Cost for Companies in Bulgaria</h1>
        <p className="seo-page-lead">
          Monthly accounting fees in Bulgaria are based on actual document volume —
          not a one-size-fits-all package. The annual financial statements and balance
          sheet are always included; no year-end surprise invoice.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>How the price is calculated</h2>
          <p>
            The main factor is the number of monthly documents: outgoing invoices,
            incoming invoices, bank statements. A freelancer with 3 invoices a month
            pays €110 — an e-shop with 80 documents pays proportionally more, but only
            for the real workload.
          </p>
          <p>
            The second factor is the type of activity: services, retail (e-commerce),
            and wholesale/import-export carry different accounting complexity and
            therefore different base prices.
          </p>
        </section>

        <section className="seo-section">
          <h2>What's included in every plan</h2>
          <ul className="seo-list seo-list--check">
            {ACCOUNTING_FEATURES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>The annual balance sheet is included</strong> — it is never billed
            separately, unlike many other offices.
          </p>
        </section>

        <section className="seo-section">
          <h2>Annual discount — 10%</h2>
          <p>
            Paying annually instead of monthly saves you 10% on the base price.
            The exact saving appears in the price calculator once you select your
            activity type — the toggle is shown on the result step, not upfront.
          </p>
        </section>

        <section className="seo-section">
          <h2>E-commerce from Bulgaria</h2>
          <p>
            Cross-border retail from a Bulgarian entity requires correct handling of
            the OSS regime, VAT registration in countries where annual sales exceed
            €10,000, and the right treatment of imports from third countries. Our
            team handles these cases daily.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Calculate your price</h3>
          <p>3 steps — activity type, document volume, goods origin.</p>
          <div className="seo-cta-actions">
            <Link href="/en/pricing" className="btn-primary">
              Open calculator →
            </Link>
            <Link href="/en/pricing/cost-company-formation-bulgaria" className="btn-ghost-dark">
              See formation costs
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
