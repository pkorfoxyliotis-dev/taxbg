/**
 * Tiny SQL migration runner — no ORM, fits the rest of this repo's plain-Node
 * script style. Applies migrations/*.sql in filename order, tracks applied
 * ones in schema_migrations so re-runs are safe.
 *
 * Run: node scripts/migrate.mjs   (needs DATABASE_URL)
 */
import { readdirSync, readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import pg from "pg"

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsDir = join(__dirname, "..", "migrations")

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const client = new pg.Client({ connectionString: databaseUrl })

async function main() {
  await client.connect()
  await client.query(`
    create table if not exists schema_migrations (
      version text primary key,
      applied_at timestamptz not null default now()
    )
  `)

  const applied = new Set(
    (await client.query("select version from schema_migrations")).rows.map(
      (r) => r.version
    )
  )

  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort()

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`= ${file} (already applied)`)
      continue
    }
    const sql = readFileSync(join(migrationsDir, file), "utf-8")
    console.log(`> applying ${file}`)
    await client.query("begin")
    try {
      await client.query(sql)
      await client.query(
        "insert into schema_migrations (version) values ($1)",
        [file]
      )
      await client.query("commit")
      console.log(`✓ ${file}`)
    } catch (err) {
      await client.query("rollback")
      throw err
    }
  }

  console.log("\nAll migrations applied.")
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => client.end())
