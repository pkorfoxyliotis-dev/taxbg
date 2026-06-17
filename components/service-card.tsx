import Link from "next/link"
import type { Service } from "@/content/services"
import { servicePath } from "@/content/routes"
import type { Locale } from "@/content/routes"

export function ServiceCard({
  service,
  locale = "el",
}: {
  service: Service
  locale?: Locale
}) {
  const isEn = locale === "en"
  const href = servicePath(service.slug, locale)

  return (
    <article className={`service-card${service.featured ? " featured" : ""}`}>
      {service.featured && (
        <span className="service-badge">
          {isEn ? "Core service" : "Κύρια υπηρεσία"}
        </span>
      )}
      <h3>{isEn ? service.titleEn : service.titleEl}</h3>
      <p>{isEn ? service.shortEn : service.shortEl}</p>
      <Link href={href} className="btn-secondary" style={{ alignSelf: "flex-start" }}>
        {isEn ? "Learn more" : "Μάθετε περισσότερα"}
      </Link>
    </article>
  )
}
