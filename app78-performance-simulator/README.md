# App 78 — Performance Simulator

App 78 belongs to **Block 4 — Effects and Architecture** and is defined in the project roadmap as **Performance Simulator**. It comes immediately after App 77 (Reporting System) and before App 79 (Layered Architecture). The goal is to learn how React rendering performance behaves when dealing with large datasets, expensive calculations, filtering, memoization, and optimization using `useMemo`, `useCallback`, and component composition. 

---

# Objective

Build a corporate-style performance analysis dashboard that simulates:

* Large datasets
* Expensive calculations
* KPI generation
* Dynamic filtering
* Rendering optimization
* Memoized calculations
* React performance patterns

This app is the ideal place to understand:

* Why unnecessary re-renders happen
* When `useMemo` helps
* When `useCallback` helps
* Why derived state is preferred
* How React rendering actually works

---

# React Learn Concepts

Study before building:

* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)
* [React useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)
* [React useCallback Reference](https://react.dev/reference/react/useCallback?utm_source=chatgpt.com)

---

# Final Application

The dashboard simulates:

```txt
Performance Simulator

Search Employee: [________]

--------------------------------
Total Employees: 5000
Average Score: 87
Top Performers: 1240
--------------------------------

Employee Grid
--------------------------------
Name
Department
Score
Status
--------------------------------
```

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app78-performance-simulator -- --template react-ts

cd app78-performance-simulator

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\services
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\EmployeePerformance.ts -ItemType File
New-Item src\data\employeeData.ts -ItemType File
New-Item src\components\PerformanceSummary.tsx -ItemType File
New-Item src\components\EmployeeGrid.tsx -ItemType File
New-Item src\components\SearchBar.tsx -ItemType File
New-Item src\services\performanceService.ts -ItemType File
New-Item artigo.md -ItemType File
```

---

# Employee Model

## src\models\EmployeePerformance.ts

```ts
export interface EmployeePerformance {
  id: number;
  name: string;
  department: string;
  score: number;
}
```

---

# Generate Sample Data

## src\data\employeeData.ts

```ts
import type { EmployeePerformance }
from "../models/EmployeePerformance";

export const employees: EmployeePerformance[] =
Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Employee ${index + 1}`,
  department: [
    "IT",
    "HR",
    "Finance",
    "Operations"
  ][index % 4],
  score: Math.floor(Math.random() * 100),
}));
```

---

# Performance Service

## src\services\performanceService.ts

```ts
import type {
  EmployeePerformance
} from "../models/EmployeePerformance";

export function calculateAverageScore(
  employees: EmployeePerformance[]
) {
  return (
    employees.reduce(
      (sum, employee) => sum + employee.score,
      0
    ) / employees.length
  ).toFixed(2);
}

export function getTopPerformers(
  employees: EmployeePerformance[]
) {
  return employees.filter(
    employee => employee.score >= 80
  ).length;
}
```

---

# Search Component

## src\components\SearchBar.tsx

```tsx
import {
  Input
} from "@fluentui/react-components";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search employee..."
      value={value}
      onChange={(_, data) =>
        onChange(data.value)
      }
    />
  );
}
```

---

# Summary Component

## src\components\PerformanceSummary.tsx

```tsx
import {
  Card,
  Text,
  Title3
} from "@fluentui/react-components";

interface Props {
  total: number;
  average: string;
  topPerformers: number;
}

export function PerformanceSummary({
  total,
  average,
  topPerformers,
}: Props) {
  return (
    <Card
      style={{
        padding: 20,
        marginBottom: 20
      }}
    >
      <Title3>Performance Metrics</Title3>

      <Text>
        Total Employees: {total}
      </Text>

      <br />

      <Text>
        Average Score: {average}
      </Text>

      <br />

      <Text>
        Top Performers: {topPerformers}
      </Text>
    </Card>
  );
}
```

---

# Employee Grid

## src\components\EmployeeGrid.tsx

```tsx
import {
  Card,
  Text
} from "@fluentui/react-components";

import type {
  EmployeePerformance
} from "../models/EmployeePerformance";

interface Props {
  employees: EmployeePerformance[];
}

export function EmployeeGrid({
  employees,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      {employees.map(employee => (
        <Card key={employee.id}>
          <Text>
            {employee.name}
          </Text>

          <br />

          <Text>
            {employee.department}
          </Text>

          <br />

          <Text>
            Score: {employee.score}
          </Text>
        </Card>
      ))}
    </div>
  );
}
```

---

# App.tsx

## The Important Part — useMemo

```tsx
import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1
} from "@fluentui/react-components";

import { employees }
from "./data/employeeData";

import { SearchBar }
from "./components/SearchBar";

import { EmployeeGrid }
from "./components/EmployeeGrid";

import { PerformanceSummary }
from "./components/PerformanceSummary";

import {
  calculateAverageScore,
  getTopPerformers
}
from "./services/performanceService";

function App() {

  const [search, setSearch] =
    useState("");

  const filteredEmployees =
    useMemo(() => {

      return employees.filter(
        employee =>
          employee.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [search]);

  const averageScore =
    useMemo(
      () =>
        calculateAverageScore(
          filteredEmployees
        ),
      [filteredEmployees]
    );

  const topPerformers =
    useMemo(
      () =>
        getTopPerformers(
          filteredEmployees
        ),
      [filteredEmployees]
    );

  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: 40
        }}
      >
        <Title1>
          Performance Simulator
        </Title1>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <PerformanceSummary
          total={filteredEmployees.length}
          average={averageScore}
          topPerformers={topPerformers}
        />

        <EmployeeGrid
          employees={filteredEmployees}
        />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# Why This App Matters

Without optimization:

```tsx
const average =
  calculateAverageScore(filteredEmployees);
```

runs every render.

With:

```tsx
useMemo(...)
```

React caches the calculation.

The calculation only runs when:

```txt
filteredEmployees changes
```

This becomes critical when:

* thousands of records exist
* API data grows
* dashboards become complex
* expensive calculations are executed

---

# Technical Summary

| Concept               | Purpose                      |
| --------------------- | ---------------------------- |
| useState              | Search term state            |
| useMemo               | Cache expensive calculations |
| Derived State         | Metrics derived from data    |
| Fluent UI             | Microsoft-style interface    |
| Component Composition | Reusable architecture        |
| Filtering             | Dynamic data search          |
| Service Layer         | Business logic separation    |
| TypeScript            | Strong typing                |
| Large Dataset         | Performance simulation       |
| Dashboard Pattern     | Enterprise architecture      |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [useMemo Reference](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                            | Status    |
| ------- | --- | ------------------------------- | --------- |
| Block 4 | 74  | Crypto Monitor                  | Completed |
| Block 4 | 75  | Repository Explorer             | Completed |
| Block 4 | 76  | Log Viewer Dashboard            | Completed |
| Block 4 | 77  | Reporting System                | Completed |
| Block 4 | 78  | Performance Simulator           | Current   |
| Block 4 | 79  | Layered Architecture            | Next      |
| Block 4 | 80  | Mini React Enterprise Framework | Upcoming  |

**Current App:** 78/100 — Performance Simulator 🚀

Roadmap source: Performance Simulator is defined as App 78 in Block 4 (Effects and Architecture). 
