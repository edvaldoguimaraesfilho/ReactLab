# App 92 — Audit System

**Block 5 — Complete Applications**
**React + TypeScript + Fluent UI + Enterprise Architecture**

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app92-audit-system -- --template react-ts

cd app92-audit-system

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create the project structure:

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\data
mkdir src\styles

New-Item src\models\AuditRecord.ts -ItemType File
New-Item src\data\auditData.ts -ItemType File
New-Item src\services\auditService.ts -ItemType File
New-Item src\components\AuditSummary.tsx -ItemType File
New-Item src\components\AuditFilters.tsx -ItemType File
New-Item src\components\AuditGrid.tsx -ItemType File
New-Item src\App.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Project Goal

App 92 simulates an **Enterprise Audit System** similar to what administrators see in:

* Microsoft 365 Administration
* SharePoint Audit Reports
* Security Centers
* Compliance Portals
* Governance Dashboards
* Enterprise Monitoring Systems

The application demonstrates:

* Enterprise DataGrid
* Audit records
* Filtering
* Search
* Status indicators
* Summary cards
* Layered architecture
* TypeScript models
* Fluent UI dashboards

This application is highly relevant because audit systems are common in:

* SharePoint
* Microsoft 365
* Purview
* Security Operations
* Governance Teams
* Compliance Teams

---

# Architecture

```txt
src/
|
+-- components/
|     AuditGrid.tsx
|     AuditSummary.tsx
|     AuditFilters.tsx
|
+-- models/
|     AuditRecord.ts
|
+-- services/
|     auditService.ts
|
+-- data/
|     auditData.ts
|
+-- App.tsx
```

---

# Audit Model

## src/models/AuditRecord.ts

```ts
export interface AuditRecord {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  severity: "Low" | "Medium" | "High";
  status: "Success" | "Warning" | "Failed";
}
```

---

# Mock Data

## src/data/auditData.ts

```ts
import type { AuditRecord } from "../models/AuditRecord";

export const auditData: AuditRecord[] = [
  {
    id: 1,
    timestamp: "2026-06-01 08:30",
    user: "admin@company.com",
    action: "User Created",
    resource: "Employee Portal",
    severity: "Low",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2026-06-01 10:15",
    user: "security@company.com",
    action: "Permission Changed",
    resource: "Finance Site",
    severity: "High",
    status: "Warning",
  },
  {
    id: 3,
    timestamp: "2026-06-01 11:45",
    user: "john@company.com",
    action: "File Deleted",
    resource: "HR Documents",
    severity: "High",
    status: "Failed",
  },
];
```

---

# Service Layer

## src/services/auditService.ts

```ts
import { auditData } from "../data/auditData";

export function getAuditRecords() {
  return auditData;
}
```

---

# Summary Dashboard

## src/components/AuditSummary.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface AuditSummaryProps {
  total: number;
  warnings: number;
  failures: number;
}

export function AuditSummary({
  total,
  warnings,
  failures,
}: AuditSummaryProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <Card>
        <Title3>Total Events</Title3>
        <Text>{total}</Text>
      </Card>

      <Card>
        <Title3>Warnings</Title3>
        <Text>{warnings}</Text>
      </Card>

      <Card>
        <Title3>Failures</Title3>
        <Text>{failures}</Text>
      </Card>
    </div>
  );
}
```

---

# Filters

## src/components/AuditFilters.tsx

```tsx
import {
  Input,
} from "@fluentui/react-components";

interface AuditFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function AuditFilters({
  search,
  onSearchChange,
}: AuditFiltersProps) {
  return (
    <Input
      placeholder="Search audits..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}
```

---

# Audit DataGrid

## src/components/AuditGrid.tsx

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
  createTableColumn,
} from "@fluentui/react-components";

import type { AuditRecord } from "../models/AuditRecord";

const columns = [
  createTableColumn<AuditRecord>({
    columnId: "timestamp",
  }),
  createTableColumn<AuditRecord>({
    columnId: "user",
  }),
  createTableColumn<AuditRecord>({
    columnId: "action",
  }),
  createTableColumn<AuditRecord>({
    columnId: "resource",
  }),
  createTableColumn<AuditRecord>({
    columnId: "severity",
  }),
  createTableColumn<AuditRecord>({
    columnId: "status",
  }),
];

interface AuditGridProps {
  items: AuditRecord[];
}

export function AuditGrid({
  items,
}: AuditGridProps) {
  return (
    <Card>
      <DataGrid
        items={items}
        columns={columns}
      >
        <DataGridHeader>
          <DataGridRow>
            <DataGridHeaderCell>Timestamp</DataGridHeaderCell>
            <DataGridHeaderCell>User</DataGridHeaderCell>
            <DataGridHeaderCell>Action</DataGridHeaderCell>
            <DataGridHeaderCell>Resource</DataGridHeaderCell>
            <DataGridHeaderCell>Severity</DataGridHeaderCell>
            <DataGridHeaderCell>Status</DataGridHeaderCell>
          </DataGridRow>
        </DataGridHeader>

        <DataGridBody<AuditRecord>>
          {({ item }) => (
            <DataGridRow<AuditRecord> key={item.id}>
              <DataGridCell>{item.timestamp}</DataGridCell>
              <DataGridCell>{item.user}</DataGridCell>
              <DataGridCell>{item.action}</DataGridCell>
              <DataGridCell>{item.resource}</DataGridCell>
              <DataGridCell>{item.severity}</DataGridCell>
              <DataGridCell>
                <Badge>
                  {item.status}
                </Badge>
              </DataGridCell>
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </Card>
  );
}
```

---

# App.tsx

```tsx
import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { AuditSummary } from "./components/AuditSummary";
import { AuditFilters } from "./components/AuditFilters";
import { AuditGrid } from "./components/AuditGrid";

import { getAuditRecords } from "./services/auditService";

function App() {
  const [search, setSearch] = useState("");

  const audits = getAuditRecords();

  const filteredAudits = useMemo(() => {
    return audits.filter(
      (audit) =>
        audit.user
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        audit.action
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [audits, search]);

  const warnings = filteredAudits.filter(
    (x) => x.status === "Warning"
  ).length;

  const failures = filteredAudits.filter(
    (x) => x.status === "Failed"
  ).length;

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
        }}
      >
        <Title1>
          Enterprise Audit System
        </Title1>

        <AuditSummary
          total={filteredAudits.length}
          warnings={warnings}
          failures={failures}
        />

        <AuditFilters
          search={search}
          onSearchChange={setSearch}
        />

        <br />

        <AuditGrid
          items={filteredAudits}
        />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# React Learn Concepts

This application reinforces:

| Concept               | Usage                                 |
| --------------------- | ------------------------------------- |
| Component Composition | AuditSummary, AuditGrid, AuditFilters |
| useState              | Search state                          |
| useMemo               | Filter optimization                   |
| Derived State         | Totals, warnings, failures            |
| DataGrid              | Enterprise table rendering            |
| Layered Architecture  | Service layer                         |
| TypeScript Models     | Strong typing                         |
| Fluent UI             | Microsoft design system               |

---

# Technical Summary

| Area               | Implementation                 |
| ------------------ | ------------------------------ |
| UI Framework       | React                          |
| Language           | TypeScript                     |
| Design System      | Fluent UI                      |
| Data Source        | Mock Service Layer             |
| Grid               | Fluent UI DataGrid             |
| Search             | Client-side filtering          |
| Dashboard          | Summary Cards                  |
| Architecture       | Components + Services + Models |
| Optimization       | useMemo                        |
| Enterprise Pattern | Audit Monitoring               |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)
* [Fluent UI React Components](https://react.fluentui.dev?utm_source=chatgpt.com)
* [Fluent UI DataGrid](https://react.fluentui.dev/?path=%2Fdocs%2Fcomponents-datagrid--docs&utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                       | Status    |
| ------- | --- | -------------------------- | --------- |
| Block 5 | 91  | Report Generator           | Completed |
| Block 5 | 92  | Audit System               | Current   |
| Block 5 | 93  | SharePoint Inspired Portal | Next      |

### Apps Remaining

* App 93 — SharePoint Inspired Portal
* App 94 — Corporate Catalog
* App 95 — Reservation System
* App 96 — Mini Enterprise ERP
* App 97 — Complete CRM
* App 98 — Analytics System
* App 99 — Microsoft Style Admin Center
* App 100 — Final React Enterprise Platform

**Current Position:** App 92 / 100 ✅
**Next Milestone:** App 93 — SharePoint Inspired Portal.
