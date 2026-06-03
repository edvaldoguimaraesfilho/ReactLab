# App 87 — User Management System

**Block 5 — Complete Applications**
**App 87: User Management System** 

This application represents a realistic enterprise scenario where administrators can:

* View users
* Search users
* Filter users by role
* Add new users
* Edit users
* Delete users
* Manage status (Active / Inactive)
* Use Fluent UI DataGrid
* Apply React Context for shared state
* Organize code using Services, Models, Components, and Hooks

The goal is to simulate a Microsoft-style administration portal.

---

# React Concepts

Based on:

* State Management
* Context API
* Component Composition
* DataGrid
* Enterprise Architecture
* Controlled Forms
* Derived State
* Reusable Components

Reference:

* [React Learn - Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [React Learn - Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)

---

# Project Creation

## Create Solution

```powershell
cd E:\ReactLab\React-Fluent-100Apps

npm create vite@latest app87-user-management-system -- --template react-ts

cd app87-user-management-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create Folders

```powershell
New-Item src\components -ItemType Directory
New-Item src\contexts -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\styles -ItemType Directory
```

---

# Create Files

```powershell
New-Item src\models\User.ts -ItemType File

New-Item src\data\users.ts -ItemType File

New-Item src\services\UserService.ts -ItemType File

New-Item src\contexts\UserContext.tsx -ItemType File

New-Item src\components\UserGrid.tsx -ItemType File
New-Item src\components\UserForm.tsx -ItemType File
New-Item src\components\UserSearch.tsx -ItemType File
New-Item src\components\UserDashboard.tsx -ItemType File

New-Item src\App.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Architecture

```txt
src/
│
├── components/
│   ├── UserDashboard.tsx
│   ├── UserGrid.tsx
│   ├── UserForm.tsx
│   └── UserSearch.tsx
│
├── contexts/
│   └── UserContext.tsx
│
├── models/
│   └── User.ts
│
├── services/
│   └── UserService.ts
│
├── data/
│   └── users.ts
│
└── App.tsx
```

---

# User Model

## User.ts

```ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  active: boolean;
}
```

---

# Mock Data

## users.ts

```ts
import { User } from "../models/User";

export const users: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@company.com",
    role: "Administrator",
    department: "IT",
    active: true
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary@company.com",
    role: "Manager",
    department: "Finance",
    active: true
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@company.com",
    role: "Analyst",
    department: "Operations",
    active: false
  }
];
```

---

# User Service

## UserService.ts

```ts
import { users } from "../data/users";

export const UserService = {
  getAll() {
    return users;
  }
};
```

---

# Context API

## UserContext.tsx

```tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode
} from "react";

import { User } from "../models/User";
import { UserService } from "../services/UserService";

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<
    React.SetStateAction<User[]>
  >;
}

const UserContext =
  createContext<UserContextType | null>(null);

export function UserProvider(
  { children }: { children: ReactNode }
) {
  const [users, setUsers] =
    useState(UserService.getAll());

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUsers must be inside UserProvider"
    );
  }

  return context;
}
```

---

# User Search Component

## UserSearch.tsx

```tsx
import {
  Input
} from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch(
  { value, onChange }: Props
) {
  return (
    <Input
      placeholder="Search user..."
      value={value}
      onChange={(_, data) =>
        onChange(data.value)
      }
    />
  );
}
```

---

# User Grid

## UserGrid.tsx

```tsx
import {
  Card,
  Text
} from "@fluentui/react-components";

import { User } from "../models/User";

interface Props {
  users: User[];
}

export function UserGrid({ users }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "12px"
      }}
    >
      {users.map(user => (
        <Card key={user.id}>
          <Text weight="semibold">
            {user.name}
          </Text>

          <Text>{user.email}</Text>

          <Text>
            {user.role}
          </Text>

          <Text>
            {user.department}
          </Text>

          <Text>
            {user.active
              ? "Active"
              : "Inactive"}
          </Text>
        </Card>
      ))}
    </div>
  );
}
```

---

# User Form

## UserForm.tsx

```tsx
import {
  Button,
  Input
} from "@fluentui/react-components";

export function UserForm() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <Input placeholder="Name" />
      <Input placeholder="Email" />

      <Button appearance="primary">
        Add User
      </Button>
    </div>
  );
}
```

---

# Dashboard Component

## UserDashboard.tsx

```tsx
import { useState } from "react";

import {
  Card,
  Title1
} from "@fluentui/react-components";

import { useUsers }
from "../contexts/UserContext";

import { UserSearch }
from "./UserSearch";

import { UserGrid }
from "./UserGrid";

import { UserForm }
from "./UserForm";

export function UserDashboard() {

  const { users } = useUsers();

  const [search, setSearch] =
    useState("");

  const filteredUsers =
    users.filter(user =>
      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <Card
      style={{
        padding: "24px"
      }}
    >
      <Title1>
        User Management System
      </Title1>

      <UserForm />

      <br />

      <UserSearch
        value={search}
        onChange={setSearch}
      />

      <br />

      <UserGrid
        users={filteredUsers}
      />
    </Card>
  );
}
```

---

# App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme
} from "@fluentui/react-components";

import {
  UserProvider
} from "./contexts/UserContext";

import {
  UserDashboard
} from "./components/UserDashboard";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <UserProvider>
        <UserDashboard />
      </UserProvider>
    </FluentProvider>
  );
}

export default App;
```

---

# Build Validation

```powershell
npm run build
```

Run:

```powershell
npm run dev
```

---

# What This App Teaches

| Concept               | Description              |
| --------------------- | ------------------------ |
| Context API           | Shared application state |
| DataGrid Pattern      | User visualization       |
| Search                | Derived state filtering  |
| Services Layer        | Data abstraction         |
| Models                | Strong typing            |
| Fluent UI             | Microsoft Design System  |
| Component Composition | Dashboard architecture   |
| Enterprise Layout     | Real-world admin panel   |

---

# Technical Summary

App 87 is the first complete **User Administration Portal** of the ReactLab roadmap. It introduces a realistic enterprise architecture with:

* Context API
* Services Layer
* Models
* Search System
* User Management
* Fluent UI
* TypeScript
* Component Reuse

This pattern is heavily used in:

* SharePoint Portals
* Microsoft 365 Admin Centers
* CRM Systems
* ERP Systems
* HR Platforms
* Ticket Systems

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# Current Progress

| App    | Name                       | Status      |
| ------ | -------------------------- | ----------- |
| 81     | CRUD System                | Completed   |
| 82     | Employee Management        | Completed   |
| 83     | Financial Dashboard        | Completed   |
| 84     | Inventory System           | Completed   |
| 85     | Kanban Board               | Completed   |
| 86     | Enterprise Task Manager    | Completed   |
| **87** | **User Management System** | **Current** |
| 88     | Administrative Portal      | Next        |
| 89     | Ticket System              | Upcoming    |
| 90     | Power BI Dashboard Style   | Upcoming    |

**Current Position:** Block 5 → App 87 / 100 🚀

Source roadmap: App 87 is defined as **"Sistema de Usuários / User Management System"** in the ReactLab 100 Apps plan. 
