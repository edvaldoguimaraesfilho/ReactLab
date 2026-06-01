```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 64: GitHub User Explorer with React, TypeScript, Vite, and Fluent UI

## Introduction

In **App 64 — GitHub User Explorer**, we officially move deeper into **Block 4 — Effects and Architecture**, where the main focus becomes asynchronous rendering, API integration, loading states, error handling, and synchronization with external systems. According to the ReactLab roadmap, App 64 is defined as a GitHub explorer focused on REST APIs and asynchronous React architecture. 

This application introduces one of the most important transitions in modern React learning:

```txt
Static UI
→ Interactive UI
→ External data synchronization
```

Until now, most applications worked only with internal state. In App 64, the application must communicate with an external system:

* GitHub REST API
* asynchronous HTTP requests
* loading states
* error states
* external data rendering
* effect synchronization

This app follows the official React philosophy from:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects?utm_source=chatgpt.com)
* [GitHub REST API Docs](https://docs.github.com/en/rest?utm_source=chatgpt.com)

The core mental model introduced here is:

```txt
User action
→ state update
→ effect runs
→ API request happens
→ React receives data
→ UI re-renders
```

This is one of the most important architectural evolutions in the React ecosystem.

---

# 1. What This App Teaches

| Concept               | Explanation                            |
| --------------------- | -------------------------------------- |
| `useEffect`           | Synchronizes with external APIs        |
| `fetch()`             | Executes HTTP requests                 |
| Async rendering       | UI updates after external data arrives |
| Loading state         | UI while waiting for data              |
| Error state           | UI for failed requests                 |
| Controlled input      | Search field controlled by React       |
| Derived rendering     | UI changes based on state              |
| Conditional rendering | Loading, error, and success screens    |
| Fluent UI Cards       | Enterprise GitHub profile layout       |
| TypeScript interfaces | Strongly typed API responses           |

This app is extremely important because it introduces the first true external synchronization workflow in the ReactLab roadmap. 

---

# 2. Create the Project

```powershell
cd C:\ReactApps

New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app64-github-user-explorer -- --template react-ts

cd app64-github-user-explorer

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\GitHubUser.ts -ItemType File
New-Item src\services\githubService.ts -ItemType File
New-Item src\components\SearchBar.tsx -ItemType File
New-Item src\components\GitHubProfileCard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 3. Final Folder Structure

```txt
app64-github-user-explorer/
  src/
    components/
      GitHubProfileCard.tsx
      SearchBar.tsx

    models/
      GitHubUser.ts

    services/
      githubService.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

This structure introduces separation of responsibilities:

| Folder       | Responsibility       |
| ------------ | -------------------- |
| `components` | UI rendering         |
| `models`     | TypeScript contracts |
| `services`   | API communication    |
| `styles`     | Global styles        |
| `App.tsx`    | State orchestration  |

This is the beginning of professional frontend architecture.

---

# 4. Create the GitHub User Model

## `src\models\GitHubUser.ts`

```ts
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}
```

This interface defines the structure returned by GitHub’s API.

TypeScript is critical here because API responses must be predictable.

Without strong typing:

* data becomes unreliable
* refactoring becomes dangerous
* rendering bugs become more common

---

# 5. Create the GitHub Service

## `src\services\githubService.ts`

```ts
import type { GitHubUser } from "../models/GitHubUser";

export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser> {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!response.ok) {
    throw new Error("GitHub user not found.");
  }

  return response.json();
}
```

This file introduces service-layer architecture.

Instead of placing API logic directly inside components, we isolate external communication.

This separation matters because:

* components remain cleaner
* services become reusable
* testing becomes easier
* architecture scales better

---

# 6. Understanding `fetch()`

```ts
const response = await fetch(...)
```

`fetch()` performs an HTTP request.

The flow becomes:

```txt
React app
→ HTTP request
→ GitHub API
→ JSON response
→ React state update
→ UI re-render
```

This is React synchronizing with an external system.

---

# 7. Why `async/await` Matters

Without async/await:

```txt
The browser would freeze waiting for the response.
```

Instead:

```txt
Request runs asynchronously.
React keeps rendering.
When data arrives, state updates.
```

Modern React applications are heavily asynchronous.

---

# 8. Create the Search Bar

## `src\components\SearchBar.tsx`

```tsx
import {
  Button,
  Input,
} from "@fluentui/react-components";

interface SearchBarProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  username,
  onUsernameChange,
  onSearch,
}: SearchBarProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
      }}
    >
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(_, data) =>
          onUsernameChange(data.value)
        }
      />

      <Button
        appearance="primary"
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}
```

This component introduces controlled inputs again:

```txt
React state controls the input value.
```

---

# 9. Create the Profile Card

## `src\components\GitHubProfileCard.tsx`

```tsx
import {
  Avatar,
  Card,
  Link,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { GitHubUser } from "../models/GitHubUser";

interface GitHubProfileCardProps {
  user: GitHubUser;
}

export function GitHubProfileCard({
  user,
}: GitHubProfileCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Avatar
        image={{
          src: user.avatar_url,
        }}
        size={96}
      />

      <Title2>
        {user.name || user.login}
      </Title2>

      <Text>{user.bio}</Text>

      <Text>
        Public Repositories: {user.public_repos}
      </Text>

      <Text>
        Followers: {user.followers}
      </Text>

      <Text>
        Following: {user.following}
      </Text>

      <Link
        href={user.html_url}
        target="_blank"
      >
        Open GitHub Profile
      </Link>
    </Card>
  );
}
```

This component is purely presentational.

It only receives props and renders UI.

This is the correct separation:

* App manages state
* Components render UI

---

# 10. Create the Root App

## `src\App.tsx`

```tsx
import { useEffect, useState } from "react";

import {
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { SearchBar } from "./components/SearchBar";
import { GitHubProfileCard } from "./components/GitHubProfileCard";

import type { GitHubUser } from "./models/GitHubUser";

import { fetchGitHubUser } from "./services/githubService";

function App() {
  const [username, setUsername] =
    useState("microsoft");

  const [searchUsername, setSearchUsername] =
    useState("microsoft");

  const [user, setUser] =
    useState<GitHubUser | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const data =
          await fetchGitHubUser(searchUsername);

        setUser(data);
      } catch (err) {
        setError(
          "Unable to load GitHub profile."
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [searchUsername]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <Title1>
          GitHub User Explorer
        </Title1>

        <Text>
          Search GitHub users using React,
          TypeScript, Fluent UI, and Effects.
        </Text>

        <div
          style={{
            marginTop: "24px",
          }}
        >
          <SearchBar
            username={username}
            onUsernameChange={setUsername}
            onSearch={() =>
              setSearchUsername(username)
            }
          />
        </div>

        {loading && (
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <Spinner label="Loading profile..." />
          </div>
        )}

        {error && (
          <Text
            style={{
              color: "red",
              marginTop: "24px",
              display: "block",
            }}
          >
            {error}
          </Text>
        )}

        {user && !loading && (
          <GitHubProfileCard user={user} />
        )}
      </section>
    </main>
  );
}

export default App;
```

---

# 11. Understanding `useEffect`

This is the most important concept in the app:

```tsx
useEffect(() => {
  async function loadUser() {
    ...
  }

  loadUser();
}, [searchUsername]);
```

The effect synchronizes React with the GitHub API.

Official React definition:

> Effects synchronize your component with external systems.

[Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)

---

# 12. Why the Dependency Array Matters

```tsx
[searchUsername]
```

This means:

```txt
Run the effect whenever searchUsername changes.
```

Without the dependency array:

* the request would run every render

With an empty dependency array:

* it would only run once

The dependency array controls synchronization.

---

# 13. Why We Use Two Username States

```tsx
username
searchUsername
```

This architecture is intentional.

| State            | Purpose              |
| ---------------- | -------------------- |
| `username`       | Current input typing |
| `searchUsername` | Triggers the search  |

Without this separation:

* every keystroke would call the API

This is a very important enterprise optimization pattern.

---

# 14. Understanding Loading State

```tsx
const [loading, setLoading] =
  useState(false);
```

Loading state exists because asynchronous requests take time.

The UI must represent:

* waiting
* success
* failure

Modern React apps always need explicit async states.

---

# 15. Understanding Error State

```tsx
const [error, setError] =
  useState("");
```

Error rendering is essential in real systems.

Network requests fail because:

* users do not exist
* APIs become unavailable
* internet connections fail
* rate limits happen

Professional UIs must handle failures gracefully.

---

# 16. Conditional Rendering

```tsx
{loading && <Spinner />}
```

```tsx
{error && <Text>{error}</Text>}
```

```tsx
{user && !loading && (
  <GitHubProfileCard user={user} />
)}
```

This is declarative rendering.

The UI changes according to state.

---

# 17. Why This App Is Architecturally Important

This app introduces:

```txt
State
→ Effect
→ API
→ Async rendering
→ Conditional UI
```

This is the foundation of:

* dashboards
* admin panels
* SharePoint integrations
* analytics systems
* CRM applications
* enterprise React apps

---

# 18. Create `main.tsx`

## `src\main.tsx`

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

# 19. Create `index.css`

## `src\index.css`

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

# 20. Run the App

Development:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Production preview:

```powershell
npm run preview
```

---

# 21. Complete Rendering Flow

```txt
User types username
→ React updates username state

User clicks Search
→ searchUsername updates

Dependency array changes
→ useEffect runs

fetchGitHubUser()
→ GitHub API request

Response arrives
→ setUser(data)

React re-renders
→ GitHubProfileCard appears
```

---

# Technical Summary

| Concept               | Explanation                   |
| --------------------- | ----------------------------- |
| `useEffect`           | Synchronizes with GitHub API  |
| `fetch()`             | Performs HTTP requests        |
| Loading state         | Represents async waiting      |
| Error state           | Represents request failure    |
| Controlled input      | React controls typing         |
| Conditional rendering | UI changes according to state |
| Fluent UI Card        | Enterprise profile layout     |
| Service layer         | Separates API logic           |
| TypeScript interface  | Strongly typed API contract   |
| Dependency array      | Controls effect execution     |

---

# Concept Table

| Concept                  | File                    | Why It Matters              |
| ------------------------ | ----------------------- | --------------------------- |
| GitHub model             | `GitHubUser.ts`         | Strong typing               |
| API service              | `githubService.ts`      | External communication      |
| Controlled input         | `SearchBar.tsx`         | State-driven form           |
| Presentational component | `GitHubProfileCard.tsx` | Pure rendering              |
| Effect synchronization   | `App.tsx`               | API integration             |
| Loading state            | `App.tsx`               | Async UX                    |
| Error handling           | `App.tsx`               | Enterprise resilience       |
| Fluent UI                | Multiple files          | Microsoft enterprise design |

---

# Official Documentation

| Topic                         | Documentation                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React Learn                   | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                     |
| Synchronizing with Effects    | [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)           |
| Lifecycle of Reactive Effects | [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects?utm_source=chatgpt.com)     |
| You Might Not Need an Effect  | [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)       |
| GitHub REST API               | [GitHub REST API](https://docs.github.com/en/rest?utm_source=chatgpt.com)                                         |
| Fluent UI React Components    | [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web) |
| Vite Guide                    | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                      |
| TypeScript Docs               | [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                                    |

---

# Current Project Progress

| Block   | App | Name                          | Status    |
| ------- | --: | ----------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent            | Completed |
| Block 1 |  02 | Profile Card                  | Completed |
| Block 1 |  03 | Product List                  | Completed |
| Block 1 |  04 | Microsoft Style User Card     | Completed |
| Block 1 |  05 | Static Dashboard              | Completed |
| Block 1 |  06 | Corporate Sidebar Menu        | Completed |
| Block 1 |  07 | Visual Task List              | Completed |
| Block 1 |  08 | Timeline Events               | Completed |
| Block 1 |  09 | Employee Table                | Completed |
| Block 1 |  10 | Email List                    | Completed |
| Block 1 |  11 | Grid of Cards                 | Completed |
| Block 1 |  12 | Image Gallery                 | Completed |
| Block 1 |  13 | Movie Catalog                 | Completed |
| Block 1 |  14 | Football Teams                | Completed |
| Block 1 |  15 | News Page                     | Completed |
| Block 1 |  16 | Financial Dashboard           | Completed |
| Block 1 |  17 | SharePoint Style Layout       | Completed |
| Block 1 |  18 | File Explorer                 | Completed |
| Block 1 |  19 | Corporate Portal              | Completed |
| Block 1 |  20 | Microsoft Style Landing Page  | Completed |
| Block 2 |  21 | Modern Counter                | Completed |
| Block 2 |  22 | Toggle Theme                  | Completed |
| Block 2 |  23 | React Calculator              | Completed |
| Block 2 |  24 | Login Form                    | Completed |
| Block 2 |  25 | User Registration             | Completed |
| Block 2 |  26 | Complete ToDo List            | Completed |
| Block 2 |  27 | Shopping List                 | Completed |
| Block 2 |  28 | Product Filter                | Completed |
| Block 2 |  29 | Employee Search               | Completed |
| Block 2 |  30 | Shopping Cart                 | Completed |
| Block 2 |  31 | Grade Simulator               | Completed |
| Block 2 |  32 | Inventory Control             | Completed |
| Block 2 |  33 | Contact Agenda                | Completed |
| Block 2 |  34 | Currency Converter            | Completed |
| Block 2 |  35 | BMI Calculator                | Completed |
| Block 2 |  36 | Installment Simulator         | Completed |
| Block 2 |  37 | Voting Panel                  | Completed |
| Block 2 |  38 | Interactive Quiz              | Completed |
| Block 2 |  39 | Team Manager                  | Completed |
| Block 2 |  40 | Dynamic Dashboard             | Completed |
| Block 3 |  41 | Microsoft Style Login         | Completed |
| Block 3 |  42 | Corporate Form                | Completed |
| Block 3 |  43 | Tabs Navigation               | Completed |
| Block 3 |  44 | Dialog Manager                | Completed |
| Block 3 |  45 | Executive Dashboard           | Completed |
| Block 3 |  46 | DataGrid Catalog              | Completed |
| Block 3 |  47 | Enterprise User List          | Completed |
| Block 3 |  48 | Sidebar Navigation            | Completed |
| Block 3 |  49 | Corporate Header              | Completed |
| Block 3 |  50 | Professional Toolbar          | Completed |
| Block 3 |  51 | Notification Center           | Completed |
| Block 3 |  52 | Administrative Panel          | Completed |
| Block 3 |  53 | Ticket Manager                | Completed |
| Block 3 |  54 | Approval System               | Completed |
| Block 3 |  55 | Corporate Calendar            | Completed |
| Block 3 |  56 | SharePoint Inspired Dashboard | Completed |
| Block 3 |  57 | Project Dashboard             | Completed |
| Block 3 |  58 | Ticket Control                | Completed |
| Block 3 |  59 | CRM Visual                    | Completed |
| Block 3 |  60 | Corporate Explorer            | Completed |
| Block 4 |  61 | REST API Consumption          | Completed |
| Block 4 |  62 | API Dashboard                 | Completed |
| Block 4 |  63 | Async Search                  | Completed |
| Block 4 |  64 | GitHub User Explorer          | Current   |
| Block 4 |  65 | Weather App                   | Next      |
