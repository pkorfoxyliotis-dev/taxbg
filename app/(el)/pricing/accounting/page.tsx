import type { Metadata } from "next"
import Link from "next/link"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"
import { ACCOUNTING_FEATURES } from "@/content/pricing-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Κόστος Λογιστικής Υποστήριξης στη Βουλγαρία 2026 — TaxBG.eu",
  description:
    "Τιμές λογιστικής υποστήριξης βουλγαρικής εταιρείας: από 110€/μήνα για υπηρεσίες, e-shop, χονδρική. Τι περιλαμβάνεται — συμπεριλαμβανομένου του ισολογισμού.",
  path: pathFor(routes.costAccounting),
})

export default function CostAccountingPage() {
  return (
    <article className="seo-page">
      <div className="seo-page-hero">
        <p className="home-eyebrow">Λογιστική Υποστήριξη στη Βουλγαρία</p>
        <h1>Κόστος Λογιστικής Υποστήριξης στη Βουλγαρία</h1>
        <p className="seo-page-lead">
          Μηνιαία λογιστική για βουλγαρική εταιρεία — τιμή ανάλογα με τη δραστηριότητά
          σας: υπηρεσίες, e-shop ή χονδρική. Τι περιλαμβάνεται, τι δεν χρεώνεται
          ξεχωριστά, και πώς λειτουργεί στην πράξη.
        </p>
      </div>

      <div className="seo-page-body">

        <section className="seo-section">
          <h2>Γιατί η λογιστική στη Βουλγαρία χρεώνεται ανά παραστατικά;</h2>
          <p>
            Η βουλγαρική λογιστική δεν έχει ενιαία "πακέτα" — ο λογιστής τιμολογεί
            ανάλογα με τον πραγματικό όγκο δουλειάς: πόσα τιμολόγια, παραστατικά
            εισόδου/εξόδου, τραπεζικές κινήσεις επεξεργάζεται κάθε μήνα.
          </p>
          <p>
            Αυτό σημαίνει ότι ένας freelancer με 3 τιμολόγια/μήνα πληρώνει 110€,
            ενώ ένα e-shop με 80 παραστατικά/μήνα πληρώνει αναλογικά — όχι το ίδιο
            "πακέτο" που δεν ταιριάζει σε κανέναν.
          </p>
        </section>

        <section className="seo-section">
          <h2>Τι περιλαμβάνεται σε κάθε τιμή</h2>
          <ul className="seo-list seo-list--check">
            {ACCOUNTING_FEATURES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>Ο ισολογισμός (ετήσιες οικονομικές καταστάσεις) περιλαμβάνεται</strong> —
            δεν χρεώνεται ξεχωριστά όπως σε πολλά άλλα γραφεία.
          </p>
        </section>

        <section className="seo-section">
          <h2>Υπηρεσίες (IT, consulting, remote εργασία)</h2>
          <p className="seo-placeholder">
            [— Εδώ: περιγραφή για freelancers, IT, remote εργαζόμενους — τι σημαίνει
            "παραστατικό" στην πράξη, πώς μετράνε. —]
          </p>
        </section>

        <section className="seo-section">
          <h2>E-shop από Βουλγαρία</h2>
          <p className="seo-placeholder">
            [— Εδώ: ειδικά για e-shop — εισαγωγές ΕΕ vs 3rd country, OSS/VAT ανά χώρα,
            πώς λειτουργεί η λογιστική σε cross-border λιανική. —]
          </p>
        </section>

        <section className="seo-section">
          <h2>Χονδρική / Εισαγωγές-Εξαγωγές</h2>
          <p className="seo-placeholder">
            [— Εδώ: B2B, τριγωνικές συναλλαγές, intrastat, εισαγωγές από τρίτες χώρες.
            Σημείωση: δεν κάνουμε τελωνειακή διαμεσολάβηση. —]
          </p>
        </section>

        <section className="seo-section">
          <h2>Ετήσια έκπτωση 10%</h2>
          <p>
            Αν επιλέξετε ετήσια προπληρωμή αντί για μηνιαία χρέωση, κερδίζετε 10% σε
            όλη τη βάση (εκτός από το Country VAT stepper που δεν εκπίπτει). Το ακριβές
            ποσό εμφανίζεται στον υπολογιστή τιμών αφού επιλέξετε τη δραστηριότητά σας.
          </p>
        </section>

        <div className="seo-cta-box">
          <h3>Υπολογίστε την τιμή για τη δική σας δραστηριότητα</h3>
          <p>3 βήματα — δραστηριότητα, όγκος παραστατικών, προέλευση εμπορευμάτων.</p>
          <div className="seo-cta-actions">
            <Link href={pathFor(routes.pricing)} className="btn-primary">
              Υπολογίστε τιμή →
            </Link>
            <Link href={pathFor(routes.costFormation)} className="btn-ghost-dark">
              Κόστος ίδρυσης εταιρείας
            </Link>
          </div>
        </div>

      </div>
    </article>
  )
}
