import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function DashboardTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>Executive Dashboard</Title2>

      <Text>
        Welcome to the enterprise dashboard overview.
      </Text>
    </Card>
  );
}