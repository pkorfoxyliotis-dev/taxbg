import { GA4_MEASUREMENT_ID } from "@/lib/ga4-measurement-id"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export const COOKIE_CONSENT_KEY = "taxbg_cookie_consent"

export type CookieConsent = "accepted" | "essential" | null

export function readCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return null
  const v = localStorage.getItem(COOKIE_CONSENT_KEY)
  if (v === "accepted" || v === "essential") return v
  return null
}

export function writeCookieConsent(value: "accepted" | "essential"): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value)
}

/** Consent Mode v2 + GA4 config — call after user choice or on load if already decided. */
export function applyAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return
  const gtag = window.gtag
  if (typeof gtag !== "function") return

  gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  })

  if (granted && GA4_MEASUREMENT_ID) {
    gtag("config", GA4_MEASUREMENT_ID)
  }
}
