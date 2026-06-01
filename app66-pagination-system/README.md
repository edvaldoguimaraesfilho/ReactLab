```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 66: Pagination System with React, TypeScript, Fluent UI, and Vite

## Introduction

As applications begin consuming larger datasets from APIs, displaying all records at once quickly becomes impractical. Enterprise systems such as SharePoint portals, CRMs, ERPs, ticket systems, employee directories, and administrative dashboards commonly use **pagination** to divide data into manageable pages.

In **App 66 — Pagination System**, we continue Block 4 (**Effects and Architecture**) by learning how to fetch data from an API and navigate through results using page controls. This application introduces one of the most common enterprise UI patterns: data paging. According to the ReactLab roadmap, App 66 focuses on **state management combined with pagination logic**, helping developers understand how React state controls data navigation. 

The application demonstrates:

* API consumption
* useEffect for external synchronization
* loading states
* pagination controls
* derived state
* Fluent UI tables and buttons
* enterprise data navigation patterns
* React rendering cycles

The React mental model remains:

```txt
State changes
→ React re-renders
→ UI updates automatically
```

---

# Learning Objectives

By completing App 66, you will understand:

| Concept               | Purpose                        |
| --------------------- | ------------------------------ |
| useEffect             | Synchronize with external APIs |
| useState              | Store page number and records  |
| Pagination            | Divide large datasets          |
| Fetch API             | Retrieve remote data           |
| Loading UI            | Improve user experience        |
| Derived UI            | Current page drives rendering  |
| Fluent UI             | Microsoft-style interface      |
| Enterprise Navigation | Data browsing patterns         |

---

# Project Creation

## Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app66-pagination-system -- --template react-ts

cd app66-pagination-system

npm install

npm install @fluentui/react-components
```

## Create Folders

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\data
mkdir src\styles
```

## Create Files

```powershell
New-Item src\models\User.ts -ItemType File
New-Item src\services\UserService.ts -ItemType File
New-Item src\components\UserTable.tsx -ItemType File
New-Item src\components\PaginationBar.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Folder Structure

```txt
src/
  components/
    UserTable.tsx
    PaginationBar.tsx

  models/
    User.ts

  services/
    UserService.ts

  data/

  styles/

  App.tsx
  main.tsx
  index.css
```

This structure separates responsibilities:

| Folder     | Responsibility       |
| ---------- | -------------------- |
| models     | Data contracts       |
| services   | API communication    |
| components | UI building blocks   |
| styles     | Visual customization |
| App.tsx    | State orchestration  |

---

# User Model

## `src/models/User.ts`

```ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
```

This model defines the shape of the API response.

TypeScript ensures:

* predictable data
* autocomplete
* compile-time validation
* safer refactoring

---

# Service Layer

## `src/services/UserService.ts`

```ts
import type { User } from "../models/User";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return await response.json();
}
```

This app uses the public API:

```txt
https://jsonplaceholder.typicode.com/users
```

The service layer keeps API logic outside UI components.

This separation becomes critical in larger enterprise applications.

---

# Building the User Table

## `src/components/UserTable.tsx`

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { User } from "../models/User";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

This component is pure:

```txt
Input: users
Output: table
```

No state.
No effects.
Only rendering.

This follows React's recommendation for pure components. 

---

# Pagination Component

## `src/components/PaginationBar.tsx`

```tsx
import { Button } from "@fluentui/react-components";

interface Props {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function PaginationBar({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        marginTop: "24px",
      }}
    >
      <Button
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <Button
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  );
}
```

This component only displays controls.

It does not own state.

The parent controls everything.

---

# App State Management

## `src/App.tsx`

```tsx
import { useEffect, useState } from "react";

import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { getUsers } from "./services/UserService";
import { UserTable } from "./components/UserTable";
import { PaginationBar } from "./components/PaginationBar";

import type { User } from "./models/User";

const PAGE_SIZE = 3;

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const result = await getUsers();

      setUsers(result);
      setLoading(false);
    }

    loadData();
  }, []);

  const totalPages =
    Math.ceil(users.length / PAGE_SIZE);

  const start =
    (page - 1) * PAGE_SIZE;

  const currentUsers =
    users.slice(start, start + PAGE_SIZE);

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <main
      style={{
        padding: "32px",
      }}
    >
      <Title1>User Pagination System</Title1>

      <UserTable users={currentUsers} />

      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPrevious={() =>
          setPage((p) => p - 1)
        }
        onNext={() =>
          setPage((p) => p + 1)
        }
      />
    </main>
  );
}

export default App;
```

---

# Understanding useEffect

This is the first major concept:

```tsx
useEffect(() => {
  async function loadData() {
    const result = await getUsers();

    setUsers(result);
    setLoading(false);
  }

  loadData();
}, []);
```

React Learn teaches:

> Effects synchronize components with external systems.

An API is an external system.

Therefore:

```txt
Fetching data
→ useEffect
```

is correct usage.

---

# Understanding Pagination Logic

The current page is stored in state:

```tsx
const [page, setPage] = useState(1);
```

Page 1:

```txt
Users 1-3
```

Page 2:

```txt
Users 4-6
```

Page 3:

```txt
Users 7-9
```

Page 4:

```txt
Users 10
```

The starting index is:

```tsx
const start =
  (page - 1) * PAGE_SIZE;
```

Example:

| Page | Start |
| ---- | ----- |
| 1    | 0     |
| 2    | 3     |
| 3    | 6     |
| 4    | 9     |

The current records are:

```tsx
users.slice(start, start + PAGE_SIZE)
```

This creates the page subset.

---

# Derived State

Notice:

```tsx
const totalPages =
  Math.ceil(users.length / PAGE_SIZE);
```

This value is not stored.

It is derived.

React Learn recommends avoiding redundant state whenever possible. 

Bad:

```tsx
const [totalPages, setTotalPages]
```

Good:

```tsx
const totalPages =
  Math.ceil(...)
```

Because it is calculated from existing data.

---

# Loading State

The loading flag improves user experience:

```tsx
const [loading, setLoading] =
  useState(true);
```

While data loads:

```tsx
<Spinner label="Loading users..." />
```

This prevents empty screens and gives users feedback.

---

# Why Pagination Matters

Without pagination:

```txt
1,000 records
→ giant table
→ poor performance
→ poor usability
```

With pagination:

```txt
1,000 records
→ divided into pages
→ manageable navigation
→ better experience
```

This is why almost every enterprise system implements paging.

---

# Technical Summary

| Concept              | Explanation                |
| -------------------- | -------------------------- |
| useState             | Stores page and users      |
| useEffect            | Loads API data             |
| Fetch API            | Retrieves external data    |
| Pagination           | Divides records into pages |
| Derived State        | Calculates total pages     |
| Fluent UI Table      | Displays records           |
| Fluent UI Button     | Navigation controls        |
| Spinner              | Loading indicator          |
| Service Layer        | Isolates API calls         |
| TypeScript Interface | Defines data shape         |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Table Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/table)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 4 |  61 | REST API Consumption | Completed |
| Block 4 |  62 | Dashboard with API   | Completed |
| Block 4 |  63 | Async Search         | Completed |
| Block 4 |  64 | GitHub User Explorer | Completed |
| Block 4 |  65 | Weather App          | Completed |
| Block 4 |  66 | Pagination System    | Current   |
| Block 4 |  67 | Infinite Scroll      | Next      |

## ReactLab Progress

**Completed:** Apps 01–66
**Current:** App 66 — Pagination System
**Next:** App 67 — Infinite Scroll

Roadmap reference: App 66 is defined as **Sistema de Paginação / Pagination System** in Block 4 (Effects and Architecture). 
