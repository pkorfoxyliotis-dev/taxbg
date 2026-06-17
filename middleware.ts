import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { greekToInternal } from "@/content/routes"

function decodePath(pathname: string): string {
  try {
    return decodeURIComponent(pathname)
  } catch {
    return pathname
  }
}

export function middleware(request: NextRequest) {
  const raw = request.nextUrl.pathname
  const pathname = decodePath(raw)

  // English legal aliases → /en/legal/{key}
  if (pathname.startsWith("/en/")) {
    const enLegal: Record<string, string> = {
      "/en/privacy-policy": "/en/legal/privacy",
      "/en/terms": "/en/legal/terms",
      "/en/terms-and-conditions": "/en/legal/terms",
      "/en/terms-of-use": "/en/legal/termsOfUse",
      "/en/cookies": "/en/legal/cookies",
      "/en/cookie-policy": "/en/legal/cookies",
      "/en/gdpr-rights": "/en/legal/gdpr",
      "/en/gdpr": "/en/legal/gdpr",
    }
    const rewrite = enLegal[pathname]
    if (rewrite) {
      const url = request.nextUrl.clone()
      url.pathname = rewrite
      return NextResponse.rewrite(url)
    }
    return NextResponse.next()
  }

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return NextResponse.next()

  const first = segments[0]!

  // /υπηρεσίες/ίδρυση-εταιρείας-βουλγαρία → /services/formation
  if (first === "υπηρεσίες" && segments.length === 2) {
    const slugMap: Record<string, string> = {
      "ίδρυση-εταιρείας-βουλγαρία": "/services/formation",
      "λογιστική-βουλγαρία": "/services/accounting",
      "web-υπηρεσίες": "/services/web",
    }
    const internal = slugMap[segments[1]!]
    if (internal) {
      const url = request.nextUrl.clone()
      url.pathname = internal
      return NextResponse.rewrite(url)
    }
  }

  const internal = greekToInternal[first]
  if (internal && segments.length === 1) {
    const url = request.nextUrl.clone()
    url.pathname = internal
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|identity.json|llms.txt|llms_full.txt|agent|data|.*\\..*).*)",
  ],
}
