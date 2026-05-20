import {
  Avatar,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import type { Contact } from "../models/Contact";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({
  contact,
}: ContactCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={
          <Avatar
            name={contact.name}
            color="colorful"
          />
        }
        header={<Text weight="semibold">{contact.name}</Text>}
        description={<Caption1>{contact.company}</Caption1>}
      />

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Body1>Email: {contact.email}</Body1>

        <Body1>Phone: {contact.phone}</Body1>
      </div>
    </Card>
  );
}