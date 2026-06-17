import { company } from "@/content/company"

/** Browser Maps Embed API — exposed via NEXT_PUBLIC_ */
export function publicMapsApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || ""
}

/** Server Places / Geocoding — never expose to client */
export function serverMapsApiKey(): string {
  return (
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    ""
  )
}

export function googlePlaceId(): string {
  return process.env.GOOGLE_PLACE_ID?.trim() || ""
}

export function hasPublicMapsKey(): boolean {
  return publicMapsApiKey().length > 0
}

export function formattedAddress(locale: "el" | "en" = "el"): string {
  const a = company.address
  if (locale === "en") {
    return `${a.streetEn}, ${a.postalCode} ${a.localityEn}, ${a.regionEn}, ${a.countryNameEn}`
  }
  return `${a.streetEl}, ${a.postalCode} ${a.localityEl}, ${a.regionEl}, ${a.countryNameEl}`
}

export function mapsSearchQuery(): string {
  const placeId = googlePlaceId()
  if (placeId) return `place_id:${placeId}`
  return `${company.brand}, ${formattedAddress("en")}`
}

/** Works without API key — contact page map (localhost + live). */
export function mapsEmbedUrl(locale: "el" | "en" = "el"): string {
  const { latitude, longitude } = company.geo
  const hl = locale === "en" ? "en" : "el"
  const label = encodeURIComponent(
    `${company.brand}, ${formattedAddress(locale)}`
  )
  return `https://maps.google.com/maps?q=${latitude},${longitude}(${label})&hl=${hl}&z=15&output=embed`
}

/** Optional when Maps Embed API + key are configured. */
export function mapsEmbedUrlWithApi(locale: "el" | "en" = "el"): string | null {
  const key = publicMapsApiKey()
  if (!key) return null
  const q = mapsSearchQuery()
  const hl = locale === "en" ? "en" : "el"
  return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${encodeURIComponent(q)}&zoom=15&language=${hl}`
}

export function mapsDirectionsUrl(): string {
  const placeId = googlePlaceId()
  if (placeId) {
    return `https://www.google.com/maps/dir/?api=1&destination_place_id=${encodeURIComponent(placeId)}`
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsSearchQuery())}`
}
