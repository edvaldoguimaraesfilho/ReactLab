# App 79 — Layered Architecture

App 79 belongs to **Block 4 — Effects and Architecture** and is officially defined as **"Layered Architecture"** in the ReactLab roadmap. The goal is to consolidate everything learned so far and organize a React application using a professional enterprise architecture pattern with clear separation of responsibilities. 

---

# Application Goal

Build a **Corporate Employee Directory** using:

* React
* TypeScript
* Vite
* Fluent UI
* Layered Architecture
* Service Layer
* Model Layer
* Component Layer
* Custom Hooks
* API Abstraction
* Enterprise Folder Structure

This application demonstrates how large React applications should be organized before reaching App 80 (Mini Framework React Enterprise).

---

# React Learn Concepts

This application reinforces:

* Thinking in React
* Synchronizing with Effects
* Reusing Logic with Custom Hooks
* Separating UI from Data Access
* Avoiding Business Logic inside Components

Official React references:

* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app79-layered-architecture -- --template react-ts

cd app79-layered-architecture

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\pages -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Employee.ts -ItemType File
New-Item src\services\employeeService.ts -ItemType File
New-Item src\hooks\useEmployees.ts -ItemType File
New-Item src\components\EmployeeCard.tsx -ItemType File
New-Item src\pages\EmployeeDirectoryPage.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│     EmployeeCard.tsx
│
├── hooks/
│     useEmployees.ts
│
├── models/
│     Employee.ts
│
├── pages/
│     EmployeeDirectoryPage.tsx
│
├── services/
│     employeeService.ts
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

# Layer 1 — Model

## Employee.ts

```ts
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}
```

The model layer defines the shape of the data.

Responsibilities:

* Type safety
* Data contracts
* Predictable structures
* Shared definitions

---

# Layer 2 — Service

## employeeService.ts

```ts
import type { Employee } from "../models/Employee";

export async function getEmployees(): Promise<Employee[]> {
  return Promise.resolve([
    {
      id: 1,
      name: "John Carter",
      role: "Software Engineer",
      department: "Technology",
    },
    {
      id: 2,
      name: "Mary Johnson",
      role: "Project Manager",
      department: "Operations",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Business Analyst",
      department: "Strategy",
    },
  ]);
}
```

The service layer hides data access details.

Future evolution:

```txt
Today:
UI → Service → Mock Data

Later:
UI → Service → REST API

Later:
UI → Service → Graph API

Later:
UI → Service → SharePoint API
```

---

# Layer 3 — Custom Hook

## useEmployees.ts

```ts
import { useEffect, useState } from "react";

import type { Employee } from "../models/Employee";

import { getEmployees } from "../services/employeeService";

export function useEmployees() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getEmployees();

      setEmployees(data);
      setLoading(false);
    }

    loadData();
  }, []);

  return {
    employees,
    loading,
  };
}
```

Responsibilities:

* State management
* Loading management
* Effect isolation
* Reusable business logic

---

# Layer 4 — UI Component

## EmployeeCard.tsx

```tsx
import {
  Body1,
  Card,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  employee: Employee;
}

export function EmployeeCard({
  employee,
}: Props) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{employee.name}</Title3>

      <Body1>
        {employee.role}
      </Body1>

      <Body1>
        {employee.department}
      </Body1>
    </Card>
  );
}
```

Responsibilities:

* Rendering only
* No API calls
* No business logic
* Pure component

---

# Layer 5 — Page

## EmployeeDirectoryPage.tsx

```tsx
import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { EmployeeCard }
  from "../components/EmployeeCard";

import { useEmployees }
  from "../hooks/useEmployees";

export function EmployeeDirectoryPage() {
  const {
    employees,
    loading,
  } = useEmployees();

  if (loading) {
    return <Spinner label="Loading employees..." />;
  }

  return (
    <>
      <Title1>
        Employee Directory
      </Title1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
          />
        ))}
      </div>
    </>
  );
}
```

The page coordinates everything.

Responsibilities:

* Composition
* Layout
* High-level orchestration

---

# App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  EmployeeDirectoryPage,
} from "./pages/EmployeeDirectoryPage";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: "40px",
        }}
      >
        <EmployeeDirectoryPage />
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

# Why This Architecture Matters

Without layers:

```txt
App.tsx
 ├─ API Calls
 ├─ State
 ├─ Components
 ├─ Business Logic
 ├─ Validation
 ├─ Rendering
 └─ Styling
```

Everything becomes a giant file.

With layers:

```txt
Model
  ↓
Service
  ↓
Hook
  ↓
Page
  ↓
Component
```

Each file has exactly one responsibility.

---

# Enterprise Benefits

| Layer      | Responsibility    |
| ---------- | ----------------- |
| Models     | Data contracts    |
| Services   | Data access       |
| Hooks      | Reusable logic    |
| Components | Rendering         |
| Pages      | Composition       |
| App        | Application shell |

---

# Technical Summary

| Concept         | Purpose                  |
| --------------- | ------------------------ |
| Model Layer     | Type-safe contracts      |
| Service Layer   | API abstraction          |
| Custom Hook     | Logic reuse              |
| Page Layer      | Orchestration            |
| Component Layer | UI rendering             |
| Fluent UI       | Enterprise interface     |
| useEffect       | External synchronization |
| useState        | Component memory         |
| TypeScript      | Safety and scalability   |
| Vite            | Fast development         |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block       | App    | Name                            | Status      |
| ----------- | ------ | ------------------------------- | ----------- |
| Block 1     | 01–20  | Fundamentals and UI             | Completed   |
| Block 2     | 21–40  | Interactivity and State         | Completed   |
| Block 3     | 41–60  | Professional Fluent UI          | Completed   |
| Block 4     | 61     | REST API Consumption            | Completed   |
| Block 4     | 62     | API Dashboard                   | Completed   |
| Block 4     | 63     | Async Search                    | Completed   |
| Block 4     | 64     | GitHub User Explorer            | Completed   |
| Block 4     | 65     | Weather App                     | Completed   |
| Block 4     | 66     | Pagination System               | Completed   |
| Block 4     | 67     | Infinite Scroll                 | Completed   |
| Block 4     | 68     | Data Cache                      | Completed   |
| Block 4     | 69     | Custom Fetch Hook               | Completed   |
| Block 4     | 70     | Context API Global State        | Completed   |
| Block 4     | 71     | Favorites System                | Completed   |
| Block 4     | 72     | DataGrid with API               | Completed   |
| Block 4     | 73     | Analytics Dashboard             | Completed   |
| Block 4     | 74     | Crypto Monitor                  | Completed   |
| Block 4     | 75     | Repository Explorer             | Completed   |
| Block 4     | 76     | Log Viewer Dashboard            | Completed   |
| Block 4     | 77     | Reporting System                | Completed   |
| Block 4     | 78     | Performance Simulator           | Completed   |
| **Block 4** | **79** | **Layered Architecture**        | **Current** |
| Block 4     | 80     | Mini Framework React Enterprise | Next        |

**Roadmap reference:** App 79 is defined as "Layered Architecture" within Block 4 of the ReactLab 100 Apps plan. 
