import Link from "next/link"
import {
  featureCopy,
  platformCopy,
  platformFeatures,
} from "@/content/client-platform"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

type Props = {
  locale?: Locale
  showCta?: boolean
  compact?: boolean
}

export function ClientPlatformShowcase({
  locale = "el",
  showCta = true,
  compact = false,
}: Props) {
  const copy = platformCopy(locale)
  const isEn = locale === "en"

  return (
    <section className={`platform-showcase${compact ? " platform-showcase--compact" : ""}`}>
      <div className="platform-showcase-inner">
        <div className="platform-showcase-head">
          <span className="platform-badge">{copy.badge}</span>
          <h2 className="platform-title">{copy.title}</h2>
          <p className="platform-lead">{copy.lead}</p>
          {!compact && (
            <p className="platform-pioneer">{copy.pioneer}</p>
          )}
        </div>

        <div className="platform-grid">
          {platformFeatures.map((f) => {
            const t = featureCopy(f, locale)
            return (
              <article key={f.id} className="platform-card">
                <span className="platform-card-icon" aria-hidden>
                  {f.icon}
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </article>
            )
          })}
        </div>

        {showCta ? (
          <div className="platform-cta-row">
            <Link href={pathFor(routes.portal, locale)} className="btn-primary">
              {isEn ? "Client portal" : "Πύλη πελάτη"}
            </Link>
            <Link
              href={
                locale === "en"
                  ? "/en/services/accounting-bulgaria"
                  : "/υπηρεσίες/λογιστική-βουλγαρία"
              }
              className="btn-secondary"
            >
              {isEn ? "Accounting plans" : "Πακέτα λογιστικής"}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}
