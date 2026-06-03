import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string;
}

export function KpiCard({
  title,
  value,
}: KpiCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{title}</Title3>

      <Text
        style={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {value}
      </Text>
    </Card>
  );
}