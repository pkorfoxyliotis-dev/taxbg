import type { Metadata } from "next"
import { faqGroups } from "@/content/faq"
import { pathFor, routes } from "@/content/routes"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Συχνές ερωτήσεις — TaxBG",
  description:
    "Απαντήσεις σε συχνές ερωτήσεις για ίδρυση εταιρείας στη Βουλγαρία, φορολογία, ασφαλιστικά και την TaxBG.",
  path: pathFor(routes.faq),
  alternatePath: `/en/${routes.faq.en}`,
})

export default function FaqPage() {
  return (
    <section className="section">
      <div className="section-head">
        <h1>Συχνές ερωτήσεις</h1>
        <p>Ερωτήσεις από πελάτες μας για ίδρυση εταιρείας, φορολογία και λογιστική στη Βουλγαρία.</p>
      </div>
      {faqGroups.map((group) => (
        <div key={group.id} style={{ marginBottom: "2rem" }}>
          <h2>{group.titleEl}</h2>
          {group.items.map((item) => (
            <details key={item.id} style={{ marginBottom: "0.75rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 500 }}>
                {item.questionEl}
              </summary>
              <p style={{ marginTop: "0.5rem" }}>{item.answerEl}</p>
            </details>
          ))}
        </div>
      ))}
    </section>
  )
}
