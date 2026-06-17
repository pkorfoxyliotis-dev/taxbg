"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, switchLocalePath } from "@/lib/locale"

export function LocaleSwitcher() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const target = switchLocalePath(pathname)

  return (
    <Link href={target} className="lang-switch" hrefLang={locale === "el" ? "en" : "el"}>
      {locale === "el" ? "EN" : "EL"}
    </Link>
  )
}
