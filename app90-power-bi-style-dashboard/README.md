# App 90 — Dashboard Power BI Style

App 90 is **Dashboard Power BI Style**, part of **Block 5 — Complete Applications** in the React + Fluent UI roadmap. 

```powershell
cd E:\EkisReactLab\React-Fluent-100Apps

npm create vite@latest app90-power-bi-style-dashboard -- --template react-ts

cd app90-power-bi-style-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\DashboardMetric.ts -ItemType File
New-Item src\models\SalesRecord.ts -ItemType File
New-Item src\data\dashboardData.ts -ItemType File
New-Item src\components\KpiCard.tsx -ItemType File
New-Item src\components\SalesTable.tsx -ItemType File
New-Item src\components\DashboardSummary.tsx -ItemType File
New-Item src\components\RegionPanel.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## Structure

```txt
app90-power-bi-style-dashboard/
  src/
    components/
      DashboardSummary.tsx
      KpiCard.tsx
      RegionPanel.tsx
      SalesTable.tsx
    data/
      dashboardData.ts
    models/
      DashboardMetric.ts
      SalesRecord.ts
    styles/
    App.tsx
    main.tsx
    index.css
  artigo.md
```

## `src\models\DashboardMetric.ts`

```ts
export interface DashboardMetric {
  id: number;
  title: string;
  value: string;
  variation: string;
  status: "positive" | "negative" | "neutral";
}
```

## `src\models\SalesRecord.ts`

```ts
export interface SalesRecord {
  id: number;
  region: string;
  revenue: number;
  target: number;
  customers: number;
  status: "Above Target" | "Below Target";
}
```

## `src\data\dashboardData.ts`

```ts
import type { DashboardMetric } from "../models/DashboardMetric";
import type { SalesRecord } from "../models/SalesRecord";

export const metrics: DashboardMetric[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$842,500",
    variation: "+12.4%",
    status: "positive",
  },
  {
    id: 2,
    title: "Active Customers",
    value: "18,240",
    variation: "+8.1%",
    status: "positive",
  },
  {
    id: 3,
    title: "Operating Cost",
    value: "$214,900",
    variation: "-3.2%",
    status: "positive",
  },
  {
    id: 4,
    title: "Pending Orders",
    value: "326",
    variation: "+5.7%",
    status: "negative",
  },
];

export const salesRecords: SalesRecord[] = [
  {
    id: 1,
    region: "North America",
    revenue: 320000,
    target: 280000,
    customers: 7200,
    status: "Above Target",
  },
  {
    id: 2,
    region: "Europe",
    revenue: 245000,
    target: 260000,
    customers: 5100,
    status: "Below Target",
  },
  {
    id: 3,
    region: "Latin America",
    revenue: 178000,
    target: 150000,
    customers: 3400,
    status: "Above Target",
  },
  {
    id: 4,
    region: "Asia Pacific",
    revenue: 99500,
    target: 120000,
    customers: 2540,
    status: "Below Target",
  },
];
```

## `src\components\KpiCard.tsx`

```tsx
import {
  Badge,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  ArrowTrending24Regular,
  Money24Regular,
} from "@fluentui/react-icons";

import type { DashboardMetric } from "../models/DashboardMetric";

interface KpiCardProps {
  metric: DashboardMetric;
}

export function KpiCard({ metric }: KpiCardProps) {
  const badgeAppearance =
    metric.status === "positive"
      ? "filled"
      : metric.status === "negative"
      ? "outline"
      : "tint";

  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Money24Regular />
        <Badge appearance={badgeAppearance}>{metric.variation}</Badge>
      </div>

      <Text size={300}>{metric.title}</Text>

      <Title3>{metric.value}</Title3>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <ArrowTrending24Regular />
        <Text size={200}>Compared with previous period</Text>
      </div>
    </Card>
  );
}
```

## `src\components\DashboardSummary.tsx`

```tsx
import { metrics } from "../data/dashboardData";
import { KpiCard } from "./KpiCard";

export function DashboardSummary() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {metrics.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}
```

## `src\components\RegionPanel.tsx`

```tsx
import {
  Card,
  ProgressBar,
  Text,
  Title3,
} from "@fluentui/react-components";

import { salesRecords } from "../data/dashboardData";

export function RegionPanel() {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>Regional Target Performance</Title3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "20px",
        }}
      >
        {salesRecords.map((record) => {
          const progress = record.revenue / record.target;

          return (
            <div key={record.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <Text weight="semibold">{record.region}</Text>
                <Text>{Math.round(progress * 100)}%</Text>
              </div>

              <ProgressBar value={Math.min(progress, 1)} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
```

## `src\components\SalesTable.tsx`

```tsx
import {
  Badge,
  Card,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableColumnDefinition,
  createTableColumn,
  Title3,
} from "@fluentui/react-components";

import { salesRecords } from "../data/dashboardData";
import type { SalesRecord } from "../models/SalesRecord";

const columns: TableColumnDefinition<SalesRecord>[] = [
  createTableColumn<SalesRecord>({
    columnId: "region",
    renderHeaderCell: () => "Region",
    renderCell: (item) => item.region,
  }),
  createTableColumn<SalesRecord>({
    columnId: "revenue",
    renderHeaderCell: () => "Revenue",
    renderCell: (item) => `$${item.revenue.toLocaleString()}`,
  }),
  createTableColumn<SalesRecord>({
    columnId: "target",
    renderHeaderCell: () => "Target",
    renderCell: (item) => `$${item.target.toLocaleString()}`,
  }),
  createTableColumn<SalesRecord>({
    columnId: "customers",
    renderHeaderCell: () => "Customers",
    renderCell: (item) => item.customers.toLocaleString(),
  }),
  createTableColumn<SalesRecord>({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge appearance={item.status === "Above Target" ? "filled" : "outline"}>
        {item.status}
      </Badge>
    ),
  }),
];

export function SalesTable() {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>Sales by Region</Title3>

      <DataGrid
        items={salesRecords}
        columns={columns}
        getRowId={(item) => item.id}
        style={{ marginTop: "20px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<SalesRecord>>
          {({ item, rowId }) => (
            <DataGridRow<SalesRecord> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
}
```

## `src\App.tsx`

```tsx
import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { DashboardSummary } from "./components/DashboardSummary";
import { RegionPanel } from "./components/RegionPanel";
import { SalesTable } from "./components/SalesTable";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f2f1",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Card style={{ padding: "28px" }}>
          <Title1>Power BI Style Dashboard</Title1>
          <Text>
            Enterprise analytics dashboard built with React, TypeScript,
            Vite, and Fluent UI.
          </Text>
        </Card>

        <DashboardSummary />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 420px) 1fr",
            gap: "24px",
          }}
        >
          <RegionPanel />
          <SalesTable />
        </div>
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
```

## Build

```powershell
npm run build
```

## Preview

```powershell
npm run preview
```

# Technical Explanation

This application simulates a Power BI-style analytical dashboard using React and Fluent UI. The dashboard is composed of KPI cards, regional progress indicators, and a DataGrid table.

The important React idea is:

```txt
data → components → UI
```

The dashboard does not manually create visual elements one by one. Instead, it stores structured data in `dashboardData.ts`, maps that data into components, and lets React render the interface.

There is no `useEffect` because this version does not call an API. There is also no `useState` because the dashboard is static. That is correct React thinking: do not add state or effects unless the application needs them.

# Technical Summary

| Concept                | Where                                  |
| ---------------------- | -------------------------------------- |
| Static analytics data  | `dashboardData.ts`                     |
| TypeScript models      | `DashboardMetric.ts`, `SalesRecord.ts` |
| KPI cards              | `KpiCard.tsx`                          |
| Data-driven rendering  | `DashboardSummary.tsx`                 |
| Progress indicators    | `RegionPanel.tsx`                      |
| Enterprise table       | `SalesTable.tsx`                       |
| Fluent UI DataGrid     | `SalesTable.tsx`                       |
| Microsoft-style layout | `App.tsx`                              |
| FluentProvider         | `main.tsx`                             |

# Official Documentation

| Topic              | Link                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| React Learn        | [https://react.dev/learn](https://react.dev/learn)                                                                                   |
| Thinking in React  | [https://react.dev/learn/thinking-in-react](https://react.dev/learn/thinking-in-react)                                               |
| Rendering Lists    | [https://react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)                                                   |
| TypeScript Docs    | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                         |
| Vite Guide         | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                                   |
| Fluent UI React    | [https://react.fluentui.dev/](https://react.fluentui.dev/)                                                                           |
| Fluent UI DataGrid | [https://react.fluentui.dev/?path=/docs/components-datagrid--docs](https://react.fluentui.dev/?path=/docs/components-datagrid--docs) |
| Power BI Learn     | [https://learn.microsoft.com/en-us/power-bi/](https://learn.microsoft.com/en-us/power-bi/)                                           |

# Where We Are

| Block   | App | Name                     | Status    |
| ------- | --: | ------------------------ | --------- |
| Block 5 |  81 | Complete CRUD System     | Completed |
| Block 5 |  82 | Employee Management      | Completed |
| Block 5 |  83 | Financial Dashboard      | Completed |
| Block 5 |  84 | Inventory System         | Completed |
| Block 5 |  85 | Kanban Board             | Completed |
| Block 5 |  86 | Enterprise Task Manager  | Completed |
| Block 5 |  87 | User Management System   | Completed |
| Block 5 |  88 | Administrative Portal    | Completed |
| Block 5 |  89 | Ticket System            | Completed |
| Block 5 |  90 | Power BI Style Dashboard | Current   |
| Block 5 |  91 | Report Generator         | Next      |
