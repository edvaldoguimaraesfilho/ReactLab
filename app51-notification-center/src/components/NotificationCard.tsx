import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Warning24Regular,
  ErrorCircle24Regular,
  Info24Regular,
} from "@fluentui/react-icons";

import type {
  NotificationItem,
  NotificationType,
} from "../models/NotificationItem";

interface NotificationCardProps {
  notification: NotificationItem;
}

function getNotificationIcon(type: NotificationType) {
  if (type === "success") {
    return <CheckmarkCircle24Regular />;
  }

  if (type === "warning") {
    return <Warning24Regular />;
  }

  if (type === "error") {
    return <ErrorCircle24Regular />;
  }

  return <Info24Regular />;
}

function getBadgeAppearance(type: NotificationType) {
  if (type === "success") {
    return "filled" as const;
  }

  if (type === "warning") {
    return "tint" as const;
  }

  if (type === "error") {
    return "outline" as const;
  }

  return "ghost" as const;
}

export function NotificationCard({
  notification,
}: NotificationCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        width: "100%",
        borderLeft: notification.read
          ? "4px solid #d1d1d1"
          : "4px solid #0f6cbd",
      }}
    >
      <CardHeader
        image={getNotificationIcon(notification.type)}
        header={
          <Title3>
            {notification.title}
          </Title3>
        }
        description={
          <Caption1>
            {notification.createdAt}
          </Caption1>
        }
      />

      <Body1
        style={{
          marginTop: "12px",
        }}
      >
        {notification.message}
      </Body1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Badge
          appearance={getBadgeAppearance(
            notification.type
          )}
        >
          {notification.type.toUpperCase()}
        </Badge>

        <Text size={200}>
          {notification.read
            ? "Read"
            : "Unread"}
        </Text>
      </div>
    </Card>
  );
}