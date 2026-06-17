import { identity } from "@/content/identity"
import { NextResponse } from "next/server"

/** Public identity at domain root — NOT under /agent/ */
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(identity, {
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
