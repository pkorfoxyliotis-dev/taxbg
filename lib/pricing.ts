import {
  ADVANCE_PAYMENT_DISCOUNT,
  getServiceById,
  type ServiceTier,
} from "@/content/services"

export type PriceQuote = {
  tierId: string
  serviceId: string
  baseEur: number
  discountEur: number
  totalEur: number
  period: ServiceTier["period"]
  advanceDiscountApplied: boolean
  labelEl: string
  labelEn: string
}

export function formatEur(amount: number, locale: "el" | "en" = "el"): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "el-GR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function quoteTier(
  serviceId: string,
  tierId: string,
  options?: { applyAdvanceDiscount?: boolean }
): PriceQuote | null {
  const service = getServiceById(serviceId)
  const tier = service?.tiers.find((t) => t.id === tierId)
  if (!service || !tier) return null

  const applyAdvance =
    options?.applyAdvanceDiscount ??
    (tier.period === "year" || tier.id.includes("annual"))

  const base = tier.priceEur
  const discount = applyAdvance ? base * ADVANCE_PAYMENT_DISCOUNT : 0
  const total = Math.round((base - discount) * 100) / 100

  return {
    tierId: tier.id,
    serviceId: service.id,
    baseEur: base,
    discountEur: discount,
    totalEur: total,
    period: tier.period,
    advanceDiscountApplied: applyAdvance && discount > 0,
    labelEl: tier.nameEl,
    labelEn: tier.nameEn,
  }
}

/** Indicative range (±15%) — not a binding quote; agent confirms. */
export function quoteRange(
  serviceId: string,
  tierId: string,
  locale: "el" | "en" = "el"
): { low: string; high: string; mid: string } | null {
  const quote = quoteTier(serviceId, tierId)
  if (!quote) return null
  const low = Math.round(quote.totalEur * 0.85)
  const high = Math.round(quote.totalEur * 1.15)
  return {
    low: formatEur(low, locale),
    high: formatEur(high, locale),
    mid: formatEur(quote.totalEur, locale),
  }
}

export function allQuotes(): PriceQuote[] {
  const quotes: PriceQuote[] = []
  for (const service of ["formation", "accounting"] as const) {
    const s = getServiceById(service)
    if (!s) continue
    for (const tier of s.tiers) {
      const q = quoteTier(service, tier.id)
      if (q) quotes.push(q)
    }
  }
  return quotes
}
