# App 70 — Global State Management with Context API

```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 70: Global State Management with Context API using React, TypeScript, Fluent UI, and Vite

## Introduction

In **App 70 — Global State Management with Context API**, we reach one of the most important architectural milestones of modern React development.

Up until App 69, most state lived inside individual components. Components owned their own data using `useState`, passed information through props, and communicated through callback functions.

However, enterprise applications quickly reach a point where data must be shared across multiple unrelated components.

Examples:

* Current logged user
* Application theme
* Language settings
* Shopping cart
* Notifications
* Authentication state
* Global filters
* Dashboard preferences

Passing this information through multiple component levels becomes a problem known as:

```txt
Prop Drilling
```

This application introduces the official React solution:

```txt
Context API
```

According to the React documentation, Context allows components to share data deeply throughout the component tree without manually passing props through every intermediate component. This app directly aligns with:

* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context?utm_source=chatgpt.com)

The goal is to build a simple enterprise portal where multiple components share a global user state.

---

# What This App Teaches

| Concept                 | Purpose                        |
| ----------------------- | ------------------------------ |
| Context API             | Global shared state            |
| React Provider          | Makes state available globally |
| useContext              | Reads shared state             |
| TypeScript Context      | Strong typing                  |
| Fluent UI Cards         | Enterprise UI                  |
| Component Communication | Without prop drilling          |
| Global User State       | Shared application data        |
| React Architecture      | Enterprise patterns            |

---

# Create the Project

## Create the application

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app70-global-context -- --template react-ts

cd app70-global-context

npm install

npm install @fluentui/react-components
```

---

## Create folders

```powershell
mkdir src\components
mkdir src\contexts
mkdir src\models
mkdir src\styles
```

---

## Create files

```powershell
New-Item src\models\User.ts -ItemType File

New-Item src\contexts\UserContext.tsx -ItemType File

New-Item src\components\UserProfile.tsx -ItemType File

New-Item src\components\UserDashboard.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Folder Structure

```txt
src/
│
├── components/
│   ├── UserProfile.tsx
│   └── UserDashboard.tsx
│
├── contexts/
│   └── UserContext.tsx
│
├── models/
│   └── User.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Create the User Model

## src/models/User.ts

```ts
export interface User {
  id: number;
  name: string;
  role: string;
  department: string;
}
```

This interface defines the shape of the global user object.

---

# Create the Context

## src/contexts/UserContext.tsx

```tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { User } from "../models/User";

interface UserContextType {
  user: User;
  updateUser: (user: User) => void;
}

const UserContext =
  createContext<UserContextType | undefined>(
    undefined
  );

const initialUser: User = {
  id: 1,
  name: "John Smith",
  role: "Administrator",
  department: "IT",
};

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({
  children,
}: UserProviderProps) {
  const [user, setUser] =
    useState<User>(initialUser);

  function updateUser(newUser: User) {
    setUser(newUser);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context =
    useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside UserProvider"
    );
  }

  return context;
}
```

---

# Understanding Context

Normally:

```txt
App
 └─ Dashboard
     └─ Header
         └─ UserInfo
```

Without Context:

```txt
App
 passes user

Dashboard
 passes user

Header
 passes user

UserInfo
 receives user
```

With Context:

```txt
Provider
    ↓
Any component can access user
```

This eliminates prop drilling.

---

# Create User Profile Component

## src/components/UserProfile.tsx

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { useUser } from "../contexts/UserContext";

export function UserProfile() {
  const { user } = useUser();

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>User Profile</Title2>

      <Text>
        Name: {user.name}
      </Text>

      <br />

      <Text>
        Role: {user.role}
      </Text>

      <br />

      <Text>
        Department: {user.department}
      </Text>
    </Card>
  );
}
```

Notice:

```tsx
const { user } = useUser();
```

No props.

The component accesses global state directly.

---

# Create Dashboard Component

## src/components/UserDashboard.tsx

```tsx
import {
  Button,
  Card,
  Title2,
} from "@fluentui/react-components";

import { useUser } from "../contexts/UserContext";

export function UserDashboard() {
  const {
    user,
    updateUser,
  } = useUser();

  function switchUser() {
    updateUser({
      id: 2,
      name: "Mary Johnson",
      role: "Manager",
      department: "Finance",
    });
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>
        Welcome {user.name}
      </Title2>

      <Button
        appearance="primary"
        onClick={switchUser}
      >
        Change User
      </Button>
    </Card>
  );
}
```

This component updates global state.

---

# Create App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  UserProvider,
} from "./contexts/UserContext";

import {
  UserDashboard,
} from "./components/UserDashboard";

import {
  UserProfile,
} from "./components/UserProfile";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <UserProvider>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <UserDashboard />

          <UserProfile />
        </main>
      </UserProvider>
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
  font-family: "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}
```

---

# Understanding the Rendering Flow

When the application starts:

```txt
UserProvider
    ↓
stores user state
    ↓
UserDashboard reads user
    ↓
UserProfile reads user
```

Both components share the same data.

---

# State Update Flow

When the button is clicked:

```txt
Button Click
    ↓
switchUser()
    ↓
updateUser()
    ↓
setUser()
    ↓
Provider updates
    ↓
All consumers re-render
```

React automatically updates:

```txt
UserDashboard
UserProfile
```

No props required.

---

# Why Context Exists

Without Context:

```txt
App
 └─ Dashboard
     └─ Layout
         └─ Header
             └─ UserInfo
```

Props would be passed through every level.

With Context:

```txt
Provider
   ↓
Any component
```

This dramatically simplifies architecture.

---

# Why We Do Not Use useEffect

This app intentionally avoids:

```tsx
useEffect()
```

There is:

* no API
* no timer
* no external synchronization

Everything is internal state.

According to React Learn:

> You Might Not Need an Effect

Context + State are enough.

---

# Technical Summary

| Concept            | Explanation                       |
| ------------------ | --------------------------------- |
| Context API        | Global state sharing              |
| Provider           | Makes state available             |
| Consumer           | Reads state                       |
| useContext         | Accesses context                  |
| TypeScript         | Strong typing                     |
| useState           | Stores global data                |
| Fluent UI          | Enterprise UI                     |
| No Prop Drilling   | Cleaner architecture              |
| React Re-rendering | Automatic updates                 |
| Shared State       | Multiple components use same data |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Scaling Up with Reducer and Context](https://react.dev/learn/scaling-up-with-reducer-and-context?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App   | Name                          | Status    |
| ------- | ----- | ----------------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI           | Completed |
| Block 2 | 21–40 | Interactivity and State       | Completed |
| Block 3 | 41–60 | Professional Fluent UI        | Completed |
| Block 4 | 61    | REST API Consumer             | Completed |
| Block 4 | 62    | API Dashboard                 | Completed |
| Block 4 | 63    | Async Search                  | Completed |
| Block 4 | 64    | GitHub Explorer               | Completed |
| Block 4 | 65    | Weather App                   | Completed |
| Block 4 | 66    | Pagination System             | Completed |
| Block 4 | 67    | Infinite Scroll               | Completed |
| Block 4 | 68    | Data Cache                    | Completed |
| Block 4 | 69    | Custom Fetch Hook             | Completed |
| Block 4 | 70    | Global State with Context API | Current   |
| Block 4 | 71    | Favorites System              | Next      |

### ReactLab Roadmap Reference

App 70 corresponds to **"Global Context Control" / Context API architecture**, part of Block 4 (Effects and Architecture), focused on global state management and enterprise React patterns. 

### Where We Are

```txt
Completed: App 01 → App 70
Current:   App 70 - Global State Management with Context API
Next:      App 71 - Favorites System
```

Project structure and roadmap follow the ReactLab architecture defined for the 100-app learning path.  
