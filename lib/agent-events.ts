/** Global event to open the site-wide agent FAB from any CTA. */
export const OPEN_AGENT_EVENT = "taxbg:open-agent"

export function openAgentChat() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(OPEN_AGENT_EVENT))
}
