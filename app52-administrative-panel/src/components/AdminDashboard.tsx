import { Card, Text, Title2, Title3 } from "@fluentui/react-components";
import { adminMetrics } from "../data/adminMetrics";

export function AdminDashboard() {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {adminMetrics.map((metric) => (
          <Card key={metric.id} style={{ padding: "24px" }}>
            <Title3>{metric.title}</Title3>
            <Title2>{metric.value}</Title2>
            <Text>{metric.description}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}