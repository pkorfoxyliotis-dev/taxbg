"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { OpenAgentButton } from "@/components/open-agent-button"
import { guidePriceRange } from "@/content/guide-pricing"
import { pathFor, routes } from "@/content/routes"
import type { Locale } from "@/content/routes"

type GuideChoice = {
  labelEl: string
  labelEn: string
  nextId: string
  flags?: { includesFormation?: boolean }
}

type GuideNode = {
  id: string
  type: string
  titleEl: string
  titleEn: string
  bodyEl?: string
  bodyEn?: string
  pricingKey?: string
  choices?: GuideChoice[]
}

type GuideData = {
  rootId: string
  nodes: GuideNode[]
  resultKeys?: string[]
}

export function GuideWizard({
  guide,
  locale = "el",
}: {
  guide: GuideData
  locale?: Locale
}) {
  const isEn = locale === "en"
  const nodeMap = useMemo(
    () => new Map(guide.nodes.map((n) => [n.id, n])),
    [guide.nodes]
  )
  const [nodeId, setNodeId] = useState(guide.rootId)
  const [resultKey, setResultKey] = useState<string | null>(null)
  const [includesFormation, setIncludesFormation] = useState(false)

  const node = nodeMap.get(nodeId)
  const resultKeys = new Set(guide.resultKeys ?? [])

  const reset = () => {
    setResultKey(null)
    setNodeId(guide.rootId)
    setIncludesFormation(false)
  }

  if (resultKey) {
    const resultNode = guide.nodes.find((n) => n.id === resultKey)
    const pricingKey = resultNode?.pricingKey ?? resultKey
    const title = isEn ? resultNode?.titleEn : resultNode?.titleEl
    const { lines } = guidePriceRange(pricingKey, locale, { includesFormation })

    return (
      <div className="guide-card">
        <h2 className="guide-step-title">{title}</h2>
        {lines.length > 0 && (
          <div className="guide-price-range" style={{ marginBottom: "1.25rem" }}>
            <p className="prose-muted" style={{ fontSize: "0.88rem", marginBottom: "0.5rem" }}>
              {isEn
                ? "Indicative range (not a binding quote):"
                : "Ενδεικτικό εύρος (όχι δεσμευτική προσφορά):"}
            </p>
            {lines.map((line) => (
              <div key={line.label} className="guide-price-line">
                <p className="guide-price-line-label">{line.label}</p>
                <strong className="guide-price-line-amount">
                  {line.low} – {line.high}
                </strong>
                <span className="guide-price-line-period">{line.period}</span>
                {line.note ? (
                  <p className="prose-muted guide-price-line-note">{line.note}</p>
                ) : null}
              </div>
            ))}
            <p className="prose-muted" style={{ fontSize: "0.82rem", marginTop: "0.5rem" }}>
              {isEn
                ? "The agent confirms scope and final pricing in chat — no form required."
                : "Ο agent επιβεβαιώνει scope και τελική τιμή στη συνομιλία — χωρίς φόρμα."}
            </p>
          </div>
        )}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <OpenAgentButton locale={locale}>
            {isEn ? "Talk to the Agent" : "Μίλα με τον Agent"}
          </OpenAgentButton>
          <Link href={pathFor(routes.portal, locale)} className="btn-secondary">
            {isEn ? "Start onboarding" : "Ξεκίνα συνεργασία"}
          </Link>
          <button type="button" className="btn-ghost" onClick={reset}>
            {isEn ? "Start over" : "Από την αρχή"}
          </button>
        </div>
      </div>
    )
  }

  if (!node?.choices?.length) {
    return (
      <div className="guide-card">
        <p>{isEn ? "Guide node not found." : "Δεν βρέθηκε κόμβος οδηγού."}</p>
      </div>
    )
  }

  const body = isEn ? node.bodyEn : node.bodyEl

  return (
    <div className="guide-card">
      <p className="prose-muted" style={{ fontSize: "0.88rem", marginBottom: "0.75rem" }}>
        {isEn
          ? "Price wizard · indicative range only · then chat with the agent"
          : "Οδηγός τιμών · μόνο εύρος · μετά συνομιλία με τον agent"}
      </p>
      <h2 className="guide-step-title">
        {isEn ? node.titleEn : node.titleEl}
      </h2>
      {body ? <p className="guide-step-body prose-muted">{body}</p> : null}
      <div className="guide-options">
        {node.choices.map((choice) => (
          <button
            key={choice.labelEl}
            type="button"
            className="guide-option"
            onClick={() => {
              if (choice.flags?.includesFormation) {
                setIncludesFormation(true)
              }
              if (resultKeys.has(choice.nextId)) {
                setResultKey(choice.nextId)
                return
              }
              const next = nodeMap.get(choice.nextId)
              if (next?.type === "result") {
                setResultKey(choice.nextId)
              } else {
                setNodeId(choice.nextId)
              }
            }}
          >
            {isEn ? choice.labelEn : choice.labelEl}
          </button>
        ))}
      </div>
    </div>
  )
}
