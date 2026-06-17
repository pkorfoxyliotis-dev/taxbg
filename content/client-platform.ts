import type { Locale } from "./routes"

/**
 * TaxBG client cloud platform — powered internally, never branded as nulla.bg on site.
 */
export const clientPlatform = {
  badgeEl: "Πρωτοπορία στη Βουλγαρία",
  badgeEn: "First in Bulgaria",
  titleEl: "Η ψηφιακή σας επιχείρηση, 24/7",
  titleEn: "Your business online, 24/7",
  leadEl:
    "Κάθε πελάτης λογιστικής αποκτά δωρεάν πρόσβαση στην cloud πύλη TaxBG: παρακολούθηση εταιρείας, υποχρεώσεων, τραπεζικού λογαριασμού και παραστατικών — από οπουδήποτε.",
  leadEn:
    "Every accounting client gets free access to the TaxBG cloud portal: monitor your company, obligations, bank activity and documents — from anywhere.",
  pioneerEl:
    "Είμαστε οι πρώτοι στη Βουλγαρία που συνδυάζουμε λογιστική υποστήριξη με έξυπνη cloud πλατφόρμα και AI agents για παραστατικά και τραπεζικές κινήσεις.",
  pioneerEn:
    "We are the first in Bulgaria to combine accounting support with a smart cloud platform and AI agents for invoices and bank statements.",
} as const

export type PlatformFeature = {
  id: string
  icon: string
  titleEl: string
  titleEn: string
  textEl: string
  textEn: string
}

export const platformFeatures: PlatformFeature[] = [
  {
    id: "dashboard",
    icon: "📊",
    titleEl: "Πίνακας ελέγχου επιχείρησης",
    titleEn: "Business dashboard",
    textEl:
      "Βλέπετε σε πραγματικό χρόνο την κατάσταση της εταιρείας σας, τι οφείλετε και την πρόοδο των υποχρεώσεων προς τη ΝΑΠ (φορολογικές αρχές).",
    textEn:
      "See your company status in real time, what you owe, and progress on NAP (National Revenue Agency) obligations.",
  },
  {
    id: "bank",
    icon: "🏦",
    titleEl: "Τραπεζικός λογαριασμός & διασταύρωση",
    titleEn: "Bank account cross-reference",
    textEl:
      "Συγκρίνετε αυτόματα τραπεζικές κινήσεις με τιμολόγια και έξοδα — ξέρετε ακριβώς τι ταιριάζει και τι λείπει.",
    textEn:
      "Automatically match bank transactions with invoices and expenses — know exactly what reconciles and what's missing.",
  },
  {
    id: "invoicing",
    icon: "🧾",
    titleEl: "Δωρεάν σύστημα τιμολόγησης",
    titleEn: "Free invoicing system",
    textEl:
      "Εκδίδετε και διαχειρίζεστε τιμολόγια μέσω της πλατφόρμας — χωρίς επιπλέον κόστος για συνδρομητές λογιστικής.",
    textEn:
      "Issue and manage invoices through the platform — at no extra cost for accounting subscribers.",
  },
  {
    id: "ai-photo",
    icon: "📱",
    titleEl: "AI: φωτογραφία από κινητό",
    titleEn: "AI: photo from your phone",
    textEl:
      "Φωτογραφίστε τιμολόγιο ή απόδειξη με το smartphone — ο AI agent της TaxBG το καταχωρεί και το επεξεργάζεται.",
    textEn:
      "Snap an invoice or receipt with your phone — the TaxBG AI agent records and processes it.",
  },
  {
    id: "ai-email",
    icon: "✉️",
    titleEl: "AI: αποστολή με email",
    titleEn: "AI: send by email",
    textEl:
      "Προωθήστε τιμολόγια ή τραπεζικά ενημερωτικά με email — ο agent τα δέχεται, τα διαβάζει και τα ενσωματώνει.",
    textEn:
      "Forward invoices or bank statements by email — our agent accepts, reads and integrates them.",
  },
  {
    id: "nap",
    icon: "✅",
    titleEl: "Πρόοδος υποχρεώσεων ΝΑΠ",
    titleEn: "NAP obligation tracking",
    textEl:
      "Παρακολουθείτε δηλώσεις, προθεσμίες και κατάσταση συμμόρφωσης με τις βουλγαρικές φορολογικές αρχές — 24 ώρες το 24ωρο.",
    textEn:
      "Track filings, deadlines and compliance with Bulgarian tax authorities — around the clock.",
  },
]

export function platformCopy(locale: Locale) {
  const isEn = locale === "en"
  return {
    badge: isEn ? clientPlatform.badgeEn : clientPlatform.badgeEl,
    title: isEn ? clientPlatform.titleEn : clientPlatform.titleEl,
    lead: isEn ? clientPlatform.leadEn : clientPlatform.leadEl,
    pioneer: isEn ? clientPlatform.pioneerEn : clientPlatform.pioneerEl,
  }
}

export function featureCopy(feature: PlatformFeature, locale: Locale) {
  const isEn = locale === "en"
  return {
    title: isEn ? feature.titleEn : feature.titleEl,
    text: isEn ? feature.textEn : feature.textEl,
  }
}
