"use client"

import { useState } from "react"
import { PRICING } from "@/content/pricing-data"
import {
  quoteAccounting,
  quoteRegistration,
  quoteInactive,
  quoteClosure,
  type AccountingQuoteInput,
} from "@/lib/real-pricing"
import type { AccountingVertical, TradeComplexity } from "@/content/pricing-data"

type Path = "formation" | "accounting" | "inactive" | "closure" | null

const FORMATION_INCLUDES = [
  "Σύνταξη & κατάθεση καταστατικού στο Εμπορικό Μητρώο",
  "Άνοιγμα τραπεζικού λογαριασμού κεφαλαίου — τραπεζικά έξοδα περιλαμβάνονται",
  "Έκδοση ЛНЧ (απαραίτητο για VAT/VIES/NRA)",
  "Εγγραφή ΦΠΑ & VIES",
  "Εγγραφή διαχειριστή στο ΝΑΠ (κοινωνικές ασφαλίσεις)",
  "Διερμηνέας για συμβολαιογράφο",
  "Υποστήριξη στα Ελληνικά & Αγγλικά σε όλα τα βήματα",
  "Καμία κρυφή χρέωση — όλα από το πρώτο βήμα",
]

const ACCOUNTING_INCLUDES = [
  "Δωρεάν σύστημα έκδοσης τιμολογίων",
  "24/7 πύλη πελάτη: τράπεζες, παραστατικά, υποχρεώσεις ΦΠΑ/ΝΑΠ σε πραγματικό χρόνο",
  "Μηνιαίες & τριμηνιαίες δηλώσεις ΦΠΑ",
  "Δήλωση ΝΑΠ κάθε μήνα",
  "Σύνταξη & δημοσίευση ετήσιου ισολογισμού (included — δεν χρεώνεται ξεχωριστά)",
  "Ενημέρωση για κάθε υποβληθείσα δήλωση",
  "TaxBG Agent — κοινός ψηφιακός λογιστικός βοηθός, μέσω login",
  "Υποστήριξη στα Ελληνικά & Αγγλικά",
]

function fmt(n: number) {
  return `${n.toLocaleString("el-GR")}€`
}

// ── Formation Path ────────────────────────────────────────────────────────────

function FormationResult({ onBack }: { onBack: () => void }) {
  const [express, setExpress] = useState(false)
  const price = quoteRegistration(express)

  return (
    <div className="pc-result">
      <div className="pc-result-toggle">
        <button
          className={!express ? "pc-toggle-active" : "pc-toggle"}
          onClick={() => setExpress(false)}
        >
          Κανονική
        </button>
        <button
          className={express ? "pc-toggle-active" : "pc-toggle"}
          onClick={() => setExpress(true)}
        >
          Fast-track
          <span className="pc-toggle-note">VIES από 2η μέρα</span>
        </button>
      </div>

      <div className="pc-price-reveal">
        <span className="pc-price-amount">{fmt(price)}</span>
        <span className="pc-price-label">εφάπαξ</span>
      </div>

      {express && (
        <p className="pc-note">
          Fast-track: η εταιρεία είναι ενεργή στο VIES από τη 2η εργάσιμη ημέρα αντί για
          10–14 ημέρες — χρήσιμο αν έχεις ήδη B2B αγοραστή που απαιτεί VIES.
        </p>
      )}

      <div className="pc-includes">
        <p className="pc-includes-title">Τι περιλαμβάνεται</p>
        <ul className="pc-includes-list">
          {FORMATION_INCLUDES.map((item) => (
            <li key={item}>
              <span className="pc-check">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="pc-competitor-note">
          Άλλα γραφεία χρεώνουν +200–350€ για το τραπεζικό λογαριασμό κεφαλαίου,
          +100–200€ για το ЛНЧ, ξεχωριστά για VIES και ΝΑΠ. Εδώ είναι όλα μέσα.
        </p>
      </div>

      <div className="pc-result-actions">
        <a href="/επικοινωνία" className="btn-primary">
          Ξεκινήστε τη διαδικασία →
        </a>
        <a href="/λογιστική-υποστήριξη-βουλγαρία" className="btn-ghost-dark">
          Δείτε τιμές λογιστικής
        </a>
      </div>

      <button className="pc-back" onClick={onBack}>
        ← Πίσω
      </button>
    </div>
  )
}

// ── Accounting Path ───────────────────────────────────────────────────────────

type AccStep = "vertical" | "volume" | "complexity" | "result"

function AccountingPath({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<AccStep>("vertical")
  const [vertical, setVertical] = useState<AccountingVertical | null>(null)
  const [tierIdx, setTierIdx] = useState<number | null>(null)
  const [complexity, setComplexity] = useState<TradeComplexity>("domestic")
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly")

  const needsComplexity = vertical === "eshop" || vertical === "wholesale"

  function pickVertical(v: AccountingVertical) {
    setVertical(v)
    setTierIdx(null)
    setStep("volume")
  }

  function pickTier(idx: number) {
    setTierIdx(idx)
    if (needsComplexity) {
      setStep("complexity")
    } else {
      setStep("result")
    }
  }

  function pickComplexity(c: TradeComplexity) {
    setComplexity(c)
    setStep("result")
  }

  function reset() {
    setStep("vertical")
    setVertical(null)
    setTierIdx(null)
    setComplexity("domestic")
    setBilling("monthly")
  }

  if (step === "vertical") {
    return (
      <div className="pc-step">
        <p className="pc-step-label">Βήμα 1 / Τι είδους δραστηριότητα έχετε;</p>
        <div className="pc-choices">
          <button className="pc-choice" onClick={() => pickVertical("services")}>
            <strong>Υπηρεσίες</strong>
            <span>IT, web dev, consulting, remote εργασία, freelance</span>
          </button>
          <button className="pc-choice" onClick={() => pickVertical("eshop")}>
            <strong>E-shop / Λιανική</strong>
            <span>Πώληση προϊόντων σε τελικούς καταναλωτές online</span>
          </button>
          <button className="pc-choice" onClick={() => pickVertical("wholesale")}>
            <strong>Χονδρική / Εισαγωγές-Εξαγωγές</strong>
            <span>B2B συναλλαγές, εισαγωγή-εξαγωγή εμπορευμάτων</span>
          </button>
        </div>
        <button className="pc-back" onClick={onBack}>
          ← Πίσω
        </button>
      </div>
    )
  }

  if (step === "volume" && vertical) {
    const tiers =
      vertical === "services"
        ? PRICING.services.tiers
        : PRICING[vertical].tiers

    return (
      <div className="pc-step">
        <p className="pc-step-label">Βήμα 2 / Πόσα παραστατικά έχετε κατά μέσο όρο τον μήνα;</p>
        <div className="pc-choices">
          {tiers.map((tier, idx) => (
            <button
              key={idx}
              className={tier.custom ? "pc-choice pc-choice--custom" : "pc-choice"}
              onClick={() => pickTier(idx)}
            >
              <strong>{tier.label}</strong>
              {tier.custom && <span>Θα επικοινωνήσουμε για custom τιμή</span>}
            </button>
          ))}
        </div>
        <button className="pc-back" onClick={() => setStep("vertical")}>
          ← Πίσω
        </button>
      </div>
    )
  }

  if (step === "complexity" && vertical && tierIdx !== null) {
    return (
      <div className="pc-step">
        <p className="pc-step-label">Βήμα 3 / Από πού προέρχονται τα εμπορεύματά σας;</p>
        <div className="pc-choices">
          <button className="pc-choice" onClick={() => pickComplexity("domestic")}>
            <strong>Εντός ΕΕ</strong>
            <span>
              Αγορά από Βουλγαρία, Ελλάδα, Γερμανία, ΕΕ γενικά — αποθήκευση στη
              Βουλγαρία, πώληση οπουδήποτε
            </span>
          </button>
          <button className="pc-choice" onClick={() => pickComplexity("thirdCountry")}>
            <strong>Εκτός ΕΕ (3rd country)</strong>
            <span>
              Εισαγωγή μέσω τελωνείου — π.χ. Κίνα, Τουρκία, ΗΠΑ — αποθήκη Βουλγαρία
            </span>
          </button>
        </div>
        <button className="pc-back" onClick={() => setStep("volume")}>
          ← Πίσω
        </button>
      </div>
    )
  }

  if (step === "result" && vertical !== null && tierIdx !== null) {
    const input: AccountingQuoteInput = {
      vertical,
      tierIdx,
      complexity,
      billing,
    }
    const quote = quoteAccounting(input)

    if (quote.isCustom) {
      return (
        <div className="pc-result">
          <p className="pc-step-label">Αποτέλεσμα</p>
          <p className="pc-custom-note">
            Ο όγκος παραστατικών που επιλέξατε απαιτεί custom τιμολόγηση. Επικοινωνήστε
            μαζί μας για αναλυτική προσφορά.
          </p>
          <div className="pc-result-actions">
            <a href="/επικοινωνία" className="btn-primary">
              Ζητήστε προσφορά →
            </a>
          </div>
          <button className="pc-back" onClick={reset}>← Από την αρχή</button>
        </div>
      )
    }

    return (
      <div className="pc-result">
        <p className="pc-step-label">Αποτέλεσμα</p>

        <div className="pc-billing-toggle">
          <button
            className={billing === "monthly" ? "pc-toggle-active" : "pc-toggle"}
            onClick={() => setBilling("monthly")}
          >
            Μηνιαία χρέωση
          </button>
          <button
            className={billing === "annual" ? "pc-toggle-active" : "pc-toggle"}
            onClick={() => setBilling("annual")}
          >
            Ετήσια (-10%)
          </button>
        </div>

        <div className="pc-price-reveal">
          <span className="pc-price-amount">{quote.total !== null ? fmt(quote.total) : "—"}</span>
          <span className="pc-price-label">/ μήνα</span>
        </div>

        {billing === "annual" && quote.total !== null && (
          <p className="pc-annual-note">
            Ετήσια συνδρομή: {fmt(quote.total * 12)} — εξοικονομείτε{" "}
            {fmt(Math.round((quote.total / 0.9) * 12 - quote.total * 12))} ετησίως
          </p>
        )}

        <div className="pc-includes">
          <p className="pc-includes-title">Τι περιλαμβάνεται</p>
          <ul className="pc-includes-list">
            {ACCOUNTING_INCLUDES.map((item) => (
              <li key={item}>
                <span className="pc-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pc-result-actions">
          <a href="/επικοινωνία" className="btn-primary">
            Ξεκινήστε →
          </a>
        </div>

        <button className="pc-back" onClick={reset}>
          ← Από την αρχή
        </button>
      </div>
    )
  }

  return null
}

// ── Inactive / Closure ────────────────────────────────────────────────────────

function InactivePath({ onBack }: { onBack: () => void }) {
  const [withVies, setWithVies] = useState(true)
  const price = quoteInactive(withVies)

  return (
    <div className="pc-result">
      <p className="pc-step-label">Ανενεργή εταιρεία</p>
      <div className="pc-result-toggle">
        <button
          className={withVies ? "pc-toggle-active" : "pc-toggle"}
          onClick={() => setWithVies(true)}
        >
          Με VIES
        </button>
        <button
          className={!withVies ? "pc-toggle-active" : "pc-toggle"}
          onClick={() => setWithVies(false)}
        >
          Χωρίς VIES
        </button>
      </div>
      <div className="pc-price-reveal">
        <span className="pc-price-amount">{fmt(price)}</span>
        <span className="pc-price-label">/ μήνα</span>
      </div>
      <p className="pc-note">
        Κρατά την εταιρεία συμμορφούμενη χωρίς δραστηριότητα. Δεν γίνεται τιμολόγηση,
        δεν απαιτείται λογιστής για ΦΠΑ.
      </p>
      <button className="pc-back" onClick={onBack}>← Πίσω</button>
    </div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

export function PricingCalculator() {
  const [path, setPath] = useState<Path>(null)

  if (path === "formation") return <FormationResult onBack={() => setPath(null)} />
  if (path === "accounting") return <AccountingPath onBack={() => setPath(null)} />
  if (path === "inactive") return <InactivePath onBack={() => setPath(null)} />
  if (path === "closure") {
    return (
      <div className="pc-result">
        <p className="pc-step-label">Κλείσιμο εταιρείας</p>
        <div className="pc-price-reveal">
          <span className="pc-price-amount">{fmt(quoteClosure())}</span>
          <span className="pc-price-label">εφάπαξ</span>
        </div>
        <p className="pc-note">
          Διάλυση & διαγραφή από Εμπορικό Μητρώο, VIES, ΝΑΠ. Προϋπόθεση: μηδενικές
          εκκρεμότητες προς εφορία.
        </p>
        <div className="pc-result-actions">
          <a href="/επικοινωνία" className="btn-primary">Επικοινωνήστε μαζί μας →</a>
        </div>
        <button className="pc-back" onClick={() => setPath(null)}>← Πίσω</button>
      </div>
    )
  }

  return (
    <div className="pc-root">
      <p className="pc-root-sub">
        Επιλέξτε τι σας ενδιαφέρει — θα δείτε τι κοστίζει και τι ακριβώς περιλαμβάνεται.
      </p>
      <div className="pc-paths">
        <button className="pc-path-card" onClick={() => setPath("formation")}>
          <span className="pc-path-icon">🏢</span>
          <strong>Ίδρυση εταιρείας</strong>
          <span>στη Βουλγαρία — all-inclusive</span>
        </button>
        <button className="pc-path-card" onClick={() => setPath("accounting")}>
          <span className="pc-path-icon">📊</span>
          <strong>Λογιστική υποστήριξη</strong>
          <span>μηνιαία συνδρομή — τιμή ανάλογα με δραστηριότητα</span>
        </button>
      </div>
      <div className="pc-paths-secondary">
        <button className="pc-path-link" onClick={() => setPath("inactive")}>
          Ανενεργή εταιρεία
        </button>
        <span className="pc-path-sep">·</span>
        <button className="pc-path-link" onClick={() => setPath("closure")}>
          Κλείσιμο εταιρείας
        </button>
      </div>
    </div>
  )
}
