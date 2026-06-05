import { useState } from "react";

import {
  Button,
  Card,
  Field,
  Input,
} from "@fluentui/react-components";

import type { Ticket } from "../models/Ticket";

interface Props {
  onAddTicket: (ticket: Ticket) => void;
}

export function TicketForm({
  onAddTicket,
}: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    const ticket: Ticket = {
      id: Date.now(),
      title,
      description: "New ticket",
      category: "General",
      priority: "Medium",
      status: "New",
      assignedTo: "Unassigned",
      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    onAddTicket(ticket);

    setTitle("");
  }

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Field label="Ticket Title">
        <Input
          value={title}
          onChange={(_, data) =>
            setTitle(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Create Ticket
      </Button>
    </Card>
  );
}