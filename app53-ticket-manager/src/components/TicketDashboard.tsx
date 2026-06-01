import { TicketCard } from "./TicketCard";

import type { Ticket } from "../models/Ticket";

interface TicketDashboardProps {
  tickets: Ticket[];
}

export function TicketDashboard({
  tickets,
}: TicketDashboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
      }}
    >
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
        />
      ))}
    </div>
  );
}