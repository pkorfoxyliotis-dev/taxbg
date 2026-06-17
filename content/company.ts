/** Public commercial + legal entity — registry link required wherever legal name appears. */
export const company = {
  /** Commercial / trading name */
  brand: "TaxBG",
  /** Legal entity (Bulgaria) */
  legalName: "Business solutions EOOD",
  legalNameShort: "Business solutions",
  uic: "204604014",
  registryUrl:
    "https://portal.registryagency.bg/CR/Reports/ActiveConditionTabResult?uic=204604014",
  googleBusinessUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ||
    "https://share.google/CTgF9iBOw1g9gUnbZ",
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@taxbg.eu",
  phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+359 ...",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://taxbg.eu",
  agentName: process.env.NEXT_PUBLIC_AGENT_NAME || "TaxBG Assistant",
  founders: ["Παναγιώτης Κορφοξυλιώτης", "Yanko Boev"],
  foundedYear: 2013,
  legalUpdated: "10 Ιουνίου 2026",
  gdprEmail: process.env.NEXT_PUBLIC_GDPR_EMAIL || "info@taxbg.eu",
  address: {
    streetEl: "ул. Xan Krym 19",
    streetEn: "19 Xan Krym St",
    localityEl: "Γκότσε Ντέλτσεβ",
    localityEn: "Gotse Delchev",
    postalCode: "2900",
    regionEl: "Μπλαγκόεβγκραντ",
    regionEn: "Blagoevgrad",
    country: "BG",
    countryNameEl: "Βουλγαρία",
    countryNameEn: "Bulgaria",
  },
  geo: {
    latitude: 41.570883676344486,
    longitude: 23.7320203719401,
  },
  openingHours: "Mo–Su 09:00–17:00",
} as const
