import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { tickets } from "./data/tickets";
import { TicketSummary } from "./components/TicketSummary";
import { TicketFilters } from "./components/TicketFilters";
import { TicketList } from "./components/TicketList";

function App() {
  const [searchText, setSearchText] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const text = searchText.toLowerCase();

    return (
      ticket.title.toLowerCase().includes(text) ||
      ticket.requester.toLowerCase().includes(text) ||
      ticket.department.toLowerCase().includes(text)
    );
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Title1>Ticket Control</Title1>

        <Text>
          Enterprise ticket tracking interface built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <TicketSummary tickets={tickets} />

        <TicketFilters
          searchText={searchText}
          onSearchChange={setSearchText}
          onClear={() => setSearchText("")}
        />

        <TicketList tickets={filteredTickets} />
      </section>
    </main>
  );
}

export default App;