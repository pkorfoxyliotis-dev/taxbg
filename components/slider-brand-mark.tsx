import Image from "next/image"
import Link from "next/link"

import { brand } from "@/content/brand"
import type { Locale } from "@/content/routes"

/** FB-banner style logo — top-left on hero slider photos. */
export function SliderBrandMark({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const home = isEn ? "/en" : "/"

  return (
    <Link href={home} className="slider-brand-mark" aria-label={brand.name}>
      <span className="slider-brand-mark-panel">
        <Image
          src="/brand/slider-brand-lockup.png"
          alt=""
          width={280}
          height={120}
          className="slider-brand-mark-wide"
          sizes="(max-width: 640px) 180px, 280px"
          priority
        />
        <span className="slider-brand-mark-fallback" aria-hidden>
          <Image
            src={brand.emblem.srcPng}
            alt=""
            width={56}
            height={56}
            className="slider-brand-mark-emblem"
            sizes="56px"
          />
          <span className="slider-brand-mark-text">
            <strong>TAXBG</strong>
            <span className="slider-brand-mark-rule" />
            <span className="slider-brand-mark-tag">
              Financial consulting &amp; accounting
            </span>
          </span>
        </span>
      </span>
    </Link>
  )
}
