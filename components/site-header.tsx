import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { SiteHeaderMenu } from "@/components/site-header-menu"
import { brand } from "@/content/brand"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

export function SiteHeader({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const prefix = isEn ? "/en" : ""

  const navItems = [
    {
      href: `${prefix}/${isEn ? routes.services.en : routes.services.el}`,
      label: isEn ? "Services" : "Υπηρεσίες",
    },
    {
      href: `${prefix}/${isEn ? routes.pricing.en : routes.pricing.el}`,
      label: isEn ? "Pricing" : "Τιμές",
    },
    {
      href: `${prefix}/${isEn ? routes.guide.en : routes.guide.el}`,
      label: isEn ? "Price wizard" : "Εκτίμηση τιμής",
      featured: true,
    },
  ]

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={isEn ? "/en" : "/"} className="brand" aria-label={brand.name}>
          <BrandLogo variant="emblem" priority className="brand-logo-header" />
          <span className="brand-wordmark">
            <strong>{brand.name}</strong>
            <span>{isEn ? brand.taglineEn : brand.taglineEl}</span>
          </span>
        </Link>

        <SiteHeaderMenu locale={locale} navItems={navItems} />
      </div>
    </header>
  )
}
