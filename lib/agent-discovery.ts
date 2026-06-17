import { identity } from "@/content/identity"
import {
  routes,
  allGreekPaths,
  pathFor,
  servicePath,
  legalPath,
} from "@/content/routes"
import { services } from "@/content/services"
import { company } from "@/content/company"
import { formattedAddress } from "@/lib/google-maps"
import { siteUrl } from "@/lib/seo"

export type AgentSiteTree = {
  schema_version: string
  siteId: string
  generatedAt: string
  canonicalHost: string
  locales: string[]
  defaultLocale: string
  live: true
  counts: {
    services: number
    guideNodes: number
  }
  discovery: Array<{ order: number; path: string; type: string; note?: string }>
  paths: {
    core: string[]
    services: Array<{
      path: string
      pathEn: string
      id: string
      title: string
      tiers: number
    }>
    legal: string[]
  }
  commerce: {
    platform: string
    subscriptions: boolean
    advanceDiscount: string
    paymentLinks: boolean
  }
  location: {
    brand: string
    legalName: string
    addressEl: string
    addressEn: string
    geo: { latitude: number; longitude: number }
    openingHours: string
    googleBusinessProfileUrl: string
    contactPath: string
    mapsEmbed: string
  }
}

export async function buildAgentSiteTree(): Promise<AgentSiteTree> {
  const canonicalHost = siteUrl()
  const generatedAt = new Date().toISOString()

  const servicePaths = services.map((s) => ({
    path: servicePath(s.slug),
    pathEn: `/en/services/${s.slug.en}`,
    id: s.id,
    title: s.titleEl,
    tiers: s.tiers.length,
  }))

  const core = [
    "/",
    pathFor(routes.services),
    pathFor(routes.guide),
    pathFor(routes.pricing),
    pathFor(routes.contact),
    pathFor(routes.portal),
    pathFor(routes.blog),
    ...servicePaths.map((s) => s.path),
  ]

  const legal = [
    pathFor(routes.legal.privacy),
    pathFor(routes.legal.terms),
    pathFor(routes.legal.cookies),
  ]

  return {
    schema_version: "1.0",
    siteId: "taxbg",
    generatedAt,
    canonicalHost,
    locales: ["el", "en"],
    defaultLocale: "el",
    live: true,
    counts: {
      services: services.length,
      guideNodes: 8,
    },
    discovery: [
      { order: 1, path: "/llms.txt", type: "index", note: "public domain root" },
      { order: 2, path: "/llms_full.txt", type: "full_index", note: "public domain root" },
      { order: 3, path: "/identity.json", type: "identity", note: "public — NOT under /agent/" },
      { order: 4, path: "/agent/site-tree.json", type: "machine_tree" },
      { order: 5, path: "/agent/capabilities.json", type: "capabilities" },
      { order: 6, path: "/agent/guide.json", type: "guide_tree" },
    ],
    paths: {
      core,
      services: servicePaths,
      legal,
    },
    commerce: {
      platform: "nextjs-services",
      subscriptions: true,
      advanceDiscount: "10%",
      paymentLinks: true,
    },
    location: {
      brand: company.brand,
      legalName: company.legalName,
      addressEl: formattedAddress("el"),
      addressEn: formattedAddress("en"),
      geo: company.geo,
      openingHours: company.openingHours,
      googleBusinessProfileUrl: company.googleBusinessUrl,
      contactPath: pathFor(routes.contact),
      mapsEmbed: "Google Maps Embed on contact page (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY)",
    },
  }
}

export function formatLlmsIndex(tree: AgentSiteTree): string {
  const svc = tree.paths.services
    .map((s) => `- ${s.path} — ${s.title}`)
    .join("\n")

  return [
    "# TaxBG (taxbg.eu) — ευρετήριο agent",
    `# LIVE ${tree.generatedAt}`,
    "# Υπηρεσίες: ίδρυση εταιρείας Βουλγαρία, λογιστική — όχι e-shop",
    "# Stack: Next.js + n8n (agents.taxbg.eu) | Γλώσσες: el (κύρια), en",
    "",
    "## Site",
    `- Canonical: ${tree.canonicalHost}`,
    `- siteId: ${tree.siteId}`,
    `- Operator: ${company.brand}`,
    "- Brand emblem: /brand/emblem-wolf.webp (wolf head with wings)",
    "",
    "## Ανακάλυψη (σειρά — identity & llms ΔΗΜΟΣΙΑ, όχι μέσα στο /agent/)",
    "1. /llms.txt (αυτό)",
    "2. /llms_full.txt",
    "3. /identity.json (δημόσιο identity)",
    "4. /agent/site-tree.json",
    "5. /agent/capabilities.json",
    "6. /agent/guide.json",
    "",
    "## Κύριες υπηρεσίες",
    svc,
    "",
    "## Έξυπνος οδηγός",
    `- ${pathFor(routes.guide)} — τιμές, επιλογή υπηρεσίας`,
    "",
    "## Chat & APIs",
    "- POST /api/agent/chat (proxy → n8n)",
    "- POST /api/agent/lead",
    "- GET /api/pricing",
    "- POST /api/payments/create-link (Stripe, server-only)",
    "",
    "## Συνδρομές & πύλη πελάτη",
    "- 10% έκπτωση για ετήσια προπληρωμή λογιστικής",
    `- Πύλη πελάτη TaxBG: ${pathFor(routes.portal)} (δωρεάν με λογιστική)`,
    "- Cloud dashboard 24/7, δωρεάν τιμολόγηση, διασταύρωση τραπεζικού με παραστατικά",
    "- AI: παραστατικά με φωτογραφία κινητού ή email · πρόοδος υποχρεώσεων ΝΑΠ",
    "- Πρωτοπορία: πρώτοι στη Βουλγαρία με αυτή την ολοκληρωμένη λύση",
    "",
    "## Νομική ταυτότητα",
    `- Εμπορική ονομασία: ${company.brand}`,
    `- Νομικό πρόσωπο: ${company.legalName} (UIC ${company.uic})`,
    `- Μητρώο: ${company.registryUrl}`,
    `- Google Business: ${company.googleBusinessUrl}`,
    `- Διεύθυνση: ${formattedAddress("el")}`,
    `- Χάρτης: ${pathFor(routes.contact)}`,
    `- Απόρρητο: ${legalPath(routes.legal.privacy, "el")}`,
    `- GDPR: ${legalPath(routes.legal.gdpr, "el")}`,
    "- Δεδομένα: διατήρηση για συνέχεια — διαγραφή κατόπιν αιτήματος",
    "",
    "## Περιορισμοί",
    "- Όχι νομικές συμβουλές",
    "- Όχι αυτόνομες πληρωμές από agent",
    "- Web/agentic: σύντομη ενότητα — πλήρης κατάλογος σε ξεχωριστό site",
    "",
  ].join("\n")
}

export function formatLlmsFull(tree: AgentSiteTree): string {
  return [
    "# TaxBG — εκτεταμένη τεκμηρίωση για agents",
    `# LIVE ${tree.generatedAt} | siteId: ${tree.siteId}`,
    "",
    "## Επιχείρηση",
    "Η TaxBG (από 2013) εξειδικεύεται σε:",
    "1. Ίδρυση εταιρείας στη Βουλγαρία (Μ.Ε.Π.Ε., Π.Ε.Π.Ε., Α.Ε.)",
    "2. Λογιστική + cloud πύλη πελάτη (24/7, δωρεάν τιμολόγηση, AI παραστατικά, ΝΑΠ)",
    "3. Σύντομη ενότητα web/agentic υπηρεσιών",
    "",
    "### Πύλη πελάτη (συμπεριλαμβάνεται στη λογιστική)",
    "- Παρακολούθηση επιχείρησης, υποχρεσιών, τραπεζικού λογαριασμού",
    "- Διασταύρωση κινήσεων με τιμολόγια/έξοδα",
    "- AI agents: δέχονται παραστατικά με φωτογραφία smartphone ή email",
    "- AI agents: δέχονται τραπεζικά ενημερωτικά με email",
    "- Πρόοδος υποχρεώσεων προς ΝΑΠ (βουλγαρικές φορολογικές αρχές)",
    "- Πρώτοι στη Βουλγαρία — δεν αναφέρεται εσωτερικό όνομα πλατφόρμας στο site",
    "",
    "Επικοινωνία: Ελληνικά & Αγγλικά. Ιδρυτές: Παναγιώτης Κορφοξυλιώτης, Yanko Boev.",
    "",
    "## Αρχιτεκτονική agent",
    "| Στοιχείο | Path | Σημείωση |",
    "|----------|------|----------|",
    "| LLM index | /llms.txt | Δημόσιο, root |",
    "| LLM full | /llms_full.txt | Δημόσιο, root |",
    "| Identity | /identity.json | Δημόσιο, root — ΟΧΙ /agent/ |",
    "| Site tree | /agent/site-tree.json | Machine |",
    "| Capabilities | /agent/capabilities.json | Machine |",
    "| Guide | /agent/guide.json | Machine |",
    "| Chat | POST /api/agent/chat | Proxy n8n |",
    "",
    "## Υπηρεσίες & τιμές",
    ...services.flatMap((s) => [
      `### ${s.titleEl}`,
      s.descriptionEl,
      ...s.tiers.map(
        (t) =>
          `- ${t.nameEl}: ${t.priceEur}€ (${t.period === "month" ? "μήνα" : t.period === "year" ? "έτος" : "εφάπαξ"})`
      ),
      "",
    ]),
    "## Έκπτωση προπληρωμής",
    "10% για ετήσια συνδρομή λογιστικής με προπληρωμή.",
    "",
    "## SEO paths (ελληνικά)",
    ...allGreekPaths().map((p) => `- ${p}`),
    "",
    "## Identity JSON",
    `Δείτε /identity.json — agentId: ${identity.agentId}`,
    "",
  ].join("\n")
}

export const agentDiscoveryHeaders = {
  "Cache-Control": "no-store, max-age=0",
} as const
