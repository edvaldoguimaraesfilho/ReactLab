# App 40 — Dynamic Dashboard

App 40 closes **Block 2 — Interactivity and State**. In the roadmap, App 40 is **Dashboard Dinâmico / Dynamic Dashboard**, inside the block focused on `useState`, events, forms, filters, derived state, validation, and shared state. 

Official base: React “Adding Interactivity” and “Managing State”. React explains that state is data that changes over time and causes the screen to update, and that larger apps need intentional state structure. ([React][1])

## Goal

Build a dashboard where the user can:

* select a department
* filter KPI cards
* change the selected month
* see totals recalculated automatically
* understand derived state without using unnecessary `useEffect`

---

## PowerShell setup

```powershell
cd C:\ReactApps

New-Item bloco02 -ItemType Directory -Force
cd bloco02

npm create vite@latest app40-dynamic-dashboard -- --template react-ts
cd app40-dynamic-dashboard

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\models -ItemType Directory -Force
New-Item src\data -ItemType Directory -Force
New-Item src\components -ItemType Directory -Force
New-Item src\styles -ItemType Directory -Force

New-Item src\models\DashboardMetric.ts -ItemType File
New-Item src\data\dashboardMetrics.ts -ItemType File
New-Item src\components\DashboardFilters.tsx -ItemType File
New-Item src\components\MetricCard.tsx -ItemType File
New-Item src\components\MetricSummary.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

## `src\models\DashboardMetric.ts`

```ts
export type Department = "Sales" | "Finance" | "Operations" | "Technology";

export interface DashboardMetric {
  id: number;
  title: string;
  department: Department;
  month: string;
  value: number;
  target: number;
  unit: string;
}
```

---

## `src\data\dashboardMetrics.ts`

```ts
import type { DashboardMetric } from "../models/DashboardMetric";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 1,
    title: "Revenue",
    department: "Sales",
    month: "January",
    value: 125000,
    target: 100000,
    unit: "$",
  },
  {
    id: 2,
    title: "Expenses",
    department: "Finance",
    month: "January",
    value: 68000,
    target: 75000,
    unit: "$",
  },
  {
    id: 3,
    title: "Open Tickets",
    department: "Technology",
    month: "January",
    value: 34,
    target: 25,
    unit: "",
  },
  {
    id: 4,
    title: "Completed Orders",
    department: "Operations",
    month: "January",
    value: 420,
    target: 400,
    unit: "",
  },
  {
    id: 5,
    title: "Revenue",
    department: "Sales",
    month: "February",
    value: 98000,
    target: 110000,
    unit: "$",
  },
  {
    id: 6,
    title: "Open Tickets",
    department: "Technology",
    month: "February",
    value: 19,
    target: 25,
    unit: "",
  },
];
```

---

## `src\components\DashboardFilters.tsx`

```tsx
import {
  Button,
  Dropdown,
  Field,
  Option,
} from "@fluentui/react-components";

import type { Department } from "../models/DashboardMetric";

interface DashboardFiltersProps {
  selectedDepartment: Department | "All";
  selectedMonth: string;
  onDepartmentChange: (department: Department | "All") => void;
  onMonthChange: (month: string) => void;
  onReset: () => void;
}

export function DashboardFilters({
  selectedDepartment,
  selectedMonth,
  onDepartmentChange,
  onMonthChange,
  onReset,
}: DashboardFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        marginTop: "24px",
      }}
    >
      <Field label="Department">
        <Dropdown
          value={selectedDepartment}
          selectedOptions={[selectedDepartment]}
          onOptionSelect={(_, data) =>
            onDepartmentChange(data.optionValue as Department | "All")
          }
        >
          <Option value="All">All</Option>
          <Option value="Sales">Sales</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Operations">Operations</Option>
          <Option value="Technology">Technology</Option>
        </Dropdown>
      </Field>

      <Field label="Month">
        <Dropdown
          value={selectedMonth}
          selectedOptions={[selectedMonth]}
          onOptionSelect={(_, data) =>
            onMonthChange(data.optionValue ?? "January")
          }
        >
          <Option value="January">January</Option>
          <Option value="February">February</Option>
        </Dropdown>
      </Field>

      <Button appearance="secondary" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}
```

---

## `src\components\MetricCard.tsx`

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
  ArrowTrending24Regular,
  CheckmarkCircle24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { DashboardMetric } from "../models/DashboardMetric";

interface MetricCardProps {
  metric: DashboardMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const isOnTarget = metric.value >= metric.target;

  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        image={<ArrowTrending24Regular />}
        header={<Title3>{metric.title}</Title3>}
        description={
          <Caption1>
            {metric.department} · {metric.month}
          </Caption1>
        }
      />

      <Text size={700} weight="semibold">
        {metric.unit}
        {metric.value.toLocaleString()}
      </Text>

      <Body1>Target: {metric.unit}{metric.target.toLocaleString()}</Body1>

      <Badge
        appearance={isOnTarget ? "filled" : "outline"}
        icon={isOnTarget ? <CheckmarkCircle24Regular /> : <Warning24Regular />}
      >
        {isOnTarget ? "On target" : "Below target"}
      </Badge>
    </Card>
  );
}
```

---

## `src\components\MetricSummary.tsx`

```tsx
import { Card, Text, Title3 } from "@fluentui/react-components";

interface MetricSummaryProps {
  totalMetrics: number;
  totalOnTarget: number;
  totalBelowTarget: number;
}

export function MetricSummary({
  totalMetrics,
  totalOnTarget,
  totalBelowTarget,
}: MetricSummaryProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "32px",
      }}
    >
      <Card>
        <Title3>Total Metrics</Title3>
        <Text size={600}>{totalMetrics}</Text>
      </Card>

      <Card>
        <Title3>On Target</Title3>
        <Text size={600}>{totalOnTarget}</Text>
      </Card>

      <Card>
        <Title3>Below Target</Title3>
        <Text size={600}>{totalBelowTarget}</Text>
      </Card>
    </div>
  );
}
```

---

## `src\App.tsx`

```tsx
import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { dashboardMetrics } from "./data/dashboardMetrics";
import type { Department } from "./models/DashboardMetric";
import { DashboardFilters } from "./components/DashboardFilters";
import { MetricCard } from "./components/MetricCard";
import { MetricSummary } from "./components/MetricSummary";

function App() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | "All">("All");

  const [selectedMonth, setSelectedMonth] = useState("January");

  const filteredMetrics = dashboardMetrics.filter((metric) => {
    const matchesDepartment =
      selectedDepartment === "All" ||
      metric.department === selectedDepartment;

    const matchesMonth = metric.month === selectedMonth;

    return matchesDepartment && matchesMonth;
  });

  const totalOnTarget = filteredMetrics.filter(
    (metric) => metric.value >= metric.target
  ).length;

  const totalBelowTarget = filteredMetrics.length - totalOnTarget;

  function resetFilters() {
    setSelectedDepartment("All");
    setSelectedMonth("January");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Dynamic Dashboard</Title1>

        <Text>
          A React dashboard using state, events, filters, and derived values.
        </Text>

        <DashboardFilters
          selectedDepartment={selectedDepartment}
          selectedMonth={selectedMonth}
          onDepartmentChange={setSelectedDepartment}
          onMonthChange={setSelectedMonth}
          onReset={resetFilters}
        />

        <MetricSummary
          totalMetrics={filteredMetrics.length}
          totalOnTarget={totalOnTarget}
          totalBelowTarget={totalBelowTarget}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {filteredMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </section>
    </main>
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

ReactDOM.createRoot(document.getElementById("root")!).render(
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
npm run build
npm run preview
```

---

## What App 40 teaches

| Concept                    | Where                                    |
| -------------------------- | ---------------------------------------- |
| `useState`                 | selected department and selected month   |
| Events                     | dropdown changes and reset button        |
| Derived state              | filtered metrics, totals, target status  |
| No unnecessary `useEffect` | values are calculated during render      |
| Props                      | filters and cards receive data/functions |
| Lists                      | `filteredMetrics.map(...)`               |
| Fluent UI                  | Card, Dropdown, Button, Badge            |
| TypeScript                 | `DashboardMetric`, `Department`          |

---

## Where we are

| Block   |   App | Name                  | Status    |
| ------- | ----: | --------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI   | Completed |
| Block 2 |    21 | Modern Counter        | Completed |
| Block 2 |    22 | Toggle Theme          | Completed |
| Block 2 |    23 | React Calculator      | Completed |
| Block 2 |    24 | Login Form            | Completed |
| Block 2 |    25 | User Registration     | Completed |
| Block 2 |    26 | ToDo List             | Completed |
| Block 2 |    27 | Shopping List         | Completed |
| Block 2 |    28 | Product Filter        | Completed |
| Block 2 |    29 | Employee Search       | Completed |
| Block 2 |    30 | Shopping Cart         | Completed |
| Block 2 |    31 | Grade Simulator       | Completed |
| Block 2 |    32 | Inventory Control     | Completed |
| Block 2 |    33 | Contact Agenda        | Completed |
| Block 2 |    34 | Currency Converter    | Completed |
| Block 2 |    35 | BMI Calculator        | Completed |
| Block 2 |    36 | Installment Simulator | Completed |
| Block 2 |    37 | Voting Panel          | Completed |
| Block 2 |    38 | Interactive Quiz      | Completed |
| Block 2 |    39 | Team Manager          | Completed |
| Block 2 |    40 | Dynamic Dashboard     | Current   |
| Block 3 |    41 | Login Microsoft Style | Next      |

[1]: https://react.dev/learn/adding-interactivity?utm_source=chatgpt.com "Adding Interactivity"
