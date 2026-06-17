import fs from "fs"
import path from "path"
import { company } from "@/content/company"
import type { GoogleReviewsCache } from "@/lib/google-reviews"
import { NextRequest, NextResponse } from "next/server"

const cacheFile = path.join(process.cwd(), "data", "google-reviews-cache.json")

/**
 * Sync Google Business reviews via Places API (server/cron only).
 * POST with Bearer AGENT_API_KEY or REVIEWS_SYNC_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret =
    process.env.REVIEWS_SYNC_SECRET?.trim() ||
    process.env.AGENT_API_KEY?.trim()
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  if (secret && auth !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const apiKey =
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_PLACES_API_KEY?.trim()
  const placeId = process.env.GOOGLE_PLACE_ID?.trim()

  if (!apiKey || !placeId) {
    return NextResponse.json(
      {
        error: "not_configured",
        hint: "Set GOOGLE_MAPS_API_KEY (or GOOGLE_PLACES_API_KEY) and GOOGLE_PLACE_ID in .env",
        profileUrl: company.googleBusinessUrl,
      },
      { status: 503 }
    )
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`
  const res = await fetch(url, { next: { revalidate: 0 } })
  const data = (await res.json()) as {
    result?: {
      rating?: number
      user_ratings_total?: number
      reviews?: Array<{
        author_name?: string
        rating?: number
        text?: string
        relative_time_description?: string
        time?: number
      }>
    }
    status?: string
  }

  if (data.status !== "OK" || !data.result) {
    return NextResponse.json(
      { error: "places_api_failed", status: data.status },
      { status: 502 }
    )
  }

  const cache: GoogleReviewsCache = {
    status: "ok",
    syncedAt: new Date().toISOString(),
    placeId,
    profileUrl: company.googleBusinessUrl,
    aggregateRating: data.result.rating ?? null,
    reviewCount: data.result.user_ratings_total ?? null,
    reviews: (data.result.reviews ?? []).map((r, i) => ({
      id: `g_${r.time ?? i}`,
      author: r.author_name ?? "Google user",
      rating: r.rating ?? 5,
      text: r.text ?? "",
      relativeTime: r.relative_time_description,
      source: "google_business" as const,
    })),
  }

  fs.mkdirSync(path.dirname(cacheFile), { recursive: true })
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf-8")

  return NextResponse.json({
    ok: true,
    reviewCount: cache.reviewCount,
    cached: cache.reviews.length,
  })
}
