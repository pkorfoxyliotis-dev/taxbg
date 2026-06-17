import { TaxbgEmblem } from "@/components/brand/taxbg-emblem"

type Props = {
  tone?: "brand" | "light"
  className?: string
  showTagline?: boolean
  emblemSize?: number
  priority?: boolean
}

/** Horizontal logo: emblem + TAXBG wordmark */
export function TaxbgLogoLockup({
  tone = "brand",
  className = "",
  showTagline = true,
  emblemSize = 52,
  priority = false,
}: Props) {
  const light = tone === "light"
  const titleColor = light ? "#ffffff" : "var(--navy)"
  const tagColor = light ? "rgba(255,255,255,0.72)" : "var(--ink-muted)"
  const lineColor = light ? "rgba(232,197,71,0.65)" : "var(--gold)"

  return (
    <div className={`taxbg-logo-lockup ${className}`.trim()} aria-label="TaxBG">
      <TaxbgEmblem
        size={emblemSize}
        priority={priority}
        className="taxbg-logo-lockup-emblem"
      />
      <div className="taxbg-logo-lockup-text">
        <span className="taxbg-logo-lockup-title" style={{ color: titleColor }}>
          TAXBG
        </span>
        {showTagline ? (
          <>
            <span
              className="taxbg-logo-lockup-rule"
              style={{ background: lineColor }}
              aria-hidden
            />
            <span className="taxbg-logo-lockup-tag" style={{ color: tagColor }}>
              Financial consulting &amp; accounting
            </span>
          </>
        ) : null}
      </div>
    </div>
  )
}
