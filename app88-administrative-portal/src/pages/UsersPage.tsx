import {
  Card,
  Text,
} from "@fluentui/react-components";

import { users } from "../data/users";

export function UsersPage() {
  return (
    <>
      <h1>Users</h1>

      {users.map((user) => (
        <Card
          key={user.id}
          style={{
            marginBottom: "12px",
            padding: "16px",
          }}
        >
          <Text weight="semibold">
            {user.name}
          </Text>

          <br />

          <Text>
            {user.department} - {user.role}
          </Text>
        </Card>
      ))}
    </>
  );
}