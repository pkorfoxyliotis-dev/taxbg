"use client"

import Link from "next/link"
import { LegalEntityLink } from "@/components/legal-entity-link"
import { company } from "@/content/company"
import { legalPath, routes, type Locale } from "@/content/routes"

type Props = {
  locale?: Locale
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
}

export function ConsentCheckbox({
  locale = "el",
  checked,
  onChange,
  name = "consent",
}: Props) {
  const isEn = locale === "en"

  return (
    <label className="consent-checkbox">
      <input
        type="checkbox"
        name={name}
        value="1"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-required="true"
      />
      <span>
        {isEn ? (
          <>
            I accept the{" "}
            <Link href={legalPath(routes.legal.terms, locale)} target="_blank">
              terms & conditions
            </Link>
            ,{" "}
            <Link href={legalPath(routes.legal.termsOfUse, locale)} target="_blank">
              terms of use
            </Link>
            ,{" "}
            <Link href={legalPath(routes.legal.privacy, locale)} target="_blank">
              privacy policy
            </Link>{" "}
            and consent to data processing by {company.brand} (
            <LegalEntityLink showUic={false} />
            ).
          </>
        ) : (
          <>
            Αποδέχομαι τους{" "}
            <Link href={legalPath(routes.legal.terms, locale)} target="_blank">
              όρους & προϋποθέσεις
            </Link>
            , τους{" "}
            <Link href={legalPath(routes.legal.termsOfUse, locale)} target="_blank">
              όρους χρήσης
            </Link>
            , την{" "}
            <Link href={legalPath(routes.legal.privacy, locale)} target="_blank">
              πολιτική απορρήτου
            </Link>{" "}
            και την επεξεργασία δεδομένων από την {company.brand} (
            <LegalEntityLink showUic={false} />
            ).
          </>
        )}
      </span>
    </label>
  )
}
