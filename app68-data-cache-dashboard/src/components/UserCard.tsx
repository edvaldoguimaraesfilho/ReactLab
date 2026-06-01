import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { User } from "../models/User";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{user.name}</Title3>

      <Text>{user.email}</Text>

      <br />

      <Text>{user.company}</Text>

    </Card>
  );
}