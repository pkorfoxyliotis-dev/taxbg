/**
 * Ported verbatim from /opt/Taxbg/mockups/calculator.html's PRICING object —
 * the real source of truth from Desktop Claude's work with the business
 * owner, not invented numbers. If a price changes, change it here only,
 * the same rule that file states for itself.
 *
 * NOT YET WIRED into any UI — content/services.ts and content/guide-pricing.ts
 * still use a simpler, partially-invented flat-tier model for the live guide
 * wizard / pricing table / Stripe checkout. Reconciling those is separate,
 * larger work (the calculator/page rebuild), deliberately not done here.
 * This file exists so the *real* numbers and calculation logic are correct
 * and available before that rebuild happens.
 */

export type AccountingVertical = "services" | "eshop" | "wholesale"
export type TradeComplexity = "domestic" | "thirdCountry"
export type BillingCycle = "monthly" | "annual"

export type AccountingTier = {
  min: number
  max: number
  label: string
  monthly?: number
  custom?: boolean
}

export const PRICING = {
  registration: {
    standard: 750,
    express: 950,
  },
  services: {
    label: "Υπηρεσίες (IT, web dev, consulting, remote εργασία)",
    tiers: [
      { min: 1, max: 3, monthly: 110, label: "1–3 παραστατικά/μήνα" },
      { min: 4, max: 10, monthly: 165, label: "4–10 παραστατικά/μήνα" },
      { min: 11, max: 20, monthly: 200, label: "11–20 παραστατικά/μήνα" },
      { min: 21, max: 999999, monthly: 250, label: "21+ παραστατικά/μήνα" },
    ] as AccountingTier[],
  },
  eshop: {
    label: "E-shop / Λιανική",
    tiers: [
      { min: 1, max: 30, label: "1–30 παραστατικά/μήνα" },
      { min: 31, max: 80, label: "31–80 παραστατικά/μήνα" },
      { min: 81, max: 100, label: "81–100 παραστατικά/μήνα" },
      { min: 101, max: 200, label: "101–200 παραστατικά/μήνα" },
      { min: 201, max: 400, label: "201–400 παραστατικά/μήνα" },
      { min: 401, max: 999999, label: "400+ παραστατικά/μήνα", custom: true },
    ] as AccountingTier[],
    domesticAnnual: [220, 260, 300, 340, 380, null] as Array<number | null>,
    tradeModifierAnnual: {
      domestic: 0,
      thirdCountry: 200,
    },
  },
  wholesale: {
    label: "Χονδρική / Εισαγωγές-Εξαγωγές",
    tiers: [
      { min: 1, max: 5, label: "1–5 παραστατικά/μήνα" },
      { min: 6, max: 15, label: "6–15 παραστατικά/μήνα" },
      { min: 16, max: 30, label: "16–30 παραστατικά/μήνα" },
      { min: 31, max: 999999, label: "30+ παραστατικά/μήνα" },
    ] as AccountingTier[],
    domesticAnnual: [200, 300, 450, 600] as Array<number | null>,
    tradeModifierAnnual: {
      domestic: 0,
      thirdCountry: 200,
    },
  },
  extraCountryVat: 50,
  inactive: {
    withVies: 40,
    withoutVies: 25,
  },
  closure: 850,
  annualDiscountPct: 10,
  extraBankAccount: 20,
  addons: {
    bgPhone: { price: 20, label: "Βουλγαρικό τηλέφωνο" },
    simpleWebsite: { price: 20, label: "Απλό website παρουσίας" },
    bgEmail: { price: 5, label: "Email @domain.bg" },
    aiAgent: { price: 120, label: "Προσωπικός AI Υπάλληλος" },
  },
} as const

export const ACCOUNTING_FEATURES = [
  "Δωρεάν πρόγραμμα τιμολόγησης",
  "24/7 πλατφόρμα: τράπεζες, παραστατικά, υποχρεώσεις ΦΠΑ/ΝΑΠ σε πραγματικό χρόνο",
  "Ενημέρωση αν έχει υποβληθεί η μηνιαία δήλωσή σου",
  "TaxBG Agent — κοινός ψηφιακός λογιστικός βοηθός, μέσω login στην πλατφόρμα",
  "Υποστήριξη στα Ελληνικά & Αγγλικά",
  "Δωρεάν πλατφόρμα email/ticketing (χωρίς AI agent)",
]

export const REGISTRATION_INCLUDES = [
  "Σύνταξη & κατάθεση καταστατικού στο Εμπορικό Μητρώο",
  "Άνοιγμα τραπεζικού λογαριασμού κεφαλαίου — τραπεζικά έξοδα περιλαμβάνονται",
  "Έκδοση ЛНЧ (απαραίτητο για VAT/VIES/NRA)",
  "Εγγραφή ΦΠΑ & VIES",
  "Διερμηνέας για συμβολαιογράφο",
  "Ελληνική & Αγγλική υποστήριξη σε όλα τα βήματα",
  "Καμία κρυφή χρέωση — από το πρώτο βήμα μέχρι την εμφάνιση στο VIES",
]
