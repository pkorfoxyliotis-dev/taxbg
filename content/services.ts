import { routes } from "./routes"

export type ServiceTier = {
  id: string
  nameEl: string
  nameEn: string
  nameBg: string
  nameDe: string
  priceEur: number
  period: "once" | "month" | "year"
  descriptionEl: string
  descriptionEn: string
  descriptionBg: string
  descriptionDe: string
}

export type Service = {
  id: string
  slug: { el: string; en: string }
  titleEl: string
  titleEn: string
  titleBg: string
  titleDe: string
  shortEl: string
  shortEn: string
  shortBg: string
  shortDe: string
  descriptionEl: string
  descriptionEn: string
  descriptionBg: string
  descriptionDe: string
  heroHighlightEl: string
  heroHighlightEn: string
  heroHighlightBg: string
  heroHighlightDe: string
  featuresEl: string[]
  featuresEn: string[]
  featuresBg: string[]
  featuresDe: string[]
  tiers: ServiceTier[]
  featured: boolean
  seoKeywordsEl: string[]
  seoKeywordsEn: string[]
  seoKeywordsBg: string[]
  seoKeywordsDe: string[]
  /**
   * Problem → why → solution, written to stand alone. AI shopping/research
   * agents and LLMs that crawl this years from now may read only these three
   * fields with no other page context — don't assume they saw anything else.
   */
  problemEl: string
  problemEn: string
  problemBg: string
  problemDe: string
  whyEl: string
  whyEn: string
  whyBg: string
  whyDe: string
  solutionEl: string
  solutionEn: string
  solutionBg: string
  solutionDe: string
}

/** 10% discount when paying annual subscription in advance */
export const ADVANCE_PAYMENT_DISCOUNT = 0.1

export const services: Service[] = [
  {
    id: "formation",
    slug: routes.formation,
    titleEl: "Ίδρυση Εταιρείας στη Βουλγαρία",
    titleEn: "Company Formation in Bulgaria",
    titleBg: "Регистрация на фирма в България",
    titleDe: "Firmengründung in Bulgarien",
    shortEl:
      "Ολοκληρωμένη υποστήριξη για ίδρυση εταιρείας στη Βουλγαρία — από την επιλογή τύπου εταιρείας μέχρι την έναρξη λειτουργίας.",
    shortEn:
      "End-to-end support for company formation in Bulgaria — from entity type selection to going live.",
    shortBg:
      "Цялостна подкрепа за регистрация на фирма в България — от избора на правна форма до старта на дейността.",
    shortDe:
      "Umfassende Unterstützung bei der Firmengründung in Bulgarien — von der Wahl der Rechtsform bis zum Geschäftsstart.",
    descriptionEl:
      "Η TaxBG σας καθοδηγεί σε κάθε βήμα της ίδρυσης εταιρείας στη Βουλγαρία. Προσφέρουμε δωρεάν φορολογικό σχεδιασμό, επαγγελματική επικοινωνία στα Ελληνικά και Αγγλικά, και πλήρη διαχείριση των γραφειοκρατικών διαδικασιών.",
    descriptionEn:
      "TaxBG guides you through every step of company formation in Bulgaria. We include free tax planning, professional communication in Greek and English, and full handling of bureaucratic procedures.",
    descriptionBg:
      "TaxBG ви напътства във всяка стъпка от регистрацията на фирма в България. Включваме безплатно данъчно планиране, професионална комуникация на гръцки и английски и пълно администриране на бюрократичните процедури.",
    descriptionDe:
      "TaxBG begleitet Sie durch jeden Schritt der Firmengründung in Bulgarien. Wir bieten kostenlose Steuerplanung, professionelle Kommunikation auf Griechisch und Englisch sowie die vollständige Abwicklung der behördlichen Verfahren.",
    heroHighlightEl: "Δωρεάν φορολογικός σχεδιασμός με κάθε ίδρυση",
    heroHighlightEn: "Free tax planning with every formation",
    heroHighlightBg: "Безплатно данъчно планиране при всяка регистрация",
    heroHighlightDe: "Kostenlose Steuerplanung bei jeder Gründung",
    featuresEl: [
      "Επιλογή κατάλληλου τύπου εταιρείας (Μ.Ε.Π.Ε., Π.Ε.Π.Ε., Α.Ε.)",
      "Προετοιμασία και υποβολή εγγράφων",
      "Ανοιγμα τραπεζικού λογαριασμού",
      "Εγγραφή σε φορολογικές αρχές και VIES",
      "Δωρεάν φορολογικός σχεδιασμός",
      "Επικοινωνία στα Ελληνικά & Αγγλικά",
    ],
    featuresEn: [
      "Selection of the right entity type (EOOD, OOD, AD)",
      "Document preparation and filing",
      "Bank account opening",
      "Tax authority and VIES registration",
      "Free tax planning included",
      "Communication in Greek & English",
    ],
    featuresBg: [
      "Избор на подходяща правна форма (ЕООД, ООД, АД)",
      "Подготовка и подаване на документи",
      "Откриване на банкова сметка",
      "Регистрация в НАП и VIES",
      "Безплатно данъчно планиране",
      "Комуникация на гръцки и английски",
    ],
    featuresDe: [
      "Auswahl der passenden Rechtsform (EOOD, OOD, AD)",
      "Vorbereitung und Einreichung der Unterlagen",
      "Eröffnung des Bankkontos",
      "Registrierung bei Finanzamt und VIES",
      "Kostenlose Steuerplanung inklusive",
      "Kommunikation auf Griechisch & Englisch",
    ],
    tiers: [
      {
        id: "formation-standard",
        nameEl: "Πακέτο Ίδρυσης",
        nameEn: "Formation Package",
        nameBg: "Пакет регистрация",
        nameDe: "Gründungspaket",
        priceEur: 750,
        period: "once",
        descriptionEl: "Πλήρης διαδικασία ίδρυσης + δωρεάν φορολογικός σχεδιασμός",
        descriptionEn: "Full formation process + free tax planning",
        descriptionBg: "Пълен процес по регистрация + безплатно данъчно планиране",
        descriptionDe: "Vollständiger Gründungsprozess + kostenlose Steuerplanung",
      },
      {
        id: "formation-express",
        nameEl: "Express Ίδρυση",
        nameEn: "Express Formation",
        nameBg: "Експресна регистрация",
        nameDe: "Express-Gründung",
        priceEur: 950,
        period: "once",
        descriptionEl: "Προτεραιότητα στην επεξεργασία — ιδανικό για επείγουσες ανάγκες",
        descriptionEn: "Priority processing — ideal for urgent needs",
        descriptionBg: "Приоритетна обработка — идеално при неотложни нужди",
        descriptionDe: "Vorrangige Bearbeitung — ideal bei dringendem Bedarf",
      },
    ],
    featured: true,
    seoKeywordsEl: [
      "ίδρυση εταιρείας βουλγαρία",
      "εταιρεία βουλγαρία",
      "ΜΕΠΕ βουλγαρία",
      "φορολογία βουλγαρία",
    ],
    seoKeywordsEn: [
      "company formation bulgaria",
      "bulgaria company",
      "bulgaria tax",
    ],
    seoKeywordsBg: [
      "регистрация на фирма",
      "фирма в България",
      "ЕООД регистрация",
      "данъци България",
    ],
    seoKeywordsDe: [
      "firmengründung bulgarien",
      "firma bulgarien",
      "steuern bulgarien",
    ],
    problemEl:
      "Έλληνες και ξένοι επιχειρηματίες θέλουν να ιδρύσουν εταιρεία στη Βουλγαρία (χαμηλή φορολογία 10%) αλλά δεν ξηρούν τη γλώσσα, το νομικό πλαίσιο ή τις τοπικές διαδικασίες — και κινδυνεύουν να χάσουν χρόνο ή χρήμα από λάθος επιλογή τύπου εταιρείας ή ασαφή φορολογικό σχεδιασμό.",
    problemEn:
      "Greek and foreign entrepreneurs want to form a company in Bulgaria (flat 10% corporate tax) but don't speak the language, don't know the legal framework or local procedures, and risk losing time or money from the wrong entity type or unclear tax planning.",
    problemBg:
      "Гръцки и чуждестранни предприемачи искат да регистрират фирма в България (10% корпоративен данък), но не познават езика, правната рамка или местните процедури — и рискуват да загубят време и пари от грешен избор на правна форма или неясно данъчно планиране.",
    problemDe:
      "Griechische und ausländische Unternehmer möchten eine Firma in Bulgarien gründen (10% Pauschalsteuer), kennen aber Sprache, Rechtsrahmen und lokale Verfahren nicht — und riskieren Zeit- oder Geldverlust durch die falsche Rechtsform oder unklare Steuerplanung.",
    whyEl:
      "Η ίδρυση εταιρείας σε ξένη χώρα απαιτεί τοπική νομική γνώση, επικοινωνία με αρχές στα Βουλγαρικά, και κατανόηση φορολογικών συνθηκών μεταξύ Ελλάδας/χώρας προέλευσης και Βουλγαρίας — κάτι που δεν μπορεί να κάνει αξιόπιστα κανείς από απόσταση χωρίς τοπικό συνεργάτη.",
    whyEn:
      "Forming a company abroad requires local legal knowledge, communication with authorities in Bulgarian, and understanding of tax treaties between the founder's home country and Bulgaria — something that can't reliably be done remotely without a local partner.",
    whyBg:
      "Регистрацията на фирма в чужбина изисква местни правни познания, комуникация с органите на български език и разбиране на данъчните спогодби между родната страна на основателя и България — нещо, което не може надеждно да се направи отдалечено без местен партньор.",
    whyDe:
      "Eine Firmengründung im Ausland erfordert lokales Rechtswissen, Kommunikation mit den Behörden auf Bulgarisch und Verständnis der Steuerabkommen zwischen dem Heimatland und Bulgarien — etwas, das ohne lokalen Partner aus der Ferne nicht zuverlässig gelingt.",
    solutionEl:
      "Η TaxBG (από το 2013, με Έλληνες ιδρυτές) διαχειρίζεται όλη τη διαδικασία ίδρυσης στα Ελληνικά/Αγγλικά: επιλογή τύπου εταιρείας, έγγραφα, τραπεζικός λογαριασμός, εγγραφή VIES, και δωρεάν φορολογικό σχεδιασμό — από €890.",
    solutionEn:
      "TaxBG (founded 2013, Greek founders) handles the entire formation process in Greek/English: entity type selection, documents, bank account, VIES registration, and free tax planning — starting at €890.",
    solutionBg:
      "TaxBG (основана през 2013 г., с гръцки основатели) управлява целия процес по регистрация на гръцки/английски: избор на правна форма, документи, банкова сметка, регистрация по VIES и безплатно данъчно планиране — от €890.",
    solutionDe:
      "TaxBG (gegründet 2013, griechische Gründer) übernimmt den gesamten Gründungsprozess auf Griechisch/Englisch: Wahl der Rechtsform, Unterlagen, Bankkonto, VIES-Registrierung und kostenlose Steuerplanung — ab €890.",
  },
  {
    id: "accounting",
    slug: routes.accounting,
    titleEl: "Λογιστική Υποστήριξη Βουλγαρία",
    titleEn: "Accounting Services Bulgaria",
    titleBg: "Счетоводни услуги България",
    titleDe: "Buchhaltungsdienstleistungen Bulgarien",
    shortEl:
      "Λογιστική + cloud πύλη TaxBG: παρακολούθηση 24/7, δωρεάν τιμολόγηση, AI για παραστατικά & τραπεζικές κινήσεις.",
    shortEn:
      "Accounting + TaxBG cloud portal: 24/7 monitoring, free invoicing, AI for invoices & bank statements.",
    shortBg:
      "Счетоводство + облачен портал TaxBG: 24/7 наблюдение, безплатно фактуриране, AI за документи и банкови движения.",
    shortDe:
      "Buchhaltung + TaxBG Cloud-Portal: 24/7-Überwachung, kostenlose Rechnungsstellung, KI für Belege & Kontobewegungen.",
    descriptionEl:
      "Πέρα από την κλασική λογιστική, κάθε συνδρομητής αποκτά την cloud πύλη TaxBG: βλέπει την επιχείρησή του, τι οφείλει, τον τραπεζικό του λογαριασμό διασταυρωμένο με τιμολόγια και έξοδα, και την πρόοδο υποχρεώσεων προς τη ΝΑΠ. Οι AI agents δέχονται παραστατικά με φωτογραφία από κινητό ή email — οι πρώτοι στη Βουλγαρία με αυτή την ολοκληρωμένη λύση.",
    descriptionEn:
      "Beyond traditional accounting, every subscriber gets the TaxBG cloud portal: see your business, liabilities, bank account cross-referenced with invoices and expenses, and NAP obligation progress. AI agents accept documents via smartphone photo or email — the first integrated solution of its kind in Bulgaria.",
    descriptionBg:
      "Освен класическото счетоводство, всеки абонат получава облачния портал TaxBG: вижда бизнеса си, какво дължи, банковата си сметка, съпоставена с фактури и разходи, и прогреса по задълженията към НАП. AI агентите приемат документи чрез снимка от телефона или имейл — първото цялостно решение от този вид в България.",
    descriptionDe:
      "Über die klassische Buchhaltung hinaus erhält jeder Abonnent das TaxBG Cloud-Portal: Einblick in das Unternehmen, offene Verbindlichkeiten, das mit Rechnungen und Ausgaben abgeglichene Bankkonto und den Stand der Verpflichtungen gegenüber der Finanzbehörde NAP. KI-Agenten nehmen Belege per Smartphone-Foto oder E-Mail an — die erste integrierte Lösung dieser Art in Bulgarien.",
    heroHighlightEl: "Cloud πύλη + AI παραστατικά — δωρεάν για συνδρομητές",
    heroHighlightEn: "Cloud portal + AI documents — free for subscribers",
    heroHighlightBg: "Облачен портал + AI документи — безплатно за абонати",
    heroHighlightDe: "Cloud-Portal + KI-Belege — kostenlos für Abonnenten",
    featuresEl: [
      "Cloud πύλη πελάτη 24/7 — παρακολούθηση εταιρείας",
      "Δωρεάν σύστημα τιμολόγησης",
      "Διασταύρωση τραπεζικού λογαριασμού με παραστατικά",
      "AI agent: παραστατικά με φωτογραφία ή email",
      "Πρόοδος υποχρεώσεων προς τη ΝΑΠ (φορολογικές αρχές)",
      "Προέλεγχος παραστατικών & δηλώσεις από την TaxBG",
      "Έκπτωση 10% για ετήσια προπληρωμή",
    ],
    featuresEn: [
      "24/7 client cloud portal — monitor your company",
      "Free invoicing system included",
      "Bank account cross-referenced with invoices",
      "AI agent: documents via photo or email",
      "NAP tax obligation progress tracking",
      "Pre-submission review & filings by TaxBG",
      "10% discount for annual prepayment",
    ],
    featuresBg: [
      "Облачен портал 24/7 — наблюдение на фирмата",
      "Безплатна система за фактуриране",
      "Съпоставка на банкова сметка с документи",
      "AI агент: документи чрез снимка или имейл",
      "Прогрес по задължения към НАП",
      "Предварителна проверка на документи и декларации от TaxBG",
      "10% отстъпка при годишно предплащане",
    ],
    featuresDe: [
      "24/7-Cloud-Portal — Unternehmensüberblick",
      "Kostenloses Rechnungssystem inklusive",
      "Bankkonto-Abgleich mit Belegen",
      "KI-Agent: Belege per Foto oder E-Mail",
      "Verfolgung der NAP-Steuerpflichten",
      "Vorprüfung von Belegen & Meldungen durch TaxBG",
      "10% Rabatt bei jährlicher Vorauszahlung",
    ],
    tiers: [
      {
        id: "accounting-monthly",
        nameEl: "Μηνιαία Συνδρομή",
        nameEn: "Monthly Subscription",
        nameBg: "Месечен абонамент",
        nameDe: "Monatsabonnement",
        priceEur: 149,
        period: "month",
        descriptionEl: "Λογιστική υποστήριξη — χρέωση ανά μήνα",
        descriptionEn: "Accounting support — billed monthly",
        descriptionBg: "Счетоводна поддръжка — таксуване на месец",
        descriptionDe: "Buchhaltungssupport — monatliche Abrechnung",
      },
      {
        id: "accounting-annual",
        nameEl: "Ετήσια Συνδρομή (προπληρωμή -10%)",
        nameEn: "Annual Subscription (10% advance discount)",
        nameBg: "Годишен абонамент (предплащане -10%)",
        nameDe: "Jahresabonnement (Vorauszahlung -10%)",
        priceEur: 149 * 12 * (1 - 0.1),
        period: "year",
        descriptionEl: "Ετήσια προπληρωμή με έκπτωση 10%",
        descriptionEn: "Annual prepayment with 10% discount",
        descriptionBg: "Годишно предплащане с 10% отстъпка",
        descriptionDe: "Jährliche Vorauszahlung mit 10% Rabatt",
      },
    ],
    featured: true,
    seoKeywordsEl: [
      "λογιστική βουλγαρία",
      "λογιστικό γραφείο βουλγαρία",
      "φορολογικές δηλώσεις βουλγαρία",
      "πύλη πελάτη εταιρεία βουλγαρία",
      "τιμολόγηση βουλγαρία",
      "ΝΑΠ υποχρεώσεις",
    ],
    seoKeywordsEn: [
      "accounting bulgaria",
      "bulgaria accountant",
      "tax filing bulgaria",
      "bulgaria company dashboard",
      "NAP obligations",
    ],
    seoKeywordsBg: [
      "счетоводство България",
      "счетоводна къща България",
      "данъчни декларации България",
      "клиентски портал фирма",
      "фактуриране България",
    ],
    seoKeywordsDe: [
      "buchhaltung bulgarien",
      "buchhalter bulgarien",
      "steuererklärung bulgarien",
      "unternehmens-dashboard bulgarien",
    ],
    problemEl:
      "Επιχειρήσεις στη Βουλγαρία χρειάζονται λογιστική παρακολούθηση, αλλά οι παραδοσιακές λογιστικές προσφέρουν μόνο μηνιαία δηλώσεις χωρίς ορατότητα — ο ιδιοκτήτης δεν ξέρει τι οφείλει ή πού βρίσκεται η επιχείρησή του ανάμεσα στις δηλώσεις, και η συλλογή παραστατικών γίνεται χειροκίνητα.",
    problemEn:
      "Businesses in Bulgaria need ongoing accounting, but traditional accounting firms only deliver monthly filings with no visibility in between — owners don't know what they owe or where their business stands, and gathering receipts/invoices is manual.",
    problemBg:
      "Фирмите в България се нуждаят от непрекъсната счетоводна поддръжка, но традиционните счетоводни кантори предоставят само месечни декларации без видимост между тях — собственикът не знае какво дължи или какво е състоянието на бизнеса, а събирането на документи става ръчно.",
    problemDe:
      "Unternehmen in Bulgarien benötigen laufende Buchhaltung, doch klassische Buchhaltungsbüros liefern nur monatliche Meldungen ohne Einblick dazwischen — Eigentümer wissen nicht, was sie schulden oder wie ihr Unternehmen dasteht, und das Sammeln von Belegen erfolgt manuell.",
    whyEl:
      "Χωρίς συνεχή ορατότητα στα οικονομικά και αυτοματισμό συλλογής παραστατικών, οι επιχειρήσεις ανακαλύπτουν προβλήματα (ληξιπρόθεσμες υποχρεώσεις, ασυμφωνίες) μόνο όταν είναι αργά — και χάνουν ώρες μηνιαία σε χειρωνακτική καταχώρηση.",
    whyEn:
      "Without continuous financial visibility and automated document capture, businesses discover problems (overdue obligations, mismatches) only after it's too late — and lose hours each month on manual data entry.",
    whyBg:
      "Без непрекъсната финансова видимост и автоматизирано въвеждане на документи, фирмите откриват проблеми (просрочени задължения, несъответствия) едва когато е твърде късно — и губят часове всеки месец в ръчно въвеждане на данни.",
    whyDe:
      "Ohne kontinuierliche finanzielle Transparenz und automatisierte Belegerfassung entdecken Unternehmen Probleme (überfällige Verpflichtungen, Unstimmigkeiten) erst, wenn es zu spät ist — und verlieren monatlich Stunden mit manueller Dateneingabe.",
    solutionEl:
      "Κάθε συνδρομητής λογιστικής TaxBG αποκτά δωρεάν την cloud πύλη πελάτη: 24/7 dashboard, δωρεάν τιμολόγηση, διασταύρωση τραπεζικού με παραστατικά, AI που δέχεται παραστατικά από φωτογραφία κινητού ή email, και παρακολούθηση υποχρεώσεων ΝΑΠ. Πρώτοι στη Βουλγαρία με αυτή την ολοκληρωμένη λύση — από €149/μήνα (ή -10% με ετήσια προπληρωμή).",
    solutionEn:
      "Every TaxBG accounting subscriber gets the cloud client portal free: 24/7 dashboard, free invoicing, bank reconciliation against invoices, AI that ingests documents via smartphone photo or email, and NAP obligation tracking. First integrated solution of its kind in Bulgaria — from €149/month (or -10% with annual prepayment).",
    solutionBg:
      "Всеки абонат на счетоводните услуги на TaxBG получава безплатно облачния клиентски портал: 24/7 табло, безплатно фактуриране, съпоставка на банкова сметка с документи, AI, който приема документи чрез снимка от телефона или имейл, и следене на задълженията към НАП. Първото цялостно решение от този вид в България — от €149/месец (или -10% при годишно предплащане).",
    solutionDe:
      "Jeder TaxBG-Buchhaltungsabonnent erhält das Cloud-Kundenportal kostenlos: 24/7-Dashboard, kostenlose Rechnungsstellung, Bankabgleich mit Belegen, KI, die Belege per Smartphone-Foto oder E-Mail erfasst, und Verfolgung der NAP-Verpflichtungen. Die erste integrierte Lösung dieser Art in Bulgarien — ab €149/Monat (oder -10% bei jährlicher Vorauszahlung).",
  },
  {
    id: "web",
    slug: routes.webServices,
    titleEl: "Web & Agentic Υπηρεσίες",
    titleEn: "Web & Agentic Services",
    titleBg: "Уеб и агентни услуги",
    titleDe: "Web- & Agentic-Dienstleistungen",
    shortEl:
      "Σύντομη επισκόπηση — ιστοσελίδες, SEO και agentic λύσεις. Ξεχωριστός ιστότοπος για πλήρη κατάλογο.",
    shortEn:
      "Brief overview — websites, SEO and agentic solutions. Full catalog on a dedicated site.",
    shortBg:
      "Кратък преглед — уебсайтове, SEO и агентни решения. Пълен каталог на отделен сайт.",
    shortDe:
      "Kurzüberblick — Websites, SEO und Agentic-Lösungen. Vollständiger Katalog auf einer eigenen Website.",
    descriptionEl:
      "Η TaxBG αναπτύσσει σύγχρονες ιστοσελίδες και agentic εφαρμογές. Για τον πλήρη κατάλογο web υπηρεσιών, επισκεφθείτε τον εξειδικευμένο ιστότοπό μας (σύντομα).",
    descriptionEn:
      "TaxBG builds modern websites and agentic applications. For the full web services catalog, visit our dedicated site (coming soon).",
    descriptionBg:
      "TaxBG разработва съвременни уебсайтове и агентни приложения. За пълния каталог уеб услуги посетете специализирания ни сайт (очаквайте скоро).",
    descriptionDe:
      "TaxBG entwickelt moderne Websites und Agentic-Anwendungen. Den vollständigen Katalog der Webdienstleistungen finden Sie bald auf unserer dedizierten Website.",
    heroHighlightEl: "Agentic web — ξεχωριστός ιστότοπος σύντομα",
    heroHighlightEn: "Agentic web — dedicated site coming soon",
    heroHighlightBg: "Агентен уеб — отделен сайт очаквайте скоро",
    heroHighlightDe: "Agentic Web — eigene Website folgt in Kürze",
    featuresEl: [
      "Κατασκευή SEO ιστοσελίδων",
      "Agentic chat & αυτοματισμοί (n8n)",
      "Βελτιστοποίηση μηχανών αναζήτησης",
    ],
    featuresEn: [
      "SEO-optimized website development",
      "Agentic chat & automations (n8n)",
      "Search engine optimization",
    ],
    featuresBg: [
      "Изграждане на SEO уебсайтове",
      "Агентен чат & автоматизации (n8n)",
      "Оптимизация за търсачки",
    ],
    featuresDe: [
      "SEO-optimierte Website-Entwicklung",
      "Agentic Chat & Automatisierungen (n8n)",
      "Suchmaschinenoptimierung",
    ],
    tiers: [],
    featured: false,
    seoKeywordsEl: ["web υπηρεσίες", "agentic", "seo"],
    seoKeywordsEn: ["web services", "agentic", "seo"],
    seoKeywordsBg: ["уеб услуги", "агентен", "seo"],
    seoKeywordsDe: ["webdienstleistungen", "agentic", "seo"],
    problemEl:
      "Επιχειρήσεις χρειάζονται ιστοσελίδες που είναι ορατές όχι μόνο σε ανθρώπους αλλά και σε AI agents/LLMs που πλέον αναζητούν, συγκρίνουν και προτείνουν υπηρεσίες — οι παραδοσιακές ιστοσελίδες δεν εκθέτουν δομημένα δεδομένα που οι agents μπορούν να διαβάσουν.",
    problemEn:
      "Businesses need websites that are visible not just to humans but to AI agents/LLMs that increasingly search, compare and recommend services — traditional websites don't expose structured data that agents can read.",
    problemBg:
      "Фирмите имат нужда от уебсайтове, които са видими не само за хора, но и за AI агенти/LLM, които вече търсят, сравняват и препоръчват услуги — традиционните сайтове не предоставят структурирани данни, които агентите могат да прочетат.",
    problemDe:
      "Unternehmen brauchen Websites, die nicht nur für Menschen, sondern auch für KI-Agenten/LLMs sichtbar sind, die zunehmend Dienstleistungen suchen, vergleichen und empfehlen — klassische Websites stellen keine strukturierten Daten bereit, die Agenten lesen können.",
    whyEl:
      "Όσο περισσότερες αγοραστικές αποφάσεις περνούν μέσα από AI agents (chat assistants, αναζήτηση LLM, agentic browsing), τόσο πιο σημαντικό είναι ένα site να έχει μηχαναγνώσιμη δομή (llms.txt, identity, capabilities) — όχι μόνο SEO για ανθρώπους.",
    whyEn:
      "As more purchase decisions route through AI agents (chat assistants, LLM search, agentic browsing), it becomes critical for a site to expose machine-readable structure (llms.txt, identity, capabilities) — not just human-facing SEO.",
    whyBg:
      "Колкото повече покупателни решения преминават през AI агенти (чат асистенти, LLM търсене, агентно сърфиране), толкова по-важно е сайтът да има машинночетима структура (llms.txt, identity, capabilities) — не само SEO за хора.",
    whyDe:
      "Da immer mehr Kaufentscheidungen über KI-Agenten laufen (Chat-Assistenten, LLM-Suche, agentisches Browsing), wird es entscheidend, dass eine Website eine maschinenlesbare Struktur bietet (llms.txt, identity, capabilities) — nicht nur SEO für Menschen.",
    solutionEl:
      "Η TaxBG χτίζει σύγχρονα, SEO-βελτιστοποιημένα sites με ενσωματωμένο agentic layer (llms.txt, identity/capabilities JSON, n8n αυτοματισμοί) από την αρχή. Πλήρης κατάλογος σε ξεχωριστό ιστότοπο (σύντομα).",
    solutionEn:
      "TaxBG builds modern, SEO-optimized sites with an agentic layer built in from day one (llms.txt, identity/capabilities JSON, n8n automations). Full catalog on a dedicated site (coming soon).",
    solutionBg:
      "TaxBG изгражда съвременни, SEO-оптимизирани сайтове с вграден агентен слой (llms.txt, identity/capabilities JSON, автоматизации с n8n) от самото начало. Пълен каталог на отделен сайт (очаквайте скоро).",
    solutionDe:
      "TaxBG baut moderne, SEO-optimierte Websites mit integriertem Agentic-Layer (llms.txt, identity/capabilities JSON, n8n-Automatisierungen) von Anfang an. Vollständiger Katalog auf einer eigenen Website (in Kürze).",
  },
]

export function getServiceBySlug(
  slug: string,
  locale: "el" | "en" = "el"
): Service | undefined {
  return services.find((s) =>
    locale === "en" ? s.slug.en === slug : s.slug.el === slug
  )
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}
