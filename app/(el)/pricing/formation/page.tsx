import type { Metadata } from "next"
import Link from "next/link"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"
import { REGISTRATION_INCLUDES } from "@/content/pricing-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Κόστος Ίδρυσης Εταιρείας στη Βουλγαρία 2026 — TaxBG.eu",
  description:
    "Πλήρες κόστος ίδρυσης εταιρείας στη Βουλγαρία: 750€ all-inclusive. Τι περιλαμβάνεται, τι χρεώνουν άλλοι γραφεία ξεχωριστά, και η πλήρης διαδικασία.",
  path: pathFor(routes.costFormation),
})

export default function CostFormationPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Ίδρυση Εταιρείας στη Βουλγαρία</p>
        <h1>Κόστος Ίδρυσης Εταιρείας στη Βουλγαρία</h1>
        <p className="seo-page-lead">
          Το πλήρες κόστος ίδρυσης βουλγαρικής εταιρείας (EOOD/OOD) για Έλληνες — από
          750€ all-inclusive. Τι περιλαμβάνει η τιμή, τι συνηθίζουν να χρεώνουν άλλοι
          ξεχωριστά, και ποια είναι η πραγματική διαδικασία βήμα-βήμα.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Γιατί ιδρύουν εταιρεία στη Βουλγαρία;</h2>
          <p>
            Η Βουλγαρία προσφέρει το χαμηλότερο εταιρικό φόρο στην ΕΕ: 10% επί των
            κερδών και 5% φόρο μερισμάτων. Αυτό σημαίνει ότι ένας freelancer, ένας
            e-shop ιδιοκτήτης ή ένας IT επαγγελματίας που τιμολογεί από βουλγαρική
            εταιρεία πληρώνει συνολικά 14.5% αντί για 22–29% στην Ελλάδα.
          </p>
          <p>
            Επιπλέον, η Βουλγαρία είναι πλήρες μέλος της ΕΕ — άρα ισχύει το VIES, το
            reverse charge VAT, η OSS και όλα τα εργαλεία ενδοκοινοτικών συναλλαγών που
            χρειάζεται μια σύγχρονη επιχείρηση.
          </p>
        </section>

        <section className="seo-section">
          <h2>Πόσο κοστίζει πραγματικά η ίδρυση;</h2>
          <p>
            Βλέπετε online τιμές από 400–500€. Αυτές συχνά δεν περιλαμβάνουν:
          </p>
          <ul className="seo-list seo-list--warn">
            <li>Τραπεζικός λογαριασμός κεφαλαίου: +200–350€ (τέλη τράπεζας)</li>
            <li>Έκδοση ЛНЧ (βουλγαρικός αριθμός φορολογικής ταυτότητας): +100–200€</li>
            <li>Εγγραφή VIES: χρεώνεται ξεχωριστά σε πολλούς</li>
            <li>Εγγραφή διαχειριστή στο ΝΑΠ (κοινωνικές ασφαλίσεις): ξεχωριστά</li>
            <li>Διερμηνέας για συμβολαιογράφο: συχνά δεν αναφέρεται</li>
          </ul>
          <p>
            Στο TaxBG.eu η τιμή είναι 750€ εφάπαξ και δεν υπάρχει τίποτα άλλο να
            πληρώσετε για να ξεκινήσετε να τιμολογείτε.
          </p>
        </section>

        <section className="seo-section">
          <h2>Τι περιλαμβάνεται στα 750€</h2>
          <ul className="seo-list seo-list--check">
            {REGISTRATION_INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="seo-section">
          <h2>Fast-track: VIES από τη 2η εργάσιμη</h2>
          <p>
            Αν έχετε ήδη B2B αγοραστή που απαιτεί VIES-εγγεγραμμένη εταιρεία, η
            κανονική διαδικασία (10–14 εργάσιμες) δεν είναι επαρκής. Με το fast-track
            (950€) η εταιρεία είναι ενεργή στο VIES από τη 2η εργάσιμη ημέρα.
          </p>
        </section>

        <section className="seo-section">
          <h2>Η διαδικασία βήμα-βήμα</h2>
          <p className="seo-placeholder">
            [— Εδώ θα μπει η λεπτομερής διαδικασία: τι χρειάζεστε από εσάς,
            τι κάνουμε εμείς, τι παίρνετε στο τέλος. Το γράφει ο Panagiotis. —]
          </p>
        </section>

        <section className="seo-section">
          <h2>Διαφορά EOOD vs OOD</h2>
          <p className="seo-placeholder">
            [— EOOD = μονοπρόσωπη ΕΠΕ (1 μέτοχος), OOD = ΕΠΕ με περισσότερους
            μετόχους. Η τιμή ίδρυσης είναι ίδια. —]
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Δείτε την τιμή για τη δική σας περίπτωση</h3>
          <p>Κανονική ίδρυση ή fast-track — επιλέξτε και δείτε τι περιλαμβάνεται.</p>
          <div className="seo-cta-actions">
            <Link href={pathFor(routes.pricing)} className="btn-primary">
              Δείτε τιμές & επιλογές →
            </Link>
            <Link href={pathFor(routes.costAccounting)} className="btn-ghost-dark">
              Κόστος λογιστικής υποστήριξης
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
