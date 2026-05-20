App 16 is **Dashboard Financeiro Estático** in Block 1. It should practice **Fluent Cards, metrics, static data, componentization, and list rendering**. The roadmap defines App 16 exactly as a corporate financial dashboard with Fluent cards and metrics.  React Learn supports this with reusable UI components and list rendering through `map()`. ([React][1])

## PowerShell

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app16-static-financial-dashboard -- --template react-ts
cd app16-static-financial-dashboard

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\FinancialMetric.ts -ItemType File
New-Item src\data\financialMetrics.ts -ItemType File
New-Item src\components\MetricCard.tsx -ItemType File
New-Item src\components\FinancialDashboard.tsx -ItemType File
```

## `src\models\FinancialMetric.ts`

```ts
export interface FinancialMetric {
  id: number;
  title: string;
  value: string;
  description: string;
  trend: "Positive" | "Negative" | "Neutral";
}
```

## `src\data\financialMetrics.ts`

```ts
import type { FinancialMetric } from "../models/FinancialMetric";

export const financialMetrics: FinancialMetric[] = [
  {
    id: 1,
    title: "Revenue",
    value: "$128,400",
    description: "Monthly consolidated revenue",
    trend: "Positive",
  },
  {
    id: 2,
    title: "Expenses",
    value: "$42,900",
    description: "Operational monthly expenses",
    trend: "Negative",
  },
  {
    id: 3,
    title: "Profit",
    value: "$85,500",
    description: "Estimated monthly net profit",
    trend: "Positive",
  },
  {
    id: 4,
    title: "Cash Flow",
    value: "$31,200",
    description: "Available cash flow balance",
    trend: "Neutral",
  },
];
```

## `src\components\MetricCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { FinancialMetric } from "../models/FinancialMetric";

interface MetricCardProps {
  metric: FinancialMetric;
}

function getBadgeAppearance(trend: FinancialMetric["trend"]) {
  if (trend === "Positive") return "filled" as const;
  if (trend === "Negative") return "outline" as const;
  return "tint" as const;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        header={<Text weight="semibold">{metric.title}</Text>}
        description={<Body1>{metric.description}</Body1>}
      />

      <Title2>{metric.value}</Title2>

      <Badge appearance={getBadgeAppearance(metric.trend)}>
        {metric.trend}
      </Badge>
    </Card>
  );
}
```

## `src\components\FinancialDashboard.tsx`

```tsx
import { financialMetrics } from "../data/financialMetrics";
import { MetricCard } from "./MetricCard";

export function FinancialDashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {financialMetrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { FinancialDashboard } from "./components/FinancialDashboard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Static Financial Dashboard</Title1>

        <Text>
          A corporate financial overview built with React, TypeScript, Vite,
          and Fluent UI.
        </Text>

        <FinancialDashboard />
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

## Run

```powershell
npm run dev
npm run build
npm run preview
```

## Where we are

| Block   | App | Name                       | Status    |
| ------- | --: | -------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent         | Completed |
| Block 1 |  02 | Profile Card               | Completed |
| Block 1 |  03 | Product List               | Completed |
| Block 1 |  04 | Microsoft Style User Card  | Completed |
| Block 1 |  05 | Static Dashboard           | Completed |
| Block 1 |  06 | Corporate Sidebar Menu     | Completed |
| Block 1 |  07 | Visual Task List           | Completed |
| Block 1 |  08 | Timeline Events            | Completed |
| Block 1 |  09 | Employee Table             | Completed |
| Block 1 |  10 | Email List                 | Completed |
| Block 1 |  11 | Grid of Cards              | Completed |
| Block 1 |  12 | Image Gallery              | Completed |
| Block 1 |  13 | Movie Catalog              | Completed |
| Block 1 |  14 | Football Teams             | Completed |
| Block 1 |  15 | News Page                  | Completed |
| Block 1 |  16 | Static Financial Dashboard | Current   |
| Block 1 |  17 | SharePoint Layout          | Next      |

[1]: https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com "Describing the UI"
