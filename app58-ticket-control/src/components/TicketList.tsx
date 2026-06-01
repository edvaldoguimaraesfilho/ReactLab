import { Badge, Card, Text, Title3 } from "@fluentui/react-components";
import type { Ticket } from "../models/Ticket";

interface TicketListProps {
  tickets: Ticket[];
}

export function TicketList({ tickets }: TicketListProps) {
  return (
    <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
      {tickets.map((ticket) => (
        <Card key={ticket.id} style={{ padding: "20px" }}>
          <Title3>
            #{ticket.id} — {ticket.title}
          </Title3>

          <Text>Requester: {ticket.requester}</Text>
          <Text>Department: {ticket.department}</Text>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <Badge appearance="filled">{ticket.status}</Badge>
            <Badge appearance="tint">{ticket.priority}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}