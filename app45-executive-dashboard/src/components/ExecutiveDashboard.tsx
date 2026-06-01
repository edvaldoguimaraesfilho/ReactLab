import {
  Button,
  Card,
  Text,
  Title1,
  Title2,
} from "@fluentui/react-components";

import {
  Board24Regular,
  CalendarAgenda24Regular,
  DocumentBulletList24Regular,
} from "@fluentui/react-icons";

import { executiveMetrics } from "../data/executiveMetrics";
import { MetricCard } from "./MetricCard";

export function ExecutiveDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <Title1>Executive Dashboard</Title1>
            <Text>
              A Microsoft-style executive overview built with React,
              TypeScript, Vite, and Fluent UI.
            </Text>
          </div>

          <Button appearance="primary" icon={<DocumentBulletList24Regular />}>
            Export Report
          </Button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {executiveMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          <Card style={{ padding: "24px" }}>
            <Title2>Business Review</Title2>
            <Text>
              Revenue and customer satisfaction remain strong, while delayed
              projects require leadership attention. This dashboard is currently
              static, but its structure is ready for future state, filters,
              charts, APIs, and DataGrid integration.
            </Text>
          </Card>

          <Card style={{ padding: "24px" }}>
            <Title2>Actions</Title2>

            <Button icon={<Board24Regular />}>Review KPIs</Button>
            <Button icon={<CalendarAgenda24Regular />}>Schedule Meeting</Button>
            <Button icon={<DocumentBulletList24Regular />}>Open Reports</Button>
          </Card>
        </div>
      </section>
    </main>
  );
}