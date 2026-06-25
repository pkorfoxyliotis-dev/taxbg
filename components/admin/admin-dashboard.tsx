import { AdminLogoutButton } from "@/components/admin/admin-logout-button"
import type { AdminUser } from "@/lib/admin-auth"
import {
  getDashboardCounts,
  listRecentMembers,
  listRecentOrders,
  listSubscriptions,
} from "@/lib/admin-data"

export async function AdminDashboard({ admin }: { admin: AdminUser }) {
  const [counts, members, subscriptions, orders] = await Promise.all([
    getDashboardCounts(),
    listRecentMembers(),
    listSubscriptions(),
    listRecentOrders(),
  ])

  return (
    <section className="section">
      <div
        className="section-head"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}
      >
        <div>
          <h1>Διαχείριση</h1>
          <p className="prose-muted">{admin.displayName || admin.email}</p>
        </div>
        <AdminLogoutButton />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div className="guide-card">
          <p className="prose-muted" style={{ fontSize: "0.85rem" }}>Μέλη</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 500 }}>{counts.members}</p>
        </div>
        <div className="guide-card">
          <p className="prose-muted" style={{ fontSize: "0.85rem" }}>Ενεργές συνδρομές</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 500 }}>{counts.activeSubscriptions}</p>
        </div>
        <div className="guide-card">
          <p className="prose-muted" style={{ fontSize: "0.85rem" }}>Παραγγελίες (μήνας)</p>
          <p style={{ fontSize: "1.75rem", fontWeight: 500 }}>{counts.ordersThisMonth}</p>
        </div>
      </div>

      <div className="guide-card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>Συνδρομές</h2>
        {subscriptions.length === 0 ? (
          <p className="prose-muted">Δεν υπάρχουν συνδρομές ακόμα.</p>
        ) : (
          <ul className="feature-list">
            {subscriptions.map((s) => (
              <li key={s.id}>
                {s.memberEmail} — {s.serviceId}/{s.tierId} — {s.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="guide-card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>Πρόσφατες παραγγελίες</h2>
        {orders.length === 0 ? (
          <p className="prose-muted">Δεν υπάρχουν παραγγελίες ακόμα.</p>
        ) : (
          <ul className="feature-list">
            {orders.map((o) => (
              <li key={o.id}>
                {o.memberEmail} — {o.serviceId}/{o.tierId} — €{o.amountEur} — {o.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="guide-card">
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", color: "var(--navy)" }}>Πρόσφατα μέλη</h2>
        {members.length === 0 ? (
          <p className="prose-muted">Δεν υπάρχουν μέλη ακόμα.</p>
        ) : (
          <ul className="feature-list">
            {members.map((m) => (
              <li key={m.id}>
                {m.alias} — {m.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
