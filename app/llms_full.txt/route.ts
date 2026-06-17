import {
  agentDiscoveryHeaders,
  buildAgentSiteTree,
  formatLlmsFull,
} from "@/lib/agent-discovery"
import { NextResponse } from "next/server"

/** Public full LLM index at domain root */
export const dynamic = "force-dynamic"

export async function GET() {
  const tree = await buildAgentSiteTree()
  return new NextResponse(formatLlmsFull(tree), {
    headers: {
      ...agentDiscoveryHeaders,
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
