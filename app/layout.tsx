import type { Metadata } from "next"
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google"
import { GoogleAnalytics } from "@/components/google-analytics"
import { JsonLd } from "@/components/json-ld"
import { buildPageMetadata, organizationJsonLd, webSiteJsonLd } from "@/lib/seo"
import "./globals.css"

export const dynamic = "force-dynamic"

const inter = Inter({
  subsets: ["latin", "greek", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
})

// Fraunces has no Greek glyphs — Greek headline text falls back to the
// browser's default serif, which is the intended look (matches the real
// mockup at /opt/Taxbg/mockups/index.html, which relies on the same fallback).
const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
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
    <html lang="el" className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <GoogleAnalytics />
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        {children}
      </body>
    </html>
  )
}
