import { getCurrentMember } from "@/lib/auth"
import { getSubscriptionsForMember } from "@/lib/member-data"
import { NextResponse } from "next/server"

export async function GET() {
  const member = await getCurrentMember()
  if (!member) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  const subscriptions = await getSubscriptionsForMember(member.id)
  return NextResponse.json({ subscriptions })
}
