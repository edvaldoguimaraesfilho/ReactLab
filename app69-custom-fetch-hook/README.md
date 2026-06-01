# App 69 — Custom Fetch Hook

> Block 4 — Effects and Architecture
> Focus: Reusing Logic with Custom Hooks, API abstraction, loading states, error handling, separation of concerns. Based on React Learn's Custom Hooks section. 

---

## Create the Blog Article File

```powershell
New-Item artigo.md -ItemType File
```

---

# App Objective

In Apps 61–68 we consumed APIs directly inside components.

Now we will refactor that approach and create a reusable hook:

```txt
useFetch()
```

Instead of duplicating:

* useEffect
* fetch
* loading state
* error state

inside every component, we centralize that logic in a custom hook.

This is one of the most important architectural patterns in React.

According to React Learn:

> Custom Hooks allow you to reuse stateful logic between components.

This app introduces:

* Custom Hooks
* Logic reuse
* Generic API consumption
* Loading states
* Error states
* Separation of UI and data access
* React architecture patterns

---

# Final Folder Structure

```txt
app69-custom-fetch-hook/

src/
│
├── components/
│   ├── UserCard.tsx
│
├── hooks/
│   ├── useFetch.ts
│
├── models/
│   ├── User.ts
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

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app69-custom-fetch-hook -- --template react-ts

cd app69-custom-fetch-hook

npm install

npm install @fluentui/react-components
```

---

# Create Folders

```powershell
mkdir src\components
mkdir src\hooks
mkdir src\models
mkdir src\services
mkdir src\styles
```

---

# Create Files

```powershell
New-Item src\hooks\useFetch.ts -ItemType File
New-Item src\models\User.ts -ItemType File
New-Item src\components\UserCard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# User Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}
```

---

# Creating the Custom Hook

## src/hooks/useFetch.ts

```tsx
import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] =
    useState<T | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response =
          await fetch(url);

        if (!response.ok) {
          throw new Error(
            "Failed to load data"
          );
        }

        const json =
          await response.json();

        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
}
```

---

# Why This Hook Is Important

Without a hook:

```tsx
Component A
  useEffect
  loading
  error

Component B
  useEffect
  loading
  error

Component C
  useEffect
  loading
  error
```

Lots of duplicated code.

With a hook:

```txt
useFetch()

↓

Reusable everywhere
```

React Learn calls this:

```txt
Reusing Stateful Logic
```

The logic is shared.

The UI remains independent.

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

interface UserCardProps {
  user: User;
}

export function UserCard({
  user,
}: UserCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {user.name}
      </Title3>

      <Text>
        {user.email}
      </Text>

      <br />

      <Text>
        {user.phone}
      </Text>

      <br />

      <Text>
        {user.website}
      </Text>
    </Card>
  );
}
```

---

# App.tsx

## src/App.tsx

```tsx
import {
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { UserCard }
  from "./components/UserCard";

import { useFetch }
  from "./hooks/useFetch";

import type { User }
  from "./models/User";

function App() {
  const {
    data,
    loading,
    error,
  } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Custom Fetch Hook
      </Title1>

      <Text>
        Reusable API Consumption Logic
      </Text>

      {loading && (
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <Spinner
            label="Loading users..."
          />
        </div>
      )}

      {error && (
        <Text>
          Error: {error}
        </Text>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {data?.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
```

---

# main.tsx

## src/main.tsx

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
    <FluentProvider
      theme={webLightTheme}
    >
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# index.css

## src/index.css

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

# React Learn Concept

This app is directly aligned with:

### Reusing Logic with Custom Hooks

Instead of:

```txt
Copy
Paste
Copy
Paste
```

we create:

```txt
useFetch()
```

and use it everywhere.

The UI changes.

The data source changes.

The hook remains reusable.

---

# Architecture Introduced

```txt
UI Layer
  UserCard

Business Logic Layer
  useFetch

Data Source
  API Endpoint

React
  Coordinates Everything
```

This separation becomes critical in enterprise applications.

---

# Technical Summary

| Concept                | Purpose                  |
| ---------------------- | ------------------------ |
| Custom Hook            | Reuse stateful logic     |
| useFetch               | Generic API hook         |
| useEffect              | API synchronization      |
| useState               | Store data/loading/error |
| TypeScript Generics    | Strong typing            |
| Fluent UI Card         | User display             |
| Spinner                | Loading feedback         |
| Separation of Concerns | Architecture pattern     |
| API Layer              | External system          |
| Reusable Logic         | Enterprise React         |

---

# Official Documentation

### React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Reusing Logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

### Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

### Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                      | Status    |
| ------- | --- | ------------------------- | --------- |
| Block 4 | 61  | REST API Consumer         | Completed |
| Block 4 | 62  | API Dashboard             | Completed |
| Block 4 | 63  | Async Search              | Completed |
| Block 4 | 64  | GitHub Explorer           | Completed |
| Block 4 | 65  | Weather App               | Completed |
| Block 4 | 66  | Pagination System         | Completed |
| Block 4 | 67  | Infinite Scroll           | Completed |
| Block 4 | 68  | Data Cache                | Completed |
| Block 4 | 69  | Custom Fetch Hook         | Current   |
| Block 4 | 70  | Global State with Context | Next      |

Project roadmap based on the ReactLab 100 Apps structure and React Learn progression. 
