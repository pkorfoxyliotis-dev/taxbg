"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { getLocaleFromPathname, localizedPath, LOCALE_LABELS, LOCALE_NAMES } from "@/lib/locale"
import type { Locale } from "@/content/routes"

const ALL_LOCALES: Locale[] = ["el", "en", "bg", "de"]

export function LocaleSwitcher() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div className="locale-switcher" ref={ref}>
      <button
        className="locale-switcher-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-label="Αλλαγή γλώσσας"
      >
        {LOCALE_LABELS[locale]}
        <span className="locale-caret" aria-hidden>▾</span>
      </button>
      {open && (
        <div className="locale-switcher-panel" role="menu">
          {ALL_LOCALES.map((l) => {
            const href = localizedPath(pathname, l)
            const isCurrent = l === locale
            return (
              <Link
                key={l}
                href={href}
                role="menuitem"
                className={`locale-option${isCurrent ? " locale-option--active" : ""}`}
                onClick={() => setOpen(false)}
                hrefLang={l}
              >
                <span className="locale-option-code">{LOCALE_LABELS[l]}</span>
                <span className="locale-option-name">{LOCALE_NAMES[l]}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
