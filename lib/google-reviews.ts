import fs from "fs"

import path from "path"

import { company } from "@/content/company"



export type GoogleReview = {

  id: string

  author: string

  rating: number

  text: string

  relativeTime?: string

  source: "google_business"

}



export type GoogleReviewsCache = {

  status: "not_configured" | "profile_linked" | "ok" | "error"

  syncedAt: string | null

  placeId: string | null

  profileUrl: string | null

  aggregateRating: number | null

  reviewCount: number | null

  error?: string | null

  reviews: GoogleReview[]

}



type PublishedReviewsFile = {

  aggregateRating?: number | null

  reviewCount?: number | null

  reviews?: Array<{

    id?: string

    author?: string

    rating?: number

    text?: string

    relativeTime?: string

  }>

}



const cacheFile = path.join(process.cwd(), "data", "google-reviews-cache.json")

const publishedFile = path.join(process.cwd(), "data", "published-reviews.json")



function readJson<T>(file: string): T | null {

  if (!fs.existsSync(file)) return null

  try {

    return JSON.parse(fs.readFileSync(file, "utf-8")) as T

  } catch {

    return null

  }

}



function normalizeReview(

  input: {

    id?: string

    author?: string

    rating?: number

    text?: string

    relativeTime?: string

  },

  fallbackId: string

): GoogleReview | null {

  const text = input.text?.trim() ?? ""

  if (text.length < 10) return null

  return {

    id: input.id?.trim() || fallbackId,

    author: input.author?.trim() || "Google user",

    rating: Math.min(5, Math.max(1, Math.round(input.rating ?? 5))),

    text,

    relativeTime: input.relativeTime?.trim() || undefined,

    source: "google_business",

  }

}



function loadPublishedReviews(): GoogleReview[] {

  const data = readJson<PublishedReviewsFile>(publishedFile)

  if (!data?.reviews?.length) return []

  return data.reviews

    .map((r, i) => normalizeReview(r, `published-${i + 1}`))

    .filter((r): r is GoogleReview => r !== null)

}



export function loadGoogleReviewsCache(): GoogleReviewsCache {

  const fallback: GoogleReviewsCache = {

    status: "profile_linked",

    syncedAt: null,

    placeId: null,

    profileUrl: company.googleBusinessUrl,

    aggregateRating: null,

    reviewCount: null,

    reviews: [],

  }

  const data = readJson<GoogleReviewsCache>(cacheFile)

  if (!data) return fallback

  return {

    ...fallback,

    ...data,

    profileUrl: data.profileUrl || company.googleBusinessUrl,

  }

}



function mergeReviews(cache: GoogleReviewsCache): GoogleReview[] {

  const published = loadPublishedReviews()

  const synced =

    cache.status === "ok" && cache.reviews.length

      ? cache.reviews.filter((r) => r.text?.trim() && r.rating >= 1)

      : []



  if (synced.length) return synced



  const cached =

    cache.status === "profile_linked" && cache.reviews.length

      ? cache.reviews.filter((r) => r.text?.trim() && r.rating >= 1)

      : []



  if (cached.length) return cached

  return published

}



export function listPublicGoogleReviews(): GoogleReview[] {

  return mergeReviews(loadGoogleReviewsCache())

}



export function googleReviewsSummary() {

  const cache = loadGoogleReviewsCache()

  const published = readJson<PublishedReviewsFile>(publishedFile)

  const reviews = mergeReviews(cache)



  const aggregateRating =

    cache.status === "ok" && cache.aggregateRating != null

      ? cache.aggregateRating

      : published?.aggregateRating ?? cache.aggregateRating



  const reviewCount =

    cache.status === "ok" && cache.reviewCount != null

      ? cache.reviewCount

      : published?.reviewCount ?? cache.reviewCount ?? reviews.length



  return {

    profileUrl: cache.profileUrl || company.googleBusinessUrl,

    aggregateRating,

    reviewCount,

    status: cache.status,

    syncedAt: cache.syncedAt,

  }

}



export function getPublicReviewsPayload() {

  const summary = googleReviewsSummary()

  return {

    ...summary,

    reviews: listPublicGoogleReviews().slice(0, 12),

  }

}


