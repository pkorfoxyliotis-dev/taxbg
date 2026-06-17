import {
  agentDiscoveryHeaders,
  buildAgentSiteTree,
} from "@/lib/agent-discovery"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const tree = await buildAgentSiteTree()
  return NextResponse.json(tree, { headers: agentDiscoveryHeaders })
}
