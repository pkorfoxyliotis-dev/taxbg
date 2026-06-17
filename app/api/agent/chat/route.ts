import { company } from "@/content/company"
import { agentApiKey, agentChatUrl } from "@/lib/agent-env"
import { NextRequest, NextResponse } from "next/server"

type Body = {
  message?: string
  sessionId?: string
  channel?: "chat-fab" | "chat-embed"
  locale?: "el" | "en"
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body
  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({ error: "message required" }, { status: 400 })
  }

  const chatUrl = agentChatUrl()
  if (!chatUrl) {
    return NextResponse.json(
      {
        error: "chat_unconfigured",
        response:
          body.locale === "en"
            ? "Chat is not available yet. Please use the contact form."
            : "Ο chat δεν είναι διαθέσιμος ακόμα. Χρησιμοποιήστε τη φόρμα επικοινωνίας.",
      },
      { status: 503 }
    )
  }

  const rawSession = body.sessionId?.trim() || crypto.randomUUID()
  const sessionId = rawSession.startsWith("pub_") ? rawSession : `pub_${rawSession}`
  const locale = body.locale ?? "el"
  const siteBase = company.siteUrl.replace(/\/$/, "")

  const headers: Record<string, string> = { "Content-Type": "application/json" }
  const apiKey = agentApiKey()
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`

  try {
    const upstream = await fetch(chatUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        message,
        sessionId,
        siteId: "taxbg",
        agentId: "taxbg-assistant",
        agentRole: "public",
        source: "taxbg-storefront",
        locale,
        canonicalHost: siteBase,
        channel: body.channel,
      }),
      signal: AbortSignal.timeout(45_000),
    })

    if (!upstream.ok) {
      console.error("Agent webhook error", upstream.status, await upstream.text())
      return NextResponse.json(
        {
          response:
            locale === "en"
              ? "Agent temporarily unavailable. Please use the contact form."
              : "Ο agent είναι προσωρινά μη διαθέσιμος. Αφήστε email στη φόρμα επικοινωνίας.",
        },
        { status: 200 }
      )
    }

    const data = (await upstream.json()) as {
      response?: string
      reply?: string
      message?: string
      sessionId?: string
    }

    return NextResponse.json({
      response:
        data.response ??
        data.reply ??
        data.message ??
        (locale === "en" ? "Thank you — we will contact you shortly." : "Ευχαριστούμε — θα επικοινωνήσουμε σύντομα."),
      sessionId: data.sessionId ?? sessionId,
    })
  } catch (e) {
    console.error("Agent chat fetch failed", e)
    return NextResponse.json(
      {
        response:
          locale === "en"
            ? "Network error. Please try again."
            : "Πρόβλημα δικτύου. Δοκιμάστε ξανά.",
      },
      { status: 502 }
    )
  }
}
