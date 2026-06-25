import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/content/articles"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

const article = getArticleBySlug("αλλαγή-φορολογικής-κατοικίας", "el")

export const metadata: Metadata = article
  ? buildPageMetadata({
      title: `${article.titleEl} — TaxBG`,
      description: article.descriptionEl,
      path: pathFor(routes.taxResidencyChange),
      alternatePath: `/en/${routes.taxResidencyChange.en}`,
    })
  : {}

export default function TaxResidencyChangePage() {
  if (!article) notFound()
  return (
    <section className="section">
      <div className="section-head">
        <h1>{article.titleEl}</h1>
        <p>{article.descriptionEl}</p>
      </div>
      {article.sections.map((s) => (
        <div key={s.titleEl} style={{ marginBottom: "1.5rem" }}>
          <h2>{s.titleEl}</h2>
          {s.bodyEl.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      ))}
    </section>
  )
}
