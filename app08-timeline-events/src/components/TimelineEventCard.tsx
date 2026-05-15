import {
  Badge,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Clock24Regular,
  CalendarLtr24Regular,
} from "@fluentui/react-icons";

import type { TimelineEvent } from "../models/TimelineEvent";

interface TimelineEventCardProps {
  event: TimelineEvent;
}

function getStatusIcon(status: TimelineEvent["status"]) {
  if (status === "Completed") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <CalendarLtr24Regular />;
}

function getBadgeAppearance(status: TimelineEvent["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TimelineEventCard({ event }: TimelineEventCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(event.status)}
        header={<Title3>{event.title}</Title3>}
        description={<Caption1>{event.date}</Caption1>}
      />

      <Body1>{event.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(event.status)}>
          {event.status}
        </Badge>

        <Text size={200}>Department: {event.department}</Text>
      </div>
    </Card>
  );
}