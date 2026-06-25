"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function AdminLogoutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function onClick() {
    setPending(true)
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <button type="button" className="btn-secondary" onClick={onClick} disabled={pending}>
      Αποσύνδεση
    </button>
  )
}
