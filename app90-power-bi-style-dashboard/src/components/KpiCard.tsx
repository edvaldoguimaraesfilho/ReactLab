import {
  Badge,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  ArrowTrending24Regular,
  Money24Regular,
} from "@fluentui/react-icons";

import type { DashboardMetric } from "../models/DashboardMetric";

interface KpiCardProps {
  metric: DashboardMetric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const badgeAppearance =
    metric.status === "positive"
      ? "filled"
      : metric.status === "negative"
      ? "outline"
      : "tint";

  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Money24Regular />
        <Badge appearance={badgeAppearance}>{metric.variation}</Badge>
      </div>

      <Text size={300}>{metric.title}</Text>

      <Title3>{metric.value}</Title3>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ArrowTrending24Regular />
        <Text size={200}>Compared with previous period</Text>
      </div>
    </Card>
  );
}