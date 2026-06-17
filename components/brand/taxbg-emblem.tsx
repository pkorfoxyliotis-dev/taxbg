import Image from "next/image"

import { brand } from "@/content/brand"

/** TaxBG wolf + wings emblem (high-res raster, sharp at all sizes). */
export function TaxbgEmblem({
  className = "",
  size = 48,
  priority = false,
}: {
  className?: string
  size?: number
  priority?: boolean
}) {
  const px = Math.max(size, 96)
  return (
    <Image
      src={brand.emblem.srcPng}
      alt={brand.emblem.alt}
      width={px}
      height={px}
      priority={priority}
      className={className}
      sizes={`${size}px`}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  )
}
