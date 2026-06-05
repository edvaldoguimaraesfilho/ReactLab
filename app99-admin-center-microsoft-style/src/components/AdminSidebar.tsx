import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

export function AdminSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Title3>Admin Center</Title3>

      <Text>Dashboard</Text>
      <Text>Users</Text>
      <Text>Groups</Text>
      <Text>Devices</Text>
      <Text>Reports</Text>
      <Text>Settings</Text>
    </Card>
  );
}