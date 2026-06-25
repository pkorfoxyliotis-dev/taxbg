import { SESSION_COOKIE, getMemberBySessionToken } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!token) {
    return NextResponse.json({ member: null }, { status: 401 })
  }
  const member = await getMemberBySessionToken(token)
  if (!member) {
    return NextResponse.json({ member: null }, { status: 401 })
  }
  return NextResponse.json({ member })
}
