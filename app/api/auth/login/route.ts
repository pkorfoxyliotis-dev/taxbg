import {
  SESSION_COOKIE,
  createSession,
  findMemberByEmail,
  verifyPassword,
} from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string }
  const email = body.email?.trim().toLowerCase()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: "email, password required" }, { status: 400 })
  }

  const member = await findMemberByEmail(email)
  if (!member || !member.passwordHash) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
  }

  const ok = await verifyPassword(password, member.passwordHash)
  if (!ok) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
  }

  const { token, expiresAt } = await createSession(member.id, {
    userAgent: req.headers.get("user-agent"),
    ip: req.headers.get("x-forwarded-for"),
  })

  const res = NextResponse.json({
    member: { id: member.id, email: member.email, alias: member.alias, locale: member.locale },
  })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
  return res
}
