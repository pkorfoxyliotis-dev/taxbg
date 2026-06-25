# Adding Bulgarian (bg) and German (de) — checklist

Decided 2026-06-25: taxbg.eu becomes 4 languages (bg, el, en, de), Greek
canonical/primary since that's where clients come from. The routing
foundation in `content/routes.ts` now accepts `Locale = "el" | "en" | "bg" | "de"`
and every path helper (`pathFor`, `legalPath`, `servicePath`, `articlePath`)
already handles bg/de the same way it handles en — but no bg/de content or
pages exist yet. This is the real remaining work, roughly in priority order:

## 1. Decide bg/de slugs

Every route segment in `content/routes.ts` (`services`, `formation`,
`accounting`, `webServices`, `guide`, `pricing`, `contact`, `portal`, `blog`,
`faq`, `taxResidencyChange`, and all `legal.*` keys) needs a `bg` and `de`
slug added to its object. English slugs are a reasonable starting point for
German; Bulgarian needs its own (don't just transliterate Greek).

## 2. Translate content files

Each of these needs `XxxBg` / `XxxDe` fields alongside the existing `XxxEl`
/ `XxxEn` ones (or a restructure to `Record<Locale, string>` — pick one
pattern and apply it everywhere, don't mix):

- `content/services.ts` (3 services × title/short/description/features/tiers/problem/why/solution)
- `content/identity.ts`, `content/agent.ts` (agent persona strings)
- `content/legal.ts` (5 legal pages — **get a native speaker or professional
  translator to review before publishing**, this is the highest-risk content
  to get wrong)
- `content/faq.ts` (~25 Q&As)
- `content/articles.ts` (2 long-form articles)
- `content/company.ts` (address formatting per locale if needed)

## 3. Build the page folders

Mirror `app/en/*` structure under `app/bg/*` and `app/de/*` — every page
that exists in `app/en/` needs a bg and de twin. That's roughly 15 page
files × 2 locales = 30 new page components, plus their `generateMetadata`
calls.

## 4. Middleware

`middleware.ts` currently only special-cases `/en/*` for legal aliases and
rewrites bare Greek slugs. Once bg/de pages exist as real folders (not
Greek-slug rewrites — bg/de use their own slugs under a locale prefix, same
as en), middleware mostly doesn't need to change, but double check the
matcher config still excludes the new locale prefixes from interfering with
the Greek-slug rewrite logic.

## 5. hreflang / sitemap / locale switcher

- `lib/seo.ts` `buildPageMetadata` language alternates currently only handle
  el/en — extend to emit bg/de hreflang tags too.
- `app/sitemap.ts` needs bg/de URLs added.
- `components/locale-switcher.tsx` needs bg/de options.

## Automation — drift detection (done)

`scripts/check-translations.mjs` (`npm run i18n:check`) scans content files and
flags any localized field where El/En/Bg/De counts don't match — e.g. someone
adds a new FAQ question or blog section in Greek and forgets to add the other
locales. Wired into `.github/workflows/i18n-check.yml`, runs on every push/PR
that touches `content/**`. Fields that haven't started translation yet (Bg/De
count = 0 everywhere, like `faq.ts` and `articles.ts` right now) are not
flagged — only genuine partial drift is. Add new content files to the
`TARGET_FILES` list in the script as they're created.

This catches the "forgot to translate the new post" failure mode. It does
**not** catch low-quality or wrong translations — that still needs review,
especially for legal text.

## Not done in this pass

Only the type/path-helper foundation (step 0, already in `content/routes.ts`)
is in place. Steps 1-5 above are not started. Don't assume bg/de pages exist
just because the `Locale` type accepts them.
