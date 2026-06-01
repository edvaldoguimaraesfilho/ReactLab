import {
  Card,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";

import { metrics } from "../data/dashboardData";

export function MetricsPanel() {
  return (
    <section>
      <Title2>Portal Metrics</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <Text>{metric.label}</Text>
            <Title3>{metric.value}</Title3>
            <Text size={200}>{metric.description}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}