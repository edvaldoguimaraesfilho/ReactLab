# App 99 — Admin Center Microsoft Style

## PowerShell setup

```powershell
cd E:\EkisReactLab\React-Fluent-100Apps

npm create vite@latest app99-admin-center-microsoft-style -- --template react-ts

cd app99-admin-center-microsoft-style

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
New-Item artigo.md -ItemType File
```

```powershell
New-Item src\models\AdminModule.ts -ItemType File
New-Item src\models\AdminAlert.ts -ItemType File
New-Item src\data\modules.ts -ItemType File
New-Item src\data\alerts.ts -ItemType File
New-Item src\components\AdminHeader.tsx -ItemType File
New-Item src\components\AdminSidebar.tsx -ItemType File
New-Item src\components\AdminModuleCard.tsx -ItemType File
New-Item src\components\AdminDashboard.tsx -ItemType File
New-Item src\components\AlertsPanel.tsx -ItemType File
```

---

## `src\models\AdminModule.ts`

```ts
export interface AdminModule {
  id: number;
  name: string;
  description: string;
  records: number;
}
```

## `src\models\AdminAlert.ts`

```ts
export interface AdminAlert {
  id: number;
  title: string;
  severity: "High" | "Medium" | "Low";
}
```

## `src\data\modules.ts`

```ts
import type { AdminModule } from "../models/AdminModule";

export const modules: AdminModule[] = [
  {
    id: 1,
    name: "Users",
    description: "Manage enterprise user accounts.",
    records: 254,
  },
  {
    id: 2,
    name: "Groups",
    description: "Manage Microsoft 365 groups and security groups.",
    records: 48,
  },
  {
    id: 3,
    name: "Devices",
    description: "Review registered corporate devices.",
    records: 312,
  },
  {
    id: 4,
    name: "Reports",
    description: "Access governance and usage reports.",
    records: 76,
  },
];
```

## `src\data\alerts.ts`

```ts
import type { AdminAlert } from "../models/AdminAlert";

export const alerts: AdminAlert[] = [
  {
    id: 1,
    title: "12 users have licenses expiring soon.",
    severity: "High",
  },
  {
    id: 2,
    title: "Security baseline review is pending.",
    severity: "Medium",
  },
  {
    id: 3,
    title: "Weekly usage report is ready.",
    severity: "Low",
  },
];
```

---

## `src\components\AdminSidebar.tsx`

```tsx
import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Home24Regular,
  People24Regular,
  Group24Regular,
  Devices24Regular,
  DocumentData24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function AdminSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title3>Admin Center</Title3>

      <Text size={200}>Microsoft Style Portal</Text>

      <Button appearance="subtle" icon={<Home24Regular />}>
        Dashboard
      </Button>

      <Button appearance="subtle" icon={<People24Regular />}>
        Users
      </Button>

      <Button appearance="subtle" icon={<Group24Regular />}>
        Groups
      </Button>

      <Button appearance="subtle" icon={<Devices24Regular />}>
        Devices
      </Button>

      <Button appearance="subtle" icon={<DocumentData24Regular />}>
        Reports
      </Button>

      <Button appearance="subtle" icon={<Settings24Regular />}>
        Settings
      </Button>
    </Card>
  );
}
```

---

## `src\components\AdminHeader.tsx`

```tsx
import {
  Avatar,
  Badge,
  Toolbar,
  ToolbarButton,
  Title2,
} from "@fluentui/react-components";

export function AdminHeader() {
  return (
    <Toolbar
      style={{
        justifyContent: "space-between",
        padding: "16px 0",
      }}
    >
      <Title2>Microsoft Style Admin Center</Title2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <ToolbarButton>Refresh</ToolbarButton>
        <ToolbarButton>Export</ToolbarButton>

        <Badge appearance="filled">Admin</Badge>

        <Avatar name="Admin User" />
      </div>
    </Toolbar>
  );
}
```

---

## `src\components\AdminModuleCard.tsx`

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { AdminModule } from "../models/AdminModule";

interface AdminModuleCardProps {
  module: AdminModule;
}

export function AdminModuleCard({
  module,
}: AdminModuleCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{module.name}</Title3>

      <Text>{module.description}</Text>

      <Text weight="semibold">
        Records: {module.records}
      </Text>
    </Card>
  );
}
```

---

## `src\components\AdminDashboard.tsx`

```tsx
import {
  Card,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import { modules } from "../data/modules";
import { AdminModuleCard } from "./AdminModuleCard";

export function AdminDashboard() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Card
        style={{
          padding: "24px",
        }}
      >
        <Title1>Admin Overview</Title1>

        <Text>
          Centralized enterprise administration dashboard built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>
      </Card>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {modules.map((module) => (
          <AdminModuleCard
            key={module.id}
            module={module}
          />
        ))}
      </div>

      <Card
        style={{
          padding: "20px",
        }}
      >
        <Title3>Administrative Model</Title3>

        <Text>
          This app uses typed models, static data, reusable components,
          declarative rendering, and Fluent UI enterprise layout patterns.
        </Text>
      </Card>
    </section>
  );
}
```

---

## `src\components\AlertsPanel.tsx`

```tsx
import {
  Badge,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import { alerts } from "../data/alerts";

export function AlertsPanel() {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>Governance Alerts</Title3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "16px",
        }}
      >
        {alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Badge appearance="filled">
              {alert.severity}
            </Badge>

            <Text>{alert.title}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
}
```

---

## `src\App.tsx`

```tsx
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";
import { AlertsPanel } from "./components/AlertsPanel";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxSizing: "border-box",
        }}
      >
        <AdminHeader />

        <AdminDashboard />

        <AlertsPanel />
      </main>
    </div>
  );
}

export default App;
```

---

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
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

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

## Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

---

# Technical Summary

| Concept                | Where                             |
| ---------------------- | --------------------------------- |
| React root             | `main.tsx`                        |
| Fluent UI provider     | `main.tsx`                        |
| App shell              | `App.tsx`                         |
| Sidebar navigation     | `AdminSidebar.tsx`                |
| Header toolbar         | `AdminHeader.tsx`                 |
| Dashboard cards        | `AdminDashboard.tsx`              |
| Reusable card          | `AdminModuleCard.tsx`             |
| Alerts rendering       | `AlertsPanel.tsx`                 |
| Typed models           | `AdminModule.ts`, `AdminAlert.ts` |
| Static enterprise data | `modules.ts`, `alerts.ts`         |

---

# Current Position

| App | Name                            | Status                    |
| --: | ------------------------------- | ------------------------- |
|  98 | Analytics System                | Completed                 |
|  99 | Admin Center Microsoft Style    | Current corrected version |
| 100 | React Enterprise Platform Final | Next                      |
