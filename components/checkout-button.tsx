"use client"

import { useState } from "react"
import { pathFor, routes, type Locale } from "@/content/routes"

export function CheckoutButton({
  serviceId,
  tierId,
  locale = "el",
}: {
  serviceId: string
  tierId: string
  locale?: Locale
}) {
  const isEn = locale === "en"
  const [pending, setPending] = useState(false)

  async function onClick() {
    setPending(true)
    try {
      const res = await fetch("/api/payments/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, tierId }),
      })
      if (res.status === 401) {
        window.location.href = pathFor(routes.portal, locale)
        return
      }
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <button type="button" className="btn-ghost" onClick={onClick} disabled={pending}>
      {isEn ? "Pay / subscribe" : "Πληρωμή / συνδρομή"}
    </button>
  )
}
