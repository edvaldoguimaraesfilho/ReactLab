import { Card, Text, Title3 } from "@fluentui/react-components";

interface MetricSummaryProps {
  totalMetrics: number;
  totalOnTarget: number;
  totalBelowTarget: number;
}

export function MetricSummary({
  totalMetrics,
  totalOnTarget,
  totalBelowTarget,
}: MetricSummaryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "32px",
      }}
    >
      <Card>
        <Title3>Total Metrics</Title3>
        <Text size={600}>{totalMetrics}</Text>
      </Card>

      <Card>
        <Title3>On Target</Title3>
        <Text size={600}>{totalOnTarget}</Text>
      </Card>

      <Card>
        <Title3>Below Target</Title3>
        <Text size={600}>{totalBelowTarget}</Text>
      </Card>
    </div>
  );
}