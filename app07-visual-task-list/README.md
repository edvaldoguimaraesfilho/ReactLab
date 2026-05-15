# App 07 — Visual Task List

App 07 is **“Visual Task List”** in Block 1. Its goal is a **static ToDo/task visual interface**, focused on **componentization** and **pure components**, before we start real interactivity in later apps. The roadmap defines App 07 as “Lista de Tarefas Visual / ToDo visual estática / Componentização” and links it to React’s “Keeping Components Pure” concept. 

---

## 1. Create the project

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app07-visual-task-list -- --template react-ts

cd app07-visual-task-list

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\TaskItem.ts -ItemType File
New-Item src\data\tasks.ts -ItemType File
New-Item src\components\TaskCard.tsx -ItemType File
New-Item src\components\TaskList.tsx -ItemType File
```

---

## 2. `src\models\TaskItem.ts`

```ts
export type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  priority: "High" | "Medium" | "Low";
}
```

---

## 3. `src\data\tasks.ts`

```ts
import type { TaskItem } from "../models/TaskItem";

export const tasks: TaskItem[] = [
  {
    id: 1,
    title: "Prepare project structure",
    description: "Create folders, base files, and initial architecture.",
    owner: "Development Team",
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,
    title: "Design task card component",
    description: "Create a reusable visual card for each task.",
    owner: "UI Team",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Review Fluent UI layout",
    description: "Validate spacing, typography, and card composition.",
    owner: "Design System Team",
    status: "Pending",
    priority: "Low",
  },
];
```

---

## 4. `src\components\TaskCard.tsx`

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

import type { TaskItem } from "../models/TaskItem";

interface TaskCardProps {
  task: TaskItem;
}

function getStatusIcon(status: TaskItem["status"]) {
  if (status === "Completed") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "In Progress") {
    return <Clock24Regular />;
  }

  return <Warning24Regular />;
}

function getBadgeAppearance(status: TaskItem["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(task.status)}
        header={<Title3>{task.title}</Title3>}
        description={<Caption1>Owner: {task.owner}</Caption1>}
      />

      <Body1>{task.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
        }}
      >
        <Badge appearance={getBadgeAppearance(task.status)}>
          {task.status}
        </Badge>

        <Text size={200}>Priority: {task.priority}</Text>
      </div>
    </Card>
  );
}
```

---

## 5. `src\components\TaskList.tsx`

```tsx
import { tasks } from "../data/tasks";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
```

---

## 6. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { TaskList } from "./components/TaskList";

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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Title1>Visual Task List</Title1>

        <Text>
          A static enterprise task board built with React, TypeScript, and
          Fluent UI.
        </Text>

        <TaskList />
      </section>
    </main>
  );
}

export default App;
```

---

## 7. `src\main.tsx`

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

---

## 8. `src\index.css`

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

## 9. Run and validate

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

## What this app teaches

| Concept              | Where it appears                         |
| -------------------- | ---------------------------------------- |
| TypeScript model     | `TaskItem.ts`                            |
| Static data source   | `tasks.ts`                               |
| Reusable component   | `TaskCard.tsx`                           |
| List rendering       | `TaskList.tsx`                           |
| `map()` rendering    | `tasks.map(...)`                         |
| Stable React keys    | `key={task.id}`                          |
| Composition          | `App → TaskList → TaskCard`              |
| Fluent UI components | `Card`, `Badge`, `Text`, `Title1`        |
| Pure components      | No state, no effects, only props and JSX |

---

## Where we are

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Current   |
| Block 1 |  08 | Timeline of Events        | Next      |
