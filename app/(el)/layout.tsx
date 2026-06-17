import { AgentWidget } from "@/components/agent-widget"
import { CookieBanner } from "@/components/cookie-banner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function GreekLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader locale="el" />
      <main className="flex-1">{children}</main>
      <SiteFooter locale="el" />
      <AgentWidget locale="el" variant="fab" />
      <CookieBanner />
    </>
  )
}
