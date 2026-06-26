import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Firmenauflösung in Bulgarien — Kosten & Ablauf 2026 | TaxBG.eu",
  description:
    "Auflösung einer bulgarischen GmbH (EOOD/OOD): 850€ einmalig, Liquidationsverfahren mindestens 6 Monate. Was vor dem Start geregelt sein muss.",
  robots: { index: false, follow: false },
}

export default function DeCostClosurePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Liquidation & Löschung</p>
        <h1>Firmenauflösung in Bulgarien</h1>
        <p className="seo-page-lead">
          Die Auflösung einer bulgarischen GmbH ist ein geregeltes Verfahren mit einer
          gesetzlichen Mindestdauer von 6 Monaten. Was kostet es, wie läuft es ab, und
          was muss vor dem Start geklärt sein.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Auflösung oder ruhend stellen — was ist sinnvoller?</h2>
          <p>
            Eine ruhende Firma kostet 25–40€/Monat, um steuerlich compliant zu bleiben.
            Wenn Sie die Firma nie wieder nutzen wollen, ist die Auflösung langfristig
            günstiger — erfordert aber einen einmaligen Aufwand und mindestens 6 Monate
            Verfahrensdauer.
          </p>
        </section>

        <section className="seo-section">
          <h2>Kosten der Auflösung</h2>
          <div className="seo-price-highlight">
            <span className="seo-price">850€</span>
            <span className="seo-price-label">einmalig</span>
          </div>
          <p>
            Enthalten: Liquidationsverfahren, Löschung aus dem Handelsregister, VIES
            und NRA.
          </p>
          <p>
            <strong>Voraussetzung:</strong> keine offenen Verbindlichkeiten gegenüber
            dem Finanzamt — eine Liquidation kann nicht beginnen, solange Steuern oder
            Sozialabgaben ausstehen.
          </p>
        </section>

        <section className="seo-section">
          <h2>Verfahrensdauer</h2>
          <p>
            Das bulgarische Recht sieht eine Mindest-Liquidationsfrist von 6 Monaten
            ab Veröffentlichung des Auflösungsbeschlusses im Handelsregister vor.
            In dieser Zeit können Gläubiger Forderungen anmelden.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Firma auflösen?</h3>
          <p>Kontaktieren Sie uns — wir prüfen zuerst, ob offene Punkte bestehen.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Kontakt aufnehmen →
            </Link>
            <Link href="/de/inaktive-firma-bulgarien" className="btn-ghost-dark">
              Alternative: ruhend stellen
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
