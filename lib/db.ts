import { Pool } from "pg"

/**
 * Single pg Pool for the whole process. Next.js dev mode reloads modules,
 * so stash the pool on globalThis to avoid leaking a new pool per reload.
 */
const g = globalThis as unknown as { __taxbgPgPool?: Pool }

export function db(): Pool {
  if (!g.__taxbgPgPool) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set")
    }
    g.__taxbgPgPool = new Pool({ connectionString })
  }
  return g.__taxbgPgPool
}
