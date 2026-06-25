export type ArticleSection = {
  titleEl: string
  titleEn: string
  bodyEl: string[]
  bodyEn: string[]
}

export type Article = {
  id: string
  slug: { el: string; en: string }
  titleEl: string
  titleEn: string
  descriptionEl: string
  descriptionEn: string
  publishedAt: string
  sections: ArticleSection[]
}

/** Ported from the live WordPress articles, cleaned of dead links. */
export const articles: Article[] = [
  {
    id: "tax-in-bulgaria",
    slug: { el: "φορολογία-στη-βουλγαρία", en: "tax-in-bulgaria" },
    titleEl: "Φορολογία εταιρειών στη Βουλγαρία: ολοκληρωμένος οδηγός",
    titleEn: "Corporate tax in Bulgaria: a complete guide",
    descriptionEl:
      "Φόρος κερδών, ΦΠΑ, ασφαλιστικές εισφορές και ελεγκτικές διαδικασίες για εταιρείες στη Βουλγαρία.",
    descriptionEn:
      "Profit tax, VAT, social security contributions, and audit procedures for companies in Bulgaria.",
    publishedAt: "2023-11-07",
    sections: [
      {
        titleEl: "Εισαγωγή",
        titleEn: "Introduction",
        bodyEl: [
          "Η φορολογία εταιρειών στη Βουλγαρία αποτελεί κρίσιμο παράγοντα για κάθε επιχείρηση που λειτουργεί στη χώρα. Εξετάζουμε τις βασικές αρχές και απαιτήσεις.",
        ],
        bodyEn: [
          "Corporate tax in Bulgaria is a critical factor for any business operating there. Here are the core principles and requirements.",
        ],
      },
      {
        titleEl: "Φορολογικό καθεστώς",
        titleEn: "Tax regime",
        bodyEl: [
          "Οι εταιρείες στη Βουλγαρία υπόκεινται σε φορολογία επί των κερδών, ΦΠΑ και ασφαλιστικές εισφορές.",
        ],
        bodyEn: [
          "Companies in Bulgaria are subject to profit tax, VAT, and social security contributions.",
        ],
      },
      {
        titleEl: "Φορολογία κερδών",
        titleEn: "Profit tax",
        bodyEl: [
          "Φόρος 10% επί των κερδών, υπολογιζόμενος βάσει της ετήσιας οικονομικής κατάστασης της εταιρείας.",
        ],
        bodyEn: [
          "A flat 10% tax on profits, calculated from the company's annual financial statement.",
        ],
      },
      {
        titleEl: "ΦΠΑ",
        titleEn: "VAT",
        bodyEl: [
          "Ο ΦΠΑ στη Βουλγαρία είναι σήμερα 20%. Οι εταιρείες οφείλουν να προσδιορίζουν ΦΠΑ σε προϊόντα και υπηρεσίες και να το αποδίδουν στο κράτος. Εξαιρούνται οι πωλήσεις προς εταιρείες/επαγγελματίες άλλων χωρών.",
        ],
        bodyEn: [
          "VAT in Bulgaria currently stands at 20%. Companies must charge VAT on goods and services and remit it to the state. Sales to businesses/professionals in other countries are exempt.",
        ],
      },
      {
        titleEl: "Ασφαλιστικές εισφορές",
        titleEn: "Social security contributions",
        bodyEl: [
          "Οι εταιρείες συνεισφέρουν σε κοινωνικά ταμεία για τους εργαζομένους τους. Υποχρέωση ασφάλισης έχει μόνο ο διαχειριστής της εταιρείας, εφόσον δεν είναι ήδη ασφαλισμένος ως ελεύθερος επαγγελματίας σε άλλη χώρα της ΕΕ — όχι οι μέτοχοι. Οι εισφορές διαχειριστή είναι σήμερα περίπου 200 BGN.",
        ],
        bodyEn: [
          "Companies contribute to social funds for their employees. Only the company's manager has an insurance obligation — unless already insured as self-employed in another EU country — not the shareholders. Manager contributions are currently around 200 BGN.",
        ],
      },
      {
        titleEl: "Ελεγκτικές διαδικασίες",
        titleEn: "Audit procedures",
        bodyEl: [
          "Οι εταιρείες υποχρεούνται να υποβάλλουν ετήσιες δηλώσεις και να υποβάλλονται σε ελέγχους από τις φορολογικές αρχές.",
        ],
        bodyEn: [
          "Companies must file annual returns and are subject to audits by the tax authorities.",
        ],
      },
      {
        titleEl: "Συμπεράσματα",
        titleEn: "Conclusion",
        bodyEl: [
          "Η φορολογία εταιρειών στη Βουλγαρία είναι πολύπλοκη και απαιτεί τη συνεργασία ειδικού. Με τη σωστή καθοδήγηση, μια επιχείρηση μπορεί να λειτουργήσει αποτελεσματικά στη Βουλγαρία.",
        ],
        bodyEn: [
          "Corporate tax in Bulgaria is complex and benefits from expert guidance. With the right support, a business can operate effectively in Bulgaria.",
        ],
      },
    ],
  },
  {
    id: "tax-residency-change",
    slug: { el: "αλλαγή-φορολογικής-κατοικίας", en: "tax-residency-change" },
    titleEl: "Αλλαγή φορολογικής κατοικίας από Ελλάδα σε Βουλγαρία",
    titleEn: "Changing tax residency from Greece to Bulgaria",
    descriptionEl:
      "Δικαιολογητικά, διαδικασία και προθεσμίες για αλλαγή φορολογικής κατοικίας στη Βουλγαρία.",
    descriptionEn:
      "Documents, process, and deadlines for changing your tax residency to Bulgaria.",
    publishedAt: "2023-11-25",
    sections: [
      {
        titleEl: "Τι είναι η αλλαγή φορολογικής κατοικίας",
        titleEn: "What changing tax residency means",
        bodyEl: [
          "Η αλλαγή φορολογικής κατοικίας είναι ουσιαστικό βήμα για φορολογούμενους που διατηρούν επιχείρηση στη Βουλγαρία. Είναι νομικά πολύπλοκη διαδικασία και δεν είναι απαραίτητη σε όλες τις περιπτώσεις — συχνά εξαρτάται από τον φορολογικό και επιχειρηματικό σχεδιασμό κάθε πελάτη.",
        ],
        bodyEn: [
          "Changing tax residency is a substantial step for taxpayers who run a business in Bulgaria. It's legally complex and isn't necessary in every case — it often depends on each client's tax and business planning.",
        ],
      },
      {
        titleEl: "Δικαιολογητικά και διαδικασία (Ελλάδα → Βουλγαρία)",
        titleEn: "Documents and process (Greece → Bulgaria)",
        bodyEl: [
          "1. Έγκριση διαμονής: απαιτεί συμβόλαιο ενοικίασης κατοικίας θεωρημένο από συμβολαιογράφο στο όνομα του αιτούντα (όχι της επιχείρησης) για τουλάχιστον τις τελευταίες 183 ημέρες του έτους, δελτίο μόνιμου κατοίκου από τη βουλγαρική αστυνομική αρχή, τραπεζική αναφορά κινήσεων ενοικίου, και λογαριασμό κοινής ωφέλειας στο όνομα του αιτούντα.",
          "2. Υποβολή δηλώσεων φορολογίας πριν την αίτηση αλλαγής κατοικίας.",
          "3. Αποδεικτικό κρατικής ασφάλισης του αιτούντα.",
          "4. Διατήρηση ενεργής επιχειρηματικής δραστηριότητας στη Βουλγαρία.",
          "Η υποβολή δικαιολογητικών γίνεται το πρώτο δεκαήμερο του Μαρτίου στην ελληνική ΔΟΥ του φορολογούμενου. Χωρίς ενστάσεις, η μεταφορά στη ΔΟΥ Κατοίκων Εξωτερικού ολοκληρώνεται το αργότερο μέχρι τέλος Αυγούστου.",
        ],
        bodyEn: [
          "1. Residence permit: requires a notarized home rental contract in the applicant's name (not the company's) covering at least the last 183 days of the year, a permanent-resident card from the Bulgarian police, a bank statement showing rent payments, and a utility bill in the applicant's name.",
          "2. Filing tax returns before applying for the residency change.",
          "3. Proof of the applicant's state insurance.",
          "4. Maintaining active business activity in Bulgaria.",
          "Documents are submitted in the first ten days of March to the applicant's Greek tax office. Absent objections, the transfer to the Non-Resident Tax Office completes by the end of August at the latest.",
        ],
      },
      {
        titleEl: "Πώς βοηθά η TaxBG",
        titleEn: "How TaxBG helps",
        bodyEl: [
          "Η ομάδα της TaxBG κατέχει την εμπειρία και την τεχνογνωσία για να διεκπεραιώσει τη διαδικασία ενώπιον των αρμόδιων αρχών, με γνώση της νομοθεσίας Ελλάδας και Βουλγαρίας, εξασφαλίζοντας ότι όλα τα δικαιολογητικά υποβάλλονται σωστά και εγκαίρως — με εξατομικευμένες λύσεις ανά περίπτωση και πλήρη διαφάνεια καθ' όλη τη διαδικασία.",
        ],
        bodyEn: [
          "TaxBG's team has the experience and know-how to handle the process before the relevant authorities, with knowledge of both Greek and Bulgarian law, ensuring all documents are filed correctly and on time — with solutions tailored to each case and full transparency throughout.",
        ],
      },
      {
        titleEl: "Συμπέρασμα",
        titleEn: "Conclusion",
        bodyEl: [
          "Η αλλαγή φορολογικής κατοικίας είναι σημαντικό βήμα για όσους θέλουν να διαχειριστούν αποτελεσματικά τη φορολογική τους υποχρέωση στη Βουλγαρία. Σε ορισμένες περιπτώσεις είναι χρονοβόρο και έχει κάποιο κόστος, αλλά εξασφαλίζει σαφήνεια ως φορολογικός κάτοικος εξωτερικού.",
        ],
        bodyEn: [
          "Changing tax residency is a significant step for anyone who wants to manage their Bulgarian tax position effectively. In some cases it's time-consuming and has some cost, but it gives you clarity as a non-resident taxpayer.",
        ],
      },
    ],
  },
]

export function getArticleBySlug(
  slug: string,
  locale: "el" | "en" = "el"
): Article | undefined {
  return articles.find((a) =>
    locale === "en" ? a.slug.en === slug : a.slug.el === slug
  )
}
