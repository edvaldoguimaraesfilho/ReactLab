App 91 is **Report Generator** in Block 5, after App 90 Power BI Style Dashboard. The project roadmap confirms App 91 as **Gerador de Relatórios / Report Generator**. 

```powershell
cd E:\EkisReactLab\React-Fluent-100Apps

npm create vite@latest app91-report-generator -- --template react-ts

cd app91-report-generator

npm install

npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\utils -ItemType Directory

New-Item src\models\Report.ts -ItemType File
New-Item src\data\reports.ts -ItemType File
New-Item src\services\reportService.ts -ItemType File
New-Item src\components\ReportSummary.tsx -ItemType File
New-Item src\components\ReportList.tsx -ItemType File
New-Item src\components\ReportPreview.tsx -ItemType File
New-Item src\components\ReportToolbar.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# App 91 — Report Generator

## `src\models\Report.ts`

```ts
export type ReportStatus = "Draft" | "Ready" | "Published";

export interface Report {
  id: number;
  title: string;
  department: string;
  owner: string;
  status: ReportStatus;
  createdAt: string;
  records: number;
}
```

## `src\data\reports.ts`

```ts
import type { Report } from "../models/Report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Monthly Sales Report",
    department: "Sales",
    owner: "Ana Martins",
    status: "Ready",
    createdAt: "2026-06-01",
    records: 1280,
  },
  {
    id: 2,
    title: "Audit Access Report",
    department: "Compliance",
    owner: "Rob Smith",
    status: "Draft",
    createdAt: "2026-06-02",
    records: 430,
  },
  {
    id: 3,
    title: "Project Delivery Report",
    department: "PMO",
    owner: "Daniel Costa",
    status: "Published",
    createdAt: "2026-06-03",
    records: 875,
  },
];
```

## `src\services\reportService.ts`

```ts
import { reports } from "../data/reports";
import type { Report } from "../models/Report";

export function getReports(): Report[] {
  return reports;
}

export function getTotalRecords(items: Report[]): number {
  return items.reduce((total, report) => total + report.records, 0);
}

export function getReadyReports(items: Report[]): number {
  return items.filter((report) => report.status === "Ready").length;
}
```

## `src\components\ReportSummary.tsx`

```tsx
import { Card, Text, Title3 } from "@fluentui/react-components";
import type { Report } from "../models/Report";
import { getReadyReports, getTotalRecords } from "../services/reportService";

interface ReportSummaryProps {
  reports: Report[];
}

export function ReportSummary({ reports }: ReportSummaryProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      <Card>
        <Title3>{reports.length}</Title3>
        <Text>Total Reports</Text>
      </Card>

      <Card>
        <Title3>{getReadyReports(reports)}</Title3>
        <Text>Ready Reports</Text>
      </Card>

      <Card>
        <Title3>{getTotalRecords(reports)}</Title3>
        <Text>Total Records</Text>
      </Card>
    </div>
  );
}
```

## `src\components\ReportList.tsx`

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
} from "@fluentui/react-components";

import type { Report } from "../models/Report";

interface ReportListProps {
  reports: Report[];
  selectedReportId: number | null;
  onSelectReport: (report: Report) => void;
}

const columns: TableColumnDefinition<Report>[] = [
  createTableColumn<Report>({ columnId: "title" }),
  createTableColumn<Report>({ columnId: "department" }),
  createTableColumn<Report>({ columnId: "owner" }),
  createTableColumn<Report>({ columnId: "status" }),
  createTableColumn<Report>({ columnId: "records" }),
];

export function ReportList({
  reports,
  selectedReportId,
  onSelectReport,
}: ReportListProps) {
  return (
    <Card>
      <DataGrid items={reports} columns={columns}>
        <DataGridHeader>
          <DataGridRow>
            <DataGridHeaderCell>Title</DataGridHeaderCell>
            <DataGridHeaderCell>Department</DataGridHeaderCell>
            <DataGridHeaderCell>Owner</DataGridHeaderCell>
            <DataGridHeaderCell>Status</DataGridHeaderCell>
            <DataGridHeaderCell>Records</DataGridHeaderCell>
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<Report>>
          {({ item }) => (
            <DataGridRow<Report>
              key={item.id}
              onClick={() => onSelectReport(item)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedReportId === item.id ? "#eef6ff" : "transparent",
              }}
            >
              <DataGridCell>{item.title}</DataGridCell>
              <DataGridCell>{item.department}</DataGridCell>
              <DataGridCell>{item.owner}</DataGridCell>
              <DataGridCell>
                <Badge appearance="tint">{item.status}</Badge>
              </DataGridCell>
              <DataGridCell>{item.records}</DataGridCell>
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
}
```

## `src\components\ReportPreview.tsx`

```tsx
import { Card, Text, Title2, Title3 } from "@fluentui/react-components";
import type { Report } from "../models/Report";

interface ReportPreviewProps {
  report: Report | null;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  if (!report) {
    return (
      <Card>
        <Title3>No report selected</Title3>
        <Text>Select a report to preview its details.</Text>
      </Card>
    );
  }

  return (
    <Card style={{ padding: "24px" }}>
      <Title2>{report.title}</Title2>
      <Text>Department: {report.department}</Text>
      <Text>Owner: {report.owner}</Text>
      <Text>Status: {report.status}</Text>
      <Text>Created at: {report.createdAt}</Text>
      <Text>Records: {report.records}</Text>
    </Card>
  );
}
```

## `src\components\ReportToolbar.tsx`

```tsx
import { Button, Toolbar, ToolbarButton } from "@fluentui/react-components";
import {
  ArrowDownload24Regular,
  DocumentAdd24Regular,
  Print24Regular,
} from "@fluentui/react-icons";

interface ReportToolbarProps {
  onGenerate: () => void;
}

export function ReportToolbar({ onGenerate }: ReportToolbarProps) {
  return (
    <Toolbar>
      <ToolbarButton icon={<DocumentAdd24Regular />} onClick={onGenerate}>
        Generate Report
      </ToolbarButton>

      <ToolbarButton icon={<ArrowDownload24Regular />}>
        Export
      </ToolbarButton>

      <ToolbarButton icon={<Print24Regular />}>
        Print
      </ToolbarButton>

      <Button appearance="primary" onClick={onGenerate}>
        New Report
      </Button>
    </Toolbar>
  );
}
```

## `src\App.tsx`

```tsx
import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { ReportSummary } from "./components/ReportSummary";
import { ReportList } from "./components/ReportList";
import { ReportPreview } from "./components/ReportPreview";
import { ReportToolbar } from "./components/ReportToolbar";

import { getReports } from "./services/reportService";
import type { Report } from "./models/Report";

function App() {
  const [reports] = useState<Report[]>(getReports());
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  function handleGenerateReport() {
    alert("Report generation simulated successfully.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>App 91 — Report Generator</Title1>

        <Text>
          Enterprise report generation interface built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "24px" }}>
          <ReportToolbar onGenerate={handleGenerateReport} />
        </div>

        <div style={{ marginTop: "24px" }}>
          <ReportSummary reports={reports} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          <ReportList
            reports={reports}
            selectedReportId={selectedReport?.id ?? null}
            onSelectReport={setSelectedReport}
          />

          <ReportPreview report={selectedReport} />
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

Run:

```powershell
npm run dev
npm run build
npm run preview
```

## Technical Summary

| Concept               | App 91 Usage                         |
| --------------------- | ------------------------------------ |
| `useState`            | Stores selected report               |
| TypeScript models     | Defines report structure             |
| Service layer         | Calculates totals and report metrics |
| DataGrid              | Displays enterprise report list      |
| Toolbar               | Simulates report actions             |
| Derived data          | Total records and ready reports      |
| Conditional rendering | Shows preview only when selected     |
| Fluent UI             | Microsoft-style enterprise interface |

## Official Documentation

| Topic                    | Link                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| React Learn              | [https://react.dev/learn](https://react.dev/learn)                                                                                   |
| Managing State           | [https://react.dev/learn/managing-state](https://react.dev/learn/managing-state)                                                     |
| Choosing State Structure | [https://react.dev/learn/choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)                         |
| Fluent UI React          | [https://react.fluentui.dev](https://react.fluentui.dev)                                                                             |
| Fluent UI DataGrid       | [https://react.fluentui.dev/?path=/docs/components-datagrid--docs](https://react.fluentui.dev/?path=/docs/components-datagrid--docs) |
| Vite                     | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                                   |
| TypeScript               | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                         |

## Current Project Progress

| Block   | App | Name                     | Status    |
| ------- | --: | ------------------------ | --------- |
| Block 5 |  81 | Complete CRUD System     | Completed |
| Block 5 |  82 | Employee Management      | Completed |
| Block 5 |  83 | Financial Dashboard      | Completed |
| Block 5 |  84 | Inventory System         | Completed |
| Block 5 |  85 | Kanban Board             | Completed |
| Block 5 |  86 | Enterprise Task Manager  | Completed |
| Block 5 |  87 | User System              | Completed |
| Block 5 |  88 | Administrative Portal    | Completed |
| Block 5 |  89 | Ticket System            | Completed |
| Block 5 |  90 | Power BI Style Dashboard | Completed |
| Block 5 |  91 | Report Generator         | Current   |
| Block 5 |  92 | Audit System             | Next      |
