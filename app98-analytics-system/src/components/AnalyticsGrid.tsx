import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { AnalyticsMetric } from "../models/AnalyticsMetric";

interface AnalyticsGridProps {
  metrics: AnalyticsMetric[];
}

export function AnalyticsGrid({
  metrics,
}: AnalyticsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
        gap: "20px",
      }}
    >
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          style={{
            padding: "20px",
          }}
        >
          <Title3>{metric.metric}</Title3>

          <Text>
            Category: {metric.category}
          </Text>

          <br />

          <Text>
            Value: {metric.value}
          </Text>

          <br />

          <Text>
            Trend: {metric.trend}
          </Text>

          <br />

          <Text>
            Owner: {metric.owner}
          </Text>
        </Card>
      ))}
    </div>
  );
}