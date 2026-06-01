import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { UserCard } from "./UserCard";

import { useCachedUsers }
  from "../hooks/useCachedUsers";

export function UserDashboard() {

  const {
    users,
    loading,
  } = useCachedUsers();

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <>
      <Title1>
        Data Cache Dashboard
      </Title1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </>
  );
}