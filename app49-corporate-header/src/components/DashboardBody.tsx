import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function DashboardBody() {
  return (
    <main
      style={{
        padding: "32px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 72px)",
        boxSizing: "border-box",
      }}
    >
      <Title2>
        Corporate Dashboard
      </Title2>

      <Text>
        Enterprise React layout with Fluent UI header composition.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Projects</Title2>

          <Text>
            24 active projects currently running.
          </Text>
        </Card>

        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Teams</Title2>

          <Text>
            8 departments connected to the portal.
          </Text>
        </Card>

        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Reports</Title2>

          <Text>
            14 reports generated this month.
          </Text>
        </Card>
      </div>
    </main>
  );
}