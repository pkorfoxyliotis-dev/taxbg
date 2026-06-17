"use client"

import type { ReactNode } from "react"

import { openAgentChat } from "@/lib/agent-events"
import type { Locale } from "@/content/routes"

type Props = {
  locale?: Locale
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  children?: ReactNode
}

export function OpenAgentButton({
  locale = "el",
  className = "",
  variant = "primary",
  children,
}: Props) {
  const isEn = locale === "en"
  const label = children ?? (isEn ? "Talk to the Agent" : "Μίλα με τον Agent")

  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-primary"

  return (
    <button
      type="button"
      className={`${variantClass} ${className}`.trim()}
      onClick={openAgentChat}
    >
      {label}
    </button>
  )
}
