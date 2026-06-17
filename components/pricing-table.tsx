import Link from "next/link"
import { OpenAgentButton } from "@/components/open-agent-button"
import { services } from "@/content/services"
import { pathFor, routes } from "@/content/routes"
import { formatEur, quoteRange, quoteTier } from "@/lib/pricing"
import type { Locale } from "@/content/routes"

export function PricingTable({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"

  return (
    <>
      <p className="prose-muted pricing-intro">
        {isEn
          ? "Indicative tiers in EUR. The agent gives your exact range after a short qualification — no contact form."
          : "Ενδεικτικές βαθμίδες σε EUR. Ο agent δίνει το ακριβές εύρος μετά από σύντομο qualification — χωρίς φόρμα."}
      </p>
      <div className="pricing-grid">
        {services
          .filter((s) => s.tiers.length > 0)
          .flatMap((service) =>
            service.tiers.map((tier) => {
              const quote = quoteTier(service.id, tier.id)
              const range = quoteRange(service.id, tier.id, locale)
              if (!quote || !range) return null
              return (
                <div key={tier.id} className="pricing-card">
                  <p className="prose-muted" style={{ fontSize: "0.82rem", marginBottom: "0.25rem" }}>
                    {isEn ? service.titleEn : service.titleEl}
                  </p>
                  <h3>{isEn ? tier.nameEn : tier.nameEl}</h3>
                  <p className="pricing-amount pricing-amount--range">
                    {range.low} – {range.high}
                  </p>
                  <p className="pricing-period">
                    {isEn ? "indicative range" : "ενδεικτικό εύρος"} ·{" "}
                    {tier.period === "month"
                      ? isEn
                        ? "per month"
                        : "ανά μήνα"
                      : tier.period === "year"
                        ? isEn
                          ? "per year"
                          : "ανά έτος"
                        : isEn
                          ? "one-time"
                          : "εφάπαξ"}
                  </p>
                  <p className="prose-muted pricing-mid-ref">
                    {isEn ? "Mid estimate:" : "Κεντρική εκτίμηση:"}{" "}
                    <strong>{formatEur(quote.totalEur, locale)}</strong>
                  </p>
                  {quote.advanceDiscountApplied && (
                    <span className="pricing-discount">
                      -10% {isEn ? "advance payment" : "προπληρωμή"}
                    </span>
                  )}
                  <p className="prose-muted" style={{ marginTop: "0.75rem", fontSize: "0.88rem" }}>
                    {isEn ? tier.descriptionEn : tier.descriptionEl}
                  </p>
                  <div className="pricing-card-actions">
                    <OpenAgentButton locale={locale} variant="primary">
                      {isEn ? "Talk to the Agent" : "Μίλα με τον Agent"}
                    </OpenAgentButton>
                    <Link href={pathFor(routes.guide, locale)} className="btn-ghost">
                      {isEn ? "Price wizard" : "Εκτίμηση τιμής"}
                    </Link>
                  </div>
                </div>
              )
            })
          )}
      </div>
    </>
  )
}
