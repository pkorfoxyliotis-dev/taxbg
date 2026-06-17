import { TaxbgEmblem } from "@/components/brand/taxbg-emblem"
import { TaxbgLogoLockup } from "@/components/brand/taxbg-logo-lockup"

type Props = {
  variant?: "header" | "emblem" | "footer"
  priority?: boolean
  className?: string
}

export function BrandLogo({
  variant = "header",
  priority = false,
  className = "",
}: Props) {
  if (variant === "emblem" || variant === "header") {
    return (
      <TaxbgEmblem
        priority={priority}
        size={variant === "header" ? 44 : 48}
        className={`brand-emblem ${className}`.trim()}
      />
    )
  }

  return (
    <TaxbgLogoLockup
      tone="light"
      showTagline
      emblemSize={52}
      priority={priority}
      className={`brand-logo-lockup--footer ${className}`.trim()}
    />
  )
}
