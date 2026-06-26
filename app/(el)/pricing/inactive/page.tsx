import type { Metadata } from "next"
import Link from "next/link"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Ανενεργή Εταιρεία στη Βουλγαρία — Κόστος & Υποχρεώσεις 2026 | TaxBG.eu",
  description:
    "Κόστος διατήρησης ανενεργής βουλγαρικής εταιρείας: από 25€/μήνα. Τι υποχρεώσεις υπάρχουν, πότε αξίζει να κρατήσετε αντί να κλείσετε.",
  path: pathFor(routes.costInactive),
})

export default function CostInactivePage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Ανενεργή Βουλγαρική Εταιρεία</p>
        <h1>Ανενεργή Εταιρεία στη Βουλγαρία</h1>
        <p className="seo-page-lead">
          Έχετε βουλγαρική εταιρεία που δεν χρησιμοποιείτε προς το παρόν; Αυτό δεν
          σημαίνει μηδενικές υποχρεώσεις. Τι κοστίζει να τη διατηρήσετε συμμορφούμενη,
          και πότε αξίζει να την κρατήσετε αντί να την κλείσετε.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Τι σημαίνει "ανενεργή" στη Βουλγαρία</h2>
          <p>
            Μια εταιρεία είναι ανενεργή όταν δεν εκδίδει τιμολόγια και δεν έχει
            εμπορική δραστηριότητα. Αυτό <strong>δεν σημαίνει ότι δεν υποβάλλει
            δηλώσεις</strong>: η βουλγαρική φορολογική αρχή (ΝΑΠ) απαιτεί ετήσια
            δήλωση μηδενικής δραστηριότητας, και αν η εταιρεία έχει VIES, υπάρχουν
            επιπλέον μηνιαίες υποχρεώσεις.
          </p>
        </section>

        <section className="seo-section">
          <h2>Κόστος ανά μήνα</h2>
          <div className="seo-price-compare">
            <div className="seo-price-compare-item">
              <span className="seo-price">40€</span>
              <span className="seo-price-label">/ μήνα</span>
              <p>Ανενεργή με VIES</p>
              <p className="seo-price-note">
                Η εταιρεία παραμένει εγγεγραμμένη στο VIES — μπορείτε να επαναλειτουργήσετε
                ανά πάσα στιγμή χωρίς νέα εγγραφή.
              </p>
            </div>
            <div className="seo-price-compare-item">
              <span className="seo-price">25€</span>
              <span className="seo-price-label">/ μήνα</span>
              <p>Ανενεργή χωρίς VIES</p>
              <p className="seo-price-note">
                Αν διαγραφείτε από VIES και θελήσετε να επιστρέψετε, η νέα εγγραφή
                παίρνει χρόνο και έχει κόστος.
              </p>
            </div>
          </div>
        </section>

        <section className="seo-section">
          <h2>Πότε να κρατήσετε και πότε να κλείσετε</h2>
          <p className="seo-placeholder">
            [— Εδώ: λογική σύγκριση — αν σχεδιάζετε να ξανακτιμοποιήσετε σε 1-2 χρόνια,
            το κόστος διατήρησης είναι χαμηλότερο από το κόστος κλεισίματος + νέας
            ίδρυσης. Αν δεν υπάρχει πλάνο επανεκκίνησης, το κλείσιμο κερδίζει
            μακροπρόθεσμα. Το γράφει ο Panagiotis. —]
          </p>
        </section>

        <section className="seo-section">
          <h2>Τι κάνουμε εμείς κάθε μήνα</h2>
          <p className="seo-placeholder">
            [— Εδώ: τι υποβάλλεται, πώς ενημερώνεστε, τι δεν χρειάζεται να κάνετε
            εσείς. —]
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Έχετε ανενεργή εταιρεία;</h3>
          <p>Πείτε μας την κατάσταση — σας λέμε αμέσως τι εκκρεμεί και τι κοστίζει.</p>
          <div className="seo-cta-actions">
            <Link href={pathFor(routes.contact)} className="btn-primary">
              Επικοινωνήστε μαζί μας →
            </Link>
            <Link href={pathFor(routes.costClosure)} className="btn-ghost-dark">
              Εναλλακτικά: κλείστε την εταιρεία
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
