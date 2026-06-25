export type FaqItem = {
  id: string
  questionEl: string
  questionEn: string
  answerEl: string
  answerEn: string
}

export type FaqGroup = {
  id: string
  titleEl: string
  titleEn: string
  items: FaqItem[]
}

/**
 * Ported from the live WordPress FAQ (taxbg.eu/συχνές-ερωτήσεις/) and cleaned up:
 * removed links/references to pages we're retiring (car registration transfers,
 * translators, lawyers) and tightened wording. Real client questions — keep
 * adding to this list as new ones come up in chat/email.
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "formation",
    titleEl: "Ίδρυση εταιρείας στη Βουλγαρία",
    titleEn: "Company formation in Bulgaria",
    items: [
      {
        id: "is-it-easy",
        questionEl: "Είναι εύκολο να ιδρύσω εταιρεία στη Βουλγαρία;",
        questionEn: "Is it easy to form a company in Bulgaria?",
        answerEl:
          "Η διαδικασία είναι αρκετά περίπλοκη και απαιτεί συνδυασμό υπηρεσιών δικηγόρου, λογιστή, συμβολαιογράφου, τράπεζας και εμπορικού επιμελητηρίου. Συνιστάται η ανάθεση σε γραφείο όπως η TaxBG για να αποφύγετε περιττά έξοδα και χαμένο χρόνο.",
        answerEn:
          "The process is fairly complex and requires a combination of lawyer, accountant, notary, bank and commercial registry steps. We recommend handing it to a firm like TaxBG to avoid unnecessary cost and lost time.",
      },
      {
        id: "how-long",
        questionEl: "Πόσος χρόνος χρειάζεται για την ίδρυση εταιρείας;",
        questionEn: "How long does formation take?",
        answerEl:
          "Περίπου 5 εργάσιμες ημέρες για την εγγραφή στο Βουλγαρικό Εμπορικό Επιμελητήριο από την κατάθεση των εγγράφων. Η εγγραφή στο VIES ολοκληρώνεται σε 1-2 εβδομάδες ξεχωριστά, καθώς απαιτεί βουλγαρικό ΑΦΜ διαχειριστή.",
        answerEn:
          "About 5 business days for registration in the Bulgarian Commercial Register from document submission. VIES registration completes separately in 1-2 weeks, since it requires the manager to have a Bulgarian tax number.",
      },
      {
        id: "vies-different",
        questionEl: "Η ίδρυση με την εγγραφή στο VIES είναι το ίδιο πράγμα;",
        questionEn: "Is formation the same as VIES registration?",
        answerEl:
          "Όχι. Η ίδρυση ολοκληρώνεται σε 5 εργάσιμες ημέρες και η εταιρεία μπορεί να ξεκινήσει τον κύκλο εργασιών της, αλλά η εγγραφή στο VIES (απαραίτητη για ενδοκοινοτικές συναλλαγές χωρίς ΦΠΑ) ολοκληρώνεται ξεχωριστά σε 1-2 εβδομάδες.",
        answerEn:
          "No. Formation completes in 5 business days and the company can begin operating, but VIES registration (needed for intra-EU transactions without VAT) completes separately in 1-2 weeks.",
      },
      {
        id: "why-bulgaria",
        questionEl: "Γιατί να ιδρύσω εταιρεία στη Βουλγαρία;",
        questionEn: "Why form a company in Bulgaria?",
        answerEl:
          "Χαμηλή φορολογία καθαρών κερδών 10%, φόρος μερισμάτων 5%, χαμηλό κόστος συντήρησης, χαμηλές ασφαλιστικές εισφορές και ελάχιστη γραφειοκρατία. Όλα μπορούν να διαχειριστούν απομακρυσμένα με τη σωστή λογιστική υποστήριξη.",
        answerEn:
          "10% flat corporate tax, 5% dividend tax, low maintenance cost, low social security contributions, and minimal bureaucracy. Everything can be managed remotely with the right accounting support.",
      },
      {
        id: "need-to-visit",
        questionEl: "Χρειάζεται να επισκεφθώ τη Βουλγαρία για να ιδρύσω την εταιρεία;",
        questionEn: "Do I need to visit Bulgaria to form the company?",
        answerEl:
          "Ναι, για 1-2 ώρες ώστε να υπογράψετε τα έγγραφα σύστασης, μια βεβαίωση υπογραφής και μια εξουσιοδότηση προς το λογιστικό γραφείο, και να καταθέσετε το κεφάλαιο στην τράπεζα. Η πλήρως απομακρυσμένη ίδρυση είναι πιο χρονοβόρα, πιο ακριβή και απαιτεί 2 επισκέψεις σε βουλγαρική πρεσβεία — δεν τη συνιστούμε.",
        answerEn:
          "Yes, for 1-2 hours to sign the incorporation documents, a signature declaration, and a power of attorney to your accounting office, and to deposit the company's capital at the bank. Fully remote formation is slower, more expensive, and needs two embassy visits — we don't recommend it.",
      },
      {
        id: "visit-duration",
        questionEl: "Αν επισκεφθώ τη Βουλγαρία, πόσος χρόνος χρειάζεται συνολικά;",
        questionEn: "If I do visit, how long does the whole trip take?",
        answerEl: "Συνολικά 2-3 ώρες, μαζί με μια γνωριμία από κοντά.",
        answerEn: "About 2-3 hours total, including meeting in person.",
      },
      {
        id: "diy",
        questionEl: "Μπορώ να ιδρύσω την εταιρεία μόνος μου;",
        questionEn: "Can I form the company myself, without an agency?",
        answerEl:
          "Θα χρειαστείτε ξεχωριστά δικηγόρο, λογιστή, συμβολαιογράφο, τράπεζα και διερμηνέα. Επιπλέον, οι περισσότερες τράπεζες δυσκολεύονται να ανοίξουν λογαριασμό κεφαλαίου σε εταιρείες με αλλοδαπό διαχειριστή χωρίς τοπικό συνεργάτη.",
        answerEn:
          "You'd need to separately arrange a lawyer, accountant, notary, bank and interpreter. Most banks are also reluctant to open a capital account for a company with a foreign manager without a local partner involved.",
      },
      {
        id: "cost",
        questionEl: "Ποιο είναι το κόστος ίδρυσης εταιρείας στη Βουλγαρία;",
        questionEn: "What does forming a company in Bulgaria cost?",
        answerEl:
          "Κυμαίνεται από €500 έως €1.000 ανάλογα με το γραφείο — προσέξτε κρυφές χρεώσεις όπως ξεχωριστή χρέωση για VIES, ασφαλιστικό φορέα, ΑΦΜ διαχειριστή, ή αυξημένο ετήσιο λογιστικό κόστος.",
        answerEn:
          "Ranges from €500 to €1,000 depending on the office — watch for hidden fees like separate charges for VIES, social security registration, manager's tax number, or inflated ongoing accounting costs.",
      },
      {
        id: "tax-debt-home-country",
        questionEl: "Μπορώ να ιδρύσω εταιρεία αν έχω φορολογικές εκκρεμότητες στη χώρα μου;",
        questionEn: "Can I form a company if I have outstanding tax debts at home?",
        answerEl:
          "Ναι. Η εταιρεία στη Βουλγαρία είναι ξεχωριστό νομικό πρόσωπο από εσάς — οι δικές σας οφειλές είναι εντελώς άσχετες με αυτήν.",
        answerEn:
          "Yes. The Bulgarian company is a separate legal entity from you personally — your existing debts have nothing to do with it.",
      },
      {
        id: "best-entity-type",
        questionEl: "Ποια είναι η καλύτερη μορφή εταιρείας στη Βουλγαρία;",
        questionEn: "What's the best legal form for the company?",
        answerEl:
          "Για φορολογικούς κατοίκους άλλης χώρας, η μοναδική ρεαλιστική λύση είναι Μονοπρόσωπη ή Πολυπρόσωπη Εταιρεία Περιορισμένης Ευθύνης (EOOD/OOD) — προστατεύει την προσωπική σας περιουσία.",
        answerEn:
          "For tax residents of another country, the realistic option is a single- or multi-member limited liability company (EOOD/OOD) — it protects your personal assets.",
      },
    ],
  },
  {
    id: "tax",
    titleEl: "Φορολογικά θέματα",
    titleEn: "Tax questions",
    items: [
      {
        id: "corporate-tax-rate",
        questionEl: "Πόση είναι η φορολογία των εταιρειών στη Βουλγαρία;",
        questionEn: "What's the corporate tax rate in Bulgaria?",
        answerEl:
          "10% επί των κερδών, ανεξαρτήτως τζίρου, και 5% φόρος μερισμάτων — συνολικά 14,5% επί των καθαρών κερδών αν διανέμετε όλα τα κέρδη ως μέρισμα.",
        answerEn:
          "10% on profits, regardless of turnover, plus 5% dividend tax — 14.5% total on net profit if you distribute everything as dividends.",
      },
      {
        id: "vat-rate",
        questionEl: "Πόσο είναι το ΦΠΑ στη Βουλγαρία;",
        questionEn: "What's the VAT rate in Bulgaria?",
        answerEl:
          "20%. Αν η εταιρεία πουλά σε επαγγελματίες/εταιρείες της ΕΕ εγγεγραμμένες στο VIES, ή σε τρίτες χώρες, δεν προστίθεται ΦΠΑ.",
        answerEn:
          "20%. If the company sells to VIES-registered EU businesses, or to third countries, no VAT is added.",
      },
      {
        id: "vat-when-due",
        questionEl: "Πρέπει να πληρώνω ΦΠΑ;",
        questionEn: "When does my company actually owe VAT?",
        answerEl: "Μόνο σε πωλήσεις εντός Βουλγαρίας ή σε πελάτες λιανικής.",
        answerEn: "Only on sales within Bulgaria or to retail customers.",
      },
      {
        id: "advance-payments",
        questionEl: "Υπάρχει προκαταβολή φόρου εταιρειών;",
        questionEn: "Are there advance corporate tax payments?",
        answerEl:
          "Μόνο για εταιρείες με τζίρο πάνω από €200.000, σε 4 τρίμηνα — το τελευταίο συμψηφίζεται με τον φόρο του επόμενου έτους.",
        answerEn:
          "Only for companies with turnover above €200,000, in 4 quarterly instalments — the last one offsets against next year's tax.",
      },
      {
        id: "dividends-mandatory",
        questionEl: "Είναι υποχρεωτικό να δηλώνω μερίσματα κάθε χρόνο;",
        questionEn: "Do I have to declare dividends every year?",
        answerEl:
          "Όχι. Ο διαχειριστής μπορεί να χρησιμοποιεί τα κεφάλαια της εταιρείας χωρίς παραστατικά, αλλά πάνω από €12.500 περίπου (25.000 BGN) μπορεί να γίνει έλεγχος — καλό είναι να δηλώνετε μέρισμα πριν φτάσετε εκεί.",
        answerEn:
          "No. The manager can use company funds without receipts, but above roughly €12,500 (25,000 BGN) the tax office may audit — it's wise to declare a dividend before reaching that level.",
      },
      {
        id: "double-taxation-dividends",
        questionEl: "Αν πληρώσω μέρισμα στη Βουλγαρία, πληρώνω και στη χώρα κατοικίας μου;",
        questionEn: "If I pay dividend tax in Bulgaria, do I also pay at home?",
        answerEl:
          "Ο φόρος μερισμάτων στη Βουλγαρία είναι 5%. Αν ο φόρος στη χώρα κατοικίας σας είναι έως 5%, δεν πληρώνετε επιπλέον — αλλά είστε υποχρεωμένος να δηλώσετε τα μερίσματα στη δική σας φορολογική δήλωση.",
        answerEn:
          "Bulgaria's dividend tax is 5%. If your home country's rate is 5% or less, you owe nothing extra — but you're still legally required to declare the dividend on your home tax return.",
      },
      {
        id: "double-taxation-treaty",
        questionEl: "Μπορεί η χώρα μου να φορολογήσει διπλά την εταιρεία μου στη Βουλγαρία;",
        questionEn: "Can my home country double-tax my Bulgarian company?",
        answerEl:
          "Όχι. Υπάρχει σύμβαση αποφυγής διπλής φορολόγησης μεταξύ Ελλάδας και Βουλγαρίας. Ένα νομικό πρόσωπο δεν φορολογείται δύο φορές σε δύο χώρες.",
        answerEn:
          "No. There's a double-taxation treaty between Greece and Bulgaria. A legal entity can't be taxed twice in two countries.",
      },
    ],
  },
  {
    id: "legal-insurance",
    titleEl: "Νομικά & ασφαλιστικά θέματα",
    titleEn: "Legal & insurance",
    items: [
      {
        id: "dual-company",
        questionEl: "Μπορώ να διατηρώ εταιρεία στη Βουλγαρία παράλληλα με άλλη στη χώρα μου;",
        questionEn: "Can I keep a Bulgarian company alongside one in my home country?",
        answerEl:
          "Ναι, αρκεί να μην έχουν το ίδιο αντικείμενο ή, αν έχουν, ο μεταξύ τους τζίρος να μην ξεπερνά τις €20.000 σύμφωνα με τον νόμο περί ενδοομιλικών συναλλαγών.",
        answerEn:
          "Yes, as long as they don't share the same business activity, or if they do, intra-group turnover between them stays under €20,000 under transfer-pricing rules.",
      },
      {
        id: "social-security-a1",
        questionEl: "Πληρώνω ασφαλιστικές εισφορές στη χώρα μου — πρέπει και στη Βουλγαρία;",
        questionEn: "I pay social security at home — do I also pay in Bulgaria?",
        answerEl:
          "Αν πληρώνετε ως ελεύθερος επαγγελματίας σε χώρα της ΕΕ, μπορείτε να ζητήσετε το έντυπο Α1 από τον ασφαλιστικό σας φορέα και να απαλλαγείτε στη Βουλγαρία.",
        answerEn:
          "If you pay as a self-employed professional in an EU country, you can request form A1 from your insurer and be exempted in Bulgaria.",
      },
      {
        id: "retiree-manager",
        questionEl: "Ένας συνταξιούχος που γίνεται διαχειριστής πληρώνει ασφαλιστικές εισφορές;",
        questionEn: "Does a retiree who becomes manager pay social security?",
        answerEl: "Όχι, εφόσον προσκομίσει το έντυπο S1 από το ταμείο της σύνταξής του.",
        answerEn: "No, as long as they provide form S1 from their pension fund.",
      },
      {
        id: "retiree-pension-risk",
        questionEl: "Κινδυνεύω να μου κοπεί η σύνταξη ως διαχειριστής βουλγαρικής εταιρείας;",
        questionEn: "Could becoming a manager risk my pension?",
        answerEl:
          "Όχι — οι σχετικοί περιορισμοί ισχύουν μόνο εντός της χώρας κατοικίας σας. Συνιστάται όμως να επιβεβαιώσετε με εργατολόγο στη χώρα σας.",
        answerEn:
          "No — the relevant restrictions only apply within your home country. Still worth confirming with an employment-law advisor at home.",
      },
    ],
  },
  {
    id: "remote-operations",
    titleEl: "Απομακρυσμένη διαχείριση",
    titleEn: "Running it remotely",
    items: [
      {
        id: "need-to-be-present",
        questionEl: "Χρειάζεται η παρουσία μου συχνά στη Βουλγαρία;",
        questionEn: "Do I need to be physically present in Bulgaria often?",
        answerEl:
          "Όχι. Με εξουσιοδότηση προς το λογιστικό γραφείο, δεν χρειάζεται να επισκεφθείτε ξανά τη Βουλγαρία γι' αυτό.",
        answerEn:
          "No. With a power of attorney to your accounting office, you won't need to visit Bulgaria again for this.",
      },
      {
        id: "remote-payments",
        questionEl: "Μπορώ να πληρώνω τις φορολογικές μου υποχρεώσεις απομακρυσμένα;",
        questionEn: "Can I pay my tax obligations remotely?",
        answerEl:
          "Ναι, με λογαριασμό web banking σε βουλγαρική τράπεζα (π.χ. BULLBANK, FIBANK, TOKUDA, DSK).",
        answerEn:
          "Yes, with web banking access at a Bulgarian bank (e.g. BULLBANK, FIBANK, TOKUDA, DSK).",
      },
      {
        id: "loans",
        questionEl: "Μπορώ να πάρω δάνειο από βουλγαρική τράπεζα;",
        questionEn: "Can the company get a loan from a Bulgarian bank?",
        answerEl:
          "Υπό προϋποθέσεις: φυσικός χώρος, υγιείς τραπεζικές κινήσεις, συνεπείς φορολογικές πληρωμές, και σκοπός δανείου που μπορεί να υποθηκευτεί (μηχανήματα, επαγγελματικά οχήματα, ακίνητο).",
        answerEn:
          "Under conditions: a physical premises, healthy banking activity, consistent tax payments, and a loan purpose that can be secured (equipment, commercial vehicles, real estate).",
      },
    ],
  },
  {
    id: "about-taxbg",
    titleEl: "Ερωτήσεις για την TaxBG",
    titleEn: "Questions about TaxBG",
    items: [
      {
        id: "why-taxbg",
        questionEl: "Γιατί να προτιμήσω την TaxBG;",
        questionEn: "Why choose TaxBG over another agency?",
        answerEl:
          "Πάνω από μια δεκαετία εμπειρίας στην ίδρυση και λογιστική υποστήριξη εταιρειών, επικοινωνία στα Ελληνικά και Αγγλικά, προέλεγχος παραστατικών, ανταγωνιστικές τιμές και δωρεάν φορολογικός σχεδιασμός με κάθε ίδρυση.",
        answerEn:
          "Over a decade of experience in company formation and accounting support, communication in Greek and English, document pre-review, competitive pricing, and free tax planning with every formation.",
      },
      {
        id: "what-is-tax-planning",
        questionEl: "Τι είναι ο φορολογικός σχεδιασμός;",
        questionEn: "What is tax planning, specifically?",
        answerEl:
          "Δωρεάν υπηρεσία με κάθε ίδρυση εταιρείας: αναλύουμε τις ανάγκες σας σε σχέση με τους φορολογικούς νόμους Βουλγαρίας και Ελλάδας και βρίσκουμε τον βέλτιστο, νόμιμο τρόπο λειτουργίας — ώστε μια εταιρεία να είναι σύννομη απέναντι σε ΑΜΦΟΤΕΡΕΣ τις φορολογικές αρχές, όχι μόνο τις βουλγαρικές.",
        answerEn:
          "A free service included with every formation: we analyze your situation against both Bulgarian and Greek tax law and find the optimal, fully legal way to operate — so the company is compliant with BOTH tax authorities, not just the Bulgarian one.",
      },
      {
        id: "language-barrier",
        questionEl: "Οι περισσότεροι λογιστές στη Βουλγαρία μιλούν Ελληνικά ή Αγγλικά;",
        questionEn: "Do most Bulgarian accountants speak Greek or English?",
        answerEl:
          "Όχι, η συντριπτική πλειοψηφία δεν μιλά καν Αγγλικά — αυτό δημιουργεί σοβαρά λάθη στα λογιστικά και φορολογικά θέματα Ελλήνων πελατών.",
        answerEn:
          "No, the vast majority don't even speak English — this creates serious mistakes in the accounting and tax handling of Greek clients.",
      },
      {
        id: "document-pre-check",
        questionEl: "Τι είναι ο προέλεγχος παραστατικών;",
        questionEn: "What is the document pre-review service?",
        answerEl:
          "Κάθε παραστατικό που μας στέλνετε ελέγχεται σύμφωνα με τους βουλγαρικούς και ελληνικούς φορολογικούς νόμους πριν κατατεθεί στις αρχές — έτσι αποφεύγονται πρόστιμα από λάθη που εντοπίζονται μόνο σε έλεγχο, συνήθως σε βάθος πενταετίας.",
        answerEn:
          "Every document you send us is checked against Bulgarian and Greek tax law before being filed with the authorities — this avoids fines from mistakes that would otherwise only surface in an audit, often years later.",
      },
      {
        id: "communication-reliability",
        questionEl: "Είναι η TaxBG αξιόπιστη στην καθημερινή επικοινωνία;",
        questionEn: "Is TaxBG reliable for day-to-day communication?",
        answerEl:
          "Παρέχουμε υπηρεσίες στα Ελληνικά και Αγγλικά, με email ticketing ώστε κάθε αίτημα να προωθείται στον αρμόδιο. Για επείγουσες περιπτώσεις, οι πελάτες έχουν απευθείας τηλεφωνική πρόσβαση στους ιδρυτές.",
        answerEn:
          "We provide service in Greek and English, with email ticketing so every request reaches the right person. For urgent matters, clients have direct phone access to the founders.",
      },
    ],
  },
]
