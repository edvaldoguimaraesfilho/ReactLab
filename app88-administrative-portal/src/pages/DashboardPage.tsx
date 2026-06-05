import { MetricCard } from "../components/MetricCard";

export function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "24px",
        }}
      >
        <MetricCard
          title="Users"
          value="124"
        />

        <MetricCard
          title="Departments"
          value="12"
        />

        <MetricCard
          title="Projects"
          value="47"
        />

        <MetricCard
          title="Tickets"
          value="18"
        />
      </div>
    </>
  );
}