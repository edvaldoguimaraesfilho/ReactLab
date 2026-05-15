import {
  Card,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

export function DashboardContent() {
  return (
    <main
      style={{
        flex: 1,
        padding: "32px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Corporate Dashboard
      </Title1>

      <Text>
        Welcome to the enterprise portal.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <Card>
          <Title3>Projects</Title3>

          <Text>
            24 Active Projects
          </Text>
        </Card>

        <Card>
          <Title3>Teams</Title3>

          <Text>
            8 Departments
          </Text>
        </Card>

        <Card>
          <Title3>Reports</Title3>

          <Text>
            14 Monthly Reports
          </Text>
        </Card>
      </div>
    </main>
  );
}