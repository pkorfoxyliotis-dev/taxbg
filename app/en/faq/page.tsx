import type { Metadata } from "next"
import { faqGroups } from "@/content/faq"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ — TaxBG",
  description:
    "Answers to common questions about company formation in Bulgaria, tax, social security, and TaxBG.",
  path: `/en/${routes.faq.en}`,
  alternatePath: pathFor(routes.faq),
})

export default function FaqPageEn() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Frequently asked questions</h1>
        <p>Real client questions about company formation, tax, and accounting in Bulgaria.</p>
      </div>
      {faqGroups.map((group) => (
        <div key={group.id} style={{ marginBottom: "2rem" }}>
          <h2>{group.titleEn}</h2>
          {group.items.map((item) => (
            <details key={item.id} style={{ marginBottom: "0.75rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 500 }}>
                {item.questionEn}
              </summary>
              <p style={{ marginTop: "0.5rem" }}>{item.answerEn}</p>
            </details>
          ))}
        </div>
      ))}
    </section>
  )
}
