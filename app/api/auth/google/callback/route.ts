import { SESSION_COOKIE, createSession, findOrCreateMemberFromGoogle } from "@/lib/auth"
import { siteUrl } from "@/lib/seo"
import { NextRequest, NextResponse } from "next/server"

const STATE_COOKIE = "taxbg_oauth_state"

type GoogleTokenResponse = { access_token?: string; error?: string }
type GoogleUserInfo = { sub: string; email?: string; email_verified?: boolean }

export async function GET(req: NextRequest) {
  const url = req.nextUrl
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const savedState = req.cookies.get(STATE_COOKIE)?.value

  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.redirect(`${siteUrl()}/λογαριασμός?error=oauth_state`)
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "google_oauth_unconfigured" }, { status: 503 })
  }

  const redirectUri = `${siteUrl()}/api/auth/google/callback`

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  })
  const tokenData = (await tokenRes.json()) as GoogleTokenResponse
  if (!tokenRes.ok || !tokenData.access_token) {
    return NextResponse.redirect(`${siteUrl()}/λογαριασμός?error=oauth_token`)
  }

  const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  const userInfo = (await userInfoRes.json()) as GoogleUserInfo
  if (!userInfoRes.ok || !userInfo.email) {
    return NextResponse.redirect(`${siteUrl()}/λογαριασμός?error=oauth_userinfo`)
  }

  const member = await findOrCreateMemberFromGoogle({
    email: userInfo.email,
    googleSub: userInfo.sub,
    aliasHint: "",
  })

  const { token, expiresAt } = await createSession(member.id, {
    userAgent: req.headers.get("user-agent"),
    ip: req.headers.get("x-forwarded-for"),
  })

  const res = NextResponse.redirect(`${siteUrl()}/λογαριασμός`)
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
  res.cookies.delete(STATE_COOKIE)
  return res
}
