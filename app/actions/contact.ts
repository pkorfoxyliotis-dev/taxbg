"use server"

import type { Locale } from "@/content/routes"
import {
  RECAPTCHA_CONTACT_ACTION,
  verifyRecaptchaEnterpriseToken,
} from "@/lib/recaptcha-enterprise"
import { submitLead } from "@/lib/submit-lead"

export type ContactFormState = {
  ok: boolean
  error?: string
}

function messageForError(code: string | undefined, locale: Locale): string {
  const isEn = locale === "en"
  switch (code) {
    case "consent_required":
      return isEn
        ? "Please accept the terms and privacy policy."
        : "Αποδεχτείτε τους όρους και την πολιτική απορρήτου."
    case "validation_required_fields":
      return isEn
        ? "Name, email and message are required."
        : "Όνομα, email και μήνυμα είναι υποχρεωτικά."
    case "lead_delivery_failed":
      return isEn
        ? "We could not send your message right now. Please try again or email us directly."
        : "Δεν ήταν δυνατή η αποστολή. Δοκιμάστε ξανά ή στείλτε email απευθείας."
    case "recaptcha_low_score":
      return isEn
        ? "Security check failed. Please try again."
        : "Ο έλεγχος ασφαλείας απέτυχε. Δοκιμάστε ξανά."
    default:
      return isEn
        ? "Submission blocked for security reasons. Please try again."
        : "Η αποστολή απορρίφθηκε για λόγους ασφαλείας. Δοκιμάστε ξανά."
  }
}

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const locale = (formData.get("locale") === "en" ? "en" : "el") as Locale
  const consent = String(formData.get("consent") ?? "").trim()

  if (consent !== "1") {
    return { ok: false, error: messageForError("consent_required", locale) }
  }

  const recaptcha = await verifyRecaptchaEnterpriseToken(
    String(formData.get("recaptchaToken") ?? ""),
    RECAPTCHA_CONTACT_ACTION
  )

  if (!recaptcha.ok) {
    return {
      ok: false,
      error: messageForError(recaptcha.error, locale),
    }
  }

  const name = String(formData.get("name") ?? "")
  const email = String(formData.get("email") ?? "")
  const phone = String(formData.get("phone") ?? "")
  const message = String(formData.get("message") ?? "")

  try {
    await submitLead({
      name,
      email,
      phone,
      message,
      locale,
      source: "contact-form",
    })
  } catch (e) {
    const code = e instanceof Error ? e.message : "lead_delivery_failed"
    return { ok: false, error: messageForError(code, locale) }
  }

  return { ok: true }
}
