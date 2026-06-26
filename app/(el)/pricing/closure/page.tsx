import type { Metadata } from "next"
import Link from "next/link"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Κλείσιμο Εταιρείας στη Βουλγαρία — Κόστος & Διαδικασία 2026 | TaxBG.eu",
  description:
    "Κλείσιμο βουλγαρικής εταιρείας (EOOD/OOD): κόστος 850€, διαδικασία εκκαθάρισης 6+ μηνών, τι χρειάζεστε να κάνετε πριν ξεκινήσει.",
  path: pathFor(routes.costClosure),
})

export default function CostClosurePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Διάλυση & Διαγραφή Εταιρείας</p>
        <h1>Κλείσιμο Εταιρείας στη Βουλγαρία</h1>
        <p className="seo-page-lead">
          Οι διαδικασίες κλεισίματος βουλγαρικής εταιρείας είναι συγκεκριμένες και
          χρονοβόρες. Τι κοστίζει, πόσο διαρκεί, και τι πρέπει να τακτοποιήσετε πριν
          ξεκινήσει η εκκαθάριση.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Πότε αξίζει να κλείσετε αντί να αφήσετε ανενεργή</h2>
          <p>
            Μια ανενεργή εταιρεία κοστίζει 25–40€/μήνα για να παραμείνει συμμορφούμενη.
            Αν δεν σχεδιάζετε να την ξαναχρησιμοποιήσετε ποτέ, το κλείσιμο είναι
            οικονομικότερο μακροπρόθεσμα — αλλά απαιτεί έναν εφάπαξ κόστος και
            τουλάχιστον 6 μήνες διαδικασία.
          </p>
        </section>

        <section className="seo-section">
          <h2>Κόστος κλεισίματος</h2>
          <div className="seo-price-highlight">
            <span className="seo-price">850€</span>
            <span className="seo-price-label">εφάπαξ</span>
          </div>
          <p>
            Περιλαμβάνει: διαδικασία εκκαθάρισης, διαγραφή από Εμπορικό Μητρώο,
            διαγραφή από VIES και ΝΑΠ.
          </p>
          <p>
            <strong>Προϋπόθεση:</strong> μηδενικές εκκρεμότητες προς εφορία (ΝΑΠ) —
            δεν μπορεί να ξεκινήσει εκκαθάριση αν υπάρχουν οφειλές ή ανεκπλήρωτες
            υποχρεώσεις.
          </p>
        </section>

        <section className="seo-section">
          <h2>Πόσο διαρκεί η διαδικασία</h2>
          <p>
            Το βουλγαρικό δίκαιο ορίζει ελάχιστη περίοδο εκκαθάρισης 6 μηνών από την
            ημερομηνία δημοσίευσης της απόφασης διάλυσης στο Εμπορικό Μητρώο. Αυτό το
            διάστημα δίνει στους πιστωτές χρόνο να αναγγείλουν τυχόν απαιτήσεις.
          </p>
        </section>

        <section className="seo-section">
          <h2>Βήματα πριν ξεκινήσει το κλείσιμο</h2>
          <p className="seo-placeholder">
            [— Εδώ: τι πρέπει να τακτοποιήσετε — μηδενισμός ΦΠΑ, τελευταίος
            ισολογισμός, τραπεζικός λογαριασμός, ΝΑΠ. Το γράφει ο Panagiotis. —]
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Θέλετε να κλείσετε εταιρεία;</h3>
          <p>Επικοινωνήστε μαζί μας για να ελέγξουμε τι εκκρεμεί πριν ξεκινήσουμε.</p>
          <div className="seo-cta-actions">
            <Link href={pathFor(routes.contact)} className="btn-primary">
              Επικοινωνήστε μαζί μας →
            </Link>
            <Link href={pathFor(routes.costInactive)} className="btn-ghost-dark">
              Εναλλακτικά: κρατήστε την ανενεργή
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
