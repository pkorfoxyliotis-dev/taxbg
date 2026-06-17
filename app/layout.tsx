import type { Metadata } from "next"
import { Source_Sans_3, Playfair_Display } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import { buildPageMetadata, organizationJsonLd, webSiteJsonLd } from "@/lib/seo"
import "./globals.css"

export const dynamic = "force-dynamic"

const sourceSans = Source_Sans_3({
  subsets: ["latin", "greek", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "TaxBG — Ίδρυση Εταιρείας & Λογιστική Βουλγαρία",
    description:
      "Ίδρυση εταιρείας στη Βουλγαρία και λογιστική υποστήριξη. Δωρεάν φορολογικός σχεδιασμός. Επικοινωνία στα Ελληνικά & Αγγλικά.",
    path: "/",
    alternatePath: "/en",
  }),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="el" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className={`${sourceSans.className} min-h-screen flex flex-col`}>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        {children}
      </body>
    </html>
  )
}
