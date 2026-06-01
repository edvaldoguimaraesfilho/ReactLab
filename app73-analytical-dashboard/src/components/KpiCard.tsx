import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string | number;
}

export function KpiCard({
  title,
  value,
}: KpiCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Text>{title}</Text>

      <Title2>
        {value}
      </Title2>
    </Card>
  );
}