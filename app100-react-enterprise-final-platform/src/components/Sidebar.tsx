import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function Sidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
      }}
    >
      <Title2>
        Enterprise Portal
      </Title2>

      <Text>Dashboard</Text>
      <Text>Users</Text>
      <Text>Products</Text>
      <Text>Reports</Text>
      <Text>Analytics</Text>
      <Text>Settings</Text>
    </Card>
  );
}