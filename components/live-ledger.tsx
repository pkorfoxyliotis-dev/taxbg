"use client"

import { useEffect, useRef, useState } from "react"
import type { Locale } from "@/content/routes"

const EVENTS = {
  el: [
    "Τιμολόγιο #4471 καταχωρήθηκε via φωτο",
    "ΦΠΑ Q2 υποβλήθηκε αυτόματα",
    "Τραπεζική κίνηση διασταυρώθηκε με παραστατικό",
    "VIES εγγραφή ενεργοποιήθηκε",
    "Μηνιαία δήλωση ΝΑΠ υποβλήθηκε",
    "Νέο τιμολόγιο εξόδου κατηγοριοποιήθηκε",
    "Υπενθύμιση προθεσμίας στάλθηκε στον πελάτη",
    "Συμφωνία τραπεζικού υπολοίπου ολοκληρώθηκε",
  ],
  en: [
    "Invoice #4471 recorded via photo",
    "Q2 VAT filed automatically",
    "Bank transaction matched to a receipt",
    "VIES registration activated",
    "Monthly NAP filing submitted",
    "New expense invoice categorized",
    "Deadline reminder sent to client",
    "Bank balance reconciliation completed",
  ],
} as const

function randomTime(): string {
  const h = String(Math.floor(Math.random() * 3) + 8).padStart(2, "0")
  const m = String(Math.floor(Math.random() * 60)).padStart(2, "0")
  return `${h}:${m}`
}

export function LiveLedger({ locale = "el" }: { locale?: Locale }) {
  const isEn = locale === "en"
  const events = isEn ? EVENTS.en : EVENTS.el
  const [lines, setLines] = useState<{ text: string; time: string; id: number }[]>([])
  const poolRef = useRef<string[]>([...events])
  const idRef = useRef(0)

  useEffect(() => {
    function nextLine() {
      if (poolRef.current.length === 0) poolRef.current = [...events]
      const idx = Math.floor(Math.random() * poolRef.current.length)
      const text = poolRef.current.splice(idx, 1)[0]!
      idRef.current += 1
      setLines((prev) => [...prev.slice(-5), { text, time: randomTime(), id: idRef.current }])
    }
    const timers = [0, 450, 900, 1350].map((delay) => setTimeout(nextLine, delay))
    const interval = setInterval(nextLine, 2600)
    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="home-ledger">
      <div className="home-ledger-head">
        <span>{isEn ? "Live · Accounting activity" : "Live · Λογιστική Δραστηριότητα"}</span>
        <span className="home-ledger-status">
          <span className="home-ledger-pulse" />
          {isEn ? "active" : "ενεργό"}
        </span>
      </div>
      <div className="home-ledger-body">
        {lines.map((line) => (
          <div className="home-ledger-line" key={line.id}>
            <span className="home-ledger-ok">✓</span>
            <span>{line.text}</span>
            <span className="home-ledger-ts">{line.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
