import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { dashboardMetrics } from "./data/dashboardMetrics";
import type { Department } from "./models/DashboardMetric";
import { DashboardFilters } from "./components/DashboardFilters";
import { MetricCard } from "./components/MetricCard";
import { MetricSummary } from "./components/MetricSummary";

function App() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | "All">("All");

  const [selectedMonth, setSelectedMonth] = useState("January");

  const filteredMetrics = dashboardMetrics.filter((metric) => {
    const matchesDepartment =
      selectedDepartment === "All" ||
      metric.department === selectedDepartment;

    const matchesMonth = metric.month === selectedMonth;

    return matchesDepartment && matchesMonth;
  });

  const totalOnTarget = filteredMetrics.filter(
    (metric) => metric.value >= metric.target
  ).length;

  const totalBelowTarget = filteredMetrics.length - totalOnTarget;

  function resetFilters() {
    setSelectedDepartment("All");
    setSelectedMonth("January");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Dynamic Dashboard</Title1>

        <Text>
          A React dashboard using state, events, filters, and derived values.
        </Text>

        <DashboardFilters
          selectedDepartment={selectedDepartment}
          selectedMonth={selectedMonth}
          onDepartmentChange={setSelectedDepartment}
          onMonthChange={setSelectedMonth}
          onReset={resetFilters}
        />

        <MetricSummary
          totalMetrics={filteredMetrics.length}
          totalOnTarget={totalOnTarget}
          totalBelowTarget={totalBelowTarget}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {filteredMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;