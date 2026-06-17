import { routes } from "./routes"

export type ServiceTier = {
  id: string
  nameEl: string
  nameEn: string
  priceEur: number
  period: "once" | "month" | "year"
  descriptionEl: string
  descriptionEn: string
}

export type Service = {
  id: string
  slug: { el: string; en: string }
  titleEl: string
  titleEn: string
  shortEl: string
  shortEn: string
  descriptionEl: string
  descriptionEn: string
  heroHighlightEl: string
  heroHighlightEn: string
  featuresEl: string[]
  featuresEn: string[]
  tiers: ServiceTier[]
  featured: boolean
  seoKeywordsEl: string[]
  seoKeywordsEn: string[]
}

/** 10% discount when paying annual subscription in advance */
export const ADVANCE_PAYMENT_DISCOUNT = 0.1

export const services: Service[] = [
  {
    id: "formation",
    slug: routes.formation,
    titleEl: "Ίδρυση Εταιρείας στη Βουλγαρία",
    titleEn: "Company Formation in Bulgaria",
    shortEl:
      "Ολοκληρωμένη υποστήριξη για ίδρυση εταιρείας στη Βουλγαρία — από την επιλογή τύπου εταιρείας μέχρι την έναρξη λειτουργίας.",
    shortEn:
      "End-to-end support for company formation in Bulgaria — from entity type selection to going live.",
    descriptionEl:
      "Η TaxBG σας καθοδηγεί σε κάθε βήμα της ίδρυσης εταιρείας στη Βουλγαρία. Προσφέρουμε δωρεάν φορολογικό σχεδιασμό, επαγγελματική επικοινωνία στα Ελληνικά και Αγγλικά, και πλήρη διαχείριση των γραφειοκρατικών διαδικασιών.",
    descriptionEn:
      "TaxBG guides you through every step of company formation in Bulgaria. We include free tax planning, professional communication in Greek and English, and full handling of bureaucratic procedures.",
    heroHighlightEl: "Δωρεάν φορολογικός σχεδιασμός με κάθε ίδρυση",
    heroHighlightEn: "Free tax planning with every formation",
    featuresEl: [
      "Επιλογή κατάλληλου τύπου εταιρείας (Μ.Ε.Π.Ε., Π.Ε.Π.Ε., Α.Ε.)",
      "Προετοιμασία και υποβολή εγγράφων",
      "Ανοιγμα τραπεζικού λογαριασμού",
      "Εγγραφή σε φορολογικές αρχές και VIES",
      "Δωρεάν φορολογικός σχεδιασμός",
      "Επικοινωνία στα Ελληνικά & Αγγλικά",
    ],
    featuresEn: [
      "Selection of the right entity type (EOOD, OOD, AD)",
      "Document preparation and filing",
      "Bank account opening",
      "Tax authority and VIES registration",
      "Free tax planning included",
      "Communication in Greek & English",
    ],
    tiers: [
      {
        id: "formation-standard",
        nameEl: "Πακέτο Ίδρυσης",
        nameEn: "Formation Package",
        priceEur: 890,
        period: "once",
        descriptionEl: "Πλήρης διαδικασία ίδρυσης + δωρεάν φορολογικός σχεδιασμός",
        descriptionEn: "Full formation process + free tax planning",
      },
      {
        id: "formation-express",
        nameEl: "Express Ίδρυση",
        nameEn: "Express Formation",
        priceEur: 1190,
        period: "once",
        descriptionEl: "Προτεραιότητα στην επεξεργασία — ιδανικό για επείγουσες ανάγκες",
        descriptionEn: "Priority processing — ideal for urgent needs",
      },
    ],
    featured: true,
    seoKeywordsEl: [
      "ίδρυση εταιρείας βουλγαρία",
      "εταιρεία βουλγαρία",
      "ΜΕΠΕ βουλγαρία",
      "φορολογία βουλγαρία",
    ],
    seoKeywordsEn: [
      "company formation bulgaria",
      "bulgaria company",
      "bulgaria tax",
    ],
  },
  {
    id: "accounting",
    slug: routes.accounting,
    titleEl: "Λογιστική Υποστήριξη Βουλγαρία",
    titleEn: "Accounting Services Bulgaria",
    shortEl:
      "Λογιστική + cloud πύλη TaxBG: παρακολούθηση 24/7, δωρεάν τιμολόγηση, AI για παραστατικά & τραπεζικές κινήσεις.",
    shortEn:
      "Accounting + TaxBG cloud portal: 24/7 monitoring, free invoicing, AI for invoices & bank statements.",
    descriptionEl:
      "Πέρα από την κλασική λογιστική, κάθε συνδρομητής αποκτά την cloud πύλη TaxBG: βλέπει την επιχείρησή του, τι οφείλει, τον τραπεζικό του λογαριασμό διασταυρωμένο με τιμολόγια και έξοδα, και την πρόοδο υποχρεώσεων προς τη ΝΑΠ. Οι AI agents δέχονται παραστατικά με φωτογραφία από κινητό ή email — οι πρώτοι στη Βουλγαρία με αυτή την ολοκληρωμένη λύση.",
    descriptionEn:
      "Beyond traditional accounting, every subscriber gets the TaxBG cloud portal: see your business, liabilities, bank account cross-referenced with invoices and expenses, and NAP obligation progress. AI agents accept documents via smartphone photo or email — the first integrated solution of its kind in Bulgaria.",
    heroHighlightEl: "Cloud πύλη + AI παραστατικά — δωρεάν για συνδρομητές",
    heroHighlightEn: "Cloud portal + AI documents — free for subscribers",
    featuresEl: [
      "Cloud πύλη πελάτη 24/7 — παρακολούθηση εταιρείας",
      "Δωρεάν σύστημα τιμολόγησης",
      "Διασταύρωση τραπεζικού λογαριασμού με παραστατικά",
      "AI agent: παραστατικά με φωτογραφία ή email",
      "Πρόοδος υποχρεώσεων προς τη ΝΑΠ (φορολογικές αρχές)",
      "Προέλεγχος παραστατικών & δηλώσεις από την TaxBG",
      "Έκπτωση 10% για ετήσια προπληρωμή",
    ],
    featuresEn: [
      "24/7 client cloud portal — monitor your company",
      "Free invoicing system included",
      "Bank account cross-referenced with invoices",
      "AI agent: documents via photo or email",
      "NAP tax obligation progress tracking",
      "Pre-submission review & filings by TaxBG",
      "10% discount for annual prepayment",
    ],
    tiers: [
      {
        id: "accounting-monthly",
        nameEl: "Μηνιαία Συνδρομή",
        nameEn: "Monthly Subscription",
        priceEur: 149,
        period: "month",
        descriptionEl: "Λογιστική υποστήριξη — χρέωση ανά μήνα",
        descriptionEn: "Accounting support — billed monthly",
      },
      {
        id: "accounting-annual",
        nameEl: "Ετήσια Συνδρομή (προπληρωμή -10%)",
        nameEn: "Annual Subscription (10% advance discount)",
        priceEur: 149 * 12 * (1 - 0.1),
        period: "year",
        descriptionEl: "Ετήσια προπληρωμή με έκπτωση 10%",
        descriptionEn: "Annual prepayment with 10% discount",
      },
    ],
    featured: true,
    seoKeywordsEl: [
      "λογιστική βουλγαρία",
      "λογιστικό γραφείο βουλγαρία",
      "φορολογικές δηλώσεις βουλγαρία",
      "πύλη πελάτη εταιρεία βουλγαρία",
      "τιμολόγηση βουλγαρία",
      "ΝΑΠ υποχρεώσεις",
    ],
    seoKeywordsEn: [
      "accounting bulgaria",
      "bulgaria accountant",
      "tax filing bulgaria",
      "bulgaria company dashboard",
      "NAP obligations",
    ],
  },
  {
    id: "web",
    slug: routes.webServices,
    titleEl: "Web & Agentic Υπηρεσίες",
    titleEn: "Web & Agentic Services",
    shortEl:
      "Σύντομη επισκόπηση — ιστοσελίδες, SEO και agentic λύσεις. Ξεχωριστός ιστότοπος για πλήρη κατάλογο.",
    shortEn:
      "Brief overview — websites, SEO and agentic solutions. Full catalog on a dedicated site.",
    descriptionEl:
      "Η TaxBG αναπτύσσει σύγχρονες ιστοσελίδες και agentic εφαρμογές. Για τον πλήρη κατάλογο web υπηρεσιών, επισκεφθείτε τον εξειδικευμένο ιστότοπό μας (σύντομα).",
    descriptionEn:
      "TaxBG builds modern websites and agentic applications. For the full web services catalog, visit our dedicated site (coming soon).",
    heroHighlightEl: "Agentic web — ξεχωριστός ιστότοπος σύντομα",
    heroHighlightEn: "Agentic web — dedicated site coming soon",
    featuresEl: [
      "Κατασκευή SEO ιστοσελίδων",
      "Agentic chat & αυτοματισμοί (n8n)",
      "Βελτιστοποίηση μηχανών αναζήτησης",
    ],
    featuresEn: [
      "SEO-optimized website development",
      "Agentic chat & automations (n8n)",
      "Search engine optimization",
    ],
    tiers: [],
    featured: false,
    seoKeywordsEl: ["web υπηρεσίες", "agentic", "seo"],
    seoKeywordsEn: ["web services", "agentic", "seo"],
  },
]

export function getServiceBySlug(
  slug: string,
  locale: "el" | "en" = "el"
): Service | undefined {
  return services.find((s) =>
    locale === "en" ? s.slug.en === slug : s.slug.el === slug
  )
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}
