# App 68 — Data Cache Dashboard

**Block 4 — Effects and Architecture**
**React Learn Focus:** Caching, Memoization, State Management, API Optimization, and Enterprise Architecture. Based on the roadmap, App 68 is **"Data Cache"**, introducing local data caching patterns and performance optimization concepts. 

---

## Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app68-data-cache-dashboard -- --template react-ts

cd app68-data-cache-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
mkdir src\components
mkdir src\hooks
mkdir src\services
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\User.ts -ItemType File
New-Item src\services\UserService.ts -ItemType File
New-Item src\hooks\useCachedUsers.ts -ItemType File
New-Item src\components\UserCard.tsx -ItemType File
New-Item src\components\UserDashboard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Project Goal

In previous applications we loaded data directly from APIs.

Now we introduce a common enterprise pattern:

```txt
API
 ↓
Cache Layer
 ↓
React Components
```

Benefits:

* Reduces API calls
* Improves performance
* Faster UI rendering
* Better user experience
* Enterprise scalability

This application simulates a cache system using local memory.

---

# Folder Structure

```txt
src/
 ├─ components/
 │   ├─ UserCard.tsx
 │   └─ UserDashboard.tsx
 │
 ├─ hooks/
 │   └─ useCachedUsers.ts
 │
 ├─ services/
 │   └─ UserService.ts
 │
 ├─ models/
 │   └─ User.ts
 │
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css
```

---

# User Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}
```

---

# Service Layer

## src/services/UserService.ts

```ts
import type { User } from "../models/User";

let cache: User[] | null = null;

export async function getUsers(): Promise<User[]> {

  if (cache) {
    console.log("Returning data from cache");
    return cache;
  }

  console.log("Fetching API");

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await response.json();

  cache = data.map((user: any) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    company: user.company.name,
  }));

  return cache;
}
```

---

# Why This Matters

Without cache:

```txt
Open page
↓
Call API

Refresh
↓
Call API again

Navigate back
↓
Call API again
```

With cache:

```txt
First request
↓
API call

Store data

Future requests
↓
Cache hit
↓
No API call
```

---

# Custom Hook

## src/hooks/useCachedUsers.ts

```tsx
import { useEffect, useState } from "react";

import type { User } from "../models/User";

import { getUsers } from "../services/UserService";

export function useCachedUsers() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadUsers() {

      const data = await getUsers();

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

# Why a Custom Hook?

React Learn recommends extracting reusable logic.

Instead of:

```tsx
useEffect(...)
```

inside every component,

we create:

```tsx
useCachedUsers()
```

Benefits:

* Reusability
* Cleaner components
* Separation of concerns
* Enterprise architecture

Official concept:

[Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)

---

# User Card Component

## src/components/UserCard.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { User } from "../models/User";

interface Props {
  user: User;
}

export function UserCard({ user }: Props) {

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>{user.name}</Title3>

      <Text>{user.email}</Text>

      <br />

      <Text>{user.company}</Text>

    </Card>
  );
}
```

---

# Dashboard Component

## src/components/UserDashboard.tsx

```tsx
import {
  Spinner,
  Title1,
} from "@fluentui/react-components";

import { UserCard } from "./UserCard";

import { useCachedUsers }
  from "../hooks/useCachedUsers";

export function UserDashboard() {

  const {
    users,
    loading,
  } = useCachedUsers();

  if (loading) {
    return <Spinner label="Loading users..." />;
  }

  return (
    <>
      <Title1>
        Data Cache Dashboard
      </Title1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </>
  );
}
```

---

# App Component

## src/App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { UserDashboard }
  from "./components/UserDashboard";

function App() {

  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: "40px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <UserDashboard />
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
}

* {
  box-sizing: border-box;
}
```

---

# Understanding the Architecture

```txt
App
 ↓
UserDashboard
 ↓
useCachedUsers Hook
 ↓
UserService
 ↓
Cache Layer
 ↓
API
```

This architecture is very common in:

* CRM systems
* SharePoint portals
* Microsoft 365 applications
* Dashboards
* Enterprise portals

---

# React Learn Connection

This application introduces an important architectural concept:

```txt
Effects fetch data

Services cache data

Components render data
```

The component should not worry about:

* where data comes from
* whether cache exists
* API implementation

The component only renders.

This follows React's separation of concerns philosophy. 

---

# Technical Summary

| Concept                | Purpose                  |
| ---------------------- | ------------------------ |
| useEffect              | Load data once           |
| Custom Hook            | Reusable logic           |
| Service Layer          | API abstraction          |
| Cache                  | Performance optimization |
| TypeScript Interface   | Strong typing            |
| Fluent UI Card         | Enterprise UI            |
| Fetch API              | Data retrieval           |
| React Rendering        | UI from state            |
| Separation of Concerns | Cleaner architecture     |
| Enterprise Pattern     | Scalable solution        |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   |                             Current App |
| ------- | --------------------------------------: |
| Block 1 |                                 01–20 ✅ |
| Block 2 |                                 21–40 ✅ |
| Block 3 |                                 41–60 ✅ |
| Block 4 |                                 61–67 ✅ |
| Block 4 | **68 — Data Cache Dashboard (Current)** |
| Block 4 |           69 — Custom Fetch Hook (Next) |
| Block 4 |             70 — Global Context Control |
| Block 4 |                   71 — Favorites System |
| Block 4 |                  72 — DataGrid with API |
| Block 4 |                73 — Analytics Dashboard |
| Block 4 |             74 — Cryptocurrency Monitor |
| Block 4 |                75 — Repository Explorer |
| Block 4 |                         76 — Log Viewer |
| Block 4 |                   77 — Reporting System |
| Block 4 |              78 — Performance Simulator |
| Block 4 |               79 — Layered Architecture |
| Block 4 |    80 — Mini React Enterprise Framework |

**Current Position:** App 68 / 100 Completed ✅
**Next App:** App 69 — Custom Fetch Hook.
