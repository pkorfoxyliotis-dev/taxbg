/** Indicative EUR ranges per wizard result — agent confirms final quote. */
export type GuidePriceProfile = {
  labelEl: string
  labelEn: string
  lowEur: number
  highEur: number
  period: "once" | "month" | "year"
  noteEl?: string
  noteEn?: string
  addonsEl?: string[]
  addonsEn?: string[]
}

export const guidePricing: Record<string, GuidePriceProfile> = {
  formation: {
    labelEl: "Ίδρυση εταιρείας (all‑inclusive)",
    labelEn: "Company formation (all-inclusive)",
    lowEur: 890,
    highEur: 1190,
    period: "once",
    noteEl:
      "Περιλαμβάνει VIES, VAT, τραπεζικό λογαριασμό, AMKA διαχειριστή, ασφαλιστικά ταμεία και πλήρη ενεργοποίηση για τιμολόγηση.",
    noteEn:
      "Includes VIES, VAT, bank account, manager AMKA, social insurance registration and full activation for invoicing.",
  },
  "accounting-services-1-3": {
    labelEl: "Υπηρεσίες · 1–3 τιμολόγια/μήνα",
    labelEn: "Services · 1–3 invoices/month",
    lowEur: 99,
    highEur: 139,
    period: "month",
    noteEl: "IT, σύμβουλοι, designers, coaches — απλές περιπτώσεις.",
    noteEn: "IT, consultants, designers, coaches — simplest tier.",
  },
  "accounting-services-3-20": {
    labelEl: "Υπηρεσίες · 3–20 τιμολόγια/μήνα",
    labelEn: "Services · 3–20 invoices/month",
    lowEur: 129,
    highEur: 179,
    period: "month",
  },
  "accounting-commercial-eu-le20": {
    labelEl: "Εμπόριο εντός ΕΕ · έως 20 τιμολόγια/μήνα",
    labelEn: "EU trade · up to 20 invoices/month",
    lowEur: 179,
    highEur: 249,
    period: "month",
  },
  "accounting-commercial-eu-le20-intrastat": {
    labelEl: "Εμπόριο ΕΕ · έως 20 τιμ. + Intrastat",
    labelEn: "EU trade · up to 20 inv. + Intrastat",
    lowEur: 229,
    highEur: 319,
    period: "month",
    addonsEl: ["Intrastat (μετακινήσεις / τρίγωνα EU)"],
    addonsEn: ["Intrastat (movements / EU triangle)"],
  },
  "accounting-commercial-eu-gt20": {
    labelEl: "Εμπόριο εντός ΕΕ · 20+ τιμολόγια/μήνα",
    labelEn: "EU trade · 20+ invoices/month",
    lowEur: 249,
    highEur: 349,
    period: "month",
  },
  "accounting-commercial-eu-gt20-intrastat": {
    labelEl: "Εμπόριο ΕΕ · 20+ τιμ. + Intrastat",
    labelEn: "EU trade · 20+ inv. + Intrastat",
    lowEur: 299,
    highEur: 419,
    period: "month",
    addonsEl: ["Intrastat"],
    addonsEn: ["Intrastat"],
  },
  "accounting-eshop-small": {
    labelEl: "E‑shop · 50–80 παραγγελίες/μήνα",
    labelEn: "E-shop · 50–80 orders/month",
    lowEur: 249,
    highEur: 349,
    period: "month",
  },
  "accounting-eshop-small-ppd": {
    labelEl: "E‑shop μικρό + PPD",
    labelEn: "Small e-shop + PPD",
    lowEur: 329,
    highEur: 449,
    period: "month",
    addonsEl: ["PPD (π.χ. Κίνα → ΗΠΑ via Amazon)"],
    addonsEn: ["PPD (e.g. China → US via Amazon)"],
  },
  "accounting-eshop-medium": {
    labelEl: "E‑shop · 80–200 παραγγελίες/μήνα",
    labelEn: "E-shop · 80–200 orders/month",
    lowEur: 349,
    highEur: 499,
    period: "month",
  },
  "accounting-eshop-medium-ppd": {
    labelEl: "E‑shop μεσαίο + PPD",
    labelEn: "Medium e-shop + PPD",
    lowEur: 429,
    highEur: 579,
    period: "month",
    addonsEl: ["PPD"],
    addonsEn: ["PPD"],
  },
  "accounting-eshop-large": {
    labelEl: "E‑shop · 200+ παραγγελίες/μήνα",
    labelEn: "E-shop · 200+ orders/month",
    lowEur: 499,
    highEur: 799,
    period: "month",
  },
  "accounting-eshop-large-ppd": {
    labelEl: "E‑shop μεγάλο + PPD",
    labelEn: "Large e-shop + PPD",
    lowEur: 579,
    highEur: 899,
    period: "month",
    addonsEl: ["PPD"],
    addonsEn: ["PPD"],
  },
  "accounting-import-export": {
    labelEl: "Εισαγωγές / εξαγωγές (εκτός ΕΕ)",
    labelEn: "Import / export (non-EU)",
    lowEur: 499,
    highEur: 899,
    period: "month",
    noteEl: "Τελωνεία, EORI, Amazon, Shopify, Etsy, dropshipping, customs.",
    noteEn: "Customs, EORI, Amazon, Shopify, Etsy, dropshipping, clearance.",
  },
  consult: {
    labelEl: "Συμβουλευτική — ο agent θα σας καθοδηγήσει",
    labelEn: "Consultation — the agent will guide you",
    lowEur: 0,
    highEur: 0,
    period: "month",
    noteEl: "Χωρίς δέσμευση — μιλήστε με τον agent για προσωποποιημένο εύρος.",
    noteEn: "No commitment — talk to the agent for a tailored range.",
  },
}

export function guidePriceRange(
  key: string,
  locale: "el" | "en",
  options?: { includesFormation?: boolean }
): {
  lines: { label: string; low: string; high: string; period: string; note?: string }[]
} {
  const isEn = locale === "en"
  const fmt = (n: number) =>
    new Intl.NumberFormat(isEn ? "en-GB" : "el-GR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(n)

  const periodLabel = (p: GuidePriceProfile["period"]) => {
    if (p === "once") return isEn ? "one-time" : "εφάπαξ"
    if (p === "year") return isEn ? "per year" : "ανά έτος"
    return isEn ? "per month" : "ανά μήνα"
  }

  const lines: { label: string; low: string; high: string; period: string; note?: string }[] = []

  if (options?.includesFormation && key !== "formation") {
    const f = guidePricing.formation!
    lines.push({
      label: isEn ? f.labelEn : f.labelEl,
      low: fmt(f.lowEur),
      high: fmt(f.highEur),
      period: periodLabel(f.period),
      note: isEn ? f.noteEn : f.noteEl,
    })
  }

  const profile = guidePricing[key]
  if (!profile) return { lines }

  const addons = (isEn ? profile.addonsEn : profile.addonsEl) ?? []
  const noteParts = [
    isEn ? profile.noteEn : profile.noteEl,
    ...addons.map((a) => `+ ${a}`),
  ].filter(Boolean)

  lines.push({
    label: isEn ? profile.labelEn : profile.labelEl,
    low: fmt(profile.lowEur),
    high: fmt(profile.highEur),
    period: periodLabel(profile.period),
    note: noteParts.length ? noteParts.join(" · ") : undefined,
  })

  return { lines }
}
