"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { legalPath, routes } from "@/content/routes"
import { readCookieConsent, writeCookieConsent } from "@/lib/cookie-consent"
import { getLocaleFromPathname } from "@/lib/locale"
import { usePathname } from "next/navigation"

export function CookieBanner() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isEn = locale === "en"
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readCookieConsent()) setVisible(true)
  }, [])

  if (!visible) return null

  function accept(level: "accepted" | "essential") {
    writeCookieConsent(level)
    setVisible(false)
  }

  return (
    <div className="cookie-banner" role="dialog" aria-label={isEn ? "Cookies" : "Cookies"}>
      <div className="cookie-banner-inner">
        <p>
          {isEn ? (
            <>
              We use cookies for security and preferences. See our{" "}
              <Link href={legalPath(routes.legal.cookies, locale)}>cookie policy</Link>.
            </>
          ) : (
            <>
              Χρησιμοποιούμε cookies για ασφάλεια και προτιμήσεις. Δείτε την{" "}
              <Link href={legalPath(routes.legal.cookies, locale)}>
                πολιτική cookies
              </Link>
              .
            </>
          )}
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn-primary cookie-banner-btn"
            onClick={() => accept("accepted")}
          >
            {isEn ? "Accept" : "Αποδοχή"}
          </button>
          <button
            type="button"
            className="btn-secondary cookie-banner-btn"
            onClick={() => accept("essential")}
          >
            {isEn ? "Essential only" : "Μόνο απαραίτητα"}
          </button>
        </div>
      </div>
    </div>
  )
}
