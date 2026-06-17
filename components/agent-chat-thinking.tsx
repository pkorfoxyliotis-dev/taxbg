"use client"

import { useEffect, useMemo, useState } from "react"
import type { Locale } from "@/content/routes"

const DEFAULT_EL = ["Σκέφτομαι…", "Διαβάζω το μήνυμά σας…", "Ψάχνω την καλύτερη απάντηση…"]
const DEFAULT_EN = ["Thinking…", "Reading your message…", "Finding the best answer…"]

const PHRASE_SETS: { match: RegExp; el: string[]; en: string[] }[] = [
  {
    match: /ίδρυσ|εταιρ|formation|company|eood/i,
    el: ["Ελέγχω πακέτα ίδρυσης…", "Συμβουλεύω για Βουλγαρία…"],
    en: ["Checking formation packages…", "Advising on Bulgaria setup…"],
  },
  {
    match: /λογιστ|accounting|τιμολ|invoice|nap/i,
    el: ["Ελέγχω υπηρεσίες λογιστικής…", "Βλέπω πύλη πελάτη & ΝΑΠ…"],
    en: ["Reviewing accounting services…", "Checking portal & NAP features…"],
  },
  {
    match: /τιμ|κόστ|πόσο|price|€|συνδρομ/i,
    el: ["Υπολογίζω ενδεικτικές τιμές…", "Ελέγχω έκπτωση προπληρωμής…"],
    en: ["Calculating indicative pricing…", "Checking prepayment discount…"],
  },
]

function phrasesFor(text: string, locale: Locale): string[] {
  const trimmed = text.trim()
  const fallback = locale === "en" ? DEFAULT_EN : DEFAULT_EL
  if (!trimmed) return fallback
  for (const set of PHRASE_SETS) {
    if (set.match.test(trimmed)) {
      return locale === "en" ? set.en : set.el
    }
  }
  return fallback
}

export function AgentChatThinking({
  locale = "el",
  lastUserMessage = "",
}: {
  locale?: Locale
  lastUserMessage?: string
}) {
  const phrases = useMemo(
    () => phrasesFor(lastUserMessage, locale),
    [lastUserMessage, locale]
  )
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
    if (phrases.length <= 1) return
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length)
    }, 2200)
    return () => window.clearInterval(timer)
  }, [phrases, lastUserMessage])

  return (
    <div
      className="agent-chat-msg agent-chat-msg-assistant agent-chat-thinking"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="agent-chat-thinking-label">{phrases[index]}</span>
      <span className="agent-chat-thinking-dots" aria-hidden>
        <span />
        <span />
        <span />
      </span>
    </div>
  )
}
