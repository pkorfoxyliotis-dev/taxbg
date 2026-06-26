import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Buchhaltungskosten in Bulgarien 2026 — TaxBG.eu",
  description:
    "Monatliche Buchhaltung für bulgarische GmbH: ab 110€/Monat für Dienstleistungen, E-Commerce und Großhandel. Jahresabschluss inklusive.",
  robots: { index: false, follow: false },
}

export default function DeCostAccountingPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Buchhaltung in Bulgarien</p>
        <h1>Kosten der Buchhaltung für Firmen in Bulgarien</h1>
        <p className="seo-page-lead">
          Die monatliche Buchhaltungsgebühr richtet sich nach dem tatsächlichen
          Belegvolumen — nicht nach einem Pauschalpaket, das weder für kleine noch
          große Firmen wirklich passt. Der Jahresabschluss ist immer inklusive,
          keine Zusatzrechnung am Jahresende.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Wie sich der Preis zusammensetzt</h2>
          <p>
            Grundlage ist die Anzahl der monatlichen Belege: Ausgangsrechnungen,
            Eingangsrechnungen, Kontoauszüge. Ein Freelancer mit 3 Rechnungen im
            Monat zahlt 110€ — ein Online-Shop mit 80 Belegen zahlt entsprechend mehr,
            aber nur für die tatsächlich anfallende Arbeit.
          </p>
          <p>
            Zweiter Faktor ist die Art der Tätigkeit: Dienstleistungen,
            Einzelhandel (E-Commerce) und Großhandel/Import-Export haben unterschiedliche
            buchhalterische Komplexität.
          </p>
        </section>

        <section className="seo-section">
          <h2>Was in jedem Preis enthalten ist</h2>
          <ul className="seo-list seo-list--check">
            <li>Kostenloses Fakturierungssystem</li>
            <li>24/7 Kundenportal: Bankkonten, Belege, MwSt.-/NRA-Pflichten in Echtzeit</li>
            <li>Monatliche und quartalsweise MwSt.-Meldungen</li>
            <li>Monatliche NRA-Meldung</li>
            <li>Jahresabschluss und Veröffentlichung im Handelsregister — inklusive, kein Aufpreis</li>
            <li>TaxBG Agent — gemeinsamer digitaler Buchhaltungsassistent</li>
            <li>Support auf Griechisch und Englisch</li>
          </ul>
        </section>

        <section className="seo-section">
          <h2>Jahresrabatt 10%</h2>
          <p>
            Bei jährlicher Vorauszahlung erhalten Sie 10% Rabatt auf den monatlichen
            Grundpreis. Den genauen Betrag berechnet der Preiskalkulator nach Auswahl
            der Tätigkeit.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Preis für Ihre Tätigkeit berechnen</h3>
          <p>3 Schritte — Tätigkeitsbereich, Belegvolumen, Warenherkunft.</p>
          <div className="seo-cta-actions">
            <Link href="/τιμές" className="btn-primary">
              Zum Kalkulator →
            </Link>
            <Link href="/de/kosten-firmengruendung-bulgarien" className="btn-ghost-dark">
              Gründungskosten ansehen
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
