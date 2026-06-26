import Link from "next/link"
import { LiveLedger } from "@/components/live-ledger"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

const COPY = {
  el: {
    eyebrow: "Ίδρυση & Λογιστική Εταιρειών στη Βουλγαρία",
    titleLine1: "Η γραφειοκρατία",
    titleLine2: "δεν χρειάζεται",
    titleEm: "να σε περιμένει.",
    sub: "Από την ίδρυση της εταιρείας σου στη Βουλγαρία μέχρι τη μηνιαία λογιστική — χωρίς ένα ακόμα γραφείο με φόρμες και αναμονή. Εκδίδεις τιμολόγια μέσα από το δωρεάν σύστημά μας και καταχωρούνται αυτόματα. Βλέπεις τα πάντα στη δική σου σελίδα, 24/7, στα Ελληνικά.",
    ctaPrimary: "Θέλω να ανοίξω εταιρεία",
    ctaSecondary: "Έχω ήδη εταιρεία",
    trust: [
      { num: "2015", label: "Δραστηριότητα στη Βουλγαρία" },
      { num: "4.9", out: "/5", label: "Google Reviews" },
    ],
  },
  en: {
    eyebrow: "Company Formation & Accounting in Bulgaria",
    titleLine1: "Bureaucracy",
    titleLine2: "doesn't have to",
    titleEm: "make you wait.",
    sub: "From forming your company in Bulgaria to monthly accounting — no more office full of forms and waiting. Issue invoices through our free system and they're recorded automatically. See everything on your own page, 24/7, in Greek or English.",
    ctaPrimary: "I want to form a company",
    ctaSecondary: "I already have a company",
    trust: [
      { num: "2015", label: "Operating in Bulgaria" },
      { num: "4.9", out: "/5", label: "Google Reviews" },
    ],
  },
} as const

export function HomeHero({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const t = isEn ? COPY.en : COPY.el

  return (
    <section className="home-hero">
      <div className="home-hero-inner">
        <p className="home-eyebrow">{t.eyebrow}</p>
        <h1 className="home-hero-title">
          {t.titleLine1}
          <br />
          {t.titleLine2}
          <br />
          <em>{t.titleEm}</em>
        </h1>
        <p className="home-hero-sub">{t.sub}</p>
        <div className="home-hero-ctas">
          <Link href={pathFor(routes.formation, locale)} className="btn-primary">
            {t.ctaPrimary} →
          </Link>
          <Link href={pathFor(routes.pricing, locale)} className="btn-ghost-dark">
            {t.ctaSecondary}
          </Link>
        </div>

        <LiveLedger locale={locale} />

        <div className="home-trust-strip">
          {t.trust.map((item) => (
            <div className="home-trust-item" key={item.label}>
              <span className="home-trust-num">
                {item.num}
                {"out" in item && item.out ? <span className="home-trust-out">{item.out}</span> : null}
              </span>
              <span className="home-trust-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
