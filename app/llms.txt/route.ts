import {
  agentDiscoveryHeaders,
  buildAgentSiteTree,
  formatLlmsIndex,
} from "@/lib/agent-discovery"
import { NextResponse } from "next/server"

/** Public LLM index at domain root — NOT under /agent/ */
export const dynamic = "force-dynamic"

export async function GET() {
  const tree = await buildAgentSiteTree()
  return new NextResponse(formatLlmsIndex(tree), {
    headers: {
      ...agentDiscoveryHeaders,
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
