export const RECAPTCHA_CONTACT_ACTION = "contact_submit"

export function recaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || ""
}
