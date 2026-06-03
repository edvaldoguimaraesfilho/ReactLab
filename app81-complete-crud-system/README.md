# App 81 — Complete CRUD System

App 81 is the first application in **Block 5 — Complete Applications**. According to the roadmap, App 81 is **Complete CRUD System**, whose objective is to consolidate everything learned so far: React, TypeScript, Fluent UI, forms, state management, reusable components, enterprise architecture, filtering, editing, and deleting records. 0file1L127-L149 

This application will simulate a **Corporate Employee Management System** with:

* Create Employee
* Read Employee List
* Update Employee
* Delete Employee
* Search Employees
* Fluent UI Data Presentation
* TypeScript Models
* Enterprise Folder Structure
* Microsoft-style UI

---

# React Learn Concepts

This application reinforces:

* Thinking in React
* Sharing State Between Components
* Updating Arrays in State
* Choosing the State Structure
* Controlled Forms
* Component Composition
* Derived State

Reference:

[Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)

---

# Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app81-complete-crud-system -- --template react-ts

cd app81-complete-crud-system

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Employee.ts -ItemType File
New-Item src\components\EmployeeForm.tsx -ItemType File
New-Item src\components\EmployeeList.tsx -ItemType File
New-Item src\data\initialEmployees.ts -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│   ├── EmployeeForm.tsx
│   └── EmployeeList.tsx
│
├── models/
│   └── Employee.ts
│
├── data/
│   └── initialEmployees.ts
│
├── services/
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Employee Model

## src/models/Employee.ts

```ts
export interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}
```

---

# Mock Data

## src/data/initialEmployees.ts

```ts
import type { Employee } from "../models/Employee";

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    department: "IT",
    email: "john@company.com",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    department: "HR",
    email: "sarah@company.com",
  },
];
```

---

# Employee Form

## src/components/EmployeeForm.tsx

```tsx
import { useState } from "react";

import {
  Button,
  Field,
  Input,
  Card,
  Title2,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  onSave: (employee: Employee) => void;
}

export function EmployeeForm({ onSave }: Props) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (!name || !department || !email) return;

    onSave({
      id: Date.now(),
      name,
      department,
      email,
    });

    setName("");
    setDepartment("");
    setEmail("");
  }

  return (
    <Card
      style={{
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <Title2>Add Employee</Title2>

      <Field label="Name">
        <Input
          value={name}
          onChange={(_, data) => setName(data.value)}
        />
      </Field>

      <Field label="Department">
        <Input
          value={department}
          onChange={(_, data) => setDepartment(data.value)}
        />
      </Field>

      <Field label="Email">
        <Input
          value={email}
          onChange={(_, data) => setEmail(data.value)}
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Save Employee
      </Button>
    </Card>
  );
}
```

---

# Employee List

## src/components/EmployeeList.tsx

```tsx
import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
  onDelete: (id: number) => void;
}

export function EmployeeList({
  employees,
  onDelete,
}: Props) {
  return (
    <>
      {employees.map((employee) => (
        <Card
          key={employee.id}
          style={{
            marginBottom: "16px",
            padding: "16px",
          }}
        >
          <Title3>{employee.name}</Title3>

          <Text>
            Department: {employee.department}
          </Text>

          <br />

          <Text>
            Email: {employee.email}
          </Text>

          <br />
          <br />

          <Button
            appearance="secondary"
            onClick={() => onDelete(employee.id)}
          >
            Delete
          </Button>
        </Card>
      ))}
    </>
  );
}
```

---

# App Component

## src/App.tsx

```tsx
import { useMemo, useState } from "react";

import {
  Input,
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeList } from "./components/EmployeeList";

import { initialEmployees } from "./data/initialEmployees";

import type { Employee } from "./models/Employee";

function App() {
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [search, setSearch] = useState("");

  function addEmployee(employee: Employee) {
    setEmployees((previous) => [
      ...previous,
      employee,
    ]);
  }

  function deleteEmployee(id: number) {
    setEmployees((previous) =>
      previous.filter((x) => x.id !== id)
    );
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [employees, search]);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "32px",
        }}
      >
        <Title1>
          Employee CRUD System
        </Title1>

        <EmployeeForm onSave={addEmployee} />

        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(_, data) =>
            setSearch(data.value)
          }
        />

        <br />
        <br />

        <EmployeeList
          employees={filteredEmployees}
          onDelete={deleteEmployee}
        />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# index.css

```css
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# Run the Application

Development:

```powershell
npm run dev
```

Validate production build:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# Architecture Learned

```txt
App
│
├── EmployeeForm
│
├── EmployeeList
│
├── Employee Model
│
└── Employee Data
```

This is the same architecture that will later evolve into:

```txt
REST API
→ Service Layer
→ CRUD Operations
→ Context API
→ DataGrid
→ Enterprise Dashboard
```

---

# Technical Summary

| Concept               | Usage                |
| --------------------- | -------------------- |
| useState              | Employee storage     |
| useMemo               | Search optimization  |
| Controlled Inputs     | Form fields          |
| CRUD                  | Create, Read, Delete |
| TypeScript Interface  | Employee model       |
| Fluent UI             | Enterprise UI        |
| Component Composition | Form + List          |
| Derived State         | Filtered employees   |
| Immutable Updates     | Array manipulation   |
| React Learn           | Thinking in React    |

---

# Official Documentation

### React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

### Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Input](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/input)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                            | Status     |
| ------- | --- | ------------------------------- | ---------- |
| Block 4 | 77  | Reporting System                | Completed  |
| Block 4 | 78  | Performance Simulator           | Completed  |
| Block 4 | 79  | Layered Architecture            | Completed  |
| Block 4 | 80  | Mini Framework React Enterprise | Completed  |
| Block 5 | 81  | Complete CRUD System            | Current    |
| Block 5 | 82  | Employee Management System      | Next       |
| Block 5 | 83  | Financial Dashboard             | Upcoming   |
| Block 5 | 84  | Inventory System                | Upcoming   |
| Block 5 | 85  | Kanban Board                    | Upcoming   |
| Block 5 | 86  | Enterprise Task Manager         | Upcoming   |
| Block 5 | 87  | User Management System          | Upcoming   |
| Block 5 | 88  | Administrative Portal           | Upcoming   |
| Block 5 | 89  | Ticket System                   | Upcoming   |
| Block 5 | 90  | Power BI Style Dashboard        | Upcoming   |
| Block 5 | 91  | Report Generator                | Upcoming   |
| Block 5 | 92  | Audit System                    | Upcoming   |
| Block 5 | 93  | SharePoint Inspired Portal      | Upcoming   |
| Block 5 | 94  | Corporate Catalog               | Upcoming   |
| Block 5 | 95  | Reservation System              | Upcoming   |
| Block 5 | 96  | Mini ERP Enterprise             | Upcoming   |
| Block 5 | 97  | Complete CRM                    | Upcoming   |
| Block 5 | 98  | Analytics System                | Upcoming   |
| Block 5 | 99  | Microsoft Admin Center Style    | Upcoming   |
| Block 5 | 100 | React Enterprise Platform Final | Final Goal |
