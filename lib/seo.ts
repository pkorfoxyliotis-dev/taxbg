import type { Metadata } from "next"
import { company } from "@/content/company"
import type { Locale } from "@/content/routes"
import { googleReviewsSummary } from "@/lib/google-reviews"
const SITE_NAME = "TaxBG"
const DEFAULT_DESCRIPTION_EL =
  "Ίδρυση εταιρείας στη Βουλγαρία και λογιστική υποστήριξη. Επαγγελματική εξυπηρέτηση στα Ελληνικά & Αγγλικά."
const DEFAULT_DESCRIPTION_EN =
  "Company formation in Bulgaria and accounting services. Professional support in Greek & English."

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || company.siteUrl).replace(/\/$/, "")
}

export function absoluteUrl(path: string): string {
  const base = siteUrl()
  if (!path || path === "/") return `${base}/`
  return `${base}${path.startsWith("/") ? path : `/${path}`}`
}

export function pageTitle(title: string, withBrand = true): string {
  const t = title.trim()
  if (!withBrand) return t
  if (t.includes(SITE_NAME)) return t
  return `${t} — ${SITE_NAME}`
}

export function metaDescription(
  primary: string | null | undefined,
  locale: Locale = "el"
): string {
  const fallback =
    locale === "en" ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_EL
  const raw = (primary ?? fallback).trim()
  if (raw.length <= 160) return raw
  const cut = raw.slice(0, 157)
  const lastSpace = cut.lastIndexOf(" ")
  return `${(lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trim()}…`
}

type BuildMetadataInput = {
  title: string
  description?: string | null
  path: string
  locale?: Locale
  alternatePath?: string
  noIndex?: boolean
}

export function buildPageMetadata(input: BuildMetadataInput): Metadata {
  const locale = input.locale ?? "el"
  const description = metaDescription(input.description, locale)
  const url = absoluteUrl(input.path)
  const languages: Record<string, string> = {
    el: absoluteUrl(input.locale === "en" && input.alternatePath ? input.alternatePath : input.path),
    en: absoluteUrl(
      input.locale === "en"
        ? input.path
        : input.alternatePath ?? `/en${input.path === "/" ? "" : input.path}`
    ),
    "x-default": absoluteUrl(input.path.startsWith("/en") ? input.alternatePath ?? "/" : input.path),
  }

  return {
    title: pageTitle(input.title),
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "el_GR",
      url,
      siteName: SITE_NAME,
      title: input.title,
      description,
    },
    twitter: {
      card: "summary",
      title: input.title,
      description,
    },
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}

export function organizationJsonLd() {
  const reviews = googleReviewsSummary()
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: company.brand,
    legalName: company.legalName,
    logo: absoluteUrl("/brand/emblem-wolf.png"),
    image: absoluteUrl("/brand/emblem-512.png"),
    url: siteUrl(),
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.streetEn,
      addressLocality: company.address.localityEn,
      postalCode: company.address.postalCode,
      addressRegion: company.address.regionEn,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHours: company.openingHours,
    identifier: {
      "@type": "PropertyValue",
      name: "UIC",
      value: company.uic,
      url: company.registryUrl,
    },
    sameAs: [company.registryUrl, company.googleBusinessUrl],
    areaServed: ["BG", "GR"],
    knowsLanguage: ["el", "en", "bg"],
    description: DEFAULT_DESCRIPTION_EL,
    foundingDate: String(company.foundedYear),
  }
  if (reviews.aggregateRating && reviews.reviewCount) {
    json.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.aggregateRating,
      reviewCount: reviews.reviewCount,
      bestRating: 5,
    }
  }
  return json
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    inLanguage: ["el", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/οδηγός`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function serviceJsonLd(
  name: string,
  description: string,
  path: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: company.brand,
      url: siteUrl(),
    },
    areaServed: { "@type": "Country", name: "Bulgaria" },
    url: absoluteUrl(path),
  }
}
