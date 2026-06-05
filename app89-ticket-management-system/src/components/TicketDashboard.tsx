import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Ticket } from "../models/Ticket";

interface Props {
  tickets: Ticket[];
}

export function TicketDashboard({
  tickets,
}: Props) {
  const total = tickets.length;

  const open = tickets.filter(
    t => t.status !== "Closed"
  ).length;

  const closed = tickets.filter(
    t => t.status === "Closed"
  ).length;

  const critical = tickets.filter(
    t => t.priority === "Critical"
  ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "16px",
      }}
    >
      <Card>
        <Title3>Total Tickets</Title3>
        <Text>{total}</Text>
      </Card>

      <Card>
        <Title3>Open Tickets</Title3>
        <Text>{open}</Text>
      </Card>

      <Card>
        <Title3>Closed Tickets</Title3>
        <Text>{closed}</Text>
      </Card>

      <Card>
        <Title3>Critical Tickets</Title3>
        <Text>{critical}</Text>
      </Card>
    </div>
  );
}