import type { Locale } from "@/content/routes"

export function GoogleSigninButton({ locale = "el" }: { locale?: Locale }) {
  return (
    <a href="/api/auth/google/start" className="btn-secondary">
      {locale === "en" ? "Continue with Google" : "Συνέχεια με Google"}
    </a>
  )
}
