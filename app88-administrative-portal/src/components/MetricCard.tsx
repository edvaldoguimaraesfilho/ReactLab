import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface MetricCardProps {
  title: string;
  value: string;
}

export function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title3>{title}</Title3>

      <Text
        size={500}
        weight="semibold"
      >
        {value}
      </Text>
    </Card>
  );
}