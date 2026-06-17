import type { Locale } from "./routes"

export type SlideCta = "agent" | "guide" | "link"

export type Slide = {
  id: string
  image: string
  altEl: string
  altEn: string
  titleEl: string
  titleEn: string
  subtitleEl: string
  subtitleEn: string
  trustEl?: string
  trustEn?: string
  ctaEl?: string
  ctaEn?: string
  cta?: SlideCta
  href?: string
  hrefEn?: string
}

/** Self-hosted WebP — served from /public */
export const homeSlides: Slide[] = [
  {
    id: "platform",
    image: "/images/home/formation.webp",
    altEl: "TaxBG — αυτοματοποιημένη λογιστική πλατφόρμα στη Βουλγαρία",
    altEn: "TaxBG — automated accounting platform in Bulgaria",
    titleEl: "Ίδρυση & λογιστική στη Βουλγαρία — με AI agent 24/7",
    titleEn: "Formation & accounting in Bulgaria — with 24/7 AI agent",
    subtitleEl:
      "Ο agent σας κάνει qualification, δίνει εύρος τιμής και οδηγεί στο onboarding. Χωρίς φόρμες.",
    subtitleEn:
      "Your agent qualifies you, gives a price range, and guides onboarding. No forms.",
    trustEl: "Από το 2013 · 500+ εταιρείες",
    trustEn: "Since 2013 · 500+ companies",
    cta: "agent",
    ctaEl: "Μίλα με τον Agent",
    ctaEn: "Talk to the Agent",
  },
  {
    id: "accounting",
    image: "/images/home/accounting.webp",
    altEl: "Cloud πύλη λογιστικής TaxBG",
    altEn: "TaxBG cloud accounting portal",
    titleEl: "Fintech πύλη πίσω από κάθε συνεργασία",
    titleEn: "Fintech portal behind every engagement",
    subtitleEl: "Τιμολόγηση, τράπεζες, ΝΑΠ, AI παραστατικά — όλα από έναν agent.",
    subtitleEn: "Invoicing, banks, NAP, AI documents — all through one agent.",
    trustEl: "24/7 monitoring",
    trustEn: "24/7 monitoring",
    cta: "guide",
    ctaEl: "Εκτίμηση τιμής",
    ctaEn: "Get price range",
  },
  {
    id: "formation",
    image: "/images/home/consultation.webp",
    altEl: "Ίδρυση εταιρείας Βουλγαρία TaxBG",
    altEn: "Company formation Bulgaria TaxBG",
    titleEl: "Ίδρυση εταιρείας σε λίγες μέρες",
    titleEn: "Company formation in days",
    subtitleEl: "Μ.Ε.Π.Ε., Π.Ε.Π.Ε., Α.Ε. — ο agent συλλέγει τα στοιχεία, εμείς εκτελούμε.",
    subtitleEn: "EOOD, OOD, AD — the agent collects details, we execute.",
    trustEl: "Δωρεάν φορολογικός σχεδιασμός",
    trustEn: "Free tax planning included",
    cta: "agent",
    ctaEl: "Ξεκίνα συνεργασία",
    ctaEn: "Start partnership",
  },
  {
    id: "sofia",
    image: "/images/home/sofia.webp",
    altEl: "Επιχειρηματική παρουσία Βουλγαρία",
    altEn: "Business presence in Bulgaria",
    titleEl: "TaxBG — Automated Accounting Platform",
    titleEn: "TaxBG — Automated Accounting Platform",
    subtitleEl: "Predator in the market. Protector of your legacy.",
    subtitleEn: "Predator in the market. Protector of your legacy.",
    trustEl: "EL / EN · AI-first",
    trustEn: "EL / EN · AI-first",
    cta: "guide",
    ctaEl: "Δες εύρος τιμής",
    ctaEn: "See price range",
  },
]

export const servicesSlides: Slide[] = [
  {
    id: "svc-formation",
    image: "/images/services/formation.webp",
    altEl: "Υπηρεσία ίδρυσης εταιρείας στη Βουλγαρία",
    altEn: "Company formation service in Bulgaria",
    titleEl: "Ίδρυση Εταιρείας",
    titleEn: "Company Formation",
    subtitleEl: "Μ.Ε.Π.Ε., Π.Ε.Π.Ε., Α.Ε. — πλήρης διαδικασία",
    subtitleEn: "EOOD, OOD, AD — full process",
    cta: "agent",
    ctaEl: "Μίλα με τον Agent",
    ctaEn: "Talk to the Agent",
  },
  {
    id: "svc-accounting",
    image: "/images/services/accounting.webp",
    altEl: "Λογιστικές υπηρεσίες για εταιρείες στη Βουλγαρία",
    altEn: "Accounting services for Bulgarian companies",
    titleEl: "Λογιστική Υποστήριξη",
    titleEn: "Accounting Support",
    subtitleEl: "Πύλη πελάτη · τραπεζικός λογαριασμός · ΝΑΠ",
    subtitleEn: "Client portal · bank reconciliation · NAP tracking",
    cta: "guide",
    ctaEl: "Εκτίμηση τιμής",
    ctaEn: "Price range",
  },
  {
    id: "svc-support",
    image: "/images/services/support.webp",
    altEl: "Εξατομικευμένη επιχειρηματική υποστήριξη TaxBG",
    altEn: "Personalized business support TaxBG",
    titleEl: "Ο agent είναι το UI σας",
    titleEn: "The agent is your UI",
    subtitleEl: "24/7 qualification, τιμολόγηση και onboarding.",
    subtitleEn: "24/7 qualification, pricing, and onboarding.",
    cta: "agent",
    ctaEl: "Άνοιγμα συνομιλίας",
    ctaEn: "Open chat",
  },
]

export function slideText(slide: Slide, locale: Locale) {
  const isEn = locale === "en"
  return {
    alt: isEn ? slide.altEn : slide.altEl,
    title: isEn ? slide.titleEn : slide.titleEl,
    subtitle: isEn ? slide.subtitleEn : slide.subtitleEl,
    trust: isEn ? slide.trustEn : slide.trustEl,
    cta: isEn ? slide.ctaEn : slide.ctaEl,
    ctaType: slide.cta ?? (slide.href ? "link" : "agent"),
    href: isEn ? slide.hrefEn ?? slide.href : slide.href,
  }
}
