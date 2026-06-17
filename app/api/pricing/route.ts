import { allQuotes } from "@/lib/pricing"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    schema_version: "1.0",
    siteId: "taxbg",
    currency: "EUR",
    advancePaymentDiscount: "10%",
    quotes: allQuotes(),
  })
}
