"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Locale } from "@/content/routes"

export function LoginForm({ locale = "el" }: { locale?: Locale }) {
  const router = useRouter()
  const isEn = locale === "en"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(
          data.error === "invalid_credentials"
            ? isEn
              ? "Wrong email or password."
              : "Λάθος email ή κωδικός."
            : isEn
              ? "Something went wrong."
              : "Κάτι πήγε στραβά."
        )
        return
      }
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {error && (
        <p className="contact-form-alert contact-form-alert--error" role="alert">
          {error}
        </p>
      )}
      <label htmlFor="login-email">Email</label>
      <input
        id="login-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="login-password">{isEn ? "Password" : "Κωδικός"}</label>
      <input
        id="login-password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn-primary contact-form-submit" disabled={pending}>
        {isEn ? "Log in" : "Σύνδεση"}
      </button>
    </form>
  )
}
