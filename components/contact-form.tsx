"use client"

import { useActionState, useEffect, useRef, useState, useTransition } from "react"
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact"
import { ConsentCheckbox } from "@/components/consent-checkbox"
import { RecaptchaEnterpriseScript } from "@/components/recaptcha-enterprise-script"
import { executeRecaptchaContact } from "@/lib/recaptcha-enterprise-client"
import { recaptchaSiteKey } from "@/lib/recaptcha-config"
import type { Locale } from "@/content/routes"

const initialState: ContactFormState = { ok: false }

export function ContactForm({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const [consent, setConsent] = useState(false)
  const [state, dispatchAction] = useActionState(submitContactForm, initialState)
  const [clientError, setClientError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const siteKey = recaptchaSiteKey()

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
      setConsent(false)
    }
  }, [state.ok])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setClientError(null)

    if (!consent) return

    if (!siteKey) {
      setClientError(
        isEn
          ? "Security verification is not configured."
          : "Ο έλεγχος ασφαλείας δεν είναι ρυθμισμένος."
      )
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const token = await executeRecaptchaContact()
      formData.set("recaptchaToken", token)
      formData.set("locale", locale)
      startTransition(() => {
        dispatchAction(formData)
      })
    } catch {
      setClientError(
        isEn
          ? "Security check could not run. Please refresh and try again."
          : "Ο έλεγχος ασφαλείας απέτυχε. Ανανεώστε τη σελίδα και δοκιμάστε ξανά."
      )
    }
  }

  const errorMessage = clientError ?? (state.ok ? null : state.error)

  return (
    <div className="contact-form-panel">
      <div className="contact-form-panel-head">
        <p className="contact-card-eyebrow">
          {isEn ? "Write to us" : "Γράψτε μας"}
        </p>
        <h2 className="contact-form-panel-title">
          {isEn ? "Contact form" : "Φόρμα επικοινωνίας"}
        </h2>
      </div>
      <RecaptchaEnterpriseScript />
      <form
        ref={formRef}
        className="contact-form"
        onSubmit={onSubmit}
        noValidate
      >
        {state.ok ? (
          <p className="contact-form-alert contact-form-alert--success" role="status">
            {isEn
              ? "Thank you — we will contact you shortly."
              : "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα."}
          </p>
        ) : null}

        {errorMessage ? (
          <p className="contact-form-alert contact-form-alert--error" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <div>
          <label htmlFor="name">{isEn ? "Name *" : "Όνομα *"}</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone">{isEn ? "Phone" : "Τηλέφωνο"}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="message">{isEn ? "Message *" : "Μήνυμα *"}</label>
          <textarea id="message" name="message" required />
        </div>
        <ConsentCheckbox
          locale={locale}
          checked={consent}
          onChange={setConsent}
        />
        <button
          type="submit"
          className="btn-primary contact-form-submit"
          disabled={!consent || isPending}
        >
          {isPending
            ? isEn
              ? "Sending…"
              : "Αποστολή…"
            : isEn
              ? "Send"
              : "Αποστολή"}
        </button>
        <p className="contact-recaptcha-note">
          {isEn
            ? "Protected by Google reCAPTCHA — invisible check runs when you send (no checkbox)."
            : "Προστασία Google reCAPTCHA — αόρατος έλεγχος κατά την αποστολή (χωρίς checkbox)."}
        </p>
      </form>
    </div>
  )
}
