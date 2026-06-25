"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Locale } from "@/content/routes"

export function LogoutButton({ locale = "el" }: { locale?: Locale }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function onClick() {
    setPending(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <button type="button" className="btn-secondary" onClick={onClick} disabled={pending}>
      {locale === "en" ? "Log out" : "Αποσύνδεση"}
    </button>
  )
}
