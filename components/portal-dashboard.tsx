import { LogoutButton } from "@/components/auth/logout-button"
import type { Locale } from "@/content/routes"
import type { Member } from "@/lib/auth"
import {
  getNotificationsForMember,
  getOrdersForMember,
  getSubscriptionsForMember,
} from "@/lib/member-data"

const STATUS_LABEL: Record<string, { el: string; en: string }> = {
  active: { el: "Ενεργή", en: "Active" },
  past_due: { el: "Ληξιπρόθεσμη", en: "Past due" },
  canceled: { el: "Ακυρωμένη", en: "Canceled" },
  pending: { el: "Σε εκκρεμότητα", en: "Pending" },
  paid: { el: "Πληρωμένη", en: "Paid" },
  failed: { el: "Αποτυχημένη", en: "Failed" },
  refunded: { el: "Επιστροφή χρημάτων", en: "Refunded" },
}

function statusLabel(status: string, isEn: boolean): string {
  return STATUS_LABEL[status]?.[isEn ? "en" : "el"] ?? status
}

export async function PortalDashboard({
  member,
  locale = "el",
}: {
  member: Member
  locale?: Locale
}) {
  const isEn = locale === "en"
  const [subscriptions, orders, notifications] = await Promise.all([
    getSubscriptionsForMember(member.id),
    getOrdersForMember(member.id),
    getNotificationsForMember(member.id),
  ])

  return (
    <section className="section">
      <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1>{isEn ? `Welcome, ${member.alias}` : `Καλώς ήρθες, ${member.alias}`}</h1>
          <p className="prose-muted">{member.email}</p>
        </div>
        <LogoutButton locale={locale} />
      </div>

      <div className="guide-card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>
          {isEn ? "Subscriptions" : "Συνδρομές"}
        </h2>
        {subscriptions.length === 0 ? (
          <p className="prose-muted">
            {isEn ? "No active subscriptions yet." : "Δεν υπάρχουν ενεργές συνδρομές ακόμα."}
          </p>
        ) : (
          <ul className="feature-list">
            {subscriptions.map((s) => (
              <li key={s.id}>
                {s.serviceId} — {s.tierId} ({statusLabel(s.status, isEn)})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="guide-card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>
          {isEn ? "Order history" : "Ιστορικό παραγγελιών"}
        </h2>
        {orders.length === 0 ? (
          <p className="prose-muted">
            {isEn ? "No orders yet." : "Δεν υπάρχουν παραγγελίες ακόμα."}
          </p>
        ) : (
          <ul className="feature-list">
            {orders.map((o) => (
              <li key={o.id}>
                {o.serviceId} — {o.tierId} — €{o.amountEur} ({statusLabel(o.status, isEn)})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="guide-card">
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>
          {isEn ? "Notifications" : "Ειδοποιήσεις"}
        </h2>
        {notifications.length === 0 ? (
          <p className="prose-muted">
            {isEn ? "No notifications yet." : "Δεν υπάρχουν ειδοποιήσεις ακόμα."}
          </p>
        ) : (
          <ul className="feature-list">
            {notifications.map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                {n.body ? ` — ${n.body}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
