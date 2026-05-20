import {
  Avatar,
  Badge,
  Body1,
  Caption1,
  Card,
  Text,
} from "@fluentui/react-components";

import type { EmailMessage } from "../models/EmailMessage";

interface EmailItemProps {
  email: EmailMessage;
}

export function EmailItem({ email }: EmailItemProps) {
  return (
    <Card
      style={{
        padding: "16px",
        display: "grid",
        gridTemplateColumns: "48px 1fr auto",
        gap: "16px",
        alignItems: "center",
        borderLeft: email.unread ? "4px solid #0f6cbd" : "4px solid transparent",
      }}
    >
      <Avatar name={email.sender} initials={email.initials} />

      <div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <Body1
            style={{
              fontWeight: email.unread ? 700 : 400,
            }}
          >
            {email.sender}
          </Body1>

          {email.unread && <Badge appearance="filled">Unread</Badge>}
        </div>

        <Text
          style={{
            display: "block",
            fontWeight: email.unread ? 700 : 500,
          }}
        >
          {email.subject}
        </Text>

        <Caption1>{email.preview}</Caption1>
      </div>

      <div
        style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-end",
        }}
      >
        <Caption1>{email.time}</Caption1>
        <Badge appearance="outline">{email.category}</Badge>
      </div>
    </Card>
  );
}