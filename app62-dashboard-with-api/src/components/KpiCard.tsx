import { Card, Text, Title2 } from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card style={{ padding: "24px" }}>
      <Text>{title}</Text>
      <Title2>{value}</Title2>
      <Text size={200}>{description}</Text>
    </Card>
  );
}