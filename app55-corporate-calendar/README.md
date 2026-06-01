```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 55: Corporate Calendar with React, Fluent UI, TypeScript, and Vite

## Introduction

In **App 55 — Corporate Calendar**, we continue the evolution of the ReactLab project inside **Block 3 — Professional Fluent UI Applications**. According to the project roadmap, App 55 is the **Corporate Calendar / Agenda Corporativa**, positioned after enterprise dialogs, toolbars, dashboards, notifications, ticket systems, and approval workflows. 

This application introduces one of the most common enterprise UI patterns:

* calendar scheduling
* corporate agenda visualization
* meeting cards
* event organization
* dashboard-style layout
* responsive enterprise grids
* status indicators
* Fluent UI card composition

This app is intentionally focused on:

* UI composition
* component architecture
* state-driven rendering
* enterprise layout patterns

It does NOT yet implement:

* real calendar APIs
* Outlook synchronization
* Microsoft Graph
* SharePoint calendars
* recurring meeting engines

Those integrations belong to future architecture and API-focused applications.

The goal here is to understand how React organizes complex enterprise UI composition using:

* components
* typed data
* reusable rendering
* layout systems
* Fluent UI

The React mental model remains:

```txt
Data
→ React rendering
→ UI composition
→ Enterprise interface
```

---

# 1. What This App Teaches

| Concept               | Purpose                            |
| --------------------- | ---------------------------------- |
| Calendar cards        | Enterprise event visualization     |
| Grid layouts          | Responsive agenda organization     |
| Typed event models    | Predictable architecture           |
| Component composition | UI split into focused pieces       |
| Derived rendering     | UI generated from event data       |
| Fluent UI Cards       | Microsoft enterprise visual style  |
| Badge system          | Event priority/status              |
| React list rendering  | Dynamic card creation with `map()` |
| Enterprise layout     | Dashboard-like calendar structure  |

---

# 2. Create the Project

```powershell
cd C:\ReactApps

mkdir bloco03
cd bloco03

npm create vite@latest app55-corporate-calendar -- --template react-ts

cd app55-corporate-calendar

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 3. Create the Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create the files:

```powershell
New-Item src\models\CalendarEvent.ts -ItemType File
New-Item src\data\calendarEvents.ts -ItemType File
New-Item src\components\EventCard.tsx -ItemType File
New-Item src\components\CalendarBoard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 4. Final Project Structure

```txt
app55-corporate-calendar/
  src/
    components/
      CalendarBoard.tsx
      EventCard.tsx

    data/
      calendarEvents.ts

    models/
      CalendarEvent.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

This structure separates responsibilities clearly.

| File                | Responsibility                 |
| ------------------- | ------------------------------ |
| `CalendarEvent.ts`  | Defines the event model        |
| `calendarEvents.ts` | Stores event data              |
| `EventCard.tsx`     | Renders a single meeting/event |
| `CalendarBoard.tsx` | Renders the event grid         |
| `App.tsx`           | Main page composition          |
| `main.tsx`          | React entry point              |
| `index.css`         | Global CSS                     |

---

# 5. Create the Event Model

## `src\models\CalendarEvent.ts`

```ts
export type EventStatus =
  | "Confirmed"
  | "Pending"
  | "Canceled";

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  organizer: string;
  location: string;
  status: EventStatus;
}
```

---

# Understanding the Model

This interface defines the shape of each event.

Every calendar event must contain:

| Property    | Meaning                 |
| ----------- | ----------------------- |
| `id`        | Unique event identifier |
| `title`     | Meeting title           |
| `date`      | Meeting date            |
| `time`      | Meeting time            |
| `organizer` | Responsible person      |
| `location`  | Meeting location        |
| `status`    | Event state             |

TypeScript ensures predictable structure.

Without interfaces:

* event data becomes inconsistent
* rendering becomes fragile
* refactoring becomes dangerous

---

# 6. Create the Data File

## `src\data\calendarEvents.ts`

```ts
import type { CalendarEvent }
from "../models/CalendarEvent";

export const calendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Executive Strategy Meeting",
    date: "Monday, May 25",
    time: "09:00 AM",
    organizer: "Corporate Management",
    location: "Conference Room A",
    status: "Confirmed",
  },
  {
    id: 2,
    title: "SharePoint Architecture Review",
    date: "Tuesday, May 26",
    time: "11:30 AM",
    organizer: "Platform Team",
    location: "Microsoft Teams",
    status: "Pending",
  },
  {
    id: 3,
    title: "Financial Dashboard Presentation",
    date: "Wednesday, May 27",
    time: "02:00 PM",
    organizer: "Analytics Department",
    location: "Executive Board Room",
    status: "Confirmed",
  },
  {
    id: 4,
    title: "Infrastructure Migration Review",
    date: "Thursday, May 28",
    time: "04:00 PM",
    organizer: "Infrastructure Team",
    location: "Operations Center",
    status: "Canceled",
  },
];
```

---

# Why Static Data Matters

At this stage, static data is intentional.

The focus is:

* rendering architecture
* component composition
* visual organization

NOT:

* API fetching
* backend synchronization

This follows the ReactLab progression model.

---

# 7. Create the Event Card Component

## `src\components\EventCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Calendar24Regular,
  Clock24Regular,
  Location24Regular,
  Person24Regular,
} from "@fluentui/react-icons";

import type {
  CalendarEvent,
} from "../models/CalendarEvent";

interface EventCardProps {
  event: CalendarEvent;
}

function getBadgeAppearance(
  status: CalendarEvent["status"]
) {
  if (status === "Confirmed") {
    return "filled" as const;
  }

  if (status === "Pending") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EventCard({
  event,
}: EventCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title3>{event.title}</Title3>

        <Badge
          appearance={
            getBadgeAppearance(event.status)
          }
        >
          {event.status}
        </Badge>
      </div>

      <Body1>
        Enterprise corporate event schedule.
      </Body1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Text>
          <Calendar24Regular />
          {" "}
          {event.date}
        </Text>

        <Text>
          <Clock24Regular />
          {" "}
          {event.time}
        </Text>

        <Text>
          <Person24Regular />
          {" "}
          {event.organizer}
        </Text>

        <Caption1>
          <Location24Regular />
          {" "}
          {event.location}
        </Caption1>
      </div>
    </Card>
  );
}
```

---

# Understanding Component Responsibility

`EventCard` has one responsibility:

```txt
Render a single event.
```

This is extremely important in React architecture.

A component should answer:

```txt
What part of the UI do I own?
```

Here:

* `EventCard` owns one event card
* `CalendarBoard` owns the event grid
* `App` owns the overall layout

---

# 8. Understanding Props

```tsx
interface EventCardProps {
  event: CalendarEvent;
}
```

The component receives data through props.

This follows the React model:

```txt
Parent passes data
→ child renders UI
```

Props are the input parameters of React components.

Official React documentation:

* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)

---

# 9. Create the Calendar Board

## `src\components\CalendarBoard.tsx`

```tsx
import { calendarEvents }
from "../data/calendarEvents";

import { EventCard }
from "./EventCard";

export function CalendarBoard() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {calendarEvents.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </section>
  );
}
```

---

# Understanding `map()`

This is one of the most important React patterns:

```tsx
calendarEvents.map(...)
```

React transforms data into UI.

Conceptually:

```txt
event 1 → EventCard
event 2 → EventCard
event 3 → EventCard
event 4 → EventCard
```

This is declarative rendering.

You describe:

* what should appear

React handles:

* DOM creation
* updates
* reconciliation

Official documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 10. Understanding `key={event.id}`

```tsx
key={event.id}
```

Keys help React identify list items efficiently.

Without stable keys:

* rendering becomes less predictable
* updates become inefficient
* React shows warnings

Keys are critical in dynamic lists.

---

# 11. Create `App.tsx`

## `src\App.tsx`

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { CalendarBoard }
from "./components/CalendarBoard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
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
          Corporate Calendar
        </Title1>

        <Text>
          Enterprise event management dashboard
          built with React and Fluent UI.
        </Text>

        <CalendarBoard />
      </section>
    </main>
  );
}

export default App;
```

---

# Understanding Layout Composition

This structure creates:

```txt
Page Container
  Header
  Description
  Calendar Grid
```

The app uses:

* Flexbox
* CSS Grid
* Fluent UI typography
* enterprise spacing

This mirrors real enterprise dashboard composition.

---

# 12. Create `main.tsx`

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

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <FluentProvider
      theme={webLightTheme}
    >
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# Understanding `FluentProvider`

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates:

* Microsoft typography
* Fluent UI colors
* spacing tokens
* accessibility
* enterprise visual standards

Without FluentProvider:

* Fluent UI components lose theme consistency

Official documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 13. Create `index.css`

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

# 14. Run the Application

Development server:

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

# 15. Why This App Matters

This app introduces foundational enterprise dashboard architecture:

```txt
Typed data
→ reusable cards
→ responsive grid
→ enterprise UI composition
→ Microsoft design patterns
```

This same architecture appears later in:

* SharePoint dashboards
* admin portals
* analytics systems
* ticket systems
* CRM dashboards
* ERP scheduling
* Microsoft 365 style applications

---

# 16. Why There Is No `useState`

This app intentionally remains static.

There is:

* no interactivity
* no filtering
* no API synchronization

This is important because React applications should not introduce state unnecessarily.

According to React Learn:

* only add state when the UI must change dynamically

Official documentation:

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# 17. Technical Summary

| Concept          | Explanation                   |
| ---------------- | ----------------------------- |
| TypeScript Model | Predictable event structure   |
| Static Data      | Data-driven UI rendering      |
| Props            | Parent passes event data      |
| EventCard        | Reusable enterprise component |
| CalendarBoard    | Grid composition              |
| `map()`          | Declarative list rendering    |
| Fluent UI Card   | Enterprise container          |
| Fluent UI Badge  | Event status indicator        |
| CSS Grid         | Responsive enterprise layout  |
| FluentProvider   | Microsoft design system       |

---

# 18. Concept Table

| Concept            | File                | Purpose                 |
| ------------------ | ------------------- | ----------------------- |
| Event model        | `CalendarEvent.ts`  | Defines event structure |
| Event data         | `calendarEvents.ts` | Stores calendar items   |
| Reusable component | `EventCard.tsx`     | Renders event cards     |
| Grid rendering     | `CalendarBoard.tsx` | Organizes layout        |
| Root composition   | `App.tsx`           | Main page structure     |
| React mounting     | `main.tsx`          | Connects React to DOM   |
| Global CSS         | `index.css`         | Base layout reset       |

---

# 19. Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)

## Tooling

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# 20. Final Architectural Insight

The most important lesson from App 55 is:

```txt
Enterprise UI is composition.
```

Professional dashboards are not giant files.

They are:

* typed models
* reusable components
* layout systems
* data-driven rendering
* small responsibilities working together

This is the React architecture mindset.

---

# Current Project Progress

| Block   | App | Name                          | Status    |
| ------- | --: | ----------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent            | Completed |
| Block 1 |  02 | Profile Card                  | Completed |
| Block 1 |  03 | Product List                  | Completed |
| Block 1 |  04 | Microsoft Style User Card     | Completed |
| Block 1 |  05 | Static Dashboard              | Completed |
| Block 1 |  06 | Corporate Sidebar Menu        | Completed |
| Block 1 |  07 | Visual Task List              | Completed |
| Block 1 |  08 | Timeline Events               | Completed |
| Block 1 |  09 | Employee Table                | Completed |
| Block 1 |  10 | Email List                    | Completed |
| Block 1 |  11 | Grid of Cards                 | Completed |
| Block 1 |  12 | Image Gallery                 | Completed |
| Block 1 |  13 | Movie Catalog                 | Completed |
| Block 1 |  14 | Football Teams                | Completed |
| Block 1 |  15 | News Page                     | Completed |
| Block 1 |  16 | Financial Dashboard           | Completed |
| Block 1 |  17 | SharePoint Style Layout       | Completed |
| Block 1 |  18 | File Explorer                 | Completed |
| Block 1 |  19 | Corporate Portal              | Completed |
| Block 1 |  20 | Microsoft Style Landing Page  | Completed |
| Block 2 |  21 | Modern Counter                | Completed |
| Block 2 |  22 | Toggle Theme                  | Completed |
| Block 2 |  23 | React Calculator              | Completed |
| Block 2 |  24 | Login Form                    | Completed |
| Block 2 |  25 | User Registration             | Completed |
| Block 2 |  26 | Complete ToDo List            | Completed |
| Block 2 |  27 | Shopping List                 | Completed |
| Block 2 |  28 | Product Filter                | Completed |
| Block 2 |  29 | Employee Search               | Completed |
| Block 2 |  30 | Shopping Cart                 | Completed |
| Block 2 |  31 | Grade Simulator               | Completed |
| Block 2 |  32 | Inventory Control             | Completed |
| Block 2 |  33 | Contact Agenda                | Completed |
| Block 2 |  34 | Currency Converter            | Completed |
| Block 2 |  35 | BMI Calculator                | Completed |
| Block 2 |  36 | Installment Simulator         | Completed |
| Block 2 |  37 | Voting Panel                  | Completed |
| Block 2 |  38 | Interactive Quiz              | Completed |
| Block 2 |  39 | Team Manager                  | Completed |
| Block 2 |  40 | Dynamic Dashboard             | Completed |
| Block 3 |  41 | Microsoft Style Login         | Completed |
| Block 3 |  42 | Corporate Form                | Completed |
| Block 3 |  43 | Tabs Navigation               | Completed |
| Block 3 |  44 | Dialog Manager                | Completed |
| Block 3 |  45 | Executive Dashboard           | Completed |
| Block 3 |  46 | DataGrid Catalog              | Completed |
| Block 3 |  47 | Enterprise User List          | Completed |
| Block 3 |  48 | Sidebar Navigation            | Completed |
| Block 3 |  49 | Corporate Header              | Completed |
| Block 3 |  50 | Professional Toolbar          | Completed |
| Block 3 |  51 | Notification Center           | Completed |
| Block 3 |  52 | Administrative Panel          | Completed |
| Block 3 |  53 | Ticket Manager                | Completed |
| Block 3 |  54 | Approval System               | Completed |
| Block 3 |  55 | Corporate Calendar            | Current   |
| Block 3 |  56 | SharePoint Inspired Dashboard | Next      |
