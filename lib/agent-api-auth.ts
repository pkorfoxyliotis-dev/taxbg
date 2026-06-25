import { agentApiKey } from "@/lib/agent-env"
import type { NextRequest } from "next/server"

/** Bearer AGENT_API_KEY check shared by all owner/agent-authenticated routes. */
export function isValidAgentBearer(req: NextRequest): boolean {
  const secret = agentApiKey()
  if (!secret) return false
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "")
  return auth === secret
}
