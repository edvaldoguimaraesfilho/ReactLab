# App 83 — Financial Dashboard

**Block 5 — Complete Applications**
**Focus:** Enterprise Dashboard + Financial KPIs + Charts + Fluent UI + Service Layer + TypeScript Architecture

The roadmap defines App 83 as **Financial Dashboard**, one of the first complete enterprise applications in Block 5. It consolidates concepts from React state management, architecture, Fluent UI, reusable components, services, models, and dashboard composition.  

---

# Project Goal

Build a Microsoft-style financial dashboard capable of displaying:

* Revenue
* Expenses
* Profit
* Monthly Financial Summary
* Financial KPIs
* Status Indicators
* Financial DataGrid
* Dashboard Cards
* Service Layer
* TypeScript Models
* Enterprise Component Composition

This application follows the React Learn mental model:

> UI is derived from state and data. 

---

# Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app83-financial-dashboard -- --template react-ts

cd app83-financial-dashboard

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create Project Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\data
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\FinancialRecord.ts -ItemType File

New-Item src\services\financialService.ts -ItemType File

New-Item src\components\KpiCard.tsx -ItemType File
New-Item src\components\FinancialSummary.tsx -ItemType File
New-Item src\components\FinancialGrid.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│   ├── KpiCard.tsx
│   ├── FinancialSummary.tsx
│   └── FinancialGrid.tsx
│
├── models/
│   └── FinancialRecord.ts
│
├── services/
│   └── financialService.ts
│
├── data/
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Model Layer

## src/models/FinancialRecord.ts

```ts
export interface FinancialRecord {
  id: number;
  month: string;
  revenue: number;
  expenses: number;
}
```

---

# Service Layer

## src/services/financialService.ts

```ts
import type { FinancialRecord } from "../models/FinancialRecord";

export const financialData: FinancialRecord[] = [
  {
    id: 1,
    month: "January",
    revenue: 120000,
    expenses: 80000,
  },
  {
    id: 2,
    month: "February",
    revenue: 145000,
    expenses: 90000,
  },
  {
    id: 3,
    month: "March",
    revenue: 170000,
    expenses: 95000,
  },
  {
    id: 4,
    month: "April",
    revenue: 180000,
    expenses: 110000,
  },
];
```

---

# KPI Card Component

## src/components/KpiCard.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string;
}

export function KpiCard({
  title,
  value,
}: KpiCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{title}</Title3>

      <Text
        style={{
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {value}
      </Text>
    </Card>
  );
}
```

---

# Financial Summary Component

## src/components/FinancialSummary.tsx

```tsx
import { KpiCard } from "./KpiCard";

interface Props {
  revenue: number;
  expenses: number;
}

export function FinancialSummary({
  revenue,
  expenses,
}: Props) {

  const profit = revenue - expenses;

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
        title="Revenue"
        value={`$${revenue.toLocaleString()}`}
      />

      <KpiCard
        title="Expenses"
        value={`$${expenses.toLocaleString()}`}
      />

      <KpiCard
        title="Profit"
        value={`$${profit.toLocaleString()}`}
      />
    </div>
  );
}
```

---

# Financial Grid

## src/components/FinancialGrid.tsx

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { FinancialRecord } from "../models/FinancialRecord";

interface Props {
  records: FinancialRecord[];
}

export function FinancialGrid({
  records,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Month</TableHeaderCell>
          <TableHeaderCell>Revenue</TableHeaderCell>
          <TableHeaderCell>Expenses</TableHeaderCell>
          <TableHeaderCell>Profit</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{record.month}</TableCell>

            <TableCell>
              ${record.revenue.toLocaleString()}
            </TableCell>

            <TableCell>
              ${record.expenses.toLocaleString()}
            </TableCell>

            <TableCell>
              $
              {(
                record.revenue -
                record.expenses
              ).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

# App.tsx

```tsx
import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { FinancialSummary } from "./components/FinancialSummary";
import { FinancialGrid } from "./components/FinancialGrid";

import { financialData } from "./services/financialService";

function App() {

  const totalRevenue =
    financialData.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

  const totalExpenses =
    financialData.reduce(
      (sum, item) => sum + item.expenses,
      0
    );

  return (
    <main
      style={{
        padding: "32px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Financial Dashboard
      </Title1>

      <Text>
        Enterprise Financial Overview
      </Text>

      <div style={{ marginTop: "24px" }}>
        <FinancialSummary
          revenue={totalRevenue}
          expenses={totalExpenses}
        />
      </div>

      <Card
        style={{
          marginTop: "30px",
          padding: "20px",
        }}
      >
        <FinancialGrid
          records={financialData}
        />
      </Card>
    </main>
  );
}

export default App;
```

---

# main.tsx

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
  font-family: "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}
```

---

# Build Validation

Run locally:

```powershell
npm run dev
```

Validate production build:

```powershell
npm run build
```

Preview production version:

```powershell
npm run preview
```

---

# Create the Blog Article File

```powershell
New-Item artigo.md -ItemType File
```

---

# What This App Teaches

| Concept                | Description                                       |
| ---------------------- | ------------------------------------------------- |
| Component Composition  | Dashboard built from multiple reusable components |
| TypeScript Models      | FinancialRecord interface                         |
| Service Layer          | Financial data separated from UI                  |
| Derived Data           | Profit calculated from revenue and expenses       |
| Fluent UI Cards        | Enterprise KPI panels                             |
| Fluent UI Tables       | Financial reporting grid                          |
| React Rendering        | UI generated from data                            |
| Dashboard Architecture | Enterprise application structure                  |
| State Minimization     | Derived values instead of duplicated state        |
| Financial KPIs         | Revenue, Expenses, Profit                         |

---

# Technical Summary

| Layer          | Responsibility           |
| -------------- | ------------------------ |
| Models         | Business contracts       |
| Services       | Financial data provider  |
| Components     | Dashboard UI             |
| App            | Composition root         |
| FluentProvider | Microsoft theme          |
| React          | Rendering engine         |
| TypeScript     | Strong typing            |
| Fluent UI      | Enterprise design system |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                 | Status    |
| ------- | --- | -------------------- | --------- |
| Block 5 | 81  | Complete CRUD System | Completed |
| Block 5 | 82  | Employee Management  | Completed |
| Block 5 | 83  | Financial Dashboard  | Current   |
| Block 5 | 84  | Inventory System     | Next      |

**Current Position:** App 83 / 100 — Financial Dashboard ✅

Roadmap based on the ReactLab architecture and 100-app progression plan.  
