import type { LegalRouteKey } from "./routes"

export type LegalSection = {
  id: string
  titleEl: string
  titleEn: string
  bodyEl: string[]
  bodyEn: string[]
}

export type LegalPageDef = {
  key: LegalRouteKey
  titleEl: string
  titleEn: string
  descriptionEl: string
  descriptionEn: string
  sections: LegalSection[]
}

/** Placeholders: {{LEGAL_ENTITY}}, {{BRAND}}, {{EMAIL}}, {{GDPR_EMAIL}}, {{SITE}} */
export const legalPages: Record<LegalRouteKey, LegalPageDef> = {
  privacy: {
    key: "privacy",
    titleEl: "Πολιτική απορρήτου",
    titleEn: "Privacy policy",
    descriptionEl:
      "Πώς η TaxBG ({{LEGAL_ENTITY}}) συλλέγει και επεξεργάζεται προσωπικά δεδομένα.",
    descriptionEn:
      "How TaxBG ({{LEGAL_ENTITY}}) collects and processes personal data.",
    sections: [
      {
        id: "controller",
        titleEl: "1. Υπεύθυνος επεξεργασίας",
        titleEn: "1. Data controller",
        bodyEl: [
          "Εμπορική ονομασία: {{BRAND}}. Νομικό πρόσωπο: {{LEGAL_ENTITY}}.",
          "Η εταιρεία είναι εγγεγραμμένη στο Τυπογραφείο Εμπορικού Μητρώου της Βουλγαρίας (UIC 204604014). Επίσημη κατάσταση: σύνδεσμος στο μητρώο από κάθε αναφορά στο νομικό όνομα.",
          "Επικοινωνία: {{EMAIL}}. Για θέματα προστασίας δεδομένων: {{GDPR_EMAIL}} (θέμα «GDPR»).",
        ],
        bodyEn: [
          "Trading name: {{BRAND}}. Legal entity: {{LEGAL_ENTITY}}.",
          "Registered in the Bulgarian Commercial Register (UIC 204604014). Official status via registry link on every legal name reference.",
          "Contact: {{EMAIL}}. Data protection: {{GDPR_EMAIL}} (subject «GDPR»).",
        ],
      },
      {
        id: "data",
        titleEl: "2. Δεδομένα που συλλέγουμε",
        titleEn: "2. Data we collect",
        bodyEl: [
          "Φόρμα επικοινωνίας & leads: όνομα, email, τηλέφωνο, μήνυμα.",
          "Συνδρομητές λογιστικής / πύλη πελάτη: στοιχεία εταιρείας, τιμολόγια, τραπεζικές κινήσεις, υποχρεώσεις ΝΑΠ, έγγραφα που ανεβάζετε (φωτογραφία ή email).",
          "AI βοηθός ({{BRAND}} Assistant): μηνύματα συνομιλίας, sessionId, γλώσσα, στοιχεία που δηλώνετε εθελοντικά.",
          "Τεχνικά: IP, logs ασφαλείας, cookies (βλ. πολιτική cookies).",
          "Δεν συλλέγουμε ευαίσθητα δεδομένα εκτός αν απαιτείται νομικά για λογιστικές υπηρεσίες.",
        ],
        bodyEn: [
          "Contact & lead forms: name, email, phone, message.",
          "Accounting subscribers / client portal: company details, invoices, bank movements, NAP obligations, documents you upload (photo or email).",
          "AI assistant ({{BRAND}} Assistant): chat messages, sessionId, locale, voluntary details.",
          "Technical: IP, security logs, cookies (see cookie policy).",
          "We do not collect sensitive data unless legally required for accounting services.",
        ],
      },
      {
        id: "purposes",
        titleEl: "3. Σκοποί & νομικές βάσεις",
        titleEn: "3. Purposes & legal bases",
        bodyEl: [
          "Σύμβαση (άρθρο 6(1)(β) GDPR): ίδρυση εταιρείας, λογιστική, συνδρομές, πύλη πελάτη.",
          "Έννομο συμφέρον (6(1)(στ)): ασφάλεια, βελτίωση υπηρεσιών, AI υποστήριξη, συνέχεια εξυπηρέτησης.",
          "Συγκατάθεση (6(1)(α)): μη απαραίτητα cookies, marketing όπου ενεργοποιείται.",
          "Νομική υποχρέωση (6(1)(γ)): φορολογικά & λογιστικά αρχεία Βουλγαρίας/ΕΕ.",
        ],
        bodyEn: [
          "Contract (Art. 6(1)(b) GDPR): formation, accounting, subscriptions, client portal.",
          "Legitimate interest (6(1)(f)): security, service improvement, AI support, service continuity.",
          "Consent (6(1)(a)): non-essential cookies, marketing where enabled.",
          "Legal obligation (6(1)(c)): tax and accounting records in Bulgaria/EU.",
        ],
      },
      {
        id: "retention",
        titleEl: "4. Διάρκεια τήρησης — σημαντικό",
        titleEn: "4. Retention — important",
        bodyEl: [
          "Τα δεδομένα πελατών διατηρούνται για λόγους συνέχειας εξυπηρέτησης, ιστορικού συνεργασίας και νόμιμων λογιστικών/φορολογικών υποχρεώσεων.",
          "ΔΕΝ πραγματοποιούμε αυτόματη ή περιοδική διαγραφή δεδομένων πελατών — συμπεριλαμβανομένων συνομιλιών AI agent και αρχείων πύλης — εκτός αν ζητήσετε διαγραφή ή όπου απαιτείται από νόμο.",
          "Μπορείτε ανά πάσα στιγμή να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή: {{GDPR_EMAIL}} ή σελίδα δικαιωμάτων GDPR.",
          "Φορολογικά αρχεία: όσο απαιτεί η βουλγαρική και ευρωπαϊκή νομοθεσία (συνήθως πολλά έτη).",
        ],
        bodyEn: [
          "Client data is retained for service continuity, relationship history and lawful accounting/tax obligations.",
          "We do NOT automatically or periodically delete client data — including AI chat and portal records — unless you request erasure or law requires it.",
          "You may request access, rectification or erasure at any time: {{GDPR_EMAIL}} or our GDPR rights page.",
          "Tax records: as required by Bulgarian and EU law (often several years).",
        ],
      },
      {
        id: "sharing",
        titleEl: "5. Αποδέκτες",
        titleEn: "5. Recipients",
        bodyEl: [
          "Hosting/VPS (ΕΕ), n8n αυτοματισμοί, Stripe πληρωμές, email — μόνο όσο απαιτείται για την υπηρεσία.",
          "Δεν πωλούμε προσωπικά δεδομένα.",
          "Διαβιβάσεις εκτός ΕΕ μόνο με κατάλληλες εγγυήσεις.",
        ],
        bodyEn: [
          "Hosting/VPS (EU), n8n automations, Stripe payments, email — only as needed for the service.",
          "We do not sell personal data.",
          "Transfers outside the EU only with appropriate safeguards.",
        ],
      },
    ],
  },
  terms: {
    key: "terms",
    titleEl: "Όροι & προϋποθέσεις",
    titleEn: "Terms & conditions",
    descriptionEl: "Συμβατικοί όροι υπηρεσιών {{BRAND}} (ίδρυση, λογιστική, πύλη).",
    descriptionEn: "Service contract terms for {{BRAND}} (formation, accounting, portal).",
    sections: [
      {
        id: "parties",
        titleEl: "1. Συμβαλλόμενα μέρη",
        titleEn: "1. Parties",
        bodyEl: [
          "Πάροχος: {{LEGAL_ENTITY}}, εμπορική ονομασία {{BRAND}}, UIC 204604014.",
          "Πελάτης: φυσικό ή νομικό πρόσωπο που χρησιμοποιεί τον ιστότοπο ή συνάπτει υπηρεσίες.",
        ],
        bodyEn: [
          "Provider: {{LEGAL_ENTITY}}, trading as {{BRAND}}, UIC 204604014.",
          "Client: individual or legal entity using the site or contracting services.",
        ],
      },
      {
        id: "services",
        titleEl: "2. Υπηρεσίες",
        titleEn: "2. Services",
        bodyEl: [
          "Ίδρυση εταιρείας στη Βουλγαρία, λογιστική υποστήριξη, cloud πύλη πελάτη, AI βοηθός — όχι νομικές συμβουλές.",
          "Οι περιγραφές στον ιστότοπο είναι ενημερωτικές· δεσμευτική προσφορά μόνο με έγγραφη επιβεβαίωση.",
        ],
        bodyEn: [
          "Company formation in Bulgaria, accounting, client cloud portal, AI assistant — not legal advice.",
          "Site descriptions are informational; binding offers only with written confirmation.",
        ],
      },
      {
        id: "acceptance",
        titleEl: "3. Αποδοχή όρων",
        titleEn: "3. Acceptance",
        bodyEl: [
          "Με τη σύναψη υπηρεσίας ή χρήση της πύλης πελάτη αποδέχεστε τους παρόντες όρους και την πολιτική απορρήτου.",
          "Η κύρια επικοινωνία γίνεται μέσω AI agent· η φόρμα επικοινωνίας είναι προαιρετικό fallback.",
        ],
        bodyEn: [
          "By contracting a service or using the client portal you accept these terms and the privacy policy.",
          "Primary communication is via the AI agent; the contact form is an optional fallback.",
        ],
      },
      {
        id: "payment",
        titleEl: "4. Τιμές & πληρωμή",
        titleEn: "4. Pricing & payment",
        bodyEl: [
          "Οι τιμές αναφέρονται σε EUR. Έκπτωση 10% για ετήσια προπληρωμή λογιστικής όπου αναφέρεται.",
          "Επιπλέον υπηρεσίες μέσω payment links μετά συνεννόηση.",
        ],
        bodyEn: [
          "Prices in EUR. 10% discount for annual accounting prepayment where stated.",
          "Extra services via payment links after agreement.",
        ],
      },
      {
        id: "liability",
        titleEl: "5. Ευθύνη",
        titleEn: "5. Liability",
        bodyEl: [
          "Η {{BRAND}} ενεργεί με επαγγελματική diligence· δεν ευθύνεται για έμμεσες ζημίες εκτός αν απαγορεύεται από νόμο.",
          "Ο πελάτης υποχρεούται να παρέχει ακριβή στοιχεία και έγκαιρα παραστατικά.",
        ],
        bodyEn: [
          "{{BRAND}} acts with professional diligence; not liable for indirect damages except where prohibited by law.",
          "The client must provide accurate information and timely documents.",
        ],
      },
      {
        id: "law",
        titleEl: "6. Εφαρμοστέο δίκαιο",
        titleEn: "6. Governing law",
        bodyEl: [
          "Εφαρμοστέο δίκαιο: Βουλγαρία. Αρμόδια δικαιοσύνη: κατά τόπο έδρας του παρόχου.",
        ],
        bodyEn: [
          "Governing law: Bulgaria. Courts: at provider's registered seat.",
        ],
      },
    ],
  },
  termsOfUse: {
    key: "termsOfUse",
    titleEl: "Όροι χρήσης",
    titleEn: "Terms of use",
    descriptionEl: "Κανόνες χρήσης του ιστότοπου {{SITE}} και του AI agent.",
    descriptionEn: "Rules for using {{SITE}} and the AI agent.",
    sections: [
      {
        id: "scope",
        titleEl: "1. Πεδίο",
        titleEn: "1. Scope",
        bodyEl: [
          "Οι παρόντες όροι διέπουν τη χρήση του ιστότοπου, του AI agent και των εργαλείων self-service (οδηγός τιμών, πύλη).",
          "Για συμβατικές υπηρεσίες ισχύουν οι Όροι & προϋποθέσεις.",
        ],
        bodyEn: [
          "These terms govern use of the website, AI agent, and self-service tools (price wizard, portal).",
          "Contracted services are governed by Terms & conditions.",
        ],
      },
      {
        id: "agent",
        titleEl: "2. AI agent",
        titleEn: "2. AI agent",
        bodyEl: [
          "Ο agent παρέχει πληροφόρηση και ενδεικτικά εύρη τιμών — όχι νομικές ή φορολογικές συμβουλές.",
          "Μην εισάγετε κωδικούς ή ευαίσθητα δεδομένα στη συνομιλία.",
        ],
        bodyEn: [
          "The agent provides information and indicative price ranges — not legal or tax advice.",
          "Do not enter passwords or sensitive data in chat.",
        ],
      },
      {
        id: "acceptable",
        titleEl: "3. Αποδεκτή χρήση",
        titleEn: "3. Acceptable use",
        bodyEl: [
          "Απαγορεύεται κακόβουλη χρήση, spam, αυτοματοποιημένα bots εκτός εγκεκριμένων integrations.",
          "Η {{BRAND}} μπορεί να περιορίσει πρόσβαση σε περίπτωση κατάχρησης.",
        ],
        bodyEn: [
          "Malicious use, spam, and unapproved automated bots are prohibited.",
          "{{BRAND}} may restrict access in case of abuse.",
        ],
      },
    ],
  },
  cookies: {
    key: "cookies",
    titleEl: "Πολιτική cookies",
    titleEn: "Cookie policy",
    descriptionEl: "Πώς χρησιμοποιούμε cookies στο {{SITE}}.",
    descriptionEn: "How we use cookies on {{SITE}}.",
    sections: [
      {
        id: "what",
        titleEl: "1. Τι είναι cookies",
        titleEn: "1. What are cookies",
        bodyEl: [
          "Μικρά αρχεία στο πρόγραμμα περιήγησης για λειτουργία, ασφάλεια και προτιμήσεις.",
        ],
        bodyEn: [
          "Small browser files for functionality, security and preferences.",
        ],
      },
      {
        id: "types",
        titleEl: "2. Τύποι που χρησιμοποιούμε",
        titleEn: "2. Types we use",
        bodyEl: [
          "Απαραίτητα: συγκατάθεση cookies (taxbg_cookie_consent), agent session, ασφάλεια — δεν απαιτούν συγκατάθεση.",
          "Λειτουργικά: γλώσσα, προτιμήσεις πύλης — μετά την αποδοχή σας στο banner.",
          "Αναλυτικά: μόνο αν ενεργοποιηθούν στο μέλλον — θα ζητείται ξεχωριστή συγκατάθεση.",
        ],
        bodyEn: [
          "Essential: cookie consent (taxbg_cookie_consent), agent session, security — no consent required.",
          "Functional: language, portal preferences — after banner acceptance.",
          "Analytics: only if enabled later — separate consent will be requested.",
        ],
      },
      {
        id: "manage",
        titleEl: "3. Διαχείριση",
        titleEn: "3. Management",
        bodyEl: [
          "Μπορείτε να απορρίψετε μη απαραίτητα cookies από το banner ή τις ρυθμίσεις browser.",
          "Η απόρριψη μπορεί να περιορίσει ορισμένες λειτουργίες.",
        ],
        bodyEn: [
          "You may reject non-essential cookies via the banner or browser settings.",
          "Rejection may limit some features.",
        ],
      },
    ],
  },
  gdpr: {
    key: "gdpr",
    titleEl: "Δικαιώματα υποκειμένων (GDPR)",
    titleEn: "Data subject rights (GDPR)",
    descriptionEl:
      "Τα δικαιώματά σας έναντι της {{LEGAL_ENTITY}} / {{BRAND}}.",
    descriptionEn:
      "Your rights regarding {{LEGAL_ENTITY}} / {{BRAND}}.",
    sections: [
      {
        id: "rights",
        titleEl: "1. Δικαιώματα",
        titleEn: "1. Your rights",
        bodyEl: [
          "Πρόσβαση, διόρθωση, διαγραφή («δικαίωμα στη λήθη»), περιορισμός, φορητότητα, εναντίωση, ανάκληση συγκατάθεσης.",
          "Καταγγελία στην Κομισιόν Προστασίας Προσωπικών Δεδομένων της Βουλγαρίας (CPDP).",
        ],
        bodyEn: [
          "Access, rectification, erasure, restriction, portability, objection, withdraw consent.",
          "Complaint to the Bulgarian Commission for Personal Data Protection (CPDP).",
        ],
      },
      {
        id: "retention",
        titleEl: "2. Διαγραφή vs συνέχεια",
        titleEn: "2. Erasure vs continuity",
        bodyEl: [
          "Διατηρούμε δεδομένα για συνέχεια εξυπηρέτησης και νόμιμες υποχρεώσεις — δεν διαγράφουμε αυτόματα.",
          "Διαγραφή κατόπιν αιτήματός σας: στέλνετε email στο {{GDPR_EMAIL}} με θέμα «Αίτημα διαγραφής GDPR».",
          "Θα απαντήσουμε εντός 30 ημερών. Ορισμένα αρχεία μπορεί να διατηρηθούν αν απαιτείται από νόμο.",
        ],
        bodyEn: [
          "We retain data for service continuity and legal obligations — no automatic deletion.",
          "Erasure on request: email {{GDPR_EMAIL}} subject «GDPR erasure request».",
          "We respond within 30 days. Some records may be kept where required by law.",
        ],
      },
      {
        id: "agent",
        titleEl: "3. AI agent & πύλη",
        titleEn: "3. AI agent & portal",
        bodyEl: [
          "Μπορείτε να ζητήσετε διαγραφή ιστορικού συνομιλίας AI ή αρχείων πύλης — στοχευμένη διαγραφή, όχι μαζική για άλλους πελάτες.",
        ],
        bodyEn: [
          "You may request deletion of AI chat history or portal files — targeted erasure, not bulk for other clients.",
        ],
      },
    ],
  },
}

export function getLegalPage(key: LegalRouteKey): LegalPageDef {
  return legalPages[key]
}
