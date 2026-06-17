import type { Metadata } from "next"
import { AgentWidget } from "@/components/agent-widget"
import { CookieBanner } from "@/components/cookie-banner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "TaxBG — Company Formation & Accounting Bulgaria",
  description:
    "Company formation in Bulgaria and accounting services. Free tax planning. Support in Greek & English.",
  path: "/en",
  locale: "en",
  alternatePath: "/",
})

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader locale="en" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="en" />
      <AgentWidget locale="en" variant="fab" />
      <CookieBanner />
    </>
  )
}
