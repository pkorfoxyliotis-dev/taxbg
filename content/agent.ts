import type { Locale } from "./routes"

/** TaxBG storefront AI — persona Τζένη Καρύδη (Jenny Karidi) */
export const salesAgent = {
  personaNameEl: "Τζένη Καρύδη",
  personaNameEn: "Jenny Karidi",
  titleEl: "AI εκπρόσωπος",
  titleEn: "AI taxbg Assistant",
  welcomeEl:
    "Γεια σας! Είμαι η Τζένη Καρύδη, νέας γενιάς AI βοηθός της TaxBG. Ρωτήστε για ίδρυση εταιρείας, λογιστική, τιμές ή συνδρομές.",
  welcomeEn:
    "Hello! I'm Jenny Karidi, TaxBG's next-generation AI assistant. Ask about company formation, accounting, pricing, or subscriptions.",
  welcomeEmbedExtraEl:
    " Αν προτιμάτε άνθρωπο, πατήστε «Θέλω άνθρωπο» — θα καταγραφούν τα στοιχεία σας.",
  welcomeEmbedExtraEn:
    " Prefer a human? Tap «Talk to a human» — we'll capture your details.",
  disclosureEl: "Συνομιλείτε με AI εκπρόσωπο — όχι άνθρωπο.",
  disclosureEn: "You are chatting with an AI representative — not a human.",
  handoffEl: "Θέλω άνθρωπο",
  handoffEn: "Talk to a human",
  handoffPromptEl:
    "Θέλω να μιλήσω με άνθρωπο από την ομάδα TaxBG — παρακαλώ επικοινωνήστε μαζί μου.",
  handoffPromptEn:
    "I'd like to speak with someone from the TaxBG team — please contact me.",
  placeholderEl: "Γράψτε το μήνυμά σας…",
  placeholderEn: "Type your message…",
  sendEl: "Αποστολή",
  sendEn: "Send",
  closeEl: "Κλείσιμο",
  closeEn: "Close",
  openEl: "Άνοιγμα chat",
  openEn: "Open chat",
} as const

export function agentTitle(locale: Locale): string {
  return locale === "en" ? salesAgent.titleEn : salesAgent.titleEl
}

export function agentSubtitle(locale: Locale): string {
  const name =
    locale === "en" ? salesAgent.personaNameEn : salesAgent.personaNameEl
  const online = locale === "en" ? "online" : "online"
  return `${name} · ${online}`
}

export function agentWelcome(variant: "embed" | "fab", locale: Locale): string {
  const base =
    locale === "en" ? salesAgent.welcomeEn : salesAgent.welcomeEl
  if (variant === "embed") {
    const extra =
      locale === "en"
        ? salesAgent.welcomeEmbedExtraEn
        : salesAgent.welcomeEmbedExtraEl
    return base + extra
  }
  return base
}
