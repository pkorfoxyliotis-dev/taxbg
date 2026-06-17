import type { MetadataRoute } from "next"
import { allGreekPaths, routes, pathFor } from "@/content/routes"
import { services } from "@/content/services"
import { siteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl()
  const now = new Date()

  const greek = allGreekPaths().map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
    alternates: {
      languages: {
        el: `${base}${path}`,
        en: `${base}/en${path === "/" ? "" : englishPath(path)}`,
      },
    },
  }))

  const enCore = [
    "/en",
    `/en/${routes.services.en}`,
    `/en/${routes.guide.en}`,
    `/en/${routes.pricing.en}`,
    `/en/${routes.contact.en}`,
    ...services.map((s) => `/en/services/${s.slug.en}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...greek, ...enCore]
}

function englishPath(greekPath: string): string {
  if (greekPath.startsWith(`/${routes.services.el}/`)) {
    const slug = greekPath.split("/").pop()!
    const svc = services.find((s) => s.slug.el === slug)
    return svc ? `/services/${svc.slug.en}` : greekPath
  }
  const map: Record<string, string> = {
    [pathFor(routes.services)]: `/${routes.services.en}`,
    [pathFor(routes.guide)]: `/${routes.guide.en}`,
    [pathFor(routes.pricing)]: `/${routes.pricing.en}`,
    [pathFor(routes.contact)]: `/${routes.contact.en}`,
  }
  return map[greekPath] ?? greekPath
}
