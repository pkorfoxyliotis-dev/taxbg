"use client"

import { useState } from "react"
import { ContactForm } from "@/components/contact-form"
import type { Locale } from "@/content/routes"

/** Legacy contact form — collapsed until user explicitly needs it. */
export function ContactFormFallback({ locale = "el" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false)
  const isEn = locale === "en"

  if (!open) {
    return (
      <div className="contact-fallback-toggle">
        <p className="prose-muted">
          {isEn
            ? "Prefer email instead of the agent? Use the fallback form."
            : "Προτιμάτε email αντί για agent; Χρησιμοποιήστε τη φόρμα fallback."}
        </p>
        <button type="button" className="btn-ghost" onClick={() => setOpen(true)}>
          {isEn ? "Show contact form" : "Εμφάνιση φόρμας επικοινωνίας"}
        </button>
      </div>
    )
  }

  return (
    <div className="contact-fallback-panel">
      <p className="contact-fallback-label">
        {isEn ? "Fallback — contact form" : "Fallback — φόρμα επικοινωνίας"}
      </p>
      <ContactForm locale={locale} />
    </div>
  )
}
