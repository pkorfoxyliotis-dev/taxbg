import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/content/articles"
import { routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

const article = getArticleBySlug("tax-residency-change", "en")

export const metadata: Metadata = article
  ? buildPageMetadata({
      title: `${article.titleEn} — TaxBG`,
      description: article.descriptionEn,
      path: `/en/${routes.taxResidencyChange.en}`,
      alternatePath: `/${routes.taxResidencyChange.el}`,
    })
  : {}

export default function TaxResidencyChangePageEn() {
  if (!article) notFound()
  return (
    <section className="section">
      <div className="section-head">
        <h1>{article.titleEn}</h1>
        <p>{article.descriptionEn}</p>
      </div>
      {article.sections.map((s) => (
        <div key={s.titleEn} style={{ marginBottom: "1.5rem" }}>
          <h2>{s.titleEn}</h2>
          {s.bodyEn.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      ))}
    </section>
  )
}
