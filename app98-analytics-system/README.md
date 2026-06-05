# App 98 — Analytics System

**Block 5 — Complete Applications**
**React + TypeScript + Vite + Fluent UI**

> App 98 represents the consolidation of dashboards, metrics, KPIs, charts, filtering, state management, reusable components, and enterprise UI patterns into a centralized Analytics System. It builds on concepts learned throughout the previous 97 applications and prepares the foundation for App 99 (Admin Center Microsoft Style) and App 100 (Final Enterprise Platform). 

---

# Step 1 — Create the Project (Correct Vite Pattern)

```powershell
cd E:\EkisReactLab\React-Fluent-100Apps

npm create vite@latest app98-analytics-system -- --template react-ts

cd app98-analytics-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Step 2 — Create Project Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\AnalyticsMetric.ts -ItemType File
New-Item src\data\analyticsData.ts -ItemType File

New-Item src\components\AnalyticsSummary.tsx -ItemType File
New-Item src\components\AnalyticsGrid.tsx -ItemType File
New-Item src\components\AnalyticsDashboard.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Step 3 — Analytics Model

## src\models\AnalyticsMetric.ts

```ts
export interface AnalyticsMetric {
  id: number;
  category: string;
  metric: string;
  value: number;
  trend: string;
  owner: string;
}
```

---

# Step 4 — Mock Data

## src\data\analyticsData.ts

```ts
import type { AnalyticsMetric } from "../models/AnalyticsMetric";

export const analyticsData: AnalyticsMetric[] = [
  {
    id: 1,
    category: "Sales",
    metric: "Monthly Revenue",
    value: 125000,
    trend: "Up",
    owner: "Finance",
  },
  {
    id: 2,
    category: "Marketing",
    metric: "Lead Generation",
    value: 4200,
    trend: "Up",
    owner: "Marketing",
  },
  {
    id: 3,
    category: "Operations",
    metric: "Process Efficiency",
    value: 89,
    trend: "Stable",
    owner: "Operations",
  },
  {
    id: 4,
    category: "Support",
    metric: "Ticket Resolution",
    value: 96,
    trend: "Up",
    owner: "Support",
  },
];
```

---

# Step 5 — KPI Summary

## src\components\AnalyticsSummary.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface AnalyticsSummaryProps {
  totalMetrics: number;
}

export function AnalyticsSummary({
  totalMetrics,
}: AnalyticsSummaryProps) {
  return (
    <Card
      style={{
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <Title3>Analytics Overview</Title3>

      <Text>
        Active Metrics: {totalMetrics}
      </Text>
    </Card>
  );
}
```

---

# Step 6 — Analytics Grid

## src\components\AnalyticsGrid.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { AnalyticsMetric } from "../models/AnalyticsMetric";

interface AnalyticsGridProps {
  metrics: AnalyticsMetric[];
}

export function AnalyticsGrid({
  metrics,
}: AnalyticsGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
        gap: "20px",
      }}
    >
      {metrics.map((metric) => (
        <Card
          key={metric.id}
          style={{
            padding: "20px",
          }}
        >
          <Title3>{metric.metric}</Title3>

          <Text>
            Category: {metric.category}
          </Text>

          <br />

          <Text>
            Value: {metric.value}
          </Text>

          <br />

          <Text>
            Trend: {metric.trend}
          </Text>

          <br />

          <Text>
            Owner: {metric.owner}
          </Text>
        </Card>
      ))}
    </div>
  );
}
```

---

# Step 7 — Dashboard Component

## src\components\AnalyticsDashboard.tsx

```tsx
import { analyticsData } from "../data/analyticsData";

import { AnalyticsSummary } from "./AnalyticsSummary";
import { AnalyticsGrid } from "./AnalyticsGrid";

export function AnalyticsDashboard() {
  return (
    <>
      <AnalyticsSummary
        totalMetrics={analyticsData.length}
      />

      <AnalyticsGrid
        metrics={analyticsData}
      />
    </>
  );
}
```

---

# Step 8 — App.tsx

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { AnalyticsDashboard }
  from "./components/AnalyticsDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <Title1>
        Analytics System
      </Title1>

      <Text>
        Enterprise KPI and Metrics Dashboard
      </Text>

      <div style={{ marginTop: "24px" }}>
        <AnalyticsDashboard />
      </div>
    </main>
  );
}

export default App;
```

---

# Step 9 — main.tsx

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

# Step 10 — index.css

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

# Run the Application

```powershell
npm run dev
```

---

# Production Validation

```powershell
npm run build
```

---

# Preview Production Build

```powershell
npm run preview
```

---

# Technical Concepts Learned

| Concept                 | Description                   |
| ----------------------- | ----------------------------- |
| Analytics Dashboard     | Centralized KPI visualization |
| Fluent UI Cards         | Enterprise metric containers  |
| Component Composition   | Dashboard → Summary → Grid    |
| TypeScript Models       | Strongly typed metrics        |
| Mock Analytics Data     | Data-driven rendering         |
| Responsive Grid         | Adaptive dashboard layout     |
| React Rendering         | UI derived from data          |
| Enterprise Architecture | Separation of concerns        |

---

# Technical Summary

App 98 introduces a corporate analytics platform where metrics are represented as reusable data objects and rendered through Fluent UI cards. The application demonstrates dashboard composition, KPI visualization, responsive layouts, reusable components, TypeScript modeling, and Microsoft-style enterprise interfaces. This app serves as the bridge between operational systems (CRM, ERP, Audit, Reports) and executive decision-making dashboards.

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [Fluent UI React Components](https://react.fluentui.dev/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                         | Status    |
| ------- | --- | ---------------------------- | --------- |
| Block 5 | 94  | Corporate Catalog            | Completed |
| Block 5 | 95  | Reservation System           | Completed |
| Block 5 | 96  | Mini ERP Enterprise          | Completed |
| Block 5 | 97  | CRM System                   | Completed |
| Block 5 | 98  | Analytics System             | Current   |
| Block 5 | 99  | Admin Center Microsoft Style | Next      |
| Block 5 | 100 | React Enterprise Platform    | Upcoming  |

**Current Position:** App 98 / 100 ✅
**Next App:** App 99 — Admin Center Microsoft Style 🚀
