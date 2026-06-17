import { company } from "@/content/company"

type Props = {
  className?: string
  showUic?: boolean
}

/** Business solutions EOOD — always links to Bulgarian Commercial Register entry. */
export function LegalEntityLink({ className, showUic = true }: Props) {
  return (
    <a
      href={company.registryUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "legal-entity-link"}
      title={`UIC ${company.uic} — Търговски регистър`}
    >
      {company.legalName}
      {showUic ? ` (UIC ${company.uic})` : ""}
    </a>
  )
}
