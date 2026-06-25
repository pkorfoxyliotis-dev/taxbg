import { createHash, randomBytes } from "node:crypto"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

/**
 * Separate from lib/auth.ts on purpose — admin_users/admin_sessions are a
 * distinct table pair from members/sessions, with their own cookie, so an
 * owner session and a client session never overlap or get confused.
 */
export const ADMIN_SESSION_COOKIE = "taxbg_admin_session"
const ADMIN_SESSION_TTL_DAYS = 14

export type AdminUser = {
  id: string
  email: string
  displayName: string
}

function hashToken(token: string): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET is not set")
  return createHash("sha256").update(`admin:${secret}:${token}`).digest("hex")
}

export async function verifyAdminPassword(
  email: string,
  password: string
): Promise<AdminUser | null> {
  const result = await db().query(
    `select id, email, display_name as "displayName", password_hash as "passwordHash"
     from admin_users where email = $1`,
    [email.toLowerCase().trim()]
  )
  const row = result.rows[0]
  if (!row) return null
  const ok = await bcrypt.compare(password, row.passwordHash)
  if (!ok) return null
  return { id: row.id, email: row.email, displayName: row.displayName }
}

export async function createAdminSession(
  adminId: string,
  meta: { userAgent?: string | null; ip?: string | null } = {}
): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("hex")
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_TTL_DAYS * 24 * 60 * 60 * 1000)

  await db().query(
    `insert into admin_sessions (admin_id, token_hash, user_agent, ip, expires_at)
     values ($1, $2, $3, $4, $5)`,
    [adminId, tokenHash, meta.userAgent ?? null, meta.ip ?? null, expiresAt]
  )

  return { token, expiresAt }
}

export async function getAdminBySessionToken(token: string): Promise<AdminUser | null> {
  const tokenHash = hashToken(token)
  const result = await db().query(
    `select a.id, a.email, a.display_name as "displayName"
     from admin_sessions s
     join admin_users a on a.id = s.admin_id
     where s.token_hash = $1 and s.expires_at > now()`,
    [tokenHash]
  )
  return result.rows[0] ?? null
}

export async function revokeAdminSession(token: string): Promise<void> {
  const tokenHash = hashToken(token)
  await db().query("delete from admin_sessions where token_hash = $1", [tokenHash])
}

/** Server Components / Route Handlers only. */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const store = await cookies()
  const token = store.get(ADMIN_SESSION_COOKIE)?.value
  if (!token) return null
  return getAdminBySessionToken(token)
}
