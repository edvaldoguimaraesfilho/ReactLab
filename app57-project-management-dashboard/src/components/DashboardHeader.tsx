import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

export function DashboardHeader() {
  return (
    <Card
      style={{
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <Title1>
        Enterprise Project Dashboard
      </Title1>

      <Text>
        Microsoft-style project management interface built with
        React, TypeScript, Vite, and Fluent UI.
      </Text>
    </Card>
  );
}