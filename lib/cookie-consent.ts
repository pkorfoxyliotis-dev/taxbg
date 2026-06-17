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
