# App 77 — Reporting System

**Block 4 — Effects and Architecture**
**App 77:** Reporting System 

## Objective

Build a professional **Reporting System Dashboard** using:

* React
* TypeScript
* Vite
* Fluent UI
* useEffect
* useMemo
* Service Layer
* Data Filtering
* Report Aggregation
* Enterprise Architecture

This application simulates a corporate reporting platform where users can:

* View reports
* Filter reports by category
* View report statistics
* Generate summary dashboards
* Practice derived state
* Practice architecture separation

The focus is learning how enterprise applications organize:

```txt
Data
→ Services
→ Components
→ Reports
→ Dashboard
→ Analytics
```

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app77-reporting-system -- --template react-ts

cd app77-reporting-system

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\data
mkdir src\styles
```

---

# Create Files

```powershell
New-Item src\models\Report.ts -ItemType File

New-Item src\data\reports.ts -ItemType File

New-Item src\services\reportService.ts -ItemType File

New-Item src\components\ReportSummary.tsx -ItemType File
New-Item src\components\ReportFilter.tsx -ItemType File
New-Item src\components\ReportGrid.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│   ├── ReportFilter.tsx
│   ├── ReportGrid.tsx
│   └── ReportSummary.tsx
│
├── data/
│   └── reports.ts
│
├── models/
│   └── Report.ts
│
├── services/
│   └── reportService.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Model

## src/models/Report.ts

```ts
export interface Report {
  id: number;
  title: string;
  category: string;
  owner: string;
  views: number;
}
```

---

# Mock Data

## src/data/reports.ts

```ts
import type { Report } from "../models/Report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Financial Dashboard",
    category: "Finance",
    owner: "Ana",
    views: 1250,
  },
  {
    id: 2,
    title: "Sales Performance",
    category: "Sales",
    owner: "Carlos",
    views: 890,
  },
  {
    id: 3,
    title: "HR Metrics",
    category: "HR",
    owner: "Maria",
    views: 540,
  },
  {
    id: 4,
    title: "Inventory Status",
    category: "Operations",
    owner: "Pedro",
    views: 670,
  },
  {
    id: 5,
    title: "Budget Analysis",
    category: "Finance",
    owner: "Ana",
    views: 980,
  },
];
```

---

# Service Layer

## src/services/reportService.ts

```ts
import { reports } from "../data/reports";

export async function getReports() {
  return Promise.resolve(reports);
}
```

---

# Report Filter

## src/components/ReportFilter.tsx

```tsx
import { Dropdown, Option } from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ReportFilter({
  value,
  onChange,
}: Props) {
  return (
    <Dropdown
      placeholder="Select category"
      value={value}
      selectedOptions={value ? [value] : []}
      onOptionSelect={(_, data) =>
        onChange(data.optionValue ?? "")
      }
    >
      <Option value="">All</Option>
      <Option value="Finance">Finance</Option>
      <Option value="Sales">Sales</Option>
      <Option value="HR">HR</Option>
      <Option value="Operations">Operations</Option>
    </Dropdown>
  );
}
```

---

# Report Summary

## src/components/ReportSummary.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalReports: number;
  totalViews: number;
}

export function ReportSummary({
  totalReports,
  totalViews,
}: Props) {
  return (
    <Card
      style={{
        padding: 20,
        marginBottom: 20,
      }}
    >
      <Title3>Reporting Overview</Title3>

      <Text block>
        Reports: {totalReports}
      </Text>

      <Text block>
        Total Views: {totalViews}
      </Text>
    </Card>
  );
}
```

---

# Report Grid

## src/components/ReportGrid.tsx

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Report } from "../models/Report";

interface Props {
  reports: Report[];
}

export function ReportGrid({
  reports,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Report</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Owner</TableHeaderCell>
          <TableHeaderCell>Views</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.title}</TableCell>
            <TableCell>{report.category}</TableCell>
            <TableCell>{report.owner}</TableCell>
            <TableCell>{report.views}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

# App Component

## src/App.tsx

```tsx
import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Title1,
} from "@fluentui/react-components";

import { getReports } from "./services/reportService";

import { ReportFilter } from "./components/ReportFilter";
import { ReportGrid } from "./components/ReportGrid";
import { ReportSummary } from "./components/ReportSummary";

import type { Report } from "./models/Report";

function App() {
  const [reports, setReports] =
    useState<Report[]>([]);

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    getReports().then(setReports);
  }, []);

  const filteredReports = useMemo(() => {
    if (!category) {
      return reports;
    }

    return reports.filter(
      (report) => report.category === category
    );
  }, [reports, category]);

  const totalViews = useMemo(() => {
    return filteredReports.reduce(
      (sum, report) => sum + report.views,
      0
    );
  }, [filteredReports]);

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <Title1>
        Reporting System
      </Title1>

      <Card
        style={{
          padding: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <ReportFilter
          value={category}
          onChange={setCategory}
        />
      </Card>

      <ReportSummary
        totalReports={filteredReports.length}
        totalViews={totalViews}
      />

      <ReportGrid
        reports={filteredReports}
      />
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
  background: #f3f2f1;
}

* {
  box-sizing: border-box;
}
```

---

# Validate

Development:

```powershell
npm run dev
```

Production Build:

```powershell
npm run build
```

---

# React Learn Concepts

This application practices:

| Concept               | Usage                |
| --------------------- | -------------------- |
| useEffect             | Load reports         |
| useState              | Manage filters       |
| useMemo               | Aggregate statistics |
| Derived State         | Filtered reports     |
| Service Layer         | reportService        |
| Component Composition | Dashboard layout     |
| Fluent UI             | Enterprise interface |

Based on the React Learn architecture roadmap. 

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                  | Status    |
| ------- | --- | --------------------- | --------- |
| Block 4 | 74  | Crypto Monitor        | Completed |
| Block 4 | 75  | Repository Explorer   | Completed |
| Block 4 | 76  | Log Viewer Dashboard  | Completed |
| Block 4 | 77  | Reporting System      | Current   |
| Block 4 | 78  | Performance Simulator | Next      |

**Current App:** 77/100
**Current Block:** Block 4 — Effects and Architecture
**Next App:** 78 — Performance Simulator 🚀
