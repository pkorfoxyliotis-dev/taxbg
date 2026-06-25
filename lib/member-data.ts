import { db } from "@/lib/db"

export type Subscription = {
  id: string
  serviceId: string
  tierId: string
  status: string
  currentPeriodEnd: string | null
}

export type Order = {
  id: string
  serviceId: string
  tierId: string
  amountEur: string
  status: string
  createdAt: string
}

export type Notification = {
  id: string
  type: string
  title: string
  body: string | null
  readAt: string | null
  createdAt: string
}

export async function getSubscriptionsForMember(memberId: string): Promise<Subscription[]> {
  const result = await db().query(
    `select id, service_id as "serviceId", tier_id as "tierId", status,
            current_period_end as "currentPeriodEnd"
     from subscriptions
     where member_id = $1
     order by created_at desc`,
    [memberId]
  )
  return result.rows
}

export async function getOrdersForMember(memberId: string): Promise<Order[]> {
  const result = await db().query(
    `select id, service_id as "serviceId", tier_id as "tierId",
            amount_eur as "amountEur", status, created_at as "createdAt"
     from orders
     where member_id = $1
     order by created_at desc
     limit 50`,
    [memberId]
  )
  return result.rows
}

export async function getNotificationsForMember(memberId: string): Promise<Notification[]> {
  const result = await db().query(
    `select id, type, title, body, read_at as "readAt", created_at as "createdAt"
     from notifications
     where member_id = $1
     order by created_at desc
     limit 50`,
    [memberId]
  )
  return result.rows
}

export async function markNotificationRead(
  memberId: string,
  notificationId: string
): Promise<void> {
  await db().query(
    `update notifications set read_at = now()
     where id = $1 and member_id = $2 and read_at is null`,
    [notificationId, memberId]
  )
}
