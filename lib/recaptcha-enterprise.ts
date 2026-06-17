import {
  RECAPTCHA_CONTACT_ACTION,
  recaptchaSiteKey,
} from "@/lib/recaptcha-config"

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
const ASSESSMENTS_URL = "https://recaptchaenterprise.googleapis.com/v1"

export { RECAPTCHA_CONTACT_ACTION }
export const RECAPTCHA_SCORE_THRESHOLD = 0.5

export type RecaptchaVerification = {
  ok: boolean
  score: number | null
  error?: string
}

function readSecretKey(): string {
  return process.env.RECAPTCHA_SECRET_KEY?.trim() || ""
}

function readProjectId(): string {
  return process.env.RECAPTCHA_PROJECT_ID?.trim() || ""
}

/** GCP API key for CreateAssessment (optional; siteverify used when unset). */
function readEnterpriseApiKey(): string {
  return process.env.RECAPTCHA_API_KEY?.trim() || ""
}

type SiteVerifyResponse = {
  success?: boolean
  score?: number
  action?: string
  "error-codes"?: string[]
}

type AssessmentResponse = {
  tokenProperties?: { valid?: boolean; action?: string; invalidReason?: string }
  riskAnalysis?: { score?: number }
  error?: { message?: string }
}

async function verifyViaSiteVerify(
  token: string,
  expectedAction: string
): Promise<RecaptchaVerification> {
  const secret = readSecretKey()
  if (!secret) {
    return { ok: false, score: null, error: "recaptcha_not_configured" }
  }

  let res: Response
  try {
    res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    return { ok: false, score: null, error: "recaptcha_unreachable" }
  }

  if (!res.ok) {
    return { ok: false, score: null, error: "recaptcha_http_error" }
  }

  const data = (await res.json()) as SiteVerifyResponse
  if (!data.success) {
    return {
      ok: false,
      score: null,
      error: data["error-codes"]?.join(",") || "recaptcha_invalid",
    }
  }

  const score = typeof data.score === "number" ? data.score : null
  if (score === null) {
    return { ok: false, score: null, error: "recaptcha_no_score" }
  }

  if (data.action && data.action !== expectedAction) {
    return { ok: false, score, error: "recaptcha_action_mismatch" }
  }

  if (score < RECAPTCHA_SCORE_THRESHOLD) {
    return { ok: false, score, error: "recaptcha_low_score" }
  }

  return { ok: true, score }
}

async function verifyViaEnterpriseAssessment(
  token: string,
  expectedAction: string
): Promise<RecaptchaVerification> {
  const projectId = readProjectId()
  const apiKey = readEnterpriseApiKey()
  const siteKey = recaptchaSiteKey()

  if (!projectId || !apiKey || !siteKey) {
    return verifyViaSiteVerify(token, expectedAction)
  }

  const url = `${ASSESSMENTS_URL}/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`

  let res: Response
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: {
          token,
          siteKey,
          expectedAction,
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    })
  } catch {
    return { ok: false, score: null, error: "recaptcha_unreachable" }
  }

  if (!res.ok) {
    return { ok: false, score: null, error: "recaptcha_http_error" }
  }

  const data = (await res.json()) as AssessmentResponse
  if (data.error?.message) {
    return { ok: false, score: null, error: "recaptcha_api_error" }
  }

  if (!data.tokenProperties?.valid) {
    return {
      ok: false,
      score: null,
      error: data.tokenProperties?.invalidReason || "recaptcha_invalid",
    }
  }

  const score =
    typeof data.riskAnalysis?.score === "number"
      ? data.riskAnalysis.score
      : null

  if (score === null) {
    return { ok: false, score: null, error: "recaptcha_no_score" }
  }

  if (
    data.tokenProperties.action &&
    data.tokenProperties.action !== expectedAction
  ) {
    return { ok: false, score, error: "recaptcha_action_mismatch" }
  }

  if (score < RECAPTCHA_SCORE_THRESHOLD) {
    return { ok: false, score, error: "recaptcha_low_score" }
  }

  return { ok: true, score }
}

/** Fail-closed server-side reCAPTCHA Enterprise validation. */
export async function verifyRecaptchaEnterpriseToken(
  token: string | null | undefined,
  expectedAction: string = RECAPTCHA_CONTACT_ACTION
): Promise<RecaptchaVerification> {
  const trimmed = token?.trim()
  if (!trimmed) {
    return { ok: false, score: null, error: "recaptcha_missing_token" }
  }

  if (readProjectId() && readEnterpriseApiKey()) {
    return verifyViaEnterpriseAssessment(trimmed, expectedAction)
  }

  return verifyViaSiteVerify(trimmed, expectedAction)
}

export function isRecaptchaConfigured(): boolean {
  return Boolean(recaptchaSiteKey() && readSecretKey())
}
