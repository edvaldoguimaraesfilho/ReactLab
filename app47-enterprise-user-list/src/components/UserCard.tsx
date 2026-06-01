import {
  Avatar,
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import type { EnterpriseUser } from "../models/EnterpriseUser";

interface UserCardProps {
  user: EnterpriseUser;
}

function getBadgeAppearance(status: EnterpriseUser["status"]) {
  if (status === "Available") {
    return "filled" as const;
  }

  if (status === "Busy") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        width: "100%",
      }}
    >
      <CardHeader
        image={<Avatar name={user.name} />}
        header={<Body1>{user.name}</Body1>}
        description={<Caption1>{user.role}</Caption1>}
      />

      <Text>{user.email}</Text>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(user.status)}>
          {user.status}
        </Badge>

        <Badge appearance="outline">
          {user.department}
        </Badge>
      </div>
    </Card>
  );
}