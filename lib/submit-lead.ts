import { company } from "@/content/company"
import { agentApiKey, agentLeadUrl } from "@/lib/agent-env"

export type LeadPayload = {
  name: string
  email: string
  phone?: string
  message: string
  source?: string
  locale?: string
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: true }> {
  const name = payload.name.trim()
  const email = payload.email.trim()
  const phone = payload.phone?.trim() ?? ""
  const message = payload.message.trim()

  if (!name || !email || !message) {
    throw new Error("validation_required_fields")
  }

  const leadUrl = agentLeadUrl()
  if (!leadUrl) {
    return { ok: true }
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }
  const key = agentApiKey()
  if (key) headers.Authorization = `Bearer ${key}`

  try {
    await fetch(leadUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        siteId: "taxbg",
        name,
        email,
        phone,
        message,
        source: payload.source ?? "contact-form",
        locale: payload.locale,
        canonicalHost: company.siteUrl,
      }),
      signal: AbortSignal.timeout(15_000),
    })
  } catch (e) {
    console.error("Lead webhook failed", e)
    throw new Error("lead_delivery_failed")
  }

  return { ok: true }
}
