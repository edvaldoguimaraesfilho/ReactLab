# App 85 — Kanban Board

**Block 5 — Complete Applications**
**React + TypeScript + Fluent UI + Enterprise Architecture**
Roadmap reference: App 85 is the **Kanban Board** application in Block 5 and focuses on enterprise task organization and drag-and-drop workflow concepts. 

---

# Project Objective

This application simulates a professional Kanban board similar to:

* Microsoft Planner
* Atlassian Jira
* Trello Trello
* Enterprise Project Management Systems
* Agile Scrum Boards

The user can visualize tasks distributed across workflow columns:

```txt
Backlog
↓
To Do
↓
In Progress
↓
Review
↓
Done
```

This application consolidates concepts learned throughout the ReactLab roadmap:

* Component Architecture
* TypeScript Models
* Fluent UI
* State Management
* Derived State
* Enterprise Layouts
* Complex UI Composition
* Data Organization

---

# React Learn Concepts

This application heavily applies:

* State Structure
* Sharing State Between Components
* Thinking in React
* Updating Arrays in State
* Scaling Up with Reducer and Context

Official references:

* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)

---

# Create Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app85-kanban-board -- --template react-ts

cd app85-kanban-board

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\KanbanTask.ts -ItemType File
New-Item src\data\tasks.ts -ItemType File

New-Item src\components\TaskCard.tsx -ItemType File
New-Item src\components\KanbanColumn.tsx -ItemType File
New-Item src\components\KanbanBoard.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
app85-kanban-board/

src/
│
├── components/
│   ├── TaskCard.tsx
│   ├── KanbanColumn.tsx
│   └── KanbanBoard.tsx
│
├── models/
│   └── KanbanTask.ts
│
├── data/
│   └── tasks.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Model

## src/models/KanbanTask.ts

```ts
export type TaskStatus =
  | "Backlog"
  | "To Do"
  | "In Progress"
  | "Review"
  | "Done";

export interface KanbanTask {
  id: number;
  title: string;
  description: string;
  owner: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
}
```

---

# Mock Data

## src/data/tasks.ts

```ts
import type { KanbanTask } from "../models/KanbanTask";

export const tasks: KanbanTask[] = [
  {
    id: 1,
    title: "Design Login Screen",
    description: "Create Microsoft-style login page.",
    owner: "UI Team",
    priority: "High",
    status: "To Do",
  },
  {
    id: 2,
    title: "Implement API Service",
    description: "Create service layer.",
    owner: "Backend Team",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Review Dashboard",
    description: "Validate KPI layout.",
    owner: "Product Team",
    priority: "Low",
    status: "Review",
  },
  {
    id: 4,
    title: "Deploy Release",
    description: "Publish production package.",
    owner: "DevOps",
    priority: "High",
    status: "Done",
  }
];
```

---

# Task Card

## src/components/TaskCard.tsx

```tsx
import {
  Badge,
  Body1,
  Card,
  Caption1,
  Title3,
} from "@fluentui/react-components";

import type { KanbanTask } from "../models/KanbanTask";

interface Props {
  task: KanbanTask;
}

export function TaskCard({ task }: Props) {
  return (
    <Card
      style={{
        marginBottom: "12px",
        padding: "16px",
      }}
    >
      <Title3>{task.title}</Title3>

      <Body1>{task.description}</Body1>

      <Caption1>
        Owner: {task.owner}
      </Caption1>

      <div
        style={{
          marginTop: "12px",
        }}
      >
        <Badge appearance="filled">
          {task.priority}
        </Badge>
      </div>
    </Card>
  );
}
```

---

# Kanban Column

## src/components/KanbanColumn.tsx

```tsx
import {
  Card,
  Title2,
} from "@fluentui/react-components";

import type { KanbanTask } from "../models/KanbanTask";

import { TaskCard } from "./TaskCard";

interface Props {
  title: string;
  tasks: KanbanTask[];
}

export function KanbanColumn({
  title,
  tasks,
}: Props) {
  return (
    <Card
      style={{
        width: "280px",
        minHeight: "600px",
        padding: "16px",
      }}
    >
      <Title2>{title}</Title2>

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </Card>
  );
}
```

---

# Kanban Board

## src/components/KanbanBoard.tsx

```tsx
import { tasks } from "../data/tasks";

import { KanbanColumn } from "./KanbanColumn";

export function KanbanBoard() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
      }}
    >
      <KanbanColumn
        title="Backlog"
        tasks={tasks.filter(
          x => x.status === "Backlog"
        )}
      />

      <KanbanColumn
        title="To Do"
        tasks={tasks.filter(
          x => x.status === "To Do"
        )}
      />

      <KanbanColumn
        title="In Progress"
        tasks={tasks.filter(
          x => x.status === "In Progress"
        )}
      />

      <KanbanColumn
        title="Review"
        tasks={tasks.filter(
          x => x.status === "Review"
        )}
      />

      <KanbanColumn
        title="Done"
        tasks={tasks.filter(
          x => x.status === "Done"
        )}
      />
    </div>
  );
}
```

---

# App Component

## src/App.tsx

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { KanbanBoard } from "./components/KanbanBoard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "32px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Enterprise Kanban Board
      </Title1>

      <Text>
        Agile workflow management with React and Fluent UI.
      </Text>

      <div style={{ marginTop: "32px" }}>
        <KanbanBoard />
      </div>
    </main>
  );
}

export default App;
```

---

# main.tsx

## src/main.tsx

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
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# index.css

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

# Why This Architecture Matters

This app introduces a very common enterprise pattern:

```txt
App
 └── KanbanBoard
      ├── KanbanColumn
      │      └── TaskCard
      │
      ├── KanbanColumn
      │      └── TaskCard
      │
      └── KanbanColumn
             └── TaskCard
```

Each component has a single responsibility:

| Component     | Responsibility        |
| ------------- | --------------------- |
| App           | Page composition      |
| KanbanBoard   | Workflow organization |
| KanbanColumn  | Status grouping       |
| TaskCard      | Task visualization    |
| tasks.ts      | Data source           |
| KanbanTask.ts | Type definition       |

This follows React's recommendation of building UI from small reusable pieces. 

---

# Technical Summary

| Concept               | Usage                         |
| --------------------- | ----------------------------- |
| React Components      | UI composition                |
| Fluent UI Cards       | Enterprise layout             |
| TypeScript Interfaces | Strong typing                 |
| Array.filter()        | Workflow grouping             |
| Array.map()           | Rendering tasks               |
| Component Composition | Board → Column → Card         |
| Declarative UI        | UI derived from data          |
| Enterprise Design     | Microsoft-style visual system |

---

# Official Documentation

### React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)

### Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)

### Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                    | Status    |
| ------- | --- | ----------------------- | --------- |
| Block 5 | 81  | CRUD System             | Completed |
| Block 5 | 82  | Employee Management     | Completed |
| Block 5 | 83  | Financial Dashboard     | Completed |
| Block 5 | 84  | Inventory System        | Completed |
| Block 5 | 85  | Kanban Board            | Current   |
| Block 5 | 86  | Enterprise Task Manager | Next      |

### ReactLab Progress

```txt
81 ✓ CRUD System
82 ✓ Employee Management
83 ✓ Financial Dashboard
84 ✓ Inventory System
85 ✓ Kanban Board
86 → Enterprise Task Manager
87 → User Management System
88 → Administrative Portal
89 → Ticket System
90 → Power BI Style Dashboard
91 → Report Generator
92 → Audit System
93 → SharePoint Inspired Portal
94 → Corporate Catalog
95 → Reservation System
96 → Mini ERP Enterprise
97 → Complete CRM
98 → Analytics System
99 → Microsoft Admin Center
100 → Final Enterprise Platform
```

**Files created in this app**

```powershell
New-Item src\models\KanbanTask.ts -ItemType File
New-Item src\data\tasks.ts -ItemType File
New-Item src\components\TaskCard.tsx -ItemType File
New-Item src\components\KanbanColumn.tsx -ItemType File
New-Item src\components\KanbanBoard.tsx -ItemType File
New-Item artigo.md -ItemType File
```
