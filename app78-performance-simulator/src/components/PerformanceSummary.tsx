import {
  Card,
  Text,
  Title3
} from "@fluentui/react-components";

interface Props {
  total: number;
  average: string;
  topPerformers: number;
}

export function PerformanceSummary({
  total,
  average,
  topPerformers,
}: Props) {
  return (
    <Card
      style={{
        padding: 20,
        marginBottom: 20
      }}
    >
      <Title3>Performance Metrics</Title3>

      <Text>
        Total Employees: {total}
      </Text>

      <br />

      <Text>
        Average Score: {average}
      </Text>

      <br />

      <Text>
        Top Performers: {topPerformers}
      </Text>
    </Card>
  );
}