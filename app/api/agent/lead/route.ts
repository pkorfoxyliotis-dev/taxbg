import { isValidAgentBearer } from "@/lib/agent-api-auth"
import {
  RECAPTCHA_CONTACT_ACTION,
  verifyRecaptchaEnterpriseToken,
} from "@/lib/recaptcha-enterprise"
import { submitLead } from "@/lib/submit-lead"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? ""
  let name = ""
  let email = ""
  let phone = ""
  let message = ""
  let consent = ""
  let recaptchaToken = ""
  let locale = ""

  if (contentType.includes("application/json")) {
    const body = (await req.json()) as Record<string, string>
    name = body.name?.trim() ?? ""
    email = body.email?.trim() ?? ""
    phone = body.phone?.trim() ?? ""
    message = body.message?.trim() ?? ""
    consent = body.consent?.trim() ?? ""
    recaptchaToken = body.recaptchaToken?.trim() ?? ""
    locale = body.locale?.trim() ?? ""
  } else {
    const form = await req.formData()
    name = String(form.get("name") ?? "").trim()
    email = String(form.get("email") ?? "").trim()
    phone = String(form.get("phone") ?? "").trim()
    message = String(form.get("message") ?? "").trim()
    consent = String(form.get("consent") ?? "").trim()
    recaptchaToken = String(form.get("recaptchaToken") ?? "").trim()
    locale = String(form.get("locale") ?? "").trim()
  }

  if (!isValidAgentBearer(req)) {
    const recaptcha = await verifyRecaptchaEnterpriseToken(
      recaptchaToken,
      RECAPTCHA_CONTACT_ACTION
    )
    if (!recaptcha.ok) {
      return NextResponse.json(
        { error: recaptcha.error ?? "recaptcha_failed" },
        { status: 403 }
      )
    }
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email, message required" }, { status: 400 })
  }

  if (consent !== "1") {
    return NextResponse.json({ error: "consent_required" }, { status: 400 })
  }

  try {
    await submitLead({
      name,
      email,
      phone,
      message,
      locale: locale || undefined,
      source: "contact-form",
    })
  } catch {
    return NextResponse.json({ error: "lead_delivery_failed" }, { status: 502 })
  }

  if (contentType.includes("application/json")) {
    return NextResponse.json({ ok: true })
  }

  return NextResponse.redirect(new URL("/επικοινωνία?sent=1", req.url), 303)
}
