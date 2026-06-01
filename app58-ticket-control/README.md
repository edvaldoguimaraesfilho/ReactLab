# App 58 — Ticket Control

App 58 is **Controle de Chamados / Ticket Control**, inside **Block 3 — Professional Fluent UI**, where apps 41–60 focus on Fluent UI, themes, dialogs, DataGrid, toolbar, tabs, and enterprise layout patterns .

Official basis: React state should be lifted to the closest parent when components need to share it, and state organization matters as apps grow. ([React][1]) Fluent UI provides Microsoft-style React components for enterprise UI. ([Microsoft Developer][2])

## PowerShell

```powershell
cd C:\ReactApps
New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app58-ticket-control -- --template react-ts
cd app58-ticket-control

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Ticket.ts -ItemType File
New-Item src\data\tickets.ts -ItemType File
New-Item src\components\TicketSummary.tsx -ItemType File
New-Item src\components\TicketFilters.tsx -ItemType File
New-Item src\components\TicketList.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## `src\models\Ticket.ts`

```ts
export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketPriority = "High" | "Medium" | "Low";

export interface Ticket {
  id: number;
  title: string;
  requester: string;
  department: string;
  status: TicketStatus;
  priority: TicketPriority;
}
```

## `src\data\tickets.ts`

```ts
import type { Ticket } from "../models/Ticket";

export const tickets: Ticket[] = [
  {
    id: 1001,
    title: "Cannot access SharePoint library",
    requester: "Ana Martins",
    department: "Operations",
    status: "Open",
    priority: "High",
  },
  {
    id: 1002,
    title: "Power BI dashboard is not refreshing",
    requester: "Carlos Silva",
    department: "Finance",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 1003,
    title: "Teams meeting room equipment issue",
    requester: "Julia Costa",
    department: "Facilities",
    status: "Resolved",
    priority: "Low",
  },
];
```

## `src\components\TicketSummary.tsx`

```tsx
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
```

## `src\components\TicketFilters.tsx`

```tsx
import { Button, Card, Input, Text } from "@fluentui/react-components";

interface TicketFiltersProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function TicketFilters({
  searchText,
  onSearchChange,
  onClear,
}: TicketFiltersProps) {
  return (
    <Card style={{ marginTop: "24px", padding: "20px" }}>
      <Text weight="semibold">Search tickets</Text>

      <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
        <Input
          placeholder="Search by title, requester, or department"
          value={searchText}
          onChange={(_, data) => onSearchChange(data.value)}
          style={{ flex: 1 }}
        />

        <Button onClick={onClear}>Clear</Button>
      </div>
    </Card>
  );
}
```

## `src\components\TicketList.tsx`

```tsx
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
```

## `src\App.tsx`

```tsx
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
```

## `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

## `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## Run

```powershell
npm run dev
npm run build
npm run preview
```

## Where we are

| Block   | App | Name               | Status    |
| ------- | --: | ------------------ | --------- |
| Block 3 |  57 | Project Management | Completed |
| Block 3 |  58 | Ticket Control     | Current   |
| Block 3 |  59 | Visual CRM         | Next      |
| Block 3 |  60 | Corporate Explorer | Upcoming  |

[1]: https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com "Sharing State Between Components"
[2]: https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com "Fluent UI - Get started"
