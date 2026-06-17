import { routes, type Locale } from "@/content/routes"

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en"
  return "el"
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/"
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/"
  return pathname
}

export function withLocale(path: string, locale: Locale): string {
  if (locale === "el") return path
  if (path === "/") return "/en"
  return `/en${path}`
}

export function switchLocalePath(pathname: string): string {
  const locale = getLocaleFromPathname(pathname)
  const stripped = stripLocalePrefix(pathname)
  return locale === "el" ? withLocale(stripped, "en") : stripped
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "el"
}
