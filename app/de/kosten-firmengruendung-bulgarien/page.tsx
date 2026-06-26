import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kosten Firmengründung Bulgarien 2026 — TaxBG.eu",
  description:
    "Vollständige Kosten für die Gründung einer bulgarischen GmbH (EOOD/OOD): 750€ all-inclusive. Was enthalten ist, was andere Büros extra berechnen.",
  robots: { index: false, follow: false },
}

export default function DeCostFormationPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Firmengründung in Bulgarien</p>
        <h1>Kosten der Firmengründung in Bulgarien</h1>
        <p className="seo-page-lead">
          Eine bulgarische GmbH (EOOD für Einzelpersonen, OOD für mehrere Gesellschafter)
          zu gründen kostet bei uns 750€ — pauschal, alles inklusive. Keine versteckten
          Gebühren für Bankkonto, Steuer-ID oder VIES-Registrierung.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Warum Bulgarien für EU-Bürger interessant ist</h2>
          <p>
            Bulgarien hat den niedrigsten Körperschaftsteuersatz in der EU: 10% auf
            Gewinne und 5% Quellensteuer auf Dividenden. Für Freelancer, IT-Unternehmer
            und E-Commerce-Betreiber bedeutet das eine effektive Steuerbelastung von
            14,5% statt 25–45% in Deutschland, Österreich oder der Schweiz.
          </p>
          <p>
            Als EU-Mitglied gilt in Bulgarien das VIES-System, Reverse-Charge und OSS —
            alle Werkzeuge für grenzüberschreitenden Handel sind vorhanden.
          </p>
        </section>

        <section className="seo-section">
          <h2>Was sind 750€ enthalten</h2>
          <ul className="seo-list seo-list--check">
            <li>Ausarbeitung und Eintragung des Gesellschaftsvertrags im Handelsregister</li>
            <li>Einzahlungskonto (Bankgebühren inklusive)</li>
            <li>Ausstellung der ЛНЧ (bulgarische Steuer-ID — Pflicht für MwSt./VIES/NRA)</li>
            <li>MwSt.- und VIES-Registrierung</li>
            <li>Anmeldung des Geschäftsführers bei der NRA (Sozialversicherung)</li>
            <li>Dolmetscher beim Notar</li>
            <li>Unterstützung auf Griechisch und Englisch in jedem Schritt</li>
            <li>Keine versteckten Kosten</li>
          </ul>
        </section>

        <section className="seo-section">
          <h2>Was andere Büros extra berechnen</h2>
          <p>
            Viele Anbieter werben mit Gründungspreisen ab 400–500€, schließen aber
            Bankgebühren für das Einzahlungskonto (200–350€), die ЛНЧ-Ausstellung und
            die VIES-Registrierung nicht ein. Die Endrechnung übersteigt oft unseren
            Pauschalpreis erheblich.
          </p>
        </section>

        <section className="seo-section">
          <h2>Fast-track: VIES ab dem zweiten Werktag</h2>
          <p>
            Beim Standardverfahren erscheint die Firma nach 10–14 Werktagen im VIES.
            Falls Sie einen B2B-Kunden haben, der sofort eine aktive VIES-Nummer
            benötigt, ermöglicht der Fast-track (950€) den VIES-Status bereits am
            zweiten Werktag.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Bereit zur Firmengründung?</h3>
          <p>Kontaktieren Sie uns — wir antworten auf Griechisch, Englisch oder Deutsch.</p>
          <div className="seo-cta-actions">
            <Link href="/επικοινωνία" className="btn-primary">
              Kontakt aufnehmen →
            </Link>
            <Link href="/de/kosten-buchhaltung-bulgarien" className="btn-ghost-dark">
              Buchhaltungskosten ansehen
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
