import { db } from "@/lib/db"

/**
 * Cross-member read queries for the owner dashboard only — never call these
 * from member-facing routes (lib/member-data.ts is scoped to one member;
 * this file deliberately is not).
 */

export type AdminMemberRow = {
  id: string
  email: string
  alias: string
  locale: string
  createdAt: string
}

export type AdminSubscriptionRow = {
  id: string
  memberEmail: string
  serviceId: string
  tierId: string
  status: string
  currentPeriodEnd: string | null
}

export type AdminOrderRow = {
  id: string
  memberEmail: string
  serviceId: string
  tierId: string
  amountEur: string
  status: string
  createdAt: string
}

export async function getDashboardCounts(): Promise<{
  members: number
  activeSubscriptions: number
  ordersThisMonth: number
}> {
  const result = await db().query(`
    select
      (select count(*) from members) as members,
      (select count(*) from subscriptions where status = 'active') as "activeSubscriptions",
      (select count(*) from orders where created_at >= date_trunc('month', now())) as "ordersThisMonth"
  `)
  const row = result.rows[0]
  return {
    members: Number(row.members),
    activeSubscriptions: Number(row.activeSubscriptions),
    ordersThisMonth: Number(row.ordersThisMonth),
  }
}

export async function listRecentMembers(limit = 25): Promise<AdminMemberRow[]> {
  const result = await db().query(
    `select id, email, alias, locale, created_at as "createdAt"
     from members
     order by created_at desc
     limit $1`,
    [limit]
  )
  return result.rows
}

export async function listSubscriptions(limit = 50): Promise<AdminSubscriptionRow[]> {
  const result = await db().query(
    `select s.id, m.email as "memberEmail", s.service_id as "serviceId",
            s.tier_id as "tierId", s.status, s.current_period_end as "currentPeriodEnd"
     from subscriptions s
     join members m on m.id = s.member_id
     order by s.updated_at desc
     limit $1`,
    [limit]
  )
  return result.rows
}

export async function listRecentOrders(limit = 50): Promise<AdminOrderRow[]> {
  const result = await db().query(
    `select o.id, m.email as "memberEmail", o.service_id as "serviceId",
            o.tier_id as "tierId", o.amount_eur as "amountEur", o.status,
            o.created_at as "createdAt"
     from orders o
     join members m on m.id = o.member_id
     order by o.created_at desc
     limit $1`,
    [limit]
  )
  return result.rows
}
