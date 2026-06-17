"use client"

import {
  agentSubtitle,
  agentTitle,
  agentWelcome,
  salesAgent,
} from "@/content/agent"
import { AgentChatThinking } from "@/components/agent-chat-thinking"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import type { Locale } from "@/content/routes"
import { OPEN_AGENT_EVENT } from "@/lib/agent-events"

const SESSION_KEY = "taxbg_agent_session_id"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
}

function loadSessionId(): string {
  if (typeof window === "undefined") return `pub_${crypto.randomUUID()}`
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = `pub_${crypto.randomUUID()}`
    localStorage.setItem(SESSION_KEY, id)
  }
  return id.startsWith("pub_") ? id : `pub_${id}`
}

export function AgentWidget({
  locale = "el",
  variant = "fab",
}: {
  locale?: Locale
  variant?: "fab" | "embed"
}) {
  const isEn = locale === "en"
  const [open, setOpen] = useState(variant === "embed")
  const [sessionId, setSessionId] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [pendingUserText, setPendingUserText] = useState("")
  const listRef = useRef<HTMLDivElement>(null)
  const channel = variant === "embed" ? "chat-embed" : "chat-fab"

  useEffect(() => {
    setSessionId(loadSessionId())
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        text: agentWelcome(variant, locale),
      },
    ])
  }, [variant, locale])

  useEffect(() => {
    if (variant !== "fab") return
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_AGENT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_AGENT_EVENT, onOpen)
  }, [variant])

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, open, busy])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed || busy) return

      setMessages((m) => [
        ...m,
        { id: `u-${Date.now()}`, role: "user", text: trimmed },
      ])
      setInput("")
      setPendingUserText(trimmed)
      setBusy(true)

      try {
        const res = await fetch("/api/agent/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId,
            channel,
            locale,
          }),
        })
        const data = (await res.json()) as {
          response?: string
          sessionId?: string
        }
        if (data.sessionId) {
          localStorage.setItem(SESSION_KEY, data.sessionId)
          setSessionId(data.sessionId)
        }
        setMessages((m) => [
          ...m,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text:
              data.response ??
              (isEn
                ? "Thank you — we will contact you shortly."
                : "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα."),
          },
        ])
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: `e-${Date.now()}`,
            role: "assistant",
            text: isEn
              ? "Network error. Please try again or use the contact form below."
              : "Πρόβλημα δικτύου. Δοκιμάστε ξανά ή τη φόρμα επικοινωνίας παρακάτω.",
          },
        ])
      } finally {
        setBusy(false)
      }
    },
    [busy, sessionId, channel, locale, isEn]
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void send(input)
  }

  function requestHuman() {
    void send(
      isEn ? salesAgent.handoffPromptEn : salesAgent.handoffPromptEl
    )
  }

  const panel = (
    <div
      className={
        variant === "embed"
          ? "agent-chat-panel agent-chat-panel-embed"
          : "agent-chat-panel"
      }
      role="dialog"
      aria-label={
        isEn
          ? `Chat with ${salesAgent.titleEn}`
          : `Συνομιλία με ${salesAgent.titleEl}`
      }
    >
      <header className="agent-chat-panel-head">
        <div>
          <strong>{agentTitle(locale)}</strong>
          <span>{agentSubtitle(locale)}</span>
        </div>
        {variant === "fab" ? (
          <button
            type="button"
            className="agent-chat-close"
            onClick={() => setOpen(false)}
            aria-label={isEn ? salesAgent.closeEn : salesAgent.closeEl}
          >
            ×
          </button>
        ) : null}
      </header>
      <p className="agent-chat-ai-disclosure" role="note">
        {isEn ? salesAgent.disclosureEn : salesAgent.disclosureEl}
      </p>
      <div className="agent-chat-messages" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`agent-chat-msg agent-chat-msg-${m.role}`}>
            {m.text}
          </div>
        ))}
        {busy ? (
          <AgentChatThinking locale={locale} lastUserMessage={pendingUserText} />
        ) : null}
      </div>
      <div className="agent-chat-handoff-bar">
        <button
          type="button"
          className="agent-chat-handoff-btn"
          onClick={requestHuman}
          disabled={busy}
        >
          {isEn ? salesAgent.handoffEn : salesAgent.handoffEl}
        </button>
      </div>
      <form className="agent-chat-form" onSubmit={onSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isEn ? salesAgent.placeholderEn : salesAgent.placeholderEl}
          disabled={busy}
          autoComplete="off"
        />
        <button type="submit" className="btn-primary" disabled={busy}>
          {isEn ? salesAgent.sendEn : salesAgent.sendEl}
        </button>
      </form>
    </div>
  )

  if (variant === "embed") {
    return <div className="agent-chat-embed-wrap">{panel}</div>
  }

  return (
    <div className="agent-chat-fab-root">
      {open ? panel : null}
      <button
        type="button"
        className="agent-chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={isEn ? salesAgent.openEn : salesAgent.openEl}
      >
        <span className="agent-chat-fab-dot" aria-hidden />
        {open
          ? isEn
            ? salesAgent.closeEn
            : salesAgent.closeEl
          : agentTitle(locale)}
      </button>
    </div>
  )
}
