import Script from "next/script"

import { GA4_MEASUREMENT_ID } from "@/lib/ga4-measurement-id"

/** GA4 + Consent Mode v2 — config runs after cookie banner consent. */
export function GoogleAnalytics() {
  if (!GA4_MEASUREMENT_ID) return null

  return (
    <>
      <Script id="ga4-consent-defaults" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        `}
      </Script>
    </>
  )
}
