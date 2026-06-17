"use client"



import { useCallback, useEffect, useMemo, useState } from "react"

import { company } from "@/content/company"

import type { Locale } from "@/content/routes"



type Review = {

  id: string

  author: string

  rating: number

  text: string

  relativeTime?: string

}



export type ReviewsPayload = {

  profileUrl: string

  aggregateRating: number | null

  reviewCount: number | null

  reviews: Review[]

}



const ROTATE_MS = 5500



function Stars({ rating }: { rating: number }) {

  return (

    <div className="reviews-carousel-stars" aria-label={`${rating} / 5`}>

      {"★".repeat(Math.min(5, Math.max(0, rating)))}

      {"☆".repeat(5 - Math.min(5, Math.max(0, rating)))}

    </div>

  )

}



export function GoogleReviewsCarousel({

  locale = "el",

  initial,

}: {

  locale?: Locale

  initial: ReviewsPayload

}) {

  const isEn = locale === "en"

  const [data, setData] = useState<ReviewsPayload>(initial)

  const [index, setIndex] = useState(0)

  const [paused, setPaused] = useState(false)



  useEffect(() => {

    if (initial.reviews.length > 0) return

    const run = () => {

      fetch("/api/reviews")

        .then((r) => r.json())

        .then((j) => setData(j as ReviewsPayload))

        .catch(() => null)

    }

    if ("requestIdleCallback" in window) {

      ;(window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(run)

    } else {

      setTimeout(run, 1200)

    }

  }, [initial.reviews.length])



  const profileUrl = data.profileUrl || company.googleBusinessUrl



  const reviews = useMemo(

    () => (data.reviews ?? []).filter((r) => r.text?.trim()),

    [data.reviews]

  )



  const count = reviews.length



  const go = useCallback(

    (next: number) => {

      setIndex(((next % count) + count) % count)

    },

    [count]

  )



  useEffect(() => {

    if (paused || count <= 1) return

    const id = window.setInterval(() => go(index + 1), ROTATE_MS)

    return () => window.clearInterval(id)

  }, [index, paused, go, count])



  useEffect(() => {

    if (index >= count) setIndex(0)

  }, [count, index])



  return (

    <section

      className="reviews-section"

      aria-roledescription="carousel"

      aria-label={isEn ? "Client reviews" : "Κριτικές πελατών"}

    >

      <div className="reviews-section-inner">

        <div className="reviews-section-head">

          <span className="reviews-google-badge" aria-hidden>

            G

          </span>

          <div>

            <h2>{isEn ? "Client reviews" : "Κριτικές πελατών"}</h2>

            {data.aggregateRating ? (

              <p className="reviews-aggregate-inline">

                <Stars rating={Math.round(data.aggregateRating)} />

                <strong>{data.aggregateRating.toFixed(1)}</strong>

                {data.reviewCount

                  ? ` · ${data.reviewCount} ${isEn ? "reviews" : "κριτικές"}`

                  : ""}

              </p>

            ) : (

              <p className="prose-muted" style={{ margin: 0, fontSize: "0.92rem" }}>

                Google Business Profile

              </p>

            )}

          </div>

        </div>



        {count > 0 ? (

          <div

            className="reviews-carousel"

            onMouseEnter={() => setPaused(true)}

            onMouseLeave={() => setPaused(false)}

            onFocusCapture={() => setPaused(true)}

            onBlurCapture={() => setPaused(false)}

          >

            <div className="reviews-carousel-glow" aria-hidden />

            <span className="reviews-quote-mark" aria-hidden>

              "

            </span>



            <div className="reviews-carousel-viewport">

              {reviews.map((review, i) => {

                const active = i === index

                return (

                  <div

                    key={review.id}

                    className={`reviews-carousel-slide${active ? " is-active" : ""}`}

                    aria-hidden={!active}

                    role="group"

                    aria-roledescription="slide"

                  >

                    <Stars rating={review.rating} />

                    <blockquote className="reviews-carousel-text">

                      {review.text}

                    </blockquote>

                    <footer className="reviews-carousel-author">

                      <strong>{review.author}</strong>

                      {review.relativeTime ? (

                        <span> · {review.relativeTime}</span>

                      ) : null}

                    </footer>

                  </div>

                )

              })}

            </div>



            {count > 1 ? (

              <div className="reviews-carousel-dots" role="tablist">

                {reviews.map((review, i) => (

                  <button

                    key={review.id}

                    type="button"

                    role="tab"

                    aria-selected={i === index}

                    aria-label={`${isEn ? "Review" : "Κριτική"} ${i + 1}`}

                    className={`reviews-carousel-dot${i === index ? " is-active" : ""}`}

                    onClick={() => setIndex(i)}

                  />

                ))}

              </div>

            ) : null}

          </div>

        ) : (

          <p className="reviews-carousel-empty prose-muted">

            {isEn

              ? "Client reviews will appear here once synced from Google."

              : "Οι κριτικές πελατών θα εμφανιστούν εδώ μετά τον συγχρονισμό από το Google."}

          </p>

        )}



        <div className="reviews-cta-row">

          <a

            href={profileUrl}

            target="_blank"

            rel="noopener noreferrer"

            className="btn-secondary"

          >

            {isEn ? "View all reviews on Google" : "Δείτε όλες τις κριτικές στο Google"}

          </a>

        </div>

      </div>

    </section>

  )

}


