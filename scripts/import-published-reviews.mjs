/**
 * Merge data/published-reviews.json into data/google-reviews-cache.json.
 * Paste Google Business reviews into published-reviews.json, then run:
 *   npm run reviews:import
 */
import fs from "fs"
import path from "path"

const root = process.cwd()
const publishedFile = path.join(root, "data", "published-reviews.json")
const cacheFile = path.join(root, "data", "google-reviews-cache.json")

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"))
}

const published = readJson(publishedFile)
const reviews = (published.reviews ?? [])
  .filter((r) => r.text?.trim() && r.rating >= 1)
  .map((r, i) => ({
    id: r.id || `published-${i + 1}`,
    author: r.author?.trim() || "Google user",
    rating: Math.min(5, Math.max(1, Math.round(r.rating ?? 5))),
    text: r.text.trim(),
    relativeTime: r.relativeTime?.trim() || undefined,
    source: "google_business",
  }))

const existing = fs.existsSync(cacheFile) ? readJson(cacheFile) : {}
const payload = {
  status: reviews.length ? "profile_linked" : existing.status ?? "profile_linked",
  syncedAt: existing.syncedAt ?? null,
  placeId: existing.placeId ?? null,
  profileUrl:
    existing.profileUrl ??
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ??
    "https://share.google/CTgF9iBOw1g9gUnbZ",
  aggregateRating: published.aggregateRating ?? existing.aggregateRating ?? null,
  reviewCount: published.reviewCount ?? existing.reviewCount ?? reviews.length,
  error: null,
  reviews,
}

fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
fs.writeFileSync(cacheFile, JSON.stringify(payload, null, 2), "utf-8")
console.log(`Imported ${reviews.length} review(s) → ${cacheFile}`)
