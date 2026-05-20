import { financialMetrics } from "../data/financialMetrics";
import { MetricCard } from "./MetricCard";

export function FinancialDashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {financialMetrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}