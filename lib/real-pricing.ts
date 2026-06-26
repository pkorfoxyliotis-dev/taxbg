import {
  PRICING,
  type AccountingVertical,
  type BillingCycle,
  type TradeComplexity,
} from "@/content/pricing-data"

/**
 * Calculation logic ported line-for-line from calculator.html's
 * AccountingTree component — same rounding behavior, same order of
 * operations (country-VAT surcharge is added AFTER the annual discount is
 * applied, so it's never itself discounted; bank/addon costs ARE part of
 * the discounted base). Don't "simplify" this without re-checking against
 * the original — the order of operations is what makes the numbers match.
 */

export function round5(n: number): number {
  return Math.round(n / 5) * 5
}

export function quoteRegistration(express: boolean): number {
  return express ? PRICING.registration.express : PRICING.registration.standard
}

export function quoteInactive(withVies: boolean): number {
  return withVies ? PRICING.inactive.withVies : PRICING.inactive.withoutVies
}

export function quoteClosure(): number {
  return PRICING.closure
}

export type AccountingQuoteInput = {
  vertical: AccountingVertical
  tierIdx: number
  complexity?: TradeComplexity
  extraCountries?: number
  extraBanks?: number
  addons?: { bgPhone?: boolean; simpleWebsite?: boolean; bgEmail?: boolean; aiAgent?: boolean }
  billing?: BillingCycle
}

export type AccountingQuote = {
  isCustom: boolean
  baseMonthly: number | null
  bankCost: number
  addonCost: number
  countryVatCost: number
  /** Final price to display, in EUR/month, given the requested billing cycle. */
  total: number | null
}

export function quoteAccounting(input: AccountingQuoteInput): AccountingQuote {
  const { vertical, tierIdx, complexity = "domestic" } = input
  const extraCountries = input.extraCountries ?? 0
  const extraBanks = input.extraBanks ?? 0
  const addons = input.addons ?? {}
  const billing = input.billing ?? "monthly"

  const hasComplexity = vertical === "eshop" || vertical === "wholesale"
  let baseMonthly: number | null = null
  let isCustom = false

  if (vertical === "services") {
    baseMonthly = PRICING.services.tiers[tierIdx]?.monthly ?? null
  } else if (hasComplexity) {
    const group = PRICING[vertical]
    const tier = group.tiers[tierIdx]
    if (tier?.custom) {
      isCustom = true
    } else if (tier) {
      const domesticAnnual = group.domesticAnnual[tierIdx]
      if (domesticAnnual != null) {
        const modifierAnnual = group.tradeModifierAnnual[complexity]
        const annualPrice = domesticAnnual + modifierAnnual
        baseMonthly = round5(annualPrice / 0.9)
      }
    }
  }

  const bankCost = extraBanks * PRICING.extraBankAccount
  const addonCost =
    (addons.bgPhone ? PRICING.addons.bgPhone.price : 0) +
    (addons.simpleWebsite ? PRICING.addons.simpleWebsite.price : 0) +
    (addons.bgEmail ? PRICING.addons.bgEmail.price : 0) +
    (addons.aiAgent ? PRICING.addons.aiAgent.price : 0)

  const monthlyTotal = baseMonthly !== null ? baseMonthly + bankCost + addonCost : null
  const countryVatCost = hasComplexity ? extraCountries * PRICING.extraCountryVat : 0
  const annualMonthlyEquivalent = monthlyTotal !== null ? round5(monthlyTotal * 0.9) : null

  const total =
    (billing === "annual" ? annualMonthlyEquivalent : monthlyTotal) !== null
      ? (billing === "annual" ? annualMonthlyEquivalent! : monthlyTotal!) + countryVatCost
      : null

  return { isCustom, baseMonthly, bankCost, addonCost, countryVatCost, total }
}
