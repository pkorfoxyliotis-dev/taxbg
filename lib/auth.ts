import { createHash, randomBytes } from "node:crypto"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
import { GREEK_ALIAS_REGEX, isValidGreekAlias } from "@/lib/alias"

export { GREEK_ALIAS_REGEX, isValidGreekAlias }

export const SESSION_COOKIE = "taxbg_session"
const SESSION_TTL_DAYS = 30

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

function hashToken(token: string): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error("SESSION_SECRET is not set")
  return createHash("sha256").update(`${secret}:${token}`).digest("hex")
}

export type Member = {
  id: string
  email: string
  alias: string
  locale: string
}

export async function createSession(
  memberId: string,
  meta: { userAgent?: string | null; ip?: string | null } = {}
): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("hex")
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000)

  await db().query(
    `insert into sessions (member_id, token_hash, user_agent, ip, expires_at)
     values ($1, $2, $3, $4, $5)`,
    [memberId, tokenHash, meta.userAgent ?? null, meta.ip ?? null, expiresAt]
  )

  return { token, expiresAt }
}

export async function getMemberBySessionToken(
  token: string
): Promise<Member | null> {
  const tokenHash = hashToken(token)
  const result = await db().query(
    `select m.id, m.email, m.alias, m.locale
     from sessions s
     join members m on m.id = s.member_id
     where s.token_hash = $1 and s.expires_at > now()`,
    [tokenHash]
  )
  return result.rows[0] ?? null
}

export async function revokeSession(token: string): Promise<void> {
  const tokenHash = hashToken(token)
  await db().query("delete from sessions where token_hash = $1", [tokenHash])
}

/** Server Components / Route Handlers only — reads the httpOnly session cookie directly. */
export async function getCurrentMember(): Promise<Member | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return getMemberBySessionToken(token)
}

export async function findMemberByEmail(email: string): Promise<
  (Member & { passwordHash: string | null }) | null
> {
  const result = await db().query(
    `select id, email, alias, locale, password_hash as "passwordHash"
     from members where email = $1`,
    [email.toLowerCase().trim()]
  )
  return result.rows[0] ?? null
}

export async function createMemberWithPassword(input: {
  email: string
  password: string
  alias: string
  locale?: string
}): Promise<Member> {
  if (!isValidGreekAlias(input.alias)) {
    throw new Error("invalid_alias")
  }
  const passwordHash = await hashPassword(input.password)
  const result = await db().query(
    `insert into members (email, password_hash, alias, locale)
     values ($1, $2, $3, $4)
     returning id, email, alias, locale`,
    [input.email.toLowerCase().trim(), passwordHash, input.alias, input.locale ?? "el"]
  )
  return result.rows[0]
}

export async function findOrCreateMemberFromGoogle(input: {
  email: string
  googleSub: string
  aliasHint: string
}): Promise<Member> {
  const existingIdentity = await db().query(
    `select m.id, m.email, m.alias, m.locale
     from oauth_identities oi
     join members m on m.id = oi.member_id
     where oi.provider = 'google' and oi.provider_user_id = $1`,
    [input.googleSub]
  )
  if (existingIdentity.rows[0]) return existingIdentity.rows[0]

  const existingByEmail = await findMemberByEmail(input.email)
  if (existingByEmail) {
    await db().query(
      `insert into oauth_identities (member_id, provider, provider_user_id)
       values ($1, 'google', $2)
       on conflict (provider, provider_user_id) do nothing`,
      [existingByEmail.id, input.googleSub]
    )
    return existingByEmail
  }

  // Greek-only alias is required, so a Latin Google display name can't be used
  // directly — fall back to a generated alias the member can change later.
  const fallbackAlias = `μέλος_${randomBytes(3).toString("hex")}`
  const alias = isValidGreekAlias(input.aliasHint) ? input.aliasHint : fallbackAlias

  const created = await db().query(
    `insert into members (email, alias, locale)
     values ($1, $2, 'el')
     returning id, email, alias, locale`,
    [input.email.toLowerCase().trim(), alias]
  )
  const member = created.rows[0]

  await db().query(
    `insert into oauth_identities (member_id, provider, provider_user_id)
     values ($1, 'google', $2)`,
    [member.id, input.googleSub]
  )

  return member
}
