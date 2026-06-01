# App 45 — Executive Dashboard

App 45 is **Dashboard Executivo / Executive Dashboard**, inside **Block 3 — Professional Fluent UI**, after App 44 Dialog Manager and before App 46 DataGrid Catalog. The roadmap defines App 45 as a Fluent UI enterprise dashboard focused on **Cards, KPI layout, professional visual hierarchy, and Microsoft-style composition**. 

React official docs reinforce that modern React UIs are built from reusable components and composed declaratively. ([React][1]) Fluent UI is the Microsoft design system used to build accessible enterprise interfaces. ([storybooks.fluentui.dev][2])

---

## 1. PowerShell — create the project

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory -Force
cd bloco03

npm create vite@latest app45-executive-dashboard -- --template react-ts

cd app45-executive-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory -Force
New-Item src\data -ItemType Directory -Force
New-Item src\models -ItemType Directory -Force
New-Item src\styles -ItemType Directory -Force

New-Item src\models\ExecutiveMetric.ts -ItemType File
New-Item src\data\executiveMetrics.ts -ItemType File
New-Item src\components\MetricCard.tsx -ItemType File
New-Item src\components\ExecutiveDashboard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

## 2. `src\models\ExecutiveMetric.ts`

```ts
export interface ExecutiveMetric {
  id: number;
  title: string;
  value: string;
  variation: string;
  status: "Positive" | "Warning" | "Critical";
  description: string;
}
```

---

## 3. `src\data\executiveMetrics.ts`

```ts
import type { ExecutiveMetric } from "../models/ExecutiveMetric";

export const executiveMetrics: ExecutiveMetric[] = [
  {
    id: 1,
    title: "Revenue",
    value: "$1.2M",
    variation: "+18%",
    status: "Positive",
    description: "Monthly revenue performance compared to the previous period.",
  },
  {
    id: 2,
    title: "Customer Satisfaction",
    value: "91%",
    variation: "+6%",
    status: "Positive",
    description: "Average satisfaction score across enterprise accounts.",
  },
  {
    id: 3,
    title: "Open Risks",
    value: "14",
    variation: "-3",
    status: "Warning",
    description: "Active business risks currently under executive review.",
  },
  {
    id: 4,
    title: "Delayed Projects",
    value: "5",
    variation: "+2",
    status: "Critical",
    description: "Projects requiring immediate leadership attention.",
  },
];
```

---

## 4. `src\components\MetricCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Title3,
} from "@fluentui/react-components";

import {
  ArrowTrending24Regular,
  Warning24Regular,
  ErrorCircle24Regular,
} from "@fluentui/react-icons";

import type { ExecutiveMetric } from "../models/ExecutiveMetric";

interface MetricCardProps {
  metric: ExecutiveMetric;
}

function getIcon(status: ExecutiveMetric["status"]) {
  if (status === "Positive") return <ArrowTrending24Regular />;
  if (status === "Warning") return <Warning24Regular />;
  return <ErrorCircle24Regular />;
}

function getBadgeAppearance(status: ExecutiveMetric["status"]) {
  if (status === "Positive") return "filled" as const;
  if (status === "Warning") return "tint" as const;
  return "outline" as const;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card style={{ padding: "20px", minHeight: "190px" }}>
      <CardHeader
        image={getIcon(metric.status)}
        header={<Title3>{metric.title}</Title3>}
        description={<Caption1>{metric.description}</Caption1>}
      />

      <Body1 style={{ fontSize: "32px", fontWeight: 700 }}>
        {metric.value}
      </Body1>

      <Badge appearance={getBadgeAppearance(metric.status)}>
        {metric.variation} · {metric.status}
      </Badge>
    </Card>
  );
}
```

---

## 5. `src\components\ExecutiveDashboard.tsx`

```tsx
import {
  Button,
  Card,
  Text,
  Title1,
  Title2,
} from "@fluentui/react-components";

import {
  Board24Regular,
  CalendarAgenda24Regular,
  DocumentBulletList24Regular,
} from "@fluentui/react-icons";

import { executiveMetrics } from "../data/executiveMetrics";
import { MetricCard } from "./MetricCard";

export function ExecutiveDashboard() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <Title1>Executive Dashboard</Title1>
            <Text>
              A Microsoft-style executive overview built with React,
              TypeScript, Vite, and Fluent UI.
            </Text>
          </div>

          <Button appearance="primary" icon={<DocumentBulletList24Regular />}>
            Export Report
          </Button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {executiveMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          <Card style={{ padding: "24px" }}>
            <Title2>Business Review</Title2>
            <Text>
              Revenue and customer satisfaction remain strong, while delayed
              projects require leadership attention. This dashboard is currently
              static, but its structure is ready for future state, filters,
              charts, APIs, and DataGrid integration.
            </Text>
          </Card>

          <Card style={{ padding: "24px" }}>
            <Title2>Actions</Title2>

            <Button icon={<Board24Regular />}>Review KPIs</Button>
            <Button icon={<CalendarAgenda24Regular />}>Schedule Meeting</Button>
            <Button icon={<DocumentBulletList24Regular />}>Open Reports</Button>
          </Card>
        </div>
      </section>
    </main>
  );
}
```

---

## 6. `src\App.tsx`

```tsx
import { ExecutiveDashboard } from "./components/ExecutiveDashboard";

function App() {
  return <ExecutiveDashboard />;
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

## 9. Run

```powershell
npm run dev
npm run build
npm run preview
```

---

# Technical Blog Article — App 45: Executive Dashboard with React, TypeScript, Vite, and Fluent UI

App 45 introduces an executive dashboard interface using the Microsoft Fluent UI design system. The goal is to practice professional dashboard composition before introducing more advanced DataGrid-heavy apps in the next exercises.

The application is intentionally static. This is important because not every React application needs state immediately. In this app, the UI is derived from a typed data file, rendered through reusable components, and organized with a clean component hierarchy.

The main architectural flow is:

```txt
main.tsx
  → App.tsx
    → ExecutiveDashboard.tsx
      → MetricCard.tsx
        → executiveMetrics.ts
          → ExecutiveMetric.ts
```

This teaches one of the most important React habits: separate the model, data, visual component, and page composition.

`ExecutiveMetric.ts` defines the TypeScript contract. `executiveMetrics.ts` contains the dashboard data. `MetricCard.tsx` renders one KPI card. `ExecutiveDashboard.tsx` composes the full page.

The app reinforces React’s official mental model: break the UI into components, describe visual states declaratively, and connect data flow through props. ([React][3])

There is no `useEffect` here because the dashboard is not synchronizing with an external system yet. There is also no `useState` because nothing changes through user interaction yet. This is correct React design: do not add state or effects before they are necessary.

---

## Technical Summary

| Concept              | Explanation                                       |
| -------------------- | ------------------------------------------------- |
| React Components     | Dashboard is divided into reusable UI pieces      |
| TypeScript Interface | `ExecutiveMetric` defines the metric shape        |
| Static Data          | Dashboard metrics come from `executiveMetrics.ts` |
| Props                | `MetricCard` receives one metric as input         |
| Fluent UI Card       | Used for KPI blocks and executive panels          |
| Fluent UI Badge      | Shows status and variation                        |
| Fluent UI Button     | Represents executive actions                      |
| CSS Grid             | Creates responsive dashboard layout               |
| No State Yet         | Static dashboard does not need `useState`         |
| No Effect Yet        | No external synchronization exists yet            |

---

## Official Documentation

| Topic                      | Documentation                  |
| -------------------------- | ------------------------------ |
| React Learn                | ([React][1])                   |
| Thinking in React          | ([React][3])                   |
| Describing the UI          | ([React][4])                   |
| Managing State             | ([React][5])                   |
| Fluent UI React Components | ([storybooks.fluentui.dev][2]) |

---

# Where we are now

| Block   | App | Name                  | Status    |
| ------- | --: | --------------------- | --------- |
| Block 3 |  41 | Microsoft Style Login | Completed |
| Block 3 |  42 | Corporate Form        | Completed |
| Block 3 |  43 | Tabs Navigation       | Completed |
| Block 3 |  44 | Dialog Manager        | Completed |
| Block 3 |  45 | Executive Dashboard   | Current   |
| Block 3 |  46 | DataGrid Catalog      | Next      |

[1]: https://react.dev/learn?utm_source=chatgpt.com "Quick Start"
[2]: https://storybooks.fluentui.dev/react/?utm_source=chatgpt.com "Fluent UI React Components"
[3]: https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com "Thinking in React"
[4]: https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com "Describing the UI"
[5]: https://react.dev/learn/managing-state?utm_source=chatgpt.com "Managing State"
