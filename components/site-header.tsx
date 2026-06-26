import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { SiteHeaderMenu } from "@/components/site-header-menu"
import { brand } from "@/content/brand"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

export function SiteHeader({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"

  const pricingDropdown = isEn
    ? [
        { href: pathFor(routes.costFormation, locale), label: "Company formation cost" },
        { href: pathFor(routes.costAccounting, locale), label: "Accounting services cost" },
        { href: pathFor(routes.costClosure, locale), label: "Company closure" },
        { href: pathFor(routes.costInactive, locale), label: "Inactive company" },
      ]
    : [
        { href: pathFor(routes.costFormation), label: "Κόστος ίδρυσης εταιρείας" },
        { href: pathFor(routes.costAccounting), label: "Κόστος λογιστικής υποστήριξης" },
        { href: pathFor(routes.costClosure), label: "Κλείσιμο εταιρείας" },
        { href: pathFor(routes.costInactive), label: "Ανενεργή εταιρεία" },
      ]

  const navItems = [
    {
      href: pathFor(routes.services, locale),
      label: isEn ? "Services" : "Υπηρεσίες",
    },
    {
      href: pathFor(routes.pricing, locale),
      label: isEn ? "Pricing" : "Τιμές",
      dropdown: pricingDropdown,
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
