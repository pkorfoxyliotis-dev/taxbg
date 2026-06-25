import { isValidAgentBearer } from "@/lib/agent-api-auth"
import { NextRequest, NextResponse } from "next/server"

/**
 * "Doors" = informational signs about what exists behind authentication,
 * not directives granting access. An unauthenticated caller sees the same
 * list with authenticated: false — knowing a door exists doesn't open it.
 */
export async function GET(req: NextRequest) {
  const authenticated = isValidAgentBearer(req)

  return NextResponse.json({
    schema_version: "1.0",
    siteId: "taxbg",
    authenticated,
    doors: [
      { id: "pricing", state: "open", access: "public" },
      { id: "lead_capture", state: "open", access: "public" },
      { id: "chat", state: "open", access: "public" },
      { id: "payment_links", state: authenticated ? "open" : "locked", access: "bearer_required" },
      { id: "clients", state: "not_built", access: "bearer_required" },
      { id: "subscriptions", state: "not_built", access: "bearer_required" },
      { id: "negotiation", state: "not_built", access: "bearer_required" },
    ],
  })
}
