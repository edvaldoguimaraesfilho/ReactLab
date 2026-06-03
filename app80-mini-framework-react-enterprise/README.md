# App 80 — Mini Framework React Enterprise

App 80 concludes **Block 4 — Effects and Architecture** and serves as the architectural bridge between the infrastructure-focused applications (61–79) and the complete enterprise applications (81–100). According to the roadmap, App 80 is **Mini Framework React Enterprise**. 

The goal is to build a reusable enterprise foundation that centralizes:

* Layout architecture
* Service layer
* Custom hooks
* Context providers
* Shared models
* Reusable Fluent UI components
* Enterprise folder organization
* Feature-based scalability

Instead of building a single business feature, we build a framework that future applications can reuse.

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app80-mini-framework-react-enterprise -- --template react-ts

cd app80-mini-framework-react-enterprise

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Enterprise Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\layouts -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\context -ItemType Directory
New-Item src\pages -ItemType Directory
New-Item src\styles -ItemType Directory
New-Item src\utils -ItemType Directory
```

Create files:

```powershell
New-Item src\models\User.ts -ItemType File

New-Item src\services\UserService.ts -ItemType File

New-Item src\hooks\useUsers.ts -ItemType File

New-Item src\context\AppContext.tsx -ItemType File

New-Item src\components\AppHeader.tsx -ItemType File

New-Item src\layouts\MainLayout.tsx -ItemType File

New-Item src\pages\DashboardPage.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Folder Structure

```txt
src/
│
├── components/
│   └── AppHeader.tsx
│
├── layouts/
│   └── MainLayout.tsx
│
├── hooks/
│   └── useUsers.ts
│
├── services/
│   └── UserService.ts
│
├── models/
│   └── User.ts
│
├── context/
│   └── AppContext.tsx
│
├── pages/
│   └── DashboardPage.tsx
│
├── styles/
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

This follows the architecture philosophy defined for the ReactLab project. 

---

# Create the Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  role: string;
}
```

---

# Create the Service Layer

## src/services/UserService.ts

```ts
import type { User } from "../models/User";

export class UserService {
  static async getUsers(): Promise<User[]> {
    return Promise.resolve([
      {
        id: 1,
        name: "John Smith",
        role: "Administrator",
      },
      {
        id: 2,
        name: "Mary Johnson",
        role: "Manager",
      },
      {
        id: 3,
        name: "David Brown",
        role: "Analyst",
      },
    ]);
  }
}
```

---

# Create the Custom Hook

## src/hooks/useUsers.ts

```ts
import { useEffect, useState } from "react";

import type { User } from "../models/User";
import { UserService } from "../services/UserService";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      const data = await UserService.getUsers();

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, []);

  return {
    users,
    loading,
  };
}
```

---

# Create Global Context

## src/context/AppContext.tsx

```tsx
import {
  createContext,
  useContext,
  useState,
} from "react";

interface AppContextType {
  title: string;
}

const AppContext =
  createContext<AppContextType | null>(null);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title] = useState(
    "Mini Framework React Enterprise"
  );

  return (
    <AppContext.Provider value={{ title }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
}
```

---

# Create Reusable Header

## src/components/AppHeader.tsx

```tsx
import {
  Card,
  Title2,
} from "@fluentui/react-components";

import { useAppContext } from "../context/AppContext";

export function AppHeader() {
  const { title } = useAppContext();

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title2>{title}</Title2>
    </Card>
  );
}
```

---

# Create Enterprise Layout

## src/layouts/MainLayout.tsx

```tsx
import { AppHeader } from "../components/AppHeader";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <AppHeader />

      {children}
    </main>
  );
}
```

---

# Create Dashboard Page

## src/pages/DashboardPage.tsx

```tsx
import {
  Card,
  Spinner,
  Text,
  Title3,
} from "@fluentui/react-components";

import { useUsers } from "../hooks/useUsers";

export function DashboardPage() {
  const { users, loading } = useUsers();

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title3>Users</Title3>

      {users.map((user) => (
        <Text key={user.id}>
          {user.name} - {user.role}
        </Text>
      ))}
    </Card>
  );
}
```

---

# Create App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { AppProvider } from "./context/AppContext";

import { MainLayout } from "./layouts/MainLayout";

import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <AppProvider>
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      </AppProvider>
    </FluentProvider>
  );
}

export default App;
```

---

# Create main.tsx

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

# Create index.css

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# What This App Teaches

| Layer      | Responsibility           |
| ---------- | ------------------------ |
| Models     | Data contracts           |
| Services   | Data access              |
| Hooks      | Business logic reuse     |
| Context    | Global state             |
| Components | Reusable UI              |
| Layouts    | Application shell        |
| Pages      | Business screens         |
| Fluent UI  | Enterprise design system |

---

# Architecture Introduced

```txt
App
│
├── FluentProvider
│
├── AppProvider
│
├── MainLayout
│
├── AppHeader
│
└── DashboardPage
     │
     └── useUsers()
           │
           └── UserService
                 │
                 └── User Model
```

This is the first complete enterprise architecture skeleton and becomes the foundation for the applications in Block 5. The structure follows the architectural progression defined in the ReactLab roadmap. 

---

# Technical Summary

| Concept                 | Explanation                    |
| ----------------------- | ------------------------------ |
| Service Layer           | Centralized data access        |
| Custom Hooks            | Reusable business logic        |
| Context API             | Global application state       |
| Layout Pattern          | Shared application shell       |
| Fluent UI               | Enterprise UI components       |
| Models                  | Strong typing contracts        |
| Pages                   | Feature-oriented screens       |
| React Composition       | Small reusable building blocks |
| useEffect               | External data synchronization  |
| Enterprise Architecture | Separation of concerns         |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)
* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   |   App | Name                            | Status     |
| ------- | ----: | ------------------------------- | ---------- |
| Block 1 | 01–20 | Fundamentals and UI             | Completed  |
| Block 2 | 21–40 | Interactivity and State         | Completed  |
| Block 3 | 41–60 | Professional Fluent UI          | Completed  |
| Block 4 | 61–79 | Effects and Architecture        | Completed  |
| Block 4 |    80 | Mini Framework React Enterprise | Current    |
| Block 5 |    81 | Complete CRUD System            | Next       |
| Block 5 |    82 | Employee Management             | Upcoming   |
| Block 5 |    83 | Financial Dashboard             | Upcoming   |
| Block 5 |    84 | Inventory System                | Upcoming   |
| Block 5 |    85 | Kanban Board                    | Upcoming   |
| Block 5 |    86 | Enterprise Task Manager         | Upcoming   |
| Block 5 |    87 | User Management System          | Upcoming   |
| Block 5 |    88 | Administrative Portal           | Upcoming   |
| Block 5 |    89 | Ticket Management System        | Upcoming   |
| Block 5 |    90 | Power BI Style Dashboard        | Upcoming   |
| Block 5 |    91 | Report Generator                | Upcoming   |
| Block 5 |    92 | Audit System                    | Upcoming   |
| Block 5 |    93 | SharePoint Inspired Portal      | Upcoming   |
| Block 5 |    94 | Corporate Catalog               | Upcoming   |
| Block 5 |    95 | Reservation System              | Upcoming   |
| Block 5 |    96 | Mini Enterprise ERP             | Upcoming   |
| Block 5 |    97 | Complete CRM                    | Upcoming   |
| Block 5 |    98 | Analytics Platform              | Upcoming   |
| Block 5 |    99 | Microsoft Style Admin Center    | Upcoming   |
| Block 5 |   100 | Final React Enterprise Platform | Final Goal |
