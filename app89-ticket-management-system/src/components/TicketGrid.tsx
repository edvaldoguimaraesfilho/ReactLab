import {
  Badge,
  Button,
  Card,
} from "@fluentui/react-components";

import type { Ticket } from "../models/Ticket";

interface Props {
  tickets: Ticket[];
  onDelete: (id: number) => void;
}

export function TicketGrid({
  tickets,
  onDelete,
}: Props) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>

              <td>{ticket.title}</td>

              <td>
                <Badge>
                  {ticket.status}
                </Badge>
              </td>

              <td>{ticket.priority}</td>

              <td>{ticket.assignedTo}</td>

              <td>
                <Button
                  appearance="secondary"
                  onClick={() =>
                    onDelete(ticket.id)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}