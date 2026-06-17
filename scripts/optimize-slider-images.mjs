/**
 * Convert source PNGs → WebP in public/images/ (self-hosted, no CDN).
 * Run: node scripts/optimize-slider-images.mjs
 */
import sharp from "sharp"
import { mkdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const assetsDir = join(root, "assets", "sources")

const jobs = [
  {
    src: "slide-formation-source.png",
    out: "public/images/home/formation.webp",
    width: 1920,
    height: 800,
    quality: 82,
  },
  {
    src: "slide-accounting-source.png",
    out: "public/images/home/accounting.webp",
    width: 1920,
    height: 800,
    quality: 82,
  },
  {
    src: "slide-consultation-source.png",
    out: "public/images/home/consultation.webp",
    width: 1920,
    height: 800,
    quality: 82,
  },
  {
    src: "slide-sofia-source.png",
    out: "public/images/home/sofia.webp",
    width: 1920,
    height: 800,
    quality: 82,
  },
  {
    src: "slide-formation-source.png",
    out: "public/images/services/formation.webp",
    width: 1400,
    height: 560,
    quality: 80,
  },
  {
    src: "slide-accounting-source.png",
    out: "public/images/services/accounting.webp",
    width: 1400,
    height: 560,
    quality: 80,
  },
  {
    src: "slide-consultation-source.png",
    out: "public/images/services/support.webp",
    width: 1400,
    height: 560,
    quality: 80,
  },
]

for (const job of jobs) {
  const srcPath = join(assetsDir, job.src)
  const outPath = join(root, job.out)
  mkdirSync(dirname(outPath), { recursive: true })

  if (!existsSync(srcPath)) {
    console.warn(`Skip (missing): ${srcPath}`)
    continue
  }

  await sharp(srcPath)
    .resize(job.width, job.height, { fit: "cover", position: "centre" })
    .webp({ quality: job.quality, effort: 4 })
    .toFile(outPath)

  console.log(`Wrote ${job.out}`)
}

console.log("Done.")
