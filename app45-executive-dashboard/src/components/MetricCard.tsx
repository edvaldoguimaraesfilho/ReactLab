import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Title3,
} from "@fluentui/react-components";

import {
  ArrowTrending24Regular,
  Warning24Regular,
  ErrorCircle24Regular,
} from "@fluentui/react-icons";

import type { ExecutiveMetric } from "../models/ExecutiveMetric";

interface MetricCardProps {
  metric: ExecutiveMetric;
}

function getIcon(status: ExecutiveMetric["status"]) {
  if (status === "Positive") return <ArrowTrending24Regular />;
  if (status === "Warning") return <Warning24Regular />;
  return <ErrorCircle24Regular />;
}

function getBadgeAppearance(status: ExecutiveMetric["status"]) {
  if (status === "Positive") return "filled" as const;
  if (status === "Warning") return "tint" as const;
  return "outline" as const;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card style={{ padding: "20px", minHeight: "190px" }}>
      <CardHeader
        image={getIcon(metric.status)}
        header={<Title3>{metric.title}</Title3>}
        description={<Caption1>{metric.description}</Caption1>}
      />

      <Body1 style={{ fontSize: "32px", fontWeight: 700 }}>
        {metric.value}
      </Body1>

      <Badge appearance={getBadgeAppearance(metric.status)}>
        {metric.variation} · {metric.status}
      </Badge>
    </Card>
  );
}