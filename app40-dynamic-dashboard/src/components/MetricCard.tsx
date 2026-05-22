import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  ArrowTrending24Regular,
  CheckmarkCircle24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { DashboardMetric } from "../models/DashboardMetric";

interface MetricCardProps {
  metric: DashboardMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isOnTarget = metric.value >= metric.target;

  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        image={<ArrowTrending24Regular />}
        header={<Title3>{metric.title}</Title3>}
        description={
          <Caption1>
            {metric.department} · {metric.month}
          </Caption1>
        }
      />

      <Text size={700} weight="semibold">
        {metric.unit}
        {metric.value.toLocaleString()}
      </Text>

      <Body1>Target: {metric.unit}{metric.target.toLocaleString()}</Body1>

      <Badge
        appearance={isOnTarget ? "filled" : "outline"}
        icon={isOnTarget ? <CheckmarkCircle24Regular /> : <Warning24Regular />}
      >
        {isOnTarget ? "On target" : "Below target"}
      </Badge>
    </Card>
  );
}