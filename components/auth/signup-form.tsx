"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import type { Locale } from "@/content/routes"
import { GREEK_ALIAS_REGEX } from "@/lib/alias"

export function SignupForm({ locale = "el" }: { locale?: Locale }) {
  const router = useRouter()
  const isEn = locale === "en"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alias, setAlias] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const aliasInvalid = alias.length > 0 && !GREEK_ALIAS_REGEX.test(alias)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, alias, locale }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const messages: Record<string, { el: string; en: string }> = {
          email_taken: { el: "Αυτό το email χρησιμοποιείται ήδη.", en: "That email is already in use." },
          alias_taken: { el: "Αυτό το όνομα χρήστη χρησιμοποιείται ήδη.", en: "That username is already taken." },
          alias_must_be_greek: {
            el: "Το όνομα χρήστη πρέπει να είναι μόνο ελληνικά γράμματα.",
            en: "The username must be Greek characters only.",
          },
          password_too_short: { el: "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.", en: "Password must be at least 8 characters." },
        }
        const known = messages[data.error]
        setError(known ? (isEn ? known.en : known.el) : isEn ? "Something went wrong." : "Κάτι πήγε στραβά.")
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
      <label htmlFor="signup-email">Email</label>
      <input
        id="signup-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="signup-alias">
        {isEn ? "Username (Greek characters only)" : "Όνομα χρήστη (μόνο ελληνικά γράμματα)"}
      </label>
      <input
        id="signup-alias"
        required
        autoComplete="username"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        aria-invalid={aliasInvalid}
      />
      {aliasInvalid && (
        <p className="contact-form-alert contact-form-alert--error" role="alert">
          {isEn ? "Greek letters, digits, underscore only." : "Μόνο ελληνικά γράμματα, αριθμοί, underscore."}
        </p>
      )}
      <label htmlFor="signup-password">{isEn ? "Password" : "Κωδικός"}</label>
      <input
        id="signup-password"
        type="password"
        required
        minLength={8}
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="btn-primary contact-form-submit"
        disabled={pending || aliasInvalid}
      >
        {isEn ? "Create account" : "Δημιουργία λογαριασμού"}
      </button>
    </form>
  )
}
