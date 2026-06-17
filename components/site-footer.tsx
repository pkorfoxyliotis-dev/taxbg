import Link from "next/link"
import { BrandLogo } from "@/components/brand-logo"
import { OpenAgentButton } from "@/components/open-agent-button"
import { company } from "@/content/company"
import { legalNavItems, legalPath, pathFor, routes, servicePath } from "@/content/routes"
import { LegalEntityLink } from "@/components/legal-entity-link"
import type { Locale } from "@/content/routes"

export function SiteFooter({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link href={isEn ? "/en" : "/"} className="footer-brand-link">
            <BrandLogo variant="footer" />
          </Link>
          <p className="footer-tagline">
            {isEn
              ? "TaxBG — Automated Accounting Platform"
              : "TaxBG — Automated Accounting Platform"}
          </p>
          <p className="footer-lead">
            {isEn
              ? "Agent-first formation & accounting in Bulgaria since 2013."
              : "Agent-first ίδρυση & λογιστική στη Βουλγαρία από το 2013."}
          </p>
          <p className="footer-email">
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <div className="footer-agent-cta">
            <OpenAgentButton locale={locale} variant="secondary" />
          </div>
        </div>
        <div>
          <h4>{isEn ? "Services" : "Υπηρεσίες"}</h4>
          <Link href={servicePath(routes.formation, locale)}>
            {isEn ? "Company Formation" : "Ίδρυση Εταιρείας"}
          </Link>
          <Link href={servicePath(routes.accounting, locale)}>
            {isEn ? "Accounting" : "Λογιστική"}
          </Link>
          <Link href={servicePath(routes.webServices, locale)}>
            {isEn ? "Web Services" : "Web Υπηρεσίες"}
          </Link>
          <Link href={pathFor(routes.guide, locale)}>
            {isEn ? "Price wizard" : "Εκτίμηση τιμής"}
          </Link>
        </div>
        <div>
          <h4>{isEn ? "Legal" : "Νομικά"}</h4>
          {legalNavItems.map((item) => (
            <Link key={item.key} href={legalPath(item, locale)}>
              {isEn ? item.labelEn : item.labelEl}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} {company.brand} · <LegalEntityLink />.{" "}
        {isEn ? "All rights reserved." : "Με επιφύλαξη παντός δικαιώματος."}
      </div>
    </footer>
  )
}
