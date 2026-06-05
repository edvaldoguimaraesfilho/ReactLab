import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface AuditSummaryProps {
  total: number;
  warnings: number;
  failures: number;
}

export function AuditSummary({
  total,
  warnings,
  failures,
}: AuditSummaryProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <Card>
        <Title3>Total Events</Title3>
        <Text>{total}</Text>
      </Card>

      <Card>
        <Title3>Warnings</Title3>
        <Text>{warnings}</Text>
      </Card>

      <Card>
        <Title3>Failures</Title3>
        <Text>{failures}</Text>
      </Card>
    </div>
  );
}