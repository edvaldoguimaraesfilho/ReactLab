import { useState } from "react";

import {
  FluentProvider,
  Text,
  Title1,
  webLightTheme,
} from "@fluentui/react-components";

import { tickets } from "./data/tickets";

import { TicketDashboard } from "./components/TicketDashboard";
import { TicketFilters } from "./components/TicketFilters";

function App() {
  const [searchText, setSearchText] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredTickets = tickets.filter(
    (ticket) => {
      const matchesSearch =
        ticket.title
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <Title1>
            Enterprise Ticket Manager
          </Title1>

          <Text>
            React + Fluent UI support workflow
            dashboard.
          </Text>

          <div
            style={{
              marginTop: "32px",
            }}
          >
            <TicketFilters
              searchText={searchText}
              statusFilter={statusFilter}
              onSearchChange={setSearchText}
              onStatusChange={setStatusFilter}
            />

            <TicketDashboard
              tickets={filteredTickets}
            />
          </div>
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;