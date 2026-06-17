import Link from "next/link"
import { LegalEntityLink } from "@/components/legal-entity-link"
import { company } from "@/content/company"
import type { LegalPageDef } from "@/content/legal"
import { legalNavItems, legalPath, type Locale } from "@/content/routes"

function interpolate(text: string): string {
  return text
    .replace(/\{\{BRAND\}\}/g, company.brand)
    .replace(/\{\{EMAIL\}\}/g, company.email)
    .replace(/\{\{GDPR_EMAIL\}\}/g, company.gdprEmail)
    .replace(/\{\{SITE\}\}/g, company.siteUrl)
    .replace(/\{\{LEGAL_ENTITY\}\}/g, company.legalName)
}

function renderParagraph(text: string, locale: Locale) {
  const parts = interpolate(text).split(/(\{\{LEGAL_ENTITY_LINK\}\})/)
  return parts.map((part, i) => {
    if (part === "{{LEGAL_ENTITY_LINK}}") {
      return <LegalEntityLink key={i} />
    }
    if (part.includes(company.legalName) && text.includes("{{LEGAL_ENTITY}}")) {
      const bits = part.split(company.legalName)
      return (
        <span key={i}>
          {bits.map((b, j) => (
            <span key={j}>
              {b}
              {j < bits.length - 1 ? <LegalEntityLink showUic={false} /> : null}
            </span>
          ))}
        </span>
      )
    }
    return <span key={i}>{part}</span>
  })
}

type Props = {
  page: LegalPageDef
  locale?: Locale
}

export function LegalDocument({ page, locale = "el" }: Props) {
  const isEn = locale === "en"
  const title = isEn ? page.titleEn : page.titleEl
  const description = isEn ? page.descriptionEn : page.descriptionEl

  return (
    <div className="legal-layout">
      <aside className="legal-sidebar">
        <p className="legal-sidebar-label">
          {isEn ? "Legal information" : "Νομικές πληροφορίες"}
        </p>
        <nav aria-label={isEn ? "Legal pages" : "Νομικές σελίδες"}>
          {legalNavItems.map((item) => (
            <Link
              key={item.key}
              href={legalPath(item, locale)}
              className={
                item.key === page.key ? "legal-nav-link active" : "legal-nav-link"
              }
            >
              {isEn ? item.labelEn : item.labelEl}
            </Link>
          ))}
        </nav>
        <p className="legal-disclaimer">
          {isEn ? "Last updated" : "Τελευταία ενημέρωση"}: {company.legalUpdated}.
          <br />
          <LegalEntityLink />
        </p>
      </aside>
      <article className="legal-main">
        <header className="legal-header">
          <h1>{title}</h1>
          <p>{renderParagraph(description, locale)}</p>
        </header>
        {page.sections.map((section) => (
          <section key={section.id} id={section.id} className="legal-section">
            <h2>{isEn ? section.titleEn : section.titleEl}</h2>
            {(isEn ? section.bodyEn : section.bodyEl).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>
                {renderParagraph(
                  paragraph.replace(
                    /\{\{LEGAL_ENTITY\}\}/g,
                    `{{LEGAL_ENTITY_LINK}}`
                  ),
                  locale
                )}
              </p>
            ))}
          </section>
        ))}
      </article>
    </div>
  )
}
