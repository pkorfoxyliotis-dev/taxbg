"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { OpenAgentButton } from "@/components/open-agent-button"
import { SliderBrandMark } from "@/components/slider-brand-mark"
import { type Slide, slideText } from "@/content/sliders"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

type ImageSliderProps = {
  slides: Slide[]
  locale?: Locale
  variant?: "hero" | "section"
  autoPlayMs?: number
  className?: string
}

function SlideCta({
  locale,
  ctaType,
  label,
  href,
}: {
  locale: Locale
  ctaType: string
  label?: string
  href?: string
}) {
  if (ctaType === "guide") {
    return (
      <Link href={pathFor(routes.guide, locale)} className="btn-primary image-slider-cta">
        {label}
      </Link>
    )
  }
  if (ctaType === "link" && href) {
    return (
      <Link href={href} className="btn-primary image-slider-cta">
        {label}
      </Link>
    )
  }
  return (
    <OpenAgentButton locale={locale} className="image-slider-cta">
      {label}
    </OpenAgentButton>
  )
}

export function ImageSlider({
  slides,
  locale = "el",
  variant = "hero",
  autoPlayMs = 6000,
  className = "",
}: ImageSliderProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const isEn = locale === "en"

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count)
    },
    [count]
  )

  useEffect(() => {
    if (paused || count <= 1) return
    const id = window.setInterval(() => go(index + 1), autoPlayMs)
    return () => window.clearInterval(id)
  }, [index, paused, autoPlayMs, go, count])

  if (!count) return null

  const current = slides[index]!
  const text = slideText(current, locale)

  return (
    <section
      className={`image-slider image-slider--${variant} ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={isEn ? "Highlights" : "Κύρια μηνύματα"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="image-slider-viewport">
        {slides.map((slide, i) => {
          const t = slideText(slide, locale)
          const active = i === index
          return (
            <div
              key={slide.id}
              className={`image-slider-slide${active ? " is-active" : ""}`}
              aria-hidden={!active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} ${isEn ? "of" : "από"} ${count}`}
            >
              <Image
                src={slide.image}
                alt={t.alt}
                fill
                priority={i === 0}
                sizes={
                  variant === "hero"
                    ? "100vw"
                    : "(max-width: 1200px) 100vw, 1200px"
                }
                className="image-slider-img"
              />
              <div className="image-slider-overlay" aria-hidden />
              {variant === "hero" ? <SliderBrandMark locale={locale} /> : null}
              <div className="image-slider-caption">
                {t.trust ? (
                  <span className="image-slider-trust">{t.trust}</span>
                ) : null}
                <h2 className="image-slider-title">{t.title}</h2>
                <p className="image-slider-subtitle">{t.subtitle}</p>
                {t.cta ? (
                  <SlideCta
                    locale={locale}
                    ctaType={t.ctaType}
                    label={t.cta}
                    href={t.href}
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            className="image-slider-nav image-slider-nav--prev"
            onClick={() => go(index - 1)}
            aria-label={isEn ? "Previous slide" : "Προηγούμενη"}
          >
            ‹
          </button>
          <button
            type="button"
            className="image-slider-nav image-slider-nav--next"
            onClick={() => go(index + 1)}
            aria-label={isEn ? "Next slide" : "Επόμενη"}
          >
            ›
          </button>
          <div className="image-slider-dots" role="tablist">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`${isEn ? "Slide" : "Διαφάνεια"} ${i + 1}`}
                className={`image-slider-dot${i === index ? " is-active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
