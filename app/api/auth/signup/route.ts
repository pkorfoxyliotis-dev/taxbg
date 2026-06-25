import {
  SESSION_COOKIE,
  createMemberWithPassword,
  createSession,
  findMemberByEmail,
  isValidGreekAlias,
} from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    email?: string
    password?: string
    alias?: string
    locale?: string
  }
  const email = body.email?.trim().toLowerCase()
  const password = body.password
  const alias = body.alias?.trim()

  if (!email || !password || !alias) {
    return NextResponse.json(
      { error: "email, password, alias required" },
      { status: 400 }
    )
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "password_too_short" }, { status: 400 })
  }
  if (!isValidGreekAlias(alias)) {
    return NextResponse.json(
      { error: "alias_must_be_greek", note: "Greek letters, digits, underscore only — 2 to 32 characters" },
      { status: 400 }
    )
  }

  if (await findMemberByEmail(email)) {
    return NextResponse.json({ error: "email_taken" }, { status: 409 })
  }

  let member
  try {
    member = await createMemberWithPassword({ email, password, alias, locale: body.locale })
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown"
    if (message.includes("alias")) {
      return NextResponse.json({ error: "alias_taken" }, { status: 409 })
    }
    return NextResponse.json({ error: "signup_failed" }, { status: 500 })
  }

  const { token, expiresAt } = await createSession(member.id, {
    userAgent: req.headers.get("user-agent"),
    ip: req.headers.get("x-forwarded-for"),
  })

  const res = NextResponse.json({ member })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
  return res
}
