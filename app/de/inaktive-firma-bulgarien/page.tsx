import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Inaktive Firma in Bulgarien — Pflichten & Kosten 2026 | TaxBG.eu",
  description:
    "Kosten für eine ruhende bulgarische GmbH: ab 25€/Monat. Welche Meldepflichten bestehen und wann es sich lohnt, die Firma zu behalten statt aufzulösen.",
  robots: { index: false, follow: false },
}

export default function DeCostInactivePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Ruhende bulgarische Firma</p>
        <h1>Inaktive Firma in Bulgarien</h1>
        <p className="seo-page-lead">
          Sie haben eine bulgarische Firma, die Sie derzeit nicht nutzen? Das bedeutet
          keine null Pflichten. Die bulgarische Steuerbehörde (NRA) verlangt auch bei
          vollständiger Inaktivität eine Jahreserklärung. Was es kostet und was passiert,
          wenn Sie nichts tun.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Was "inaktiv" rechtlich bedeutet</h2>
          <p>
            Eine Firma gilt als inaktiv, wenn sie keine Rechnungen ausstellt und keine
            Handlungstätigkeit ausübt. Das bedeutet aber <strong>nicht, dass keine
            Meldungen abzugeben sind</strong>: Die NRA verlangt eine
            Jahreserklärung über Null-Tätigkeit, und bei bestehender VIES-Registrierung
            sind monatliche MwSt.-Meldungen Pflicht.
          </p>
        </section>

        <section className="seo-section">
          <h2>Monatliche Kosten</h2>
          <div className="seo-price-compare">
            <div className="seo-price-compare-item">
              <span className="seo-price">40€</span>
              <span className="seo-price-label">/ Monat</span>
              <p>Inaktiv mit VIES</p>
              <p className="seo-price-note">
                Die Firma bleibt im VIES eingetragen — Sie können die Tätigkeit
                jederzeit ohne neue Registrierung aufnehmen.
              </p>
            </div>
            <div className="seo-price-compare-item">
              <span className="seo-price">25€</span>
              <span className="seo-price-label">/ Monat</span>
              <p>Inaktiv ohne VIES</p>
              <p className="seo-price-note">
                Bei späterer VIES-Neuregistrierung entstehen zusätzlicher Aufwand
                und Wartezeit.
              </p>
            </div>
          </div>
        </section>

        <section className="seo-section">
          <h2>Risiken bei unterlassenen Meldungen</h2>
          <p>
            Viele Firmeninhaber gehen davon aus, dass bei Inaktivität nichts zu tun ist.
            Das ist ein häufiger und kostspieliger Irrtum — die NRA verhängt Zinsen und
            Bußgelder für nicht abgegebene Erklärungen, auch bei Null-Umsatz.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Haben Sie eine inaktive Firma?</h3>
          <p>Schreiben Sie uns — wir sagen Ihnen sofort, was offen ist und was es kostet.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Kontakt aufnehmen →
            </Link>
            <Link href="/de/firmenaufloesung-bulgarien" className="btn-ghost-dark">
              Alternative: Firma auflösen
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
