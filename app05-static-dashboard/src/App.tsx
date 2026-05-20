import { Badge, Button, Card, Text, Title1, Title3 } from "@fluentui/react-components";
import { MetricCard } from "./components/MetricCard";
import { dashboardMetrics } from "./data/dashboardMetrics";

function App() {
  return (
    <main className="page">
      <section className="dashboard-shell">
        <header className="dashboard-header">
          <div>
            <Badge appearance="filled" color="brand">
              App 05
            </Badge>

            <Title1>Static Business Dashboard</Title1>

            <Text>
              A Microsoft-style static dashboard built with React, TypeScript,
              Vite, and Fluent UI.
            </Text>
          </div>

          <Button appearance="primary">Export Report</Button>
        </header>

        <section className="metrics-grid">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        <section className="content-grid">
          <Card className="large-card">
            <Title3>Business Overview</Title3>
            <Text>
              This section represents a static executive summary. In future apps,
              this area will evolve into dynamic content loaded from APIs and
              controlled by React state.
            </Text>
          </Card>

          <Card className="large-card">
            <Title3>Learning Goal</Title3>
            <Text>
              The main goal of this app is to practice composition, component
              extraction, typed data, list rendering, and clean dashboard layout.
            </Text>
          </Card>
        </section>
      </section>
    </main>
  );
}

export default App;