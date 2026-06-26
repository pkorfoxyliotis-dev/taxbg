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
  costFormation: {
    key: "kostos-idrusis",
    el: "κόστος-ίδρυσης-εταιρείας-βουλγαρία",
    en: "cost-company-formation-bulgaria",
    de: "kosten-firmengruendung-bulgarien",
  },
  costAccounting: {
    key: "kostos-logistikis",
    el: "κόστος-λογιστικής-βουλγαρία",
    en: "accounting-cost-bulgaria",
    de: "kosten-buchhaltung-bulgarien",
  },
  costClosure: {
    key: "kleisimo-etaireias",
    el: "κλείσιμο-εταιρείας-βουλγαρία",
    en: "company-closure-bulgaria",
    de: "firmenaufloesung-bulgarien",
  },
  costInactive: {
    key: "anergi-etaireia",
    el: "ανενεργή-εταιρεία-βουλγαρία",
    en: "inactive-company-bulgaria",
    de: "inaktive-firma-bulgarien",
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
  faq: {
    key: "faq",
    el: "συχνές-ερωτήσεις",
    en: "faq",
  },
  taxResidencyChange: {
    key: "taxResidencyChange",
    el: "αλλαγή-φορολογικής-κατοικίας",
    en: "tax-residency-change",
  },
  admin: {
    key: "admin",
    el: "διαχείριση",
    en: "admin",
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

/**
 * Greek is canonical at root. Every other locale lives under its own prefix
 * (/en, /bg, /de), mirroring how /en already works. bg/de slugs and page
 * content are not built yet — see migration/i18n-bg-de.md for the checklist.
 */
export type Locale = "el" | "en" | "bg" | "de"
const NON_DEFAULT_LOCALES = ["en", "bg", "de"] as const

type LocalizedSegment = { el: string; en: string; bg?: string; de?: string }

function slugFor(segment: LocalizedSegment, locale: Locale): string {
  if (locale === "el") return segment.el
  return segment[locale] ?? segment.en
}

export function pathFor(segment: LocalizedSegment, locale: Locale = "el"): string {
  if (locale === "el") return `/${segment.el}`
  return `/${locale}/${slugFor(segment, locale)}`
}

/** Legal pages — non-Greek locales use /{locale}/legal/{key} for stable routing */
export function legalPath(
  item: { key: string; el: string; en: string; bg?: string; de?: string },
  locale: Locale = "el"
): string {
  if (locale === "el") return `/${item.el}`
  return `/${locale}/legal/${item.key}`
}

export function servicePath(service: LocalizedSegment, locale: Locale = "el"): string {
  const base = pathFor(routes.services, locale)
  return `${base}/${slugFor(service, locale)}`
}

/** Articles live at the top level (not under /blog/) so old WP URLs keep working as-is. */
export function articlePath(article: LocalizedSegment, locale: Locale = "el"): string {
  if (locale === "el") return `/${article.el}`
  return `/${locale}/blog/${slugFor(article, locale)}`
}

export { NON_DEFAULT_LOCALES }

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
  [routes.faq.el]: "/faq",
  [routes.taxResidencyChange.el]: "/tax-residency-change",
  [routes.admin.el]: "/admin",
  [routes.costFormation.el]: "/pricing/formation",
  [routes.costAccounting.el]: "/pricing/accounting",
  [routes.costClosure.el]: "/pricing/closure",
  [routes.costInactive.el]: "/pricing/inactive",
  ["φορολογία-στη-βουλγαρία"]: "/blog/tax-in-bulgaria",
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
    pathFor(routes.faq),
    pathFor(routes.taxResidencyChange),
    pathFor(routes.costFormation),
    pathFor(routes.costAccounting),
    pathFor(routes.costClosure),
    pathFor(routes.costInactive),
    "/φορολογία-στη-βουλγαρία",
    pathFor(routes.legal.privacy),
    pathFor(routes.legal.terms),
    pathFor(routes.legal.termsOfUse),
    pathFor(routes.legal.cookies),
    pathFor(routes.legal.gdpr),
  ]
}
