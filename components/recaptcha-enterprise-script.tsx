"use client"

import Script from "next/script"
import { recaptchaSiteKey } from "@/lib/recaptcha-config"

export function RecaptchaEnterpriseScript() {
  const siteKey = recaptchaSiteKey()
  if (!siteKey) return null

  return (
    <Script
      id="recaptcha-enterprise"
      src={`https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`}
      strategy="afterInteractive"
    />
  )
}
