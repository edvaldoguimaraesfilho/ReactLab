# App 73 — Analytical Dashboard

**Block 4 — Effects and Architecture**
**Concepts:** `useEffect`, API Consumption, Dashboard Composition, Derived Data, KPI Cards, Analytics UI, Fluent UI Layouts, Loading States, Service Layer Architecture. Based on the ReactLab roadmap. 

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app73-analytical-dashboard -- --template react-ts

cd app73-analytical-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\DashboardMetrics.ts -ItemType File
New-Item src\services\dashboardService.ts -ItemType File

New-Item src\components\KpiCard.tsx -ItemType File
New-Item src\components\MetricsGrid.tsx -ItemType File
New-Item src\components\DashboardHeader.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Project Structure

```txt
src/
│
├── components/
│   ├── DashboardHeader.tsx
│   ├── KpiCard.tsx
│   └── MetricsGrid.tsx
│
├── models/
│   └── DashboardMetrics.ts
│
├── services/
│   └── dashboardService.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Goal of the Application

This application simulates a modern enterprise analytics dashboard.

The dashboard displays:

* Total Users
* Active Projects
* Open Tickets
* Revenue
* Loading State
* KPI Cards
* Responsive Grid Layout

Unlike previous apps, data comes from a service layer.

This introduces enterprise architecture concepts:

```txt
API / Service
        ↓
   React State
        ↓
 Derived Metrics
        ↓
      UI
```

---

# Model Layer

## src/models/DashboardMetrics.ts

```ts
export interface DashboardMetrics {
  totalUsers: number;
  activeProjects: number;
  openTickets: number;
  revenue: number;
}
```

---

# Service Layer

## src/services/dashboardService.ts

```ts
import { DashboardMetrics } from "../models/DashboardMetrics";

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  await new Promise(resolve =>
    setTimeout(resolve, 1200)
  );

  return {
    totalUsers: 1450,
    activeProjects: 37,
    openTickets: 82,
    revenue: 325000,
  };
}
```

---

# KPI Card Component

## src/components/KpiCard.tsx

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string | number;
}

export function KpiCard({
  title,
  value,
}: KpiCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Text>{title}</Text>

      <Title2>
        {value}
      </Title2>
    </Card>
  );
}
```

---

# Metrics Grid

## src/components/MetricsGrid.tsx

```tsx
import { DashboardMetrics } from "../models/DashboardMetrics";
import { KpiCard } from "./KpiCard";

interface MetricsGridProps {
  metrics: DashboardMetrics;
}

export function MetricsGrid({
  metrics,
}: MetricsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      <KpiCard
        title="Total Users"
        value={metrics.totalUsers}
      />

      <KpiCard
        title="Active Projects"
        value={metrics.activeProjects}
      />

      <KpiCard
        title="Open Tickets"
        value={metrics.openTickets}
      />

      <KpiCard
        title="Revenue"
        value={`$${metrics.revenue.toLocaleString()}`}
      />
    </div>
  );
}
```

---

# Dashboard Header

## src/components/DashboardHeader.tsx

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

export function DashboardHeader() {
  return (
    <>
      <Title1>
        Analytical Dashboard
      </Title1>

      <Text>
        Enterprise KPI monitoring panel built
        with React and Fluent UI.
      </Text>
    </>
  );
}
```

---

# App.tsx

## src/App.tsx

```tsx
import {
  Spinner,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { useEffect, useState } from "react";

import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsGrid } from "./components/MetricsGrid";

import { DashboardMetrics } from "./models/DashboardMetrics";

import { getDashboardMetrics }
  from "./services/dashboardService";

function App() {
  const [metrics, setMetrics] =
    useState<DashboardMetrics | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMetrics() {
      const data =
        await getDashboardMetrics();

      setMetrics(data);
      setLoading(false);
    }

    loadMetrics();
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <DashboardHeader />

        <div
          style={{
            marginTop: "32px",
          }}
        >
          {loading && (
            <Spinner
              label="Loading analytics..."
            />
          )}

          {!loading && metrics && (
            <MetricsGrid
              metrics={metrics}
            />
          )}
        </div>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# main.tsx

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

# index.css

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# React Learn Concepts Used

### State

```tsx
const [metrics, setMetrics]
```

Stores dashboard information.

### Effect

```tsx
useEffect(() => {
  loadMetrics();
}, []);
```

Synchronizes the component with an external service.

### Conditional Rendering

```tsx
loading
  ? <Spinner />
  : <MetricsGrid />
```

React displays different UI depending on state.

### Component Composition

```txt
App
 ├─ DashboardHeader
 └─ MetricsGrid
      └─ KpiCard
```

---

# Why This App Matters

This is the first dashboard-focused application of the architecture block.

It introduces:

* Service Layer
* Async Data Loading
* Dashboard Composition
* Enterprise KPI Cards
* Loading States
* Responsive Layouts
* React Effects

These concepts appear repeatedly in:

* Power BI style dashboards
* SharePoint portals
* CRM systems
* ERP systems
* Administrative panels
* Analytics platforms

---

# Technical Summary

| Concept               | Description           |
| --------------------- | --------------------- |
| useEffect             | Loads dashboard data  |
| useState              | Stores metrics        |
| Service Layer         | Separates data access |
| KPI Cards             | Dashboard metrics     |
| Conditional Rendering | Loading vs Content    |
| Fluent UI             | Enterprise UI         |
| TypeScript Interface  | Strong typing         |
| Component Composition | Modular architecture  |
| Responsive Grid       | Adaptive dashboard    |
| Async/Await           | API simulation        |

---

# Official Documentation

### React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

### Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

### Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block       |    App | Name                     | Status      |
| ----------- | -----: | ------------------------ | ----------- |
| Block 4     |     61 | REST API Consumption     | Completed   |
| Block 4     |     62 | API Dashboard            | Completed   |
| Block 4     |     63 | Async Search             | Completed   |
| Block 4     |     64 | GitHub Explorer          | Completed   |
| Block 4     |     65 | Weather App              | Completed   |
| Block 4     |     66 | Pagination System        | Completed   |
| Block 4     |     67 | Infinite Scroll          | Completed   |
| Block 4     |     68 | Data Cache               | Completed   |
| Block 4     |     69 | Custom Fetch Hook        | Completed   |
| Block 4     |     70 | Context API Control      | Completed   |
| Block 4     |     71 | Favorites System         | Completed   |
| Block 4     |     72 | API DataGrid             | Completed   |
| **Block 4** | **73** | **Analytical Dashboard** | **Current** |
| Block 4     |     74 | Cryptocurrency Monitor   | Next        |

**Reference roadmap:** App 73 is defined as **Analytical Dashboard** in Block 4 of the ReactLab learning plan. 
