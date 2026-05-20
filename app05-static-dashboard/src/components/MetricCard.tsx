import { Card, CardHeader, Text, Title2, Body1 } from "@fluentui/react-components";
import { DataTrending24Regular } from "@fluentui/react-icons";
import type { DashboardMetric } from "../models/DashboardMetric";

type MetricCardProps = {
  metric: DashboardMetric;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card className="metric-card">
      <CardHeader
        image={<DataTrending24Regular />}
        header={<Text weight="semibold">{metric.title}</Text>}
      />

      <Title2>{metric.value}</Title2>

      <Body1 className="metric-description">
        {metric.description}
      </Body1>
    </Card>
  );
}