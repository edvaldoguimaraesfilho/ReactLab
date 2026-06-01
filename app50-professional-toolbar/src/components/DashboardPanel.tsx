import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

export function DashboardPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "24px",
      }}
    >
      <Card>
        <Title3>Projects</Title3>

        <Text>
          14 Active Projects
        </Text>
      </Card>

      <Card>
        <Title3>Teams</Title3>

        <Text>
          8 Enterprise Departments
        </Text>
      </Card>

      <Card>
        <Title3>Reports</Title3>

        <Text>
          32 Monthly Reports
        </Text>
      </Card>
    </div>
  );
}