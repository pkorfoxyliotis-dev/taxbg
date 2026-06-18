/** Public GA4 ID — set via NEXT_PUBLIC_GA4_MEASUREMENT_ID at build time. */
export const GA4_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim() || "G-D4TDJ73ZTS"
