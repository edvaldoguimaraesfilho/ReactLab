import {
  Avatar,
  Badge,
  Body1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import {
  Mail24Regular,
  Location24Regular,
  Briefcase24Regular,
} from "@fluentui/react-icons";

import type { UserCard } from "../models/UserCard";

type MicrosoftUserCardProps = {
  user: UserCard;
};

function getBadgeColor(status: UserCard["status"]) {
  if (status === "Available") return "success";
  if (status === "Busy") return "danger";
  if (status === "Away") return "warning";

  return "subtle";
}

export function MicrosoftUserCard({ user }: MicrosoftUserCardProps) {
  return (
    <Card className="user-card">
      <CardHeader
        image={
          <Avatar
            name={user.fullName}
            initials={user.initials}
            color="colorful"
            size={56}
          />
        }
        header={
          <Text weight="semibold" size={500}>
            {user.fullName}
          </Text>
        }
        description={
          <Caption1>
            {user.jobTitle} • {user.department}
          </Caption1>
        }
      />

      <div className="user-card-content">
        <Badge appearance="filled" color={getBadgeColor(user.status)}>
          {user.status}
        </Badge>

        <Body1 className="info-row">
          <Briefcase24Regular />
          {user.department}
        </Body1>

        <Body1 className="info-row">
          <Mail24Regular />
          {user.email}
        </Body1>

        <Body1 className="info-row">
          <Location24Regular />
          {user.location}
        </Body1>
      </div>

      <CardFooter>
        <Button appearance="primary">View profile</Button>
        <Button appearance="secondary">Send message</Button>
      </CardFooter>
    </Card>
  );
}