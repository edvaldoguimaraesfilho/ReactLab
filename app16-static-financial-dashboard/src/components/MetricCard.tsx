import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { FinancialMetric } from "../models/FinancialMetric";

interface MetricCardProps {
  metric: FinancialMetric;
}

function getBadgeAppearance(trend: FinancialMetric["trend"]) {
  if (trend === "Positive") return "filled" as const;
  if (trend === "Negative") return "outline" as const;
  return "tint" as const;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        header={<Text weight="semibold">{metric.title}</Text>}
        description={<Body1>{metric.description}</Body1>}
      />

      <Title2>{metric.value}</Title2>

      <Badge appearance={getBadgeAppearance(metric.trend)}>
        {metric.trend}
      </Badge>
    </Card>
  );
}