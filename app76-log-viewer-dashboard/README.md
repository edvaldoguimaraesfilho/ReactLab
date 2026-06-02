# App 76 — Log Viewer Dashboard

App 76 belongs to **Block 4 — Effects and Architecture** and is defined as **Log Viewer Dashboard (Painel de Logs)** in the ReactLab roadmap. It comes after Repository Explorer (App 75) and before Reporting System (App 77). The goal is to simulate an enterprise log monitoring dashboard using React, TypeScript, Fluent UI, and proper architecture patterns. This app continues the journey through APIs, effects, data visualization, and enterprise UI design. 

```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 76: Log Viewer Dashboard with React, TypeScript, Fluent UI, and Vite

## Introduction

Enterprise applications generate thousands of events every day:

* User logins
* Security alerts
* API requests
* System errors
* Workflow executions
* Audit events
* Background jobs

To understand system behavior, developers and administrators rely on log dashboards.

In App 76 we build a **Log Viewer Dashboard** inspired by enterprise monitoring tools. The application consumes log data, displays it in a Fluent UI DataGrid, supports filtering, severity visualization, and demonstrates a clean React architecture.

This app teaches:

* API consumption
* useEffect
* useMemo
* Derived state
* DataGrid rendering
* Enterprise dashboard design
* Layered architecture
* Fluent UI integration

Following React Learn principles:

* UI derives from state
* Avoid redundant state
* Effects only synchronize with external systems
* Derived values should be computed, not stored

Reference: [React Learn](https://react.dev/learn?utm_source=chatgpt.com)

---

# Project Creation

## Create the Application

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app76-log-viewer-dashboard -- --template react-ts

cd app76-log-viewer-dashboard

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\styles -ItemType Directory
New-Item src\data -ItemType Directory
```

Create files:

```powershell
New-Item src\models\LogEntry.ts -ItemType File
New-Item src\services\logService.ts -ItemType File
New-Item src\hooks\useLogs.ts -ItemType File
New-Item src\components\LogGrid.tsx -ItemType File
New-Item src\components\LogSummary.tsx -ItemType File
New-Item src\components\LogFilters.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Folder Structure

```txt
src/
│
├── components/
│   ├── LogGrid.tsx
│   ├── LogFilters.tsx
│   └── LogSummary.tsx
│
├── hooks/
│   └── useLogs.ts
│
├── models/
│   └── LogEntry.ts
│
├── services/
│   └── logService.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Create the Log Model

## LogEntry.ts

```ts
export interface LogEntry {
  id: number;
  timestamp: string;
  level: "Info" | "Warning" | "Error";
  source: string;
  message: string;
}
```

This model represents a typical enterprise log record.

---

# Mock Service Layer

## logService.ts

```ts
import { LogEntry } from "../models/LogEntry";

export async function getLogs(): Promise<LogEntry[]> {
  return [
    {
      id: 1,
      timestamp: "2026-06-01 09:30",
      level: "Info",
      source: "Authentication",
      message: "User login successful"
    },
    {
      id: 2,
      timestamp: "2026-06-01 10:15",
      level: "Warning",
      source: "Workflow",
      message: "Approval timeout detected"
    },
    {
      id: 3,
      timestamp: "2026-06-01 11:45",
      level: "Error",
      source: "API Gateway",
      message: "External API unavailable"
    }
  ];
}
```

Later this service can call:

* REST APIs
* Graph APIs
* SharePoint APIs
* Monitoring platforms

---

# Custom Hook

## useLogs.ts

```tsx
import { useEffect, useState } from "react";
import { getLogs } from "../services/logService";
import { LogEntry } from "../models/LogEntry";

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLogs();
      setLogs(data);
      setLoading(false);
    }

    load();
  }, []);

  return {
    logs,
    loading,
  };
}
```

This hook encapsulates:

* loading state
* API retrieval
* future error handling

Reference:

[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)

---

# Log Summary Component

## LogSummary.tsx

```tsx
import { Card, Text, Title3 } from "@fluentui/react-components";
import { LogEntry } from "../models/LogEntry";

interface Props {
  logs: LogEntry[];
}

export function LogSummary({ logs }: Props) {
  const errors = logs.filter(x => x.level === "Error").length;
  const warnings = logs.filter(x => x.level === "Warning").length;

  return (
    <Card>
      <Title3>System Overview</Title3>

      <Text>Total Logs: {logs.length}</Text>
      <br />
      <Text>Warnings: {warnings}</Text>
      <br />
      <Text>Errors: {errors}</Text>
    </Card>
  );
}
```

---

# Log Filters Component

## LogFilters.tsx

```tsx
import { Dropdown, Option } from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function LogFilters({
  value,
  onChange,
}: Props) {
  return (
    <Dropdown
      value={value}
      placeholder="Select severity"
    >
      <Option onClick={() => onChange("All")}>
        All
      </Option>

      <Option onClick={() => onChange("Info")}>
        Info
      </Option>

      <Option onClick={() => onChange("Warning")}>
        Warning
      </Option>

      <Option onClick={() => onChange("Error")}>
        Error
      </Option>
    </Dropdown>
  );
}
```

---

# Log Grid Component

## LogGrid.tsx

```tsx
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import { LogEntry } from "../models/LogEntry";

interface Props {
  logs: LogEntry[];
}

export function LogGrid({ logs }: Props) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Time</TableHeaderCell>
            <TableHeaderCell>Level</TableHeaderCell>
            <TableHeaderCell>Source</TableHeaderCell>
            <TableHeaderCell>Message</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map(log => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>{log.level}</TableCell>
              <TableCell>{log.source}</TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

# App.tsx

```tsx
import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { useLogs } from "./hooks/useLogs";
import { LogGrid } from "./components/LogGrid";
import { LogSummary } from "./components/LogSummary";
import { LogFilters } from "./components/LogFilters";

function App() {
  const { logs, loading } = useLogs();

  const [severity, setSeverity] =
    useState("All");

  const filteredLogs = useMemo(() => {
    if (severity === "All") {
      return logs;
    }

    return logs.filter(
      x => x.level === severity
    );
  }, [logs, severity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Title1>
          Enterprise Log Viewer
        </Title1>

        <LogSummary logs={logs} />

        <LogFilters
          value={severity}
          onChange={setSeverity}
        />

        <LogGrid logs={filteredLogs} />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# Why useMemo Matters

Filtering logs every render can become expensive.

```tsx
const filteredLogs = useMemo(...)
```

ensures recalculation only happens when:

```txt
logs changes
or
severity changes
```

Reference:

[useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)

---

# Why useEffect Is Correct Here

This app loads external data.

Therefore:

```txt
External System
→ Service Layer
→ useEffect
→ State Update
→ React Render
```

This is a valid Effect.

Reference:

[Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)

---

# Technical Summary

| Concept         | Purpose                |
| --------------- | ---------------------- |
| useEffect       | Load external log data |
| useMemo         | Optimize filtering     |
| Service Layer   | Isolate API access     |
| Custom Hook     | Reuse retrieval logic  |
| Fluent UI       | Enterprise UI          |
| DataGrid/Table  | Display logs           |
| Derived State   | Filtered logs          |
| TypeScript      | Strong typing          |
| React Rendering | UI derived from state  |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)
* [useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                 | Status    |
| ------- | --- | -------------------- | --------- |
| Block 4 | 74  | Crypto Monitor       | Completed |
| Block 4 | 75  | Repository Explorer  | Completed |
| Block 4 | 76  | Log Viewer Dashboard | Current   |
| Block 4 | 77  | Reporting System     | Next      |

**Current App:** 76 — Log Viewer Dashboard
**Next App:** 77 — Reporting System
**Roadmap Source:** ReactLab 100 Apps roadmap. 
