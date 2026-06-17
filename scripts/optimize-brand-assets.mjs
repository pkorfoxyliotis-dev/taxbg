/**
 * Process TaxBG emblem source → transparent WebP/PNG + favicons.
 * Run: npm run brand:assets
 */
import sharp from "sharp"
import { existsSync, mkdirSync, copyFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const source = join(root, "assets", "sources", "brand", "emblem-wolf-source.png")
const brandDir = join(root, "public", "brand")
const appDir = join(root, "app")

function matchesBackground(r, g, b, samples, tol = 36) {
  for (const [cr, cg, cb] of samples) {
    if (
      Math.abs(r - cr) <= tol &&
      Math.abs(g - cg) <= tol &&
      Math.abs(b - cb) <= tol
    ) {
      return true
    }
  }
  // Typical baked-in checkerboard tiles
  const avg = (r + g + b) / 3
  if (avg > 210 && Math.max(r, g, b) - Math.min(r, g, b) < 18) return true
  if (avg > 165 && avg < 215 && Math.max(r, g, b) - Math.min(r, g, b) < 12) return true
  return false
}

async function removeBakedBackground(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const samples = [
    [data[0], data[1], data[2]],
    [data[(width - 1) * channels], data[(width - 1) * channels + 1], data[(width - 1) * channels + 2]],
    [data[(height - 1) * width * channels], data[(height - 1) * width * channels + 1], data[(height - 1) * width * channels + 2]],
    [
      data[((height - 1) * width + width - 1) * channels],
      data[((height - 1) * width + width - 1) * channels + 1],
      data[((height - 1) * width + width - 1) * channels + 2],
    ],
  ]

  const visited = new Uint8Array(width * height)
  const queue = []

  const tryPush = (x, y) => {
    const idx = y * width + x
    if (visited[idx]) return
    const i = idx * channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (!matchesBackground(r, g, b, samples)) return
    visited[idx] = 1
    data[i + 3] = 0
    queue.push([x, y])
  }

  for (let x = 0; x < width; x++) {
    tryPush(x, 0)
    tryPush(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    tryPush(0, y)
    tryPush(width - 1, y)
  }

  while (queue.length) {
    const [x, y] = queue.pop()
    if (x > 0) tryPush(x - 1, y)
    if (x < width - 1) tryPush(x + 1, y)
    if (y > 0) tryPush(x, y - 1)
    if (y < height - 1) tryPush(x, y + 1)
  }

  return sharp(data, { raw: { width, height, channels } }).png()
}

async function exportEmblem(pipeline, size, baseName) {
  const resized = pipeline.clone().resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  await resized.clone().webp({ quality: 92, alphaQuality: 100 }).toFile(join(brandDir, `${baseName}.webp`))
  await resized.clone().png().toFile(join(brandDir, `${baseName}.png`))
}

async function main() {
  if (!existsSync(source)) {
    console.error("Missing assets/sources/brand/emblem-wolf-source.png")
    process.exit(1)
  }

  mkdirSync(brandDir, { recursive: true })
  const cleaned = await removeBakedBackground(source)

  await exportEmblem(cleaned, 512, "emblem-wolf")
  await exportEmblem(cleaned, 256, "emblem-wolf-256")
  await exportEmblem(cleaned, 128, "emblem-wolf-128")
  await exportEmblem(cleaned, 96, "emblem-wolf-96")

  await cleaned
    .clone()
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(brandDir, "emblem-512.png"))

  await cleaned
    .clone()
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(appDir, "icon.png"))

  await cleaned
    .clone()
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(appDir, "apple-icon.png"))

  await cleaned
    .clone()
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(join(root, "public", "favicon.png"))

  console.log("Emblem processed → public/brand/emblem-wolf.webp + favicons")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
