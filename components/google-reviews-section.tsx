import { GoogleReviewsCarousel } from "@/components/google-reviews-carousel"

import { getPublicReviewsPayload } from "@/lib/google-reviews"

import type { Locale } from "@/content/routes"



export function GoogleReviewsSection({ locale = "el" }: { locale?: Locale }) {

  const initial = getPublicReviewsPayload()

  return <GoogleReviewsCarousel locale={locale} initial={initial} />

}


