import {
  Card,
  Text
} from "@fluentui/react-components";

import type { User } from "../models/User";

interface Props {
  users: User[];
}

export function UserGrid({ users }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "12px"
      }}
    >
      {users.map(user => (
        <Card key={user.id}>
          <Text weight="semibold">
            {user.name}
          </Text>

          <Text>{user.email}</Text>

          <Text>
            {user.role}
          </Text>

          <Text>
            {user.department}
          </Text>

          <Text>
            {user.active
              ? "Active"
              : "Inactive"}
          </Text>
        </Card>
      ))}
    </div>
  );
}