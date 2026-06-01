# App 72 — API DataGrid Explorer

**Block 4 — Effects and Architecture**
**Focus:** API Integration + Fluent UI DataGrid + useEffect + Enterprise Data Visualization

Reference roadmap: App 72 is **"DataGrid com API"**, part of the Effects and Architecture block focused on API consumption, loading states, error handling, and enterprise UI patterns. 

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app72-api-datagrid-explorer -- --template react-ts

cd app72-api-datagrid-explorer

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\hooks
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\User.ts -ItemType File
New-Item src\services\UserService.ts -ItemType File
New-Item src\components\UserDataGrid.tsx -ItemType File
New-Item src\hooks\useUsers.ts -ItemType File
New-Item artigo.md -ItemType File
```

---

# Project Goal

This application simulates a corporate employee directory.

Data comes from:

```txt
https://jsonplaceholder.typicode.com/users
```

The application will:

* Load users from an external API
* Display loading status
* Handle errors
* Show data in a Fluent UI DataGrid
* Separate UI from data access
* Introduce service layer architecture
* Demonstrate proper useEffect usage

---

# Folder Structure

```txt
src/
│
├── components/
│   └── UserDataGrid.tsx
│
├── hooks/
│   └── useUsers.ts
│
├── models/
│   └── User.ts
│
├── services/
│   └── UserService.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# User Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
```

---

# Service Layer

## src/services/UserService.ts

```ts
import type { User } from "../models/User";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  return response.json();
}
```

---

# Custom Hook

## src/hooks/useUsers.ts

```ts
import { useEffect, useState } from "react";
import type { User } from "../models/User";
import { getUsers } from "../services/UserService";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Unable to load data.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}
```

---

# DataGrid Component

## src/components/UserDataGrid.tsx

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

interface UserDataGridProps {
  users: User[];
}

export function UserDataGrid({
  users,
}: UserDataGridProps) {
  return (
    <Table aria-label="Users Table">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>Website</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.website}</TableCell>
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
import {
  Card,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { UserDataGrid } from "./components/UserDataGrid";
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
    users,
    loading,
    error,
  } = useUsers();

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          API DataGrid Explorer
        </Title1>

        <Text>
          Corporate user directory powered by API.
        </Text>

        {loading && (
          <div style={{ marginTop: "24px" }}>
            <Spinner label="Loading users..." />
          </div>
        )}

        {error && (
          <Text>
            {error}
          </Text>
        )}

        {!loading && !error && (
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <UserDataGrid users={users} />
          </div>
        )}
      </Card>
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
}

* {
  box-sizing: border-box;
}
```

---

# Why useEffect Is Correct Here

React Learn states that Effects should synchronize components with external systems.

This app communicates with:

```txt
External REST API
```

Therefore:

```tsx
useEffect(() => {
  loadUsers();
}, []);
```

is appropriate.

This differs from Apps 41–44 where UI behavior was entirely local and no Effect was necessary. 

---

# Architecture Flow

```txt
App
 │
 ├── useUsers
 │       │
 │       └── UserService
 │               │
 │               └── REST API
 │
 └── UserDataGrid
```

This architecture separates:

```txt
UI
Business Logic
Data Access
```

which is the foundation of enterprise React development.

---

# Technical Summary

| Concept               | Purpose                 |
| --------------------- | ----------------------- |
| useEffect             | API synchronization     |
| useState              | Local component state   |
| Custom Hook           | Reusable logic          |
| Service Layer         | API abstraction         |
| Fluent UI Table       | Enterprise data display |
| TypeScript Interface  | Strong typing           |
| Loading State         | Better UX               |
| Error State           | Fault handling          |
| Component Composition | Separation of concerns  |
| DataGrid Pattern      | Corporate applications  |

---

# React Learn Concepts

| Concept         | Documentation                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Effects         | [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)           |
| Custom Hooks    | [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com) |
| State           | [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)           |
| Rendering Lists | [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)                                 |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [JSONPlaceholder API](https://jsonplaceholder.typicode.com/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block       | App    | Name                      | Status      |
| ----------- | ------ | ------------------------- | ----------- |
| Block 1     | 01–20  | Fundamentals and UI       | Completed   |
| Block 2     | 21–40  | Interactivity and State   | Completed   |
| Block 3     | 41–60  | Fluent UI Professional    | Completed   |
| Block 4     | 61     | REST API Consumption      | Completed   |
| Block 4     | 62     | API Dashboard             | Completed   |
| Block 4     | 63     | Async Search              | Completed   |
| Block 4     | 64     | GitHub User Explorer      | Completed   |
| Block 4     | 65     | Weather App               | Completed   |
| Block 4     | 66     | Pagination System         | Completed   |
| Block 4     | 67     | Infinite Scroll           | Completed   |
| Block 4     | 68     | Data Cache                | Completed   |
| Block 4     | 69     | Custom Fetch Hook         | Completed   |
| Block 4     | 70     | Context API Global State  | Completed   |
| Block 4     | 71     | Favorites System          | Completed   |
| **Block 4** | **72** | **API DataGrid Explorer** | **Current** |
| Block 4     | 73     | Analytical Dashboard      | Next        |
| Block 4     | 74     | Cryptocurrency Monitor    | Upcoming    |
| Block 4     | 75     | Repository Explorer       | Upcoming    |
