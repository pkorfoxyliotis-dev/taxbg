import {
  googleReviewsSummary,
  listPublicGoogleReviews,
} from "@/lib/google-reviews"
import { NextResponse } from "next/server"

export const revalidate = 86400

export async function GET() {
  const reviews = listPublicGoogleReviews()
  const summary = googleReviewsSummary()
  return NextResponse.json(
    {
      siteId: "taxbg",
      ...summary,
      reviews: reviews.slice(0, 12),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  )
}
