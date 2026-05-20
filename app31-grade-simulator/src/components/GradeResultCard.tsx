import { Badge, Card, Text, Title2 } from "@fluentui/react-components";

interface GradeResultCardProps {
  average: number;
  status: "Approved" | "Recovery" | "Failed";
}

export function GradeResultCard({ average, status }: GradeResultCardProps) {
  const badgeAppearance =
    status === "Approved" ? "filled" : status === "Recovery" ? "tint" : "outline";

  return (
    <Card style={{ padding: "24px" }}>
      <Title2>Final Result</Title2>

      <Text size={600}>Average: {average.toFixed(2)}</Text>

      <Badge appearance={badgeAppearance}>{status}</Badge>
    </Card>
  );
}