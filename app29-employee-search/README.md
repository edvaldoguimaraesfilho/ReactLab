# App 29 — Employee Search

App 29 is **Employee Search / Pesquisa de Funcionários**, inside **Block 2 — Interactivity and State**, after App 28 Product Filter and before App 30 Shopping Cart. The roadmap defines App 29 as focused on **inputs + filters** and connected to React state sharing concepts. 

React concepts used here:

* `useState`
* controlled input
* derived filtered data
* `filter()`
* `map()`
* reusable components
* no unnecessary `useEffect`

React official docs show that filtering and rendering lists commonly use `filter()` and `map()` together. ([React][1]) React also explains that shared state should live in the closest common parent when multiple components need the same value. ([React][2])

---

## 1. Create the app

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app29-employee-search -- --template react-ts

cd app29-employee-search

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

---

## 2. Create folders and files

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\Employee.ts -ItemType File
New-Item src\data\employees.ts -ItemType File
New-Item src\components\EmployeeSearchBox.tsx -ItemType File
New-Item src\components\EmployeeCard.tsx -ItemType File
New-Item src\components\EmployeeList.tsx -ItemType File
```

---

## 3. `src\models\Employee.ts`

```ts
export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: "Active" | "On Leave" | "Remote";
}
```

---

## 4. `src\data\employees.ts`

```ts
import type { Employee } from "../models/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Anna Johnson",
    role: "Project Manager",
    department: "PMO",
    location: "New York",
    status: "Active",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Frontend Developer",
    department: "Engineering",
    location: "São Paulo",
    status: "Remote",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "UX Designer",
    department: "Design",
    location: "London",
    status: "Active",
  },
  {
    id: 4,
    name: "Michael Smith",
    role: "Data Analyst",
    department: "Business Intelligence",
    location: "Toronto",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Sofia Garcia",
    role: "HR Specialist",
    department: "Human Resources",
    location: "Madrid",
    status: "Active",
  },
];
```

---

## 5. `src\components\EmployeeSearchBox.tsx`

```tsx
import { Field, Input } from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";

interface EmployeeSearchBoxProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
}

export function EmployeeSearchBox({
  searchText,
  onSearchTextChange,
}: EmployeeSearchBoxProps) {
  return (
    <Field label="Search employees">
      <Input
        value={searchText}
        contentBefore={<Search24Regular />}
        placeholder="Search by name, role, department, location, or status"
        onChange={(_, data) => onSearchTextChange(data.value)}
      />
    </Field>
  );
}
```

---

## 6. `src\components\EmployeeCard.tsx`

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

import { Person24Regular } from "@fluentui/react-icons";
import type { Employee } from "../models/Employee";

interface EmployeeCardProps {
  employee: Employee;
}

function getBadgeAppearance(status: Employee["status"]) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "Remote") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        image={<Person24Regular />}
        header={<Title3>{employee.name}</Title3>}
        description={<Caption1>{employee.role}</Caption1>}
      />

      <Body1>{employee.department}</Body1>

      <Text size={200}>Location: {employee.location}</Text>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance={getBadgeAppearance(employee.status)}>
          {employee.status}
        </Badge>
      </div>
    </Card>
  );
}
```

---

## 7. `src\components\EmployeeList.tsx`

```tsx
import { Text } from "@fluentui/react-components";
import type { Employee } from "../models/Employee";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <Text>
        No employees found. Try another search term.
      </Text>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "24px",
      }}
    >
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
```

---

## 8. `src\App.tsx`

```tsx
import { useState } from "react";
import { Card, Text, Title1 } from "@fluentui/react-components";

import { employees } from "./data/employees";
import { EmployeeSearchBox } from "./components/EmployeeSearchBox";
import { EmployeeList } from "./components/EmployeeList";

function App() {
  const [searchText, setSearchText] = useState("");

  const normalizedSearchText = searchText.toLowerCase().trim();

  const filteredEmployees = employees.filter((employee) => {
    const searchableText = `
      ${employee.name}
      ${employee.role}
      ${employee.department}
      ${employee.location}
      ${employee.status}
    `.toLowerCase();

    return searchableText.includes(normalizedSearchText);
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Title1>Employee Search</Title1>

        <Text>
          A React employee search interface using controlled input, derived
          filtering, TypeScript models, and Fluent UI components.
        </Text>

        <Card style={{ padding: "24px", marginTop: "32px" }}>
          <EmployeeSearchBox
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />

          <Text size={200}>
            Showing {filteredEmployees.length} of {employees.length} employees.
          </Text>
        </Card>

        <EmployeeList employees={filteredEmployees} />
      </section>
    </main>
  );
}

export default App;
```

---

## 9. `src\main.tsx`

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

## 10. `src\index.css`

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

## 11. Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

---

## Technical Summary

| Concept          | Where it appears                          |
| ---------------- | ----------------------------------------- |
| Controlled input | `EmployeeSearchBox.tsx`                   |
| State            | `useState` in `App.tsx`                   |
| Derived data     | `filteredEmployees`                       |
| Filtering        | `employees.filter(...)`                   |
| List rendering   | `employees.map(...)`                      |
| Reusable card    | `EmployeeCard.tsx`                        |
| TypeScript model | `Employee.ts`                             |
| Fluent UI        | `Input`, `Field`, `Card`, `Badge`, `Text` |

---

## Current App List

| App | Name               | Status    |
| --: | ------------------ | --------- |
|  21 | Modern Counter     | Completed |
|  22 | Toggle Theme       | Completed |
|  23 | React Calculator   | Completed |
|  24 | Login Form         | Completed |
|  25 | User Registration  | Completed |
|  26 | Complete ToDo List | Completed |
|  27 | Shopping List      | Completed |
|  28 | Product Filter     | Completed |
|  29 | Employee Search    | Current   |
|  30 | Shopping Cart      | Next      |

[1]: https://react.dev/learn/rendering-lists?utm_source=chatgpt.com "Rendering Lists"
[2]: https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com "Sharing State Between Components"
