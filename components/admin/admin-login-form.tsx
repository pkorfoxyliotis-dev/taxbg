"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        setError("Λάθος email ή κωδικός.")
        return
      }
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} style={{ maxWidth: "360px", margin: "3rem auto" }}>
      {error && (
        <p className="contact-form-alert contact-form-alert--error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="admin-email">Email</label>
      <input
        id="admin-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="admin-password">Κωδικός</label>
      <input
        id="admin-password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn-primary contact-form-submit" disabled={pending}>
        Σύνδεση
      </button>
    </form>
  )
}
