# App 88 — Administrative Portal

**Block 5 — Complete Applications**
**App 88:** Administrative Portal 

This application consolidates everything learned so far and introduces a complete **Enterprise Administrative Portal** built with:

* React
* TypeScript
* Vite
* Fluent UI
* React Router
* Dashboard Layout
* Navigation Shell
* User Management
* Metrics Dashboard
* Settings Area
* Enterprise Architecture

The goal is to simulate a real Microsoft-style administration portal similar to those found in Microsoft 365, SharePoint Admin Center, Power Platform, and enterprise business systems. 

---

# Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app88-administrative-portal -- --template react-ts

cd app88-administrative-portal

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
npm install react-router-dom
```

---

# Create the Solution Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\pages -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\components\AdminSidebar.tsx -ItemType File
New-Item src\components\AdminHeader.tsx -ItemType File
New-Item src\components\MetricCard.tsx -ItemType File

New-Item src\pages\DashboardPage.tsx -ItemType File
New-Item src\pages\UsersPage.tsx -ItemType File
New-Item src\pages\SettingsPage.tsx -ItemType File

New-Item src\models\User.ts -ItemType File
New-Item src\data\users.ts -ItemType File

New-Item artigo.md -ItemType File
```

---

# Architecture

```txt
src/
│
├── components/
│   ├── AdminSidebar.tsx
│   ├── AdminHeader.tsx
│   └── MetricCard.tsx
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── UsersPage.tsx
│   └── SettingsPage.tsx
│
├── models/
│   └── User.ts
│
├── data/
│   └── users.ts
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

# User Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  department: string;
  role: string;
}
```

---

# Mock Data

## src/data/users.ts

```ts
import type { User } from "../models/User";

export const users: User[] = [
  {
    id: 1,
    name: "John Smith",
    department: "Finance",
    role: "Manager",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    department: "HR",
    role: "Administrator",
  },
  {
    id: 3,
    name: "Michael Brown",
    department: "IT",
    role: "Developer",
  },
];
```

---

# Metric Card Component

## src/components/MetricCard.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface MetricCardProps {
  title: string;
  value: string;
}

export function MetricCard({
  title,
  value,
}: MetricCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title3>{title}</Title3>

      <Text
        size={500}
        weight="semibold"
      >
        {value}
      </Text>
    </Card>
  );
}
```

---

# Sidebar Component

## src/components/AdminSidebar.tsx

```tsx
import {
  Button,
  Card,
  Title2,
} from "@fluentui/react-components";

import {
  Home24Regular,
  People24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

import { Link } from "react-router-dom";

export function AdminSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "24px",
        borderRadius: 0,
      }}
    >
      <Title2>Admin Portal</Title2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <Link to="/">
          <Button icon={<Home24Regular />}>
            Dashboard
          </Button>
        </Link>

        <Link to="/users">
          <Button icon={<People24Regular />}>
            Users
          </Button>
        </Link>

        <Link to="/settings">
          <Button icon={<Settings24Regular />}>
            Settings
          </Button>
        </Link>
      </div>
    </Card>
  );
}
```

---

# Header Component

## src/components/AdminHeader.tsx

```tsx
import {
  Avatar,
  Card,
  Text,
} from "@fluentui/react-components";

export function AdminHeader() {
  return (
    <Card
      style={{
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Text weight="semibold">
        Administrative Portal
      </Text>

      <Avatar
        name="Administrator"
        color="colorful"
      />
    </Card>
  );
}
```

---

# Dashboard Page

## src/pages/DashboardPage.tsx

```tsx
import { MetricCard } from "../components/MetricCard";

export function DashboardPage() {
  return (
    <>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "24px",
        }}
      >
        <MetricCard
          title="Users"
          value="124"
        />

        <MetricCard
          title="Departments"
          value="12"
        />

        <MetricCard
          title="Projects"
          value="47"
        />

        <MetricCard
          title="Tickets"
          value="18"
        />
      </div>
    </>
  );
}
```

---

# Users Page

## src/pages/UsersPage.tsx

```tsx
import {
  Card,
  Text,
} from "@fluentui/react-components";

import { users } from "../data/users";

export function UsersPage() {
  return (
    <>
      <h1>Users</h1>

      {users.map((user) => (
        <Card
          key={user.id}
          style={{
            marginBottom: "12px",
            padding: "16px",
          }}
        >
          <Text weight="semibold">
            {user.name}
          </Text>

          <br />

          <Text>
            {user.department} - {user.role}
          </Text>
        </Card>
      ))}
    </>
  );
}
```

---

# Settings Page

## src/pages/SettingsPage.tsx

```tsx
import {
  Card,
  Text,
} from "@fluentui/react-components";

export function SettingsPage() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <h1>Settings</h1>

      <Text>
        Enterprise configuration area.
      </Text>
    </Card>
  );
}
```

---

# App.tsx

```tsx
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";

import { DashboardPage } from "./pages/DashboardPage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
        }}
      >
        <AdminSidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <AdminHeader />

          <Routes>
            <Route
              path="/"
              element={<DashboardPage />}
            />

            <Route
              path="/users"
              element={<UsersPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
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
  font-family: "Segoe UI", Arial, sans-serif;
}

a {
  text-decoration: none;
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

Production validation:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# React Learn Concepts

This application reinforces several React Learn concepts from the roadmap. 

| Concept                | Usage                                    |
| ---------------------- | ---------------------------------------- |
| Component Composition  | Dashboard built from multiple components |
| Routing                | Multi-page administrative portal         |
| Props                  | MetricCard configuration                 |
| Lists                  | User rendering                           |
| State-driven UI        | Foundation for future admin features     |
| Separation of Concerns | Components, pages, models, data          |
| Fluent UI              | Microsoft enterprise design system       |
| Declarative Rendering  | UI derived from data                     |

---

# Technical Summary

| Technology   | Purpose                    |
| ------------ | -------------------------- |
| React        | Component architecture     |
| TypeScript   | Strong typing              |
| Vite         | Build system               |
| Fluent UI    | Microsoft UI framework     |
| React Router | Navigation system          |
| Avatar       | User profile visualization |
| Card         | Enterprise layout          |
| Grid Layout  | Dashboard metrics          |
| Mock Data    | User management simulation |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [React Router](https://reactrouter.com/en/main?utm_source=chatgpt.com)
* [Fluent UI React Components](https://react.fluentui.dev/?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App    | Name                      | Status      |
| ------- | ------ | ------------------------- | ----------- |
| Block 5 | 81     | Complete CRUD System      | Completed   |
| Block 5 | 82     | Employee Management       | Completed   |
| Block 5 | 83     | Financial Dashboard       | Completed   |
| Block 5 | 84     | Inventory System          | Completed   |
| Block 5 | 85     | Kanban Board              | Completed   |
| Block 5 | 86     | Enterprise Task Manager   | Completed   |
| Block 5 | 87     | User Management System    | Completed   |
| Block 5 | **88** | **Administrative Portal** | **Current** |
| Block 5 | 89     | Ticket System             | Next        |
| Block 5 | 90     | Power BI Style Dashboard  | Upcoming    |

**Current Position:** Block 5 → App 88 / 100
**Next Application:** App 89 — Ticket System.
