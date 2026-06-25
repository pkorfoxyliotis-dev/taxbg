import { getCurrentMember } from "@/lib/auth"
import { getNotificationsForMember, markNotificationRead } from "@/lib/member-data"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const member = await getCurrentMember()
  if (!member) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const notifications = await getNotificationsForMember(member.id)
  return NextResponse.json({ notifications })
}

export async function POST(req: NextRequest) {
  const member = await getCurrentMember()
  if (!member) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const body = (await req.json()) as { notificationId?: string }
  if (!body.notificationId) {
    return NextResponse.json({ error: "notificationId required" }, { status: 400 })
  }
  await markNotificationRead(member.id, body.notificationId)
  return NextResponse.json({ ok: true })
}
