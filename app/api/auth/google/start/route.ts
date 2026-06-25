import { siteUrl } from "@/lib/seo"
import { randomBytes } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

const STATE_COOKIE = "taxbg_oauth_state"

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  if (!clientId) {
    return NextResponse.json({ error: "google_oauth_unconfigured" }, { status: 503 })
  }

  const state = randomBytes(16).toString("hex")
  const redirectUri = `${siteUrl()}/api/auth/google/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  })

  const res = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  )
  res.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  })
  return res
}
