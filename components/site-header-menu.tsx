"use client"

import Link from "next/link"
import { useEffect, useId, useState } from "react"

import { OpenAgentButton } from "@/components/open-agent-button"
import { LocaleSwitcher } from "@/components/locale-switcher"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

type NavItem = { href: string; label: string; featured?: boolean }

export function SiteHeaderMenu({
  locale,
  navItems,
}: {
  locale: Locale
  navItems: NavItem[]
}) {
  const isEn = locale === "en"
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className="site-nav site-nav--desktop" aria-label={isEn ? "Main menu" : "Κύριο μενού"}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={item.featured ? "nav-featured" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <OpenAgentButton
          locale={locale}
          variant="primary"
          className="header-agent-cta header-agent-cta--desktop"
        />
        <LocaleSwitcher />
        <Link href={pathFor(routes.portal, locale)} className="btn-ghost header-portal-link">
          {isEn ? "Portal" : "Πύλη"}
        </Link>
        <button
          type="button"
          className="header-menu-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="header-menu-toggle-bars" aria-hidden />
          <span className="sr-only">{isEn ? "Menu" : "Μενού"}</span>
        </button>
      </div>

      <div
        className={`header-mobile-drawer${open ? " is-open" : ""}`}
        id={panelId}
        aria-hidden={!open}
      >
        <div className="header-mobile-backdrop" onClick={close} aria-hidden />
        <div className="header-mobile-panel" role="dialog" aria-modal="true">
          <div className="header-mobile-panel-head">
            <strong>{isEn ? "Menu" : "Μενού"}</strong>
            <button type="button" className="header-mobile-close" onClick={close} aria-label={isEn ? "Close" : "Κλείσιμο"}>
              ×
            </button>
          </div>
          <OpenAgentButton locale={locale} className="header-agent-cta--mobile" />
          <nav className="header-mobile-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.featured ? "nav-featured" : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
            <Link href={pathFor(routes.portal, locale)} onClick={close}>
              {isEn ? "Client portal" : "Πύλη πελάτη"}
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
