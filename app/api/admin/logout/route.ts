import { ADMIN_SESSION_COOKIE, revokeAdminSession } from "@/lib/admin-auth"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (token) {
    await revokeAdminSession(token)
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(ADMIN_SESSION_COOKIE)
  return res
}
