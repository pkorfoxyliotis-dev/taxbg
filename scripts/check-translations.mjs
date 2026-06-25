/**
 * Translation drift detector — no TS runtime needed, just counts field
 * occurrences by suffix in each content file's source text.
 *
 * Catches the case that actually burns sites: someone adds a new FAQ
 * question, blog post, or service field in Greek (titleEl: "...") and
 * forgets the En/Bg/De siblings. If counts of a base field's El/En/Bg/De
 * suffixes don't match within a file, that's drift — fail loudly.
 *
 * Run: node scripts/check-translations.mjs
 * Wired into CI: .github/workflows/i18n-check.yml (runs on every push/PR)
 */
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

// Files that carry el/en/bg/de localized fields. Add new content files here
// as they're created — that's the one manual step this automation needs.
const TARGET_FILES = [
  "content/services.ts",
  "content/faq.ts",
  "content/articles.ts",
  "content/identity.ts",
]

const LOCALES = ["El", "En", "Bg", "De"]
const FIELD_KEY = /\b([a-zA-Z]+)(El|En|Bg|De)\s*:/g

function countFieldsBySuffix(source) {
  const counts = {} // { baseName: { El: n, En: n, Bg: n, De: n } }
  for (const match of source.matchAll(FIELD_KEY)) {
    const [, base, suffix] = match
    counts[base] ??= { El: 0, En: 0, Bg: 0, De: 0 }
    counts[base][suffix] += 1
  }
  return counts
}

function checkFile(relPath) {
  const fullPath = join(root, relPath)
  let source
  try {
    source = readFileSync(fullPath, "utf-8")
  } catch {
    return { relPath, missing: false, skipped: true }
  }

  const counts = countFieldsBySuffix(source)
  const problems = []

  for (const [base, bySuffix] of Object.entries(counts)) {
    // Only enforce parity for fields that exist in at least one non-Greek
    // locale already — fields that are El-only everywhere (not yet started
    // on translation) are tracked in migration/i18n-bg-de.md, not flagged
    // here as drift.
    const startedLocales = LOCALES.filter((l) => bySuffix[l] > 0)
    if (startedLocales.length <= 1) continue

    const max = Math.max(...LOCALES.map((l) => bySuffix[l]))
    const mismatched = LOCALES.filter(
      (l) => bySuffix[l] > 0 && bySuffix[l] !== max
    )
    if (mismatched.length > 0) {
      problems.push({
        base,
        counts: bySuffix,
      })
    }
  }

  return { relPath, problems, skipped: false }
}

let hasDrift = false

for (const relPath of TARGET_FILES) {
  const result = checkFile(relPath)
  if (result.skipped) continue

  if (result.problems.length > 0) {
    hasDrift = true
    console.error(`\n✗ ${result.relPath} — translation drift:`)
    for (const p of result.problems) {
      const summary = LOCALES.map((l) => `${l}=${p.counts[l]}`).join(" ")
      console.error(`  ${p.base}: ${summary}`)
    }
  } else {
    console.log(`✓ ${relPath} — locale field counts consistent`)
  }
}

if (hasDrift) {
  console.error(
    "\nSome localized fields have mismatched counts across El/En/Bg/De — a new item " +
      "was likely added in one locale and not the others. Fix before merging.\n" +
      "See migration/i18n-bg-de.md for what's intentionally not-yet-translated."
  )
  process.exit(1)
}

console.log("\nNo translation drift detected.")
