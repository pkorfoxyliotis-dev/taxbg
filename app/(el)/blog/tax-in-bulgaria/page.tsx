import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/content/articles"
import { buildPageMetadata } from "@/lib/seo"

const article = getArticleBySlug("φορολογία-στη-βουλγαρία", "el")

export const metadata: Metadata = article
  ? buildPageMetadata({
      title: `${article.titleEl} — TaxBG`,
      description: article.descriptionEl,
      path: `/${article.slug.el}`,
      alternatePath: `/en/blog/${article.slug.en}`,
    })
  : {}

export default function TaxInBulgariaArticlePage() {
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
