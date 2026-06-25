import { company } from "./company"
import { routes } from "./routes"

/**
 * Public agent identity — served at /identity.json (NOT under /agent/).
 * LLMs index at /llms.txt and /llms_full.txt (domain root).
 */
export const identity = {
  schema_version: "1.0",
  siteId: "taxbg",
  agentId: "taxbg-assistant",
  displayName: "Τζένη Καρύδη",
  displayNameEn: "Jenny Karidi",
  publicTitleEl: "AI εκπρόσωπος",
  publicTitleEn: "AI taxbg Assistant",
  type: "ai_assistant",
  locale: "el",
  locales: ["el", "en"],
  brand: {
    logoUrl: "/brand/emblem-wolf.webp",
    emblemUrl: "/brand/emblem-wolf.webp",
    tagline: "Financial consulting & accounting services",
  },
  operator: {
    brand: company.brand,
    legalName: company.legalName,
    legalNameShort: company.legalNameShort,
    uic: company.uic,
    registryUrl: company.registryUrl,
    googleBusinessProfileUrl: company.googleBusinessUrl,
    website: company.siteUrl,
    email: company.email,
    phone: company.phone,
    gdprEmail: company.gdprEmail,
    founded: company.foundedYear,
    founders: company.founders,
    location: {
      address: company.address,
      geo: company.geo,
      openingHours: company.openingHours,
      googleMapsProfileUrl: company.googleBusinessUrl,
      mapsDirectionsQuery: `${company.brand}, ${company.address.streetEn}, ${company.address.postalCode} ${company.address.localityEn}, ${company.address.countryNameEn}`,
    },
  },
  legal: {
    privacyUrl: `/${routes.legal.privacy.el}`,
    termsUrl: `/${routes.legal.terms.el}`,
    cookiesUrl: `/${routes.legal.cookies.el}`,
    gdprUrl: `/${routes.legal.gdpr.el}`,
    dataRetention:
      "Client data retained for service continuity; not auto-deleted unless erasure requested or required by law",
    registryNote:
      "Business solutions EOOD must link to registryUrl wherever legal name appears",
  },
  disclosure: {
    el: `Ο ${company.agentName} είναι βοηθός τεχνητής νοημοσύνης (AI) για συμβουλευτική, τιμολόγηση και υποστήριξη. Δεν είναι άνθρωπος.`,
    en: `${company.agentName} is an AI assistant for consulting, pricing and support. Not a human.`,
    euAiAct: true,
    humanOversight:
      "Συμβάσεις, προσφορές και πληρωμές εγκρίνονται από άνθρωπο· ο agent δεν ολοκληρώνει συναλλαγές μόνος του.",
  },
  scope: {
    site: "taxbg.eu",
    modes: [
      "public_sales_chat",
      "service_guide_assist",
      "pricing_quotes",
      "subscription_info",
      "client_portal_info",
    ],
    mainServices: [
      "company_formation_bulgaria",
      "accounting_bulgaria",
    ],
    excludes: [
      "legal_advice",
      "autonomous_payments",
      "medical_diagnosis",
    ],
  },
  integration: {
    storefrontChat: "POST /api/agent/chat → n8n webhook (no AI keys in browser)",
    leadCapture: "POST /api/agent/lead",
    pricing: "GET /api/pricing",
    paymentLinks: "POST /api/payments/create-link (server, Stripe)",
    note: "Agent logic runs on operator VPS via n8n at agents.taxbg.eu",
  },
  discovery: {
    llms_txt: "/llms.txt",
    llms_full_txt: "/llms_full.txt",
    identity_json: "/identity.json",
    agent_info_json: "/agent-info.json",
    site_tree: "/agent/site-tree.json",
    capabilities: "/agent/capabilities.json",
    guide: "/agent/guide.json",
    services_catalog: "/agent/services-catalog.json",
    registry: "/agent/registry.json",
    trust: "/agent/trust.json",
  },
  dataProcessing: {
    chatRetention:
      "Τα δεδομένα πελατών (συμπεριλαμβανομένων συνομιλιών AI και πύλης) διατηρούνται για συνέχεια εξυπηρέτησης — όχι αυτόματη διαγραφή.",
    erasureOnRequest: true,
    privacyUrl: `/${routes.legal.privacy.el}`,
    gdprUrl: `/${routes.legal.gdpr.el}`,
  },
  commerce: {
    platform: "Next.js services (no Medusa)",
    advancePaymentDiscount: "10%",
    subscriptions: true,
    servicesUrl: `/${routes.services.el}`,
    guideUrl: `/${routes.guide.el}`,
    pricingUrl: `/${routes.pricing.el}`,
    clientPortalUrl: `/${routes.portal.el}`,
  },
  clientPlatform: {
    includedWith: "accounting_subscription",
    publicBrand: "TaxBG Client Portal",
    features: [
      "24_7_business_dashboard",
      "free_invoicing",
      "bank_invoice_reconciliation",
      "ai_invoice_photo_upload",
      "ai_invoice_email_ingest",
      "nap_obligation_tracking",
    ],
    pioneerClaim:
      "First in Bulgaria to combine accounting with cloud portal and AI document ingestion",
    note: "Internal cloud platform — not named on public site",
  },
  updatedAt: "2026-06-10",
} as const

export const widgetDisclosure = {
  el: "Συνομιλείτε με την Τζένη Καρύδη, AI εκπρόσωπο της TaxBG — όχι άνθρωπο.",
  en: "You are chatting with Jenny Karidi, TaxBG's AI representative — not a human.",
}
