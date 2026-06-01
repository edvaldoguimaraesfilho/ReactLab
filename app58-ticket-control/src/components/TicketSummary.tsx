import { Card, Text, Title3 } from "@fluentui/react-components";
import type { Ticket } from "../models/Ticket";

interface TicketSummaryProps {
  tickets: Ticket[];
}

export function TicketSummary({ tickets }: TicketSummaryProps) {
  const open = tickets.filter((ticket) => ticket.status === "Open").length;
  const inProgress = tickets.filter((ticket) => ticket.status === "In Progress").length;
  const resolved = tickets.filter((ticket) => ticket.status === "Resolved").length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      <Card>
        <Title3>{open}</Title3>
        <Text>Open Tickets</Text>
      </Card>

      <Card>
        <Title3>{inProgress}</Title3>
        <Text>In Progress</Text>
      </Card>

      <Card>
        <Title3>{resolved}</Title3>
        <Text>Resolved</Text>
      </Card>
    </div>
  );
}