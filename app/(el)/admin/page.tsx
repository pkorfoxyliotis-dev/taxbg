import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLoginForm } from "@/components/admin/admin-login-form"
import { pathFor, routes } from "@/content/routes"
import { getCurrentAdmin } from "@/lib/admin-auth"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Διαχείριση — TaxBG",
  description: "Owner dashboard — not for public access.",
  path: pathFor(routes.admin),
  noIndex: true,
})

export default async function AdminPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return <AdminLoginForm />
  }
  return <AdminDashboard admin={admin} />
}
