import {
  RECAPTCHA_CONTACT_ACTION,
  recaptchaSiteKey,
} from "@/lib/recaptcha-config"

export async function executeRecaptchaContact(): Promise<string> {
  const siteKey = recaptchaSiteKey()
  if (!siteKey) {
    throw new Error("recaptcha_not_configured")
  }

  await new Promise<void>((resolve, reject) => {
    if (!window.grecaptcha?.enterprise) {
      reject(new Error("recaptcha_not_loaded"))
      return
    }
    window.grecaptcha.enterprise.ready(() => resolve())
  })

  return window.grecaptcha!.enterprise.execute(siteKey, {
    action: RECAPTCHA_CONTACT_ACTION,
  })
}
