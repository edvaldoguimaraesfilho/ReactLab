import {
  Card,
  Spinner,
  Text,
  Title3,
} from "@fluentui/react-components";

import { useUsers } from "../hooks/useUsers";

export function DashboardPage() {
  const { users, loading } = useUsers();

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title3>Users</Title3>

      {users.map((user) => (
        <Text key={user.id}>
          {user.name} - {user.role}
        </Text>
      ))}
    </Card>
  );
}