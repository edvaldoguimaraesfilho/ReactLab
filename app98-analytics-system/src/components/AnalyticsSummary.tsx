import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface AnalyticsSummaryProps {
  totalMetrics: number;
}

export function AnalyticsSummary({
  totalMetrics,
}: AnalyticsSummaryProps) {
  return (
    <Card
      style={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Title3>Analytics Overview</Title3>

      <Text>
        Active Metrics: {totalMetrics}
      </Text>
    </Card>
  );
}