# App 09 — Employee Table

App 09 is **“Employee Table / Tabela de Funcionários”**, inside **Block 1 — Fundamentals and UI**. In the roadmap, it is defined as a Microsoft-style employee table focused on **tables, basic DataGrid thinking, typed data, component composition, and choosing a clean data structure**. 

## 1. PowerShell commands

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app09-employee-table -- --template react-ts
cd app09-employee-table

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\Employee.ts -ItemType File
New-Item src\data\employees.ts -ItemType File
New-Item src\components\EmployeeTable.tsx -ItemType File
```

## 2. `src\models\Employee.ts`

```ts
export type EmployeeStatus = "Active" | "On Leave" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}
```

## 3. `src\data\employees.ts`

```ts
import type { Employee } from "../models/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    department: "Operations",
    location: "New York",
    status: "Active",
  },
  {
    id: 2,
    name: "Daniel Martins",
    role: "Frontend Developer",
    department: "Engineering",
    location: "São Paulo",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "UX Designer",
    department: "Design",
    location: "London",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Data Analyst",
    department: "Business Intelligence",
    location: "Toronto",
    status: "Inactive",
  },
];
```

## 4. `src\components\EmployeeTable.tsx`

```tsx
import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";
import { employees } from "../data/employees";

function getBadgeAppearance(status: Employee["status"]) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "On Leave") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EmployeeTable() {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "32px",
      }}
    >
      <Title3>Employee Directory</Title3>

      <Table aria-label="Employee table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Employee</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar
                      name={employee.name}
                      color="colorful"
                    />
                  }
                >
                  {employee.name}
                </TableCellLayout>
              </TableCell>

              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.location}</TableCell>

              <TableCell>
                <Badge appearance={getBadgeAppearance(employee.status)}>
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

## 5. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { EmployeeTable } from "./components/EmployeeTable";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Employee Table</Title1>

        <Text>
          A static Microsoft-style employee table built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>

        <EmployeeTable />
      </section>
    </main>
  );
}

export default App;
```

## 6. `src\main.tsx`

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

## 7. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 8. Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

## What this app teaches

| Concept                     | File                             |
| --------------------------- | -------------------------------- |
| TypeScript model            | `Employee.ts`                    |
| Static data source          | `employees.ts`                   |
| Table rendering             | `EmployeeTable.tsx`              |
| List rendering with `map()` | `employees.map(...)`             |
| Stable React keys           | `key={employee.id}`              |
| Fluent UI table components  | `Table`, `TableRow`, `TableCell` |
| Visual identity             | `Avatar`, `Badge`, `Card`        |
| Root composition            | `App → EmployeeTable`            |

## Where we are

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline of Events        | Completed |
| Block 1 |  09 | Employee Table            | Current   |
| Block 1 |  10 | Email List                | Next      |
