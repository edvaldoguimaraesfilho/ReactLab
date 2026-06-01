import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { useUser } from "../contexts/UserContext";

export function UserProfile() {
  const { user } = useUser();

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>User Profile</Title2>

      <Text>
        Name: {user.name}
      </Text>

      <br />

      <Text>
        Role: {user.role}
      </Text>

      <br />

      <Text>
        Department: {user.department}
      </Text>
    </Card>
  );
}