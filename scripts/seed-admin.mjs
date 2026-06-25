/**
 * Create (or update the password of) the one owner admin account.
 * No public signup route exists for admin_users on purpose.
 *
 * Run: node scripts/seed-admin.mjs you@example.com 'a-strong-password' "Display Name"
 */
import bcrypt from "bcryptjs"
import pg from "pg"

const [email, password, displayName] = process.argv.slice(2)

if (!email || !password) {
  console.error("Usage: node scripts/seed-admin.mjs <email> <password> [displayName]")
  process.exit(1)
}

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error("DATABASE_URL is not set")
  process.exit(1)
}

const client = new pg.Client({ connectionString: databaseUrl })

async function main() {
  await client.connect()
  const passwordHash = await bcrypt.hash(password, 12)

  await client.query(
    `insert into admin_users (email, password_hash, display_name)
     values ($1, $2, $3)
     on conflict (email) do update
       set password_hash = excluded.password_hash,
           display_name = excluded.display_name`,
    [email.toLowerCase().trim(), passwordHash, displayName ?? ""]
  )

  console.log(`Admin account ready: ${email}`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => client.end())
