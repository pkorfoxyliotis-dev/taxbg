import { routes, type Locale } from "@/content/routes"

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en"
  if (pathname === "/bg" || pathname.startsWith("/bg/")) return "bg"
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de"
  return "el"
}

export function stripLocalePrefix(pathname: string): string {
  for (const prefix of ["/en", "/bg", "/de"]) {
    if (pathname === prefix) return "/"
    if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length) || "/"
  }
  return pathname
}

export function htmlLang(locale: Locale): string {
  const map: Record<Locale, string> = { el: "el", en: "en", bg: "bg", de: "de" }
  return map[locale]
}

// Keep for backward compat (used in a few older spots)
export function withLocale(path: string, locale: Locale): string {
  if (locale === "el") return path
  if (path === "/") return `/${locale}`
  return `/${locale}${path}`
}

/**
 * Given the current pathname and a target locale, return the equivalent URL.
 * Matches the internal/stripped path against known routes to find the right
 * slug in the target locale. Falls back to the locale root if unknown.
 */
export function localizedPath(pathname: string, targetLocale: Locale): string {
  const current = getLocaleFromPathname(pathname)
  if (current === targetLocale) return pathname

  // Normalize: strip locale prefix AND decode Greek/Cyrillic percent-encoding
  const raw = stripLocalePrefix(pathname)
  let stripped: string
  try { stripped = decodeURIComponent(raw) } catch { stripped = raw }

  const prefix = targetLocale === "el" ? "" : `/${targetLocale}`

  type RouteEntry = { internal: string; route: { el: string; en: string; bg?: string; de?: string } }
  const map: RouteEntry[] = [
    { internal: "/pricing/formation", route: routes.costFormation },
    { internal: "/pricing/accounting", route: routes.costAccounting },
    { internal: "/pricing/closure",    route: routes.costClosure },
    { internal: "/pricing/inactive",   route: routes.costInactive },
    { internal: "/pricing",            route: routes.pricing },
    { internal: "/guide",              route: routes.guide },
    { internal: "/contact",            route: routes.contact },
    { internal: "/portal",             route: routes.portal },
    { internal: "/faq",                route: routes.faq },
    { internal: "/services/formation", route: routes.formation },
    { internal: "/services/accounting",route: routes.accounting },
    { internal: "/tax-residency-change",route: routes.taxResidencyChange },
  ]

  for (const { internal, route } of map) {
    const elSlug = `/${route.el}`
    if (stripped === internal || stripped === elSlug) {
      if (targetLocale === "el") return elSlug
      const slug = route[targetLocale] ?? route.en
      return `${prefix}/${slug}`
    }
  }

  return targetLocale === "el" ? "/" : `/${targetLocale}`
}

export const LOCALE_LABELS: Record<Locale, string> = {
  el: "ΕΛ",
  en: "EN",
  bg: "БГ",
  de: "DE",
}

export const LOCALE_NAMES: Record<Locale, string> = {
  el: "Ελληνικά",
  en: "English",
  bg: "Български",
  de: "Deutsch",
}
