import type { DashboardMetrics } from "../models/DashboardMetrics";
import { KpiCard } from "./KpiCard";

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

export function MetricsGrid({
  metrics,
}: MetricsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      <KpiCard
        title="Total Users"
        value={metrics.totalUsers}
      />

      <KpiCard
        title="Active Projects"
        value={metrics.activeProjects}
      />

      <KpiCard
        title="Open Tickets"
        value={metrics.openTickets}
      />

      <KpiCard
        title="Revenue"
        value={`$${metrics.revenue.toLocaleString()}`}
      />
    </div>
  );
}