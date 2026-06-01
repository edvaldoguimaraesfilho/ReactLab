import {
  Badge,
  Body1,
  Card,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Calendar24Regular,
  Clock24Regular,
  Location24Regular,
  Person24Regular,
} from "@fluentui/react-icons";

import type {
  CalendarEvent,
} from "../models/CalendarEvent";

interface EventCardProps {
  event: CalendarEvent;
}

function getBadgeAppearance(
  status: CalendarEvent["status"]
) {
  if (status === "Confirmed") {
    return "filled" as const;
  }

  if (status === "Pending") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EventCard({
  event,
}: EventCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title3>{event.title}</Title3>

        <Badge
          appearance={
            getBadgeAppearance(event.status)
          }
        >
          {event.status}
        </Badge>
      </div>

      <Body1>
        Enterprise corporate event schedule.
      </Body1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Text>
          <Calendar24Regular />
          {" "}
          {event.date}
        </Text>

        <Text>
          <Clock24Regular />
          {" "}
          {event.time}
        </Text>

        <Text>
          <Person24Regular />
          {" "}
          {event.organizer}
        </Text>

        <Caption1>
          <Location24Regular />
          {" "}
          {event.location}
        </Caption1>
      </div>
    </Card>
  );
}