```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 53: Ticket Manager with React, Fluent UI, TypeScript, and Vite

App 53 — Ticket Manager belongs to **Block 3 — Professional Fluent UI Applications**, where the focus evolves from basic React rendering into enterprise-grade Microsoft-style interfaces. According to the ReactLab roadmap, App 53 is the first major workflow-oriented application in the enterprise UI section. 

This application simulates a corporate support ticket management system similar to:

* IT help desk systems
* SharePoint service portals
* Microsoft admin dashboards
* internal support platforms
* enterprise workflow systems
* incident management applications

The objective is not building a backend yet. The goal is learning:

* enterprise component composition
* controlled filtering
* state-driven rendering
* reusable Fluent UI cards
* TypeScript modeling
* derived UI
* dashboard architecture
* enterprise layout patterns

This app strongly reinforces one of the most important React concepts:

```txt
UI is derived from state.
```

The interface changes automatically according to:

* selected filters
* ticket status
* priority level
* assigned users
* search text

No manual DOM manipulation exists.

The entire UI is declarative.

---

# 1. What This App Teaches

| Concept               | Purpose                           |
| --------------------- | --------------------------------- |
| Enterprise Layout     | Corporate dashboard composition   |
| Fluent UI Cards       | Ticket visualization              |
| Derived State         | Filtering without redundant state |
| TypeScript Models     | Predictable data architecture     |
| Search Filtering      | Dynamic rendering                 |
| Badge Rendering       | Status visualization              |
| Grid Layouts          | Responsive enterprise dashboard   |
| Controlled Inputs     | React-controlled filters          |
| Component Composition | App → Dashboard → Ticket Cards    |
| Declarative UI        | State drives rendering            |

---

# 2. Create the Project

```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app53-ticket-manager -- --template react-ts

cd app53-ticket-manager

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
mkdir src\services
```

Create files:

```powershell
New-Item src\models\Ticket.ts -ItemType File
New-Item src\data\tickets.ts -ItemType File
New-Item src\components\TicketCard.tsx -ItemType File
New-Item src\components\TicketDashboard.tsx -ItemType File
New-Item src\components\TicketFilters.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 3. Final Folder Structure

```txt
app53-ticket-manager/
  src/
    components/
      TicketCard.tsx
      TicketDashboard.tsx
      TicketFilters.tsx

    models/
      Ticket.ts

    data/
      tickets.ts

    styles/
    services/

    App.tsx
    main.tsx
    index.css
```

This architecture is important because enterprise React applications should separate:

* UI
* models
* data
* business logic
* reusable components

---

# 4. Create the Ticket Model

## `src\models\Ticket.ts`

```ts
export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved";

export type TicketPriority =
  | "High"
  | "Medium"
  | "Low";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  department: string;
  status: TicketStatus;
  priority: TicketPriority;
}
```

This model defines the structure of each ticket.

TypeScript guarantees:

* predictable architecture
* autocomplete
* safer refactoring
* consistent data shape

This becomes critical in enterprise systems.

---

# 5. Create the Ticket Data Source

## `src\data\tickets.ts`

```ts
import type { Ticket } from "../models/Ticket";

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "SharePoint Permission Issue",
    description:
      "Users cannot access the Finance document library.",
    assignedTo: "Amanda Silva",
    department: "IT",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    title: "Teams Meeting Failure",
    description:
      "Corporate Teams meetings disconnect unexpectedly.",
    assignedTo: "Lucas Mendes",
    department: "Infrastructure",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Power BI Dashboard Update",
    description:
      "Monthly analytics dashboard requires refresh.",
    assignedTo: "Renata Costa",
    department: "Business Intelligence",
    status: "Resolved",
    priority: "Low",
  },
];
```

This file introduces an extremely important React concept:

```txt
The UI should be generated from data.
```

Instead of manually building cards, React maps data into UI.

---

# 6. Create the Ticket Card Component

## `src\components\TicketCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Clock24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { Ticket } from "../models/Ticket";

interface TicketCardProps {
  ticket: Ticket;
}

function getStatusIcon(status: Ticket["status"]) {
  if (status === "Resolved") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <Warning24Regular />;
}

function getBadgeAppearance(status: Ticket["status"]) {
  if (status === "Resolved") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TicketCard({
  ticket,
}: TicketCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(ticket.status)}
        header={<Title3>{ticket.title}</Title3>}
        description={
          <Caption1>
            Assigned to: {ticket.assignedTo}
          </Caption1>
        }
      />

      <Body1>{ticket.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(ticket.status)}>
          {ticket.status}
        </Badge>

        <Text size={200}>
          Priority: {ticket.priority}
        </Text>

        <Text size={200}>
          Department: {ticket.department}
        </Text>
      </div>
    </Card>
  );
}
```

---

# 7. Understanding the Card Architecture

The ticket card is a reusable enterprise component.

Its responsibility is:

```txt
Receive a Ticket object
→ Render the ticket visually
```

The component does not own global state.

It only renders props.

This follows React’s recommended architecture:

```txt
Small reusable components
with focused responsibilities.
```

Official React guidance:
[Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

---

# 8. Create the Filters Component

## `src\components\TicketFilters.tsx`

```tsx
import {
  Dropdown,
  Input,
  Option,
} from "@fluentui/react-components";

interface TicketFiltersProps {
  searchText: string;
  statusFilter: string;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: string) => void;
}

export function TicketFilters({
  searchText,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: TicketFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginBottom: "32px",
        flexWrap: "wrap",
      }}
    >
      <Input
        placeholder="Search tickets..."
        value={searchText}
        onChange={(_, data) =>
          onSearchChange(data.value)
        }
      />

      <Dropdown
        value={statusFilter}
        placeholder="Select status"
        onOptionSelect={(_, data) =>
          onStatusChange(data.optionValue || "")
        }
      >
        <Option value="All">All</Option>

        <Option value="Open">Open</Option>

        <Option value="In Progress">
          In Progress
        </Option>

        <Option value="Resolved">
          Resolved
        </Option>
      </Dropdown>
    </div>
  );
}
```

---

# 9. Understanding Controlled Filters

This component demonstrates controlled inputs.

The parent owns:

* search text
* selected filter

The child only renders the controls.

The flow becomes:

```txt
User types
→ callback executes
→ parent state updates
→ React re-renders
→ filtered tickets update
```

This is controlled rendering.

Official documentation:
[Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

---

# 10. Create the Dashboard Component

## `src\components\TicketDashboard.tsx`

```tsx
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
```

---

# 11. Why `map()` Matters

This line is fundamental:

```tsx
tickets.map((ticket) => (
```

React transforms:

* arrays of data
  into:
* arrays of UI

Conceptually:

```txt
Ticket data
→ TicketCard UI
```

This is declarative rendering.

Official documentation:
[Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 12. Create the Root App

## `src\App.tsx`

```tsx
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
```

---

# 13. Understanding Derived State

This section is one of the most important parts:

```tsx
const filteredTickets = tickets.filter(...)
```

Notice:

```txt
filteredTickets
```

is NOT stored in state.

This is correct React architecture.

The filtered array is derived from:

* search text
* selected status
* original tickets

This follows official React guidance:

> Avoid redundant state.

Official documentation:
[Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# 14. Why This Is Better Than Extra State

Bad architecture:

```tsx
const [filteredTickets, setFilteredTickets]
```

Good architecture:

```tsx
const filteredTickets =
  tickets.filter(...)
```

Why?

Because:

* fewer synchronization bugs
* simpler rendering
* cleaner mental model
* less duplicated data

---

# 15. Understanding the Filtering Logic

```tsx
const matchesSearch =
  ticket.title
    .toLowerCase()
    .includes(searchText.toLowerCase());
```

This performs case-insensitive filtering.

Then:

```tsx
const matchesStatus =
  statusFilter === "All" ||
  ticket.status === statusFilter;
```

This allows:

* either all tickets
* or only tickets with matching status

Finally:

```tsx
return matchesSearch && matchesStatus;
```

Both conditions must be true.

---

# 16. Why There Is No `useEffect`

This app intentionally avoids `useEffect`.

There is:

* no API
* no timers
* no browser synchronization
* no localStorage
* no external systems

The UI is purely derived from:

* state
* props
* rendering logic

Therefore:

```txt
useState is enough.
```

Official documentation:
[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# 17. Create `main.tsx`

## `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# 18. Create `index.css`

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

---

# 19. Run the Application

Development:

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# 20. Complete Rendering Flow

```txt
main.tsx
  renders App

App
  owns filter state

TicketFilters
  updates filter state

React re-renders App

filteredTickets recalculates

TicketDashboard
  receives filtered tickets

TicketDashboard
  maps tickets into TicketCard components

React updates the UI automatically
```

This is modern React architecture.

---

# Technical Summary

| Concept           | Explanation                            |
| ----------------- | -------------------------------------- |
| `useState`        | Stores filter state                    |
| Derived State     | Filtered tickets calculated from state |
| Controlled Inputs | Parent controls filter values          |
| `map()`           | Converts data into UI                  |
| `filter()`        | Creates dynamic dashboard rendering    |
| Fluent UI Card    | Enterprise ticket layout               |
| Badge             | Visual status indicator                |
| Grid Layout       | Responsive enterprise dashboard        |
| TypeScript Model  | Predictable data structure             |
| Declarative UI    | UI derived from state                  |

---

# Concept Table

| Concept           | File                  | Purpose                         |
| ----------------- | --------------------- | ------------------------------- |
| Ticket model      | `Ticket.ts`           | Defines ticket structure        |
| Static data       | `tickets.ts`          | Provides dashboard data         |
| Reusable card     | `TicketCard.tsx`      | Displays ticket visually        |
| Filters           | `TicketFilters.tsx`   | Controlled enterprise filtering |
| Dashboard         | `TicketDashboard.tsx` | Grid rendering                  |
| Parent state      | `App.tsx`             | Owns filter state               |
| Derived rendering | `App.tsx`             | Dynamic filtered UI             |
| Fluent UI         | All components        | Microsoft enterprise styling    |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)
* [Fluent UI Dropdown](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dropdown)

## Tooling

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Final Architectural Insight

App 53 introduces one of the most important enterprise React patterns:

```txt
Data
→ Derived filtering
→ Component composition
→ Dashboard rendering
```

This architecture appears everywhere in enterprise applications:

* ticket systems
* SharePoint dashboards
* CRMs
* admin portals
* analytics systems
* ERP applications
* Microsoft 365 tools

The key lesson is:

```txt
Do not manually manipulate the UI.

Update state.
Derive UI from state.
Let React render the result.
```

---

# Current Project Progress

| Block   | App | Name                         | Status    |
| ------- | --: | ---------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent           | Completed |
| Block 1 |  02 | Profile Card                 | Completed |
| Block 1 |  03 | Product List                 | Completed |
| Block 1 |  04 | Microsoft Style User Card    | Completed |
| Block 1 |  05 | Static Dashboard             | Completed |
| Block 1 |  06 | Corporate Sidebar Menu       | Completed |
| Block 1 |  07 | Visual Task List             | Completed |
| Block 1 |  08 | Timeline Events              | Completed |
| Block 1 |  09 | Employee Table               | Completed |
| Block 1 |  10 | Email List                   | Completed |
| Block 1 |  11 | Grid of Cards                | Completed |
| Block 1 |  12 | Image Gallery                | Completed |
| Block 1 |  13 | Movie Catalog                | Completed |
| Block 1 |  14 | Football Teams               | Completed |
| Block 1 |  15 | News Page                    | Completed |
| Block 1 |  16 | Financial Dashboard          | Completed |
| Block 1 |  17 | SharePoint Style Layout      | Completed |
| Block 1 |  18 | File Explorer                | Completed |
| Block 1 |  19 | Corporate Portal             | Completed |
| Block 1 |  20 | Microsoft Style Landing Page | Completed |
| Block 2 |  21 | Modern Counter               | Completed |
| Block 2 |  22 | Toggle Theme                 | Completed |
| Block 2 |  23 | React Calculator             | Completed |
| Block 2 |  24 | Login Form                   | Completed |
| Block 2 |  25 | User Registration            | Completed |
| Block 2 |  26 | Complete ToDo List           | Completed |
| Block 2 |  27 | Shopping List                | Completed |
| Block 2 |  28 | Product Filter               | Completed |
| Block 2 |  29 | Employee Search              | Completed |
| Block 2 |  30 | Shopping Cart                | Completed |
| Block 2 |  31 | Grade Simulator              | Completed |
| Block 2 |  32 | Inventory Control            | Completed |
| Block 2 |  33 | Contact Agenda               | Completed |
| Block 2 |  34 | Currency Converter           | Completed |
| Block 2 |  35 | BMI Calculator               | Completed |
| Block 2 |  36 | Installment Simulator        | Completed |
| Block 2 |  37 | Voting Panel                 | Completed |
| Block 2 |  38 | Interactive Quiz             | Completed |
| Block 2 |  39 | Team Manager                 | Completed |
| Block 2 |  40 | Dynamic Dashboard            | Completed |
| Block 3 |  41 | Microsoft Style Login        | Completed |
| Block 3 |  42 | Corporate Form               | Completed |
| Block 3 |  43 | Tabs Navigation              | Completed |
| Block 3 |  44 | Dialog Manager               | Completed |
| Block 3 |  45 | Executive Dashboard          | Completed |
| Block 3 |  46 | DataGrid Catalog             | Completed |
| Block 3 |  47 | Enterprise User List         | Completed |
| Block 3 |  48 | Sidebar Navigation           | Completed |
| Block 3 |  49 | Corporate Header             | Completed |
| Block 3 |  50 | Professional Toolbar         | Completed |
| Block 3 |  51 | Notification Center          | Completed |
| Block 3 |  52 | Administrative Panel         | Completed |
| Block 3 |  53 | Ticket Manager               | Current   |
| Block 3 |  54 | Approval System              | Next      |
