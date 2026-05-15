import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
} from "@fluentui/react-components";

import type { UserProfile } from "../models/UserProfile";

interface ProfileCardProps {
  user: UserProfile;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card className="profile-card">
      <CardHeader
        image={<Avatar name={user.name} color="colorful" size={64} />}
        header={
          <Text weight="semibold" size={500}>
            {user.name}
          </Text>
        }
        description={<Text>{user.role}</Text>}
      />

      <div className="profile-info">
        <Text>📧 {user.email}</Text>
        <Text>🏢 {user.department}</Text>

        <Badge
          appearance="filled"
          color={
            user.status === "Online"
              ? "success"
              : user.status === "Busy"
              ? "warning"
              : "subtle"
          }
        >
          {user.status}
        </Badge>
      </div>

      <div className="profile-actions">
        <Button appearance="primary">Contact</Button>
        <Button appearance="secondary">Details</Button>
      </div>
    </Card>
  );
}