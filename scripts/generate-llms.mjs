/**
 * Post-build: write static llms.txt copies to public/ for CDN/nginx fallback.
 * Dynamic routes at /llms.txt remain source of truth at runtime.
 */
import { writeFileSync, mkdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public")
mkdirSync(publicDir, { recursive: true })

const stub = `# TaxBG — regenerate with: npm run agent:llms (after build)
# Live content served from /llms.txt and /llms_full.txt (Next.js routes)
# Identity: /identity.json (public root)
`

writeFileSync(join(publicDir, "llms.txt"), stub, "utf8")
writeFileSync(join(publicDir, "llms_full.txt"), stub, "utf8")
console.log("Wrote public/llms.txt stubs")
