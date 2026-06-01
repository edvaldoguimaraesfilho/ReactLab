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
  Clock24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { Ticket } from "../models/Ticket";

interface TicketCardProps {
  ticket: Ticket;
}

function getStatusIcon(status: Ticket["status"]) {
  if (status === "Resolved") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <Warning24Regular />;
}

function getBadgeAppearance(status: Ticket["status"]) {
  if (status === "Resolved") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TicketCard({
  ticket,
}: TicketCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(ticket.status)}
        header={<Title3>{ticket.title}</Title3>}
        description={
          <Caption1>
            Assigned to: {ticket.assignedTo}
          </Caption1>
        }
      />

      <Body1>{ticket.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(ticket.status)}>
          {ticket.status}
        </Badge>

        <Text size={200}>
          Priority: {ticket.priority}
        </Text>

        <Text size={200}>
          Department: {ticket.department}
        </Text>
      </div>
    </Card>
  );
}