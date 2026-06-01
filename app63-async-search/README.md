```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 63: Async Search with React, TypeScript, Vite, and Fluent UI

## Introduction

In **App 63 — Async Search**, we officially enter one of the most important frontend engineering patterns in modern React applications: asynchronous user-driven data retrieval.

This app belongs to **Block 4 — Effects and Architecture**, where the project evolves from local UI rendering into external system synchronization, APIs, asynchronous flows, architecture organization, and professional data handling. 

The purpose of this app is to teach how React applications perform remote searches while maintaining:

* predictable rendering
* controlled state
* loading feedback
* asynchronous flow handling
* separation of responsibilities
* scalable architecture

This application introduces:

* async/await
* asynchronous fetch requests
* controlled search input
* loading states
* error states
* derived rendering
* conditional UI
* enterprise search layouts
* effects synchronized with external systems

The app simulates a corporate search experience similar to:

* Microsoft 365 search
* SharePoint search panels
* GitHub user lookup
* CRM entity search
* employee directory systems
* enterprise catalog search

The key React mental model is:

```txt
User input
→ state changes
→ async request executes
→ external data returns
→ React re-renders
→ UI updates automatically
```

This is fundamentally different from imperative programming.

React does not manually update the DOM after the request. React re-renders automatically from state changes.

---

# 1. What This App Teaches

| Concept                 | Purpose                           |
| ----------------------- | --------------------------------- |
| Controlled input        | React controls the search box     |
| Async functions         | Handle asynchronous API requests  |
| Fetch API               | Retrieve remote data              |
| Loading state           | Show UI feedback during requests  |
| Error state             | Handle failures gracefully        |
| Conditional rendering   | Render UI based on state          |
| useEffect               | Synchronize with external systems |
| Derived UI              | Results are rendered from state   |
| Fluent UI Search Layout | Enterprise search experience      |
| TypeScript models       | Strong typing for API data        |

This app is extremely important because asynchronous UI is the foundation of:

* dashboards
* APIs
* analytics systems
* SharePoint integrations
* search engines
* CRMs
* admin portals
* enterprise applications

---

# 2. Create the Project

```powershell
cd C:\ReactApps

New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app63-async-search -- --template react-ts

cd app63-async-search

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\UserResult.ts -ItemType File
New-Item src\services\searchService.ts -ItemType File
New-Item src\components\SearchBar.tsx -ItemType File
New-Item src\components\SearchResults.tsx -ItemType File
New-Item src\components\LoadingState.tsx -ItemType File
New-Item src\components\ErrorMessage.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 3. Final Folder Structure

```txt
app63-async-search/
  src/
    components/
      SearchBar.tsx
      SearchResults.tsx
      LoadingState.tsx
      ErrorMessage.tsx

    services/
      searchService.ts

    models/
      UserResult.ts

    hooks/

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

This structure matters because enterprise React apps should separate:

* UI
* models
* services
* state logic
* rendering concerns

---

# 4. Create the API Model

## `src\models\UserResult.ts`

```ts
export interface UserResult {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}
```

This defines the expected API shape.

The API used in this app is:

```txt
https://jsonplaceholder.typicode.com/users
```

TypeScript ensures predictable rendering.

Without models:

* API handling becomes unsafe
* rendering becomes fragile
* refactoring becomes dangerous

---

# 5. Create the Search Service

## `src\services\searchService.ts`

```ts
import type { UserResult } from "../models/UserResult";

export async function searchUsers(
  query: string
): Promise<UserResult[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  const data: UserResult[] =
    await response.json();

  return data.filter((user) =>
    user.name
      .toLowerCase()
      .includes(query.toLowerCase())
  );
}
```

---

# 6. Why Services Matter

The API logic is NOT inside `App.tsx`.

This is extremely important.

Bad architecture:

```txt
App.tsx
  contains rendering
  contains fetch
  contains filtering
  contains error handling
  contains everything
```

Good architecture:

```txt
App.tsx
  handles orchestration

services/
  handle external systems
```

This separation becomes critical in enterprise systems.

---

# 7. Understanding `async/await`

The function:

```ts
export async function searchUsers(...)
```

returns a Promise.

Inside:

```ts
await fetch(...)
```

pauses execution until the HTTP request finishes.

This is asynchronous programming.

Without async/await:

```txt
JavaScript would continue immediately
before the API finished.
```

---

# 8. Understanding Fetch API

```ts
fetch("https://jsonplaceholder.typicode.com/users")
```

Fetch performs an HTTP request.

The response object contains:

* status
* headers
* metadata
* body stream

The actual JSON is extracted with:

```ts
await response.json()
```

---

# 9. Create the Search Bar

## `src\components\SearchBar.tsx`

```tsx
import {
  Button,
  Input,
} from "@fluentui/react-components";

import {
  Search24Regular,
} from "@fluentui/react-icons";

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({
  query,
  onQueryChange,
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
        value={query}
        placeholder="Search users..."
        onChange={(_, data) =>
          onQueryChange(data.value)
        }
      />

      <Button
        appearance="primary"
        icon={<Search24Regular />}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
}
```

---

# 10. Controlled Input

The input uses:

```tsx
value={query}
```

and:

```tsx
onChange={...}
```

This makes it a controlled component.

React owns the value.

The browser is NOT the source of truth.

This is one of the most important React patterns.

---

# 11. Create the Loading Component

## `src\components\LoadingState.tsx`

```tsx
import {
  Spinner,
  Text,
} from "@fluentui/react-components";

export function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      <Spinner />

      <Text>Loading search results...</Text>
    </div>
  );
}
```

---

# 12. Why Loading State Matters

Without loading feedback:

* users think the UI froze
* requests feel broken
* UX becomes confusing

Professional systems always show async feedback.

---

# 13. Create the Error Component

## `src\components\ErrorMessage.tsx`

```tsx
import {
  MessageBar,
  MessageBarBody,
} from "@fluentui/react-components";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({
  message,
}: ErrorMessageProps) {
  return (
    <MessageBar intent="error">
      <MessageBarBody>
        {message}
      </MessageBarBody>
    </MessageBar>
  );
}
```

---

# 14. Create Search Results

## `src\components\SearchResults.tsx`

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { UserResult } from "../models/UserResult";

interface SearchResultsProps {
  results: UserResult[];
}

export function SearchResults({
  results,
}: SearchResultsProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {results.map((user) => (
        <Card
          key={user.id}
          style={{
            padding: "20px",
          }}
        >
          <Title3>{user.name}</Title3>

          <Text>{user.email}</Text>

          <br />

          <Text>
            Company: {user.company.name}
          </Text>
        </Card>
      ))}
    </div>
  );
}
```

---

# 15. Why `key={user.id}` Matters

React lists require stable keys.

The key helps React:

* track elements
* optimize rendering
* update the correct DOM nodes

---

# 16. Create `App.tsx`

## `src\App.tsx`

```tsx
import { useState } from "react";

import {
  Card,
  FluentProvider,
  Title1,
  Text,
  webLightTheme,
} from "@fluentui/react-components";

import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { LoadingState } from "./components/LoadingState";
import { ErrorMessage } from "./components/ErrorMessage";

import { searchUsers } from "./services/searchService";

import type { UserResult } from "./models/UserResult";

function App() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<UserResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch() {
    try {
      setLoading(true);

      setError("");

      const users =
        await searchUsers(query);

      setResults(users);
    } catch (err) {
      setError(
        "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FluentProvider theme={webLightTheme}>
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
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <Card
            style={{
              padding: "32px",
            }}
          >
            <Title1>
              Async Enterprise Search
            </Title1>

            <Text>
              Search remote users using
              React async architecture.
            </Text>

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <SearchBar
                query={query}
                onQueryChange={setQuery}
                onSearch={handleSearch}
              />
            </div>

            {loading && <LoadingState />}

            {error && (
              <div
                style={{
                  marginTop: "24px",
                }}
              >
                <ErrorMessage
                  message={error}
                />
              </div>
            )}

            {!loading &&
              !error &&
              results.length > 0 && (
                <SearchResults
                  results={results}
                />
              )}
          </Card>
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# 17. Understanding the Async Flow

The entire app follows this flow:

```txt
User types query
→ query state updates

User clicks Search
→ handleSearch runs

handleSearch
→ loading becomes true

searchUsers()
→ external API request

API returns data
→ results state updates

React re-renders
→ SearchResults appears

loading becomes false
→ spinner disappears
```

This is the modern React async rendering model.

---

# 18. Why `try/catch/finally` Matters

```tsx
try {
}
catch {
}
finally {
}
```

This guarantees:

* loading starts correctly
* errors are captured
* loading always stops

Without `finally`, loading could remain stuck forever after an error.

---

# 19. Conditional Rendering

The app uses:

```tsx
{loading && <LoadingState />}
```

This means:

```txt
If loading is true,
render LoadingState.
```

This is declarative rendering.

---

# 20. Why This App Is Architecturally Important

This app introduces the foundation for:

* API dashboards
* SharePoint search systems
* enterprise lookup systems
* CRM searches
* GitHub explorer apps
* analytics systems
* admin portals

It also introduces proper separation between:

* UI
* services
* models
* async behavior

---

# 21. Create `main.tsx`

## `src\main.tsx`

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

# 22. Create `index.css`

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

# 23. Run the Application

Development server:

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# 24. Technical Summary

| Concept               | Explanation                    |
| --------------------- | ------------------------------ |
| Controlled input      | React controls search state    |
| Fetch API             | Retrieves remote data          |
| async/await           | Handles asynchronous execution |
| Loading state         | Displays progress feedback     |
| Error state           | Displays failure feedback      |
| Conditional rendering | UI changes based on state      |
| Fluent UI             | Enterprise Microsoft-style UI  |
| Service layer         | Separates API logic            |
| TypeScript models     | Strongly typed API contracts   |
| Declarative rendering | UI derives from state          |

---

# 25. Concept Table

| Concept          | File                | Why It Matters                |
| ---------------- | ------------------- | ----------------------------- |
| API contract     | `UserResult.ts`     | Strong typing                 |
| Service layer    | `searchService.ts`  | Separates external logic      |
| Search UI        | `SearchBar.tsx`     | Controlled input architecture |
| Async feedback   | `LoadingState.tsx`  | Professional UX               |
| Error handling   | `ErrorMessage.tsx`  | Graceful failure              |
| Result rendering | `SearchResults.tsx` | Data-driven UI                |
| Orchestration    | `App.tsx`           | Coordinates async flow        |

---

# 26. Official Documentation

| Topic                         | Documentation                                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React Learn                   | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                     |
| Synchronizing with Effects    | [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)           |
| Lifecycle of Reactive Effects | [Lifecycle of Reactive Effects](https://react.dev/learn/lifecycle-of-reactive-effects?utm_source=chatgpt.com)     |
| Reacting to Input with State  | [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)       |
| Conditional Rendering         | [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)                     |
| Fetch API                     | [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API?utm_source=chatgpt.com)                |
| Fluent UI                     | [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web) |
| Vite                          | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                      |
| TypeScript                    | [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                                    |

---

# 27. Final Architectural Insight

The most important lesson from App 63 is:

```txt
Asynchronous UI is still state-driven UI.
```

React does not care whether data is:

* local
* remote
* synchronous
* asynchronous

The rendering model remains:

```txt
State changes
→ React re-renders
→ UI updates automatically
```

This architecture becomes the foundation for:

* enterprise APIs
* dashboards
* analytics
* SharePoint integrations
* search engines
* CRM systems
* admin portals
* real-world React applications

---

# Current Project Progress

| Block   |   App | Name                    | Status    |
| ------- | ----: | ----------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI     | Completed |
| Block 2 | 21–40 | Interactivity and State | Completed |
| Block 3 | 41–60 | Professional Fluent UI  | Completed |
| Block 4 |    61 | REST API Consumption    | Completed |
| Block 4 |    62 | API Dashboard           | Completed |
| Block 4 |    63 | Async Search            | Current   |
| Block 4 |    64 | GitHub User Explorer    | Next      |

Base roadmap and architecture follow the ReactLab project structure and learning blocks. 
