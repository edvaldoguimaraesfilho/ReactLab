App 52 is **Administrative Panel**, inside **Block 3 — Professional Fluent UI**, after App 51 Notifications and before App 53 Tickets. 

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory -Force
cd bloco03

npm create vite@latest app52-administrative-panel -- --template react-ts
cd app52-administrative-panel

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\AdminMetric.ts -ItemType File
New-Item src\data\adminMetrics.ts -ItemType File
New-Item src\components\AdminHeader.tsx -ItemType File
New-Item src\components\AdminSidebar.tsx -ItemType File
New-Item src\components\AdminDashboard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## App 52 Goal

Build a Microsoft-style **Administrative Panel** with:

| Area           | Purpose                               |
| -------------- | ------------------------------------- |
| Sidebar        | Admin navigation                      |
| Header         | Page title and actions                |
| Metric cards   | Users, tickets, alerts, approvals     |
| Dashboard grid | Enterprise admin overview             |
| Fluent UI      | Professional Microsoft visual pattern |

## Files to implement

### `src\models\AdminMetric.ts`

```ts
export interface AdminMetric {
  id: number;
  title: string;
  value: string;
  description: string;
}
```

### `src\data\adminMetrics.ts`

```ts
import type { AdminMetric } from "../models/AdminMetric";

export const adminMetrics: AdminMetric[] = [
  {
    id: 1,
    title: "Active Users",
    value: "1,248",
    description: "Users currently enabled in the system",
  },
  {
    id: 2,
    title: "Open Tickets",
    value: "37",
    description: "Support tickets waiting for action",
  },
  {
    id: 3,
    title: "Pending Approvals",
    value: "14",
    description: "Requests waiting for administrator approval",
  },
  {
    id: 4,
    title: "Security Alerts",
    value: "5",
    description: "Important alerts requiring review",
  },
];
```

### `src\components\AdminSidebar.tsx`

```tsx
import { Button, Card, Title3 } from "@fluentui/react-components";
import {
  Home24Regular,
  People24Regular,
  TicketDiagonal24Regular,
  Shield24Regular,
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

      <Button appearance="subtle" icon={<Home24Regular />}>Overview</Button>
      <Button appearance="subtle" icon={<People24Regular />}>Users</Button>
      <Button appearance="subtle" icon={<TicketDiagonal24Regular />}>Tickets</Button>
      <Button appearance="subtle" icon={<Shield24Regular />}>Security</Button>
      <Button appearance="subtle" icon={<Settings24Regular />}>Settings</Button>
    </Card>
  );
}
```

### `src\components\AdminHeader.tsx`

```tsx
import { Button, Text, Title1 } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

export function AdminHeader() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
      }}
    >
      <div>
        <Title1>Administrative Panel</Title1>
        <Text>Enterprise administration overview built with Fluent UI.</Text>
      </div>

      <Button appearance="primary" icon={<Add24Regular />}>
        New Request
      </Button>
    </header>
  );
}
```

### `src\components\AdminDashboard.tsx`

```tsx
import { Card, Text, Title2, Title3 } from "@fluentui/react-components";
import { adminMetrics } from "../data/adminMetrics";

export function AdminDashboard() {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {adminMetrics.map((metric) => (
          <Card key={metric.id} style={{ padding: "24px" }}>
            <Title3>{metric.title}</Title3>
            <Title2>{metric.value}</Title2>
            <Text>{metric.description}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

### `src\App.tsx`

```tsx
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar } from "./components/AdminSidebar";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <AdminHeader />
        <AdminDashboard />
      </main>
    </div>
  );
}

export default App;
```

### `src\main.tsx`

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

### `src\index.css`

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

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 3 |  51 | Notification Center  | Completed |
| Block 3 |  52 | Administrative Panel | Current   |
| Block 3 |  53 | Ticket Manager       | Next      |
