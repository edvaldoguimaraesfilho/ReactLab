import {
  Button,
  Card,
  Title2,
} from "@fluentui/react-components";

import { useUser } from "../contexts/UserContext";

export function UserDashboard() {
  const {
    user,
    updateUser,
  } = useUser();

  function switchUser() {
    updateUser({
      id: 2,
      name: "Mary Johnson",
      role: "Manager",
      department: "Finance",
    });
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>
        Welcome {user.name}
      </Title2>

      <Button
        appearance="primary"
        onClick={switchUser}
      >
        Change User
      </Button>
    </Card>
  );
}