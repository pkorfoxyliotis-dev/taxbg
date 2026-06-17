/**
 * Public URL paths — Greek primary, English under /en/.
 * Internal Next.js routes use ASCII folders; middleware rewrites Greek → internal.
 */
export const routes = {
  home: { el: "/", en: "/en" },
  services: {
    key: "services",
    el: "υπηρεσίες",
    en: "services",
  },
  formation: {
    key: "idrysi-etaireias-voulgaria",
    el: "ίδρυση-εταιρείας-βουλγαρία",
    en: "company-formation-bulgaria",
  },
  accounting: {
    key: "logistiki-voulgaria",
    el: "λογιστική-βουλγαρία",
    en: "accounting-bulgaria",
  },
  webServices: {
    key: "web-ypiresies",
    el: "web-υπηρεσίες",
    en: "web-services",
  },
  guide: {
    key: "odigos",
    el: "οδηγός",
    en: "guide",
  },
  pricing: {
    key: "times",
    el: "τιμές",
    en: "pricing",
  },
  contact: {
    key: "contact",
    el: "επικοινωνία",
    en: "contact",
  },
  portal: {
    key: "portal",
    el: "λογαριασμός",
    en: "account",
  },
  blog: {
    key: "blog",
    el: "άρθρα",
    en: "articles",
  },
  legal: {
    privacy: {
      key: "privacy",
      el: "πολιτική-απορρήτου",
      en: "privacy-policy",
    },
    terms: {
      key: "terms",
      el: "όροι-και-προϋποθέσεις",
      en: "terms-and-conditions",
    },
    termsOfUse: {
      key: "termsOfUse",
      el: "όροι-χρήσης",
      en: "terms-of-use",
    },
    cookies: {
      key: "cookies",
      el: "πολιτική-cookies",
      en: "cookie-policy",
    },
    gdpr: {
      key: "gdpr",
      el: "gdpr",
      en: "gdpr",
    },
  },
} as const

export type LegalRouteKey =
  (typeof routes.legal)[keyof typeof routes.legal]["key"]

export const legalNavItems = [
  { ...routes.legal.terms, labelEl: "Όροι & προϋποθέσεις", labelEn: "Terms & conditions" },
  { ...routes.legal.termsOfUse, labelEl: "Όροι χρήσης", labelEn: "Terms of use" },
  { ...routes.legal.privacy, labelEl: "Πολιτική απορρήτου", labelEn: "Privacy policy" },
  { ...routes.legal.cookies, labelEl: "Πολιτική cookies", labelEn: "Cookie policy" },
  { ...routes.legal.gdpr, labelEl: "GDPR", labelEn: "GDPR" },
] as const

export type Locale = "el" | "en"

export function pathFor(
  segment: { el: string; en: string },
  locale: Locale = "el"
): string {
  if (locale === "en") return `/en/${segment.en}`
  return `/${segment.el}`
}

/** Legal pages — English uses /en/legal/{key} for stable routing */
export function legalPath(
  item: { key: string; el: string; en: string },
  locale: Locale = "el"
): string {
  if (locale === "en") return `/en/legal/${item.key}`
  return `/${item.el}`
}

export function servicePath(
  service: { el: string; en: string },
  locale: Locale = "el"
): string {
  const base = pathFor(routes.services, locale)
  const slug = locale === "en" ? service.en : service.el
  return `${base}/${slug}`
}

/** Greek public segment → internal ASCII route */
export const greekToInternal: Record<string, string> = {
  [routes.services.el]: "/services",
  [routes.formation.el]: "/services/formation",
  [routes.accounting.el]: "/services/accounting",
  [routes.webServices.el]: "/services/web",
  [routes.guide.el]: "/guide",
  [routes.pricing.el]: "/pricing",
  [routes.contact.el]: "/contact",
  [routes.portal.el]: "/portal",
  [routes.blog.el]: "/blog",
  [routes.legal.privacy.el]: "/legal/privacy",
  [routes.legal.terms.el]: "/legal/terms",
  [routes.legal.termsOfUse.el]: "/legal/termsOfUse",
  [routes.legal.cookies.el]: "/legal/cookies",
  [routes.legal.gdpr.el]: "/legal/gdpr",
}

/** All canonical Greek paths for sitemap */
export function allGreekPaths(): string[] {
  return [
    "/",
    pathFor(routes.services),
    servicePath(routes.formation),
    servicePath(routes.accounting),
    servicePath(routes.webServices),
    pathFor(routes.guide),
    pathFor(routes.pricing),
    pathFor(routes.contact),
    pathFor(routes.portal),
    pathFor(routes.blog),
    pathFor(routes.legal.privacy),
    pathFor(routes.legal.terms),
    pathFor(routes.legal.termsOfUse),
    pathFor(routes.legal.cookies),
    pathFor(routes.legal.gdpr),
  ]
}
