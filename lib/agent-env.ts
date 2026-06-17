export function agentChatUrl(): string | undefined {
  return process.env.AGENT_CHAT_URL?.trim() || undefined
}

export function agentLeadUrl(): string | undefined {
  return process.env.AGENT_LEAD_WEBHOOK_URL?.trim() || undefined
}

export function agentApiKey(): string | undefined {
  return process.env.AGENT_API_KEY?.trim() || undefined
}
