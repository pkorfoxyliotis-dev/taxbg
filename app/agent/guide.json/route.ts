import guide from "@/content/guide.json"
import { NextResponse } from "next/server"

export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(guide)
}
