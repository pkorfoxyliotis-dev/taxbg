import { ADMIN_SESSION_COOKIE, createAdminSession, verifyAdminPassword } from "@/lib/admin-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string }
  const email = body.email?.trim().toLowerCase()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: "email, password required" }, { status: 400 })
  }

  const admin = await verifyAdminPassword(email, password)
  if (!admin) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 })
  }

  const { token, expiresAt } = await createAdminSession(admin.id, {
    userAgent: req.headers.get("user-agent"),
    ip: req.headers.get("x-forwarded-for"),
  })

  const res = NextResponse.json({ admin })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  })
  return res
}
