# App 08 — Timeline of Events

App 08 is **Timeline of Events**, still inside **Block 1 — Fundamentals and UI**. The roadmap defines App 08 as a timeline focused on **sequential rendering**, based on React list rendering concepts. 

## PowerShell — create the project

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app08-timeline-events -- --template react-ts
cd app08-timeline-events

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\TimelineEvent.ts -ItemType File
New-Item src\data\timelineEvents.ts -ItemType File
New-Item src\components\TimelineEventCard.tsx -ItemType File
New-Item src\components\Timeline.tsx -ItemType File
```

## `src\models\TimelineEvent.ts`

```ts
export type TimelineStatus = "Completed" | "In Progress" | "Planned";

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  department: string;
  status: TimelineStatus;
}
```

## `src\data\timelineEvents.ts`

```ts
import type { TimelineEvent } from "../models/TimelineEvent";

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2026-05-01",
    title: "Project kickoff",
    description: "Initial planning meeting with the product and development teams.",
    department: "Project Management",
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-05-05",
    title: "UI structure defined",
    description: "Base layout, component responsibilities, and Fluent UI visual pattern were approved.",
    department: "Design System",
    status: "Completed",
  },
  {
    id: 3,
    date: "2026-05-10",
    title: "Timeline component implementation",
    description: "React renders events from a typed data source using map() and reusable components.",
    department: "Frontend Team",
    status: "In Progress",
  },
  {
    id: 4,
    date: "2026-05-15",
    title: "Architecture review",
    description: "Review component hierarchy before moving to more complex UI examples.",
    department: "Engineering",
    status: "Planned",
  },
];
```

## `src\components\TimelineEventCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Clock24Regular,
  CalendarLtr24Regular,
} from "@fluentui/react-icons";

import type { TimelineEvent } from "../models/TimelineEvent";

interface TimelineEventCardProps {
  event: TimelineEvent;
}

function getStatusIcon(status: TimelineEvent["status"]) {
  if (status === "Completed") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <CalendarLtr24Regular />;
}

function getBadgeAppearance(status: TimelineEvent["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TimelineEventCard({ event }: TimelineEventCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(event.status)}
        header={<Title3>{event.title}</Title3>}
        description={<Caption1>{event.date}</Caption1>}
      />

      <Body1>{event.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(event.status)}>
          {event.status}
        </Badge>

        <Text size={200}>Department: {event.department}</Text>
      </div>
    </Card>
  );
}
```

## `src\components\Timeline.tsx`

```tsx
import { timelineEvents } from "../data/timelineEvents";
import { TimelineEventCard } from "./TimelineEventCard";

export function Timeline() {
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {timelineEvents.map((event) => (
        <TimelineEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { Timeline } from "./components/Timeline";

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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Title1>Timeline of Events</Title1>

        <Text>
          A static corporate timeline built with React, TypeScript, Vite, and
          Fluent UI.
        </Text>

        <Timeline />
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

## Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## What this app teaches

| Concept                 | File                                 |
| ----------------------- | ------------------------------------ |
| TypeScript model        | `TimelineEvent.ts`                   |
| Static data source      | `timelineEvents.ts`                  |
| Reusable card component | `TimelineEventCard.tsx`              |
| List rendering          | `Timeline.tsx`                       |
| React `map()`           | `timelineEvents.map(...)`            |
| Stable keys             | `key={event.id}`                     |
| Composition             | `App → Timeline → TimelineEventCard` |
| Fluent UI               | `Card`, `Badge`, `Text`, `Title1`    |

## Where we are

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline of Events        | Current   |
| Block 1 |  09 | Employee Table            | Next      |
