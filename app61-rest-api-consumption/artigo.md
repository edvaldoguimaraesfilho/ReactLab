```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 61: REST API Consumption with React, TypeScript, Vite, Fluent UI, and useEffect

## Introduction

Modern React applications rarely work with static information only. Real enterprise systems usually need to consume data from external services such as REST APIs, Microsoft Graph, SharePoint endpoints, CRM systems, ERP systems, analytics services, ticket systems, reporting platforms, audit logs, or cloud databases.

Because of this, one of the most important transitions in the React learning journey happens when the developer moves from static UI rendering into synchronization with external systems.

That transition officially begins in **App 61 — REST API Consumption**.

This app starts **Block 4 — Effects and Architecture** of the ReactLab roadmap, where the focus evolves from visual composition into:

* external synchronization
* useEffect
* service layers
* loading states
* error states
* API architecture
* scalable organization
* professional React patterns

The roadmap defines App 61 as the first API application of Block 4. 

This application introduces the first professional API architecture pattern of the project:

```txt
Component
→ useEffect
→ service layer
→ fetch API
→ HTTP response
→ state update
→ React re-render
→ UI update
```

The most important lesson is understanding that React components render before API data exists.

The UI initially renders with:

* empty data
* loading state
* no response yet

Then React synchronizes with the external API.

This synchronization is exactly what React Effects are designed for. React’s official documentation explains that Effects allow components to synchronize with systems outside React, such as network requests and APIs. [React Learn — Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)

---

# 1. The Objective of App 61

The main goal is not simply “calling fetch”.

The real objective is learning:

* how React handles async rendering
* how Effects work
* how enterprise apps organize API logic
* how loading and error states work
* how to separate UI from infrastructure code

The app demonstrates:

* REST API consumption
* Fluent UI rendering
* loading feedback
* error handling
* service abstraction
* reusable components
* TypeScript models
* enterprise architecture foundations

The application uses:

* React
* TypeScript
* Vite
* Fluent UI
* Fetch API
* useEffect

The external API used is:

```txt
https://jsonplaceholder.typicode.com/posts
```

This API is commonly used for frontend testing and returns mock JSON data.

---

# 2. Why This App Is Important

Before App 61, most apps were entirely local.

Examples:

* forms
* dialogs
* tabs
* dashboards
* counters
* shopping carts
* filters
* lists

Those apps worked entirely with:

* local state
* local arrays
* user interaction

But App 61 introduces a completely different problem:

```txt
The data does not exist yet.
```

The application must now handle:

* waiting for the server
* successful responses
* failed responses
* retry actions
* asynchronous rendering

This is the first major architecture jump of the project.

---

# 3. Why `useEffect` Exists

One of the biggest misunderstandings in React is when to use `useEffect`.

Many beginners use Effects for everything.

That is incorrect.

React’s documentation strongly emphasizes:

> Effects should synchronize your component with external systems.

Examples of external systems:

* APIs
* browser subscriptions
* timers
* WebSockets
* localStorage
* DOM integrations

App 61 uses an external REST API.

So this is one of the correct use cases for `useEffect`.

Official documentation:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)

---

# 4. Creating the Project

Use PowerShell:

```powershell
cd C:\ReactApps

New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app61-rest-api-consumption -- --template react-ts

cd app61-rest-api-consumption

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Vite is used because it provides:

* fast startup
* Hot Module Replacement
* modern ES module support
* optimized production builds
* excellent TypeScript integration

Official documentation:

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# 5. Creating the Folder Structure

Professional React applications should separate responsibilities.

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\Post.ts -ItemType File
New-Item src\services\postService.ts -ItemType File
New-Item src\components\PostCard.tsx -ItemType File
New-Item src\components\PostList.tsx -ItemType File
```

Final structure:

```txt
app61-rest-api-consumption/
  src/
    components/
      PostCard.tsx
      PostList.tsx

    models/
      Post.ts

    services/
      postService.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

This structure is extremely important because it introduces layered architecture.

---

# 6. The Role of Each Folder

| Folder        | Responsibility                  |
| ------------- | ------------------------------- |
| `components/` | UI rendering components         |
| `models/`     | TypeScript interfaces and types |
| `services/`   | API communication logic         |
| `styles/`     | CSS organization                |
| `App.tsx`     | Main orchestration component    |
| `main.tsx`    | React entry point               |

This separation becomes critical later in:

* dashboards
* Graph integrations
* SharePoint apps
* admin portals
* enterprise systems

---

# 7. Create the TypeScript Model

## `src\models\Post.ts`

```ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

This interface defines the structure of the API response.

Each post contains:

* id
* userId
* title
* body

TypeScript models matter because APIs return raw JSON.

Without typing:

```ts
const posts: any[] = [];
```

the application becomes weaker.

With interfaces:

```ts
const posts: Post[] = [];
```

you gain:

* autocomplete
* validation
* safer refactoring
* better architecture
* clearer intent

---

# 8. Create the Service Layer

## `src\services\postService.ts`

```ts
import type { Post } from "../models/Post";

const API_URL =
  "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Failed to load posts from the REST API."
    );
  }

  const data: Post[] = await response.json();

  return data;
}
```

This file is one of the most important architectural improvements of the entire app.

Instead of placing the fetch logic inside the UI component, the request is isolated inside a service.

That means:

* App.tsx does not know the API URL
* App.tsx does not know how fetch works
* App.tsx does not know how JSON parsing works

The component only says:

```ts
const data = await getPosts();
```

This is cleaner and more scalable.

---

# 9. Why Service Layers Matter

A beginner app often looks like this:

```tsx
useEffect(() => {
  fetch("api-url")
    .then((response) => response.json())
    .then((data) => setPosts(data));
}, []);
```

This works.

But it becomes messy in large applications.

Professional React apps usually isolate infrastructure logic:

```txt
services/
  userService.ts
  ticketService.ts
  reportService.ts
  graphService.ts
```

This makes the application easier to:

* maintain
* debug
* test
* scale

---

# 10. Understanding the Fetch API

The service uses:

```ts
fetch(API_URL)
```

The Fetch API is the browser-native API for making HTTP requests.

Official documentation:

* [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API?utm_source=chatgpt.com)

The request flow is:

```txt
fetch()
→ HTTP request
→ server response
→ response object
→ response.json()
→ JavaScript object
```

---

# 11. Why `response.ok` Is Important

The service validates:

```ts
if (!response.ok)
```

This is important because `fetch` only rejects automatically on network failures.

HTTP errors like:

* 404
* 500
* 401

may still return a response object.

Professional code should validate the response explicitly.

---

# 12. Create the Post Card Component

## `src\components\PostCard.tsx`

```tsx
import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  Text,
} from "@fluentui/react-components";

import type { Post } from "../models/Post";

interface PostCardProps {
  post: Post;
}

export function PostCard({
  post,
}: PostCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        height: "100%",
      }}
    >
      <CardHeader
        header={
          <Text weight="semibold">
            {post.title}
          </Text>
        }
        description={
          <Caption1>
            User #{post.userId} · Post #{post.id}
          </Caption1>
        }
      />

      <Body1>
        {post.body}
      </Body1>
    </Card>
  );
}
```

This component has one responsibility:

```txt
Render one post.
```

It does not fetch data.

It does not know the API.

It only receives props and renders JSX.

This is good React component design.

---

# 13. Why Fluent UI Is Used

The application uses Fluent UI as the visual layer.

Fluent UI provides:

* accessibility
* enterprise styling
* Microsoft design standards
* reusable components
* typography systems
* spacing systems

Official documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com)

---

# 14. Create the Post List Component

## `src\components\PostList.tsx`

```tsx
import type { Post } from "../models/Post";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({
  posts,
}: PostListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
```

This component converts data into UI.

The important part is:

```tsx
posts.map(...)
```

This transforms:

* data
  into:
* components

The rendering becomes declarative.

---

# 15. Understanding Declarative Rendering

React does not manually create DOM nodes imperatively.

Instead, you describe:

```txt
For each post, render a PostCard.
```

React handles:

* DOM creation
* DOM updates
* reconciliation

This is one of React’s most important ideas.

---

# 16. Create the Root App

## `src\App.tsx`

```tsx
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  ArrowClockwise24Regular,
} from "@fluentui/react-icons";

import { PostList } from "./components/PostList";

import type { Post } from "./models/Post";

import { getPosts } from "./services/postService";

function App() {
  const [posts, setPosts] =
    useState<Post[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  async function loadPosts() {
    try {
      setLoading(true);

      setError(null);

      const data = await getPosts();

      setPosts(data.slice(0, 12));
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while loading posts.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

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
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <header>
          <Title1>
            REST API Consumption
          </Title1>

          <Text>
            App 61 demonstrates API consumption using React,
            TypeScript, Fluent UI, useEffect, loading state,
            error state, and a service layer.
          </Text>
        </header>

        <div>
          <Button
            appearance="primary"
            icon={<ArrowClockwise24Regular />}
            onClick={loadPosts}
          >
            Reload posts
          </Button>
        </div>

        {loading && (
          <Card
            style={{
              padding: "32px",
            }}
          >
            <Spinner
              label="Loading posts from the API..."
            />
          </Card>
        )}

        {error && (
          <Card
            style={{
              padding: "24px",
            }}
          >
            <Text weight="semibold">
              Error
            </Text>

            <Text>
              {error}
            </Text>
          </Card>
        )}

        {!loading && !error && (
          <PostList posts={posts} />
        )}
      </section>
    </main>
  );
}

export default App;
```

---

# 17. Understanding the State Variables

The app contains three important states:

```tsx
posts
loading
error
```

Each one represents a different aspect of the request lifecycle.

---

## `posts`

Stores the successful API data.

Initial value:

```tsx
[]
```

---

## `loading`

Controls whether the request is currently running.

When true:

* the spinner appears

---

## `error`

Stores the error message.

When null:

* no error exists

When string:

* the UI shows the error card

---

# 18. Understanding the API Lifecycle

The rendering lifecycle is:

```txt
Initial render
→ useEffect runs
→ API request starts
→ loading = true
→ response returns
→ posts update
→ loading = false
→ React re-renders
→ PostList appears
```

If the request fails:

```txt
Request fails
→ catch block runs
→ error updates
→ loading becomes false
→ React re-renders
→ error card appears
```

---

# 19. Understanding `try/catch/finally`

The request uses:

```ts
try
catch
finally
```

This pattern is extremely important.

| Block     | Purpose                               |
| --------- | ------------------------------------- |
| `try`     | Runs successful logic                 |
| `catch`   | Handles failures                      |
| `finally` | Runs regardless of success or failure |

Without `finally`, the app could remain stuck in loading forever after an error.

---

# 20. Understanding `useEffect`

The key line is:

```tsx
useEffect(() => {
  loadPosts();
}, []);
```

The empty dependency array means:

```txt
Run after the first render only.
```

This is correct because:

* the component appears
* the app needs API data
* synchronization must begin

---

# 21. Why This App Does Need Effects

Earlier apps intentionally avoided Effects.

That was correct.

Examples:

* dialogs
* counters
* forms
* tabs
* filters

These usually involve only internal UI logic.

But App 61 synchronizes with:

* a network
* an API
* an external server

So Effects are appropriate here.

---

# 22. Create `main.tsx`

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

This file connects React to the browser.

---

# 23. Create `index.css`

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

# 24. Run the Application

Development:

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

# 25. Complete Rendering Flow

```txt
index.html
  contains div#root

main.tsx
  mounts React

App.tsx
  owns state

useEffect
  calls loadPosts()

loadPosts()
  calls getPosts()

postService.ts
  calls fetch()

API
  returns JSON

setPosts()
  updates state

React
  re-renders

PostList
  renders PostCard components
```

---

# 26. Technical Summary

| Concept          | Explanation                        |
| ---------------- | ---------------------------------- |
| REST API         | External JSON endpoint             |
| Fetch API        | Native browser HTTP API            |
| `useEffect`      | Synchronizes with external systems |
| Service layer    | Isolates API logic                 |
| TypeScript model | Defines response structure         |
| Loading state    | Controls spinner rendering         |
| Error state      | Controls error rendering           |
| Fluent UI        | Microsoft design system            |
| PostList         | Renders data collections           |
| PostCard         | Renders individual items           |

---

# 27. Concept Table

| Concept         | File             | Responsibility            |
| --------------- | ---------------- | ------------------------- |
| API model       | `Post.ts`        | Defines data shape        |
| Service layer   | `postService.ts` | Handles API communication |
| Loading state   | `App.tsx`        | Controls loading UI       |
| Error state     | `App.tsx`        | Controls error UI         |
| Effect          | `App.tsx`        | Starts synchronization    |
| Card rendering  | `PostCard.tsx`   | Displays one post         |
| List rendering  | `PostList.tsx`   | Displays collection       |
| Fluent Provider | `main.tsx`       | Enables Microsoft theme   |
| Global CSS      | `index.css`      | Resets browser styling    |

---

# 28. Official Documentation

| Topic                         | Documentation                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| React Learn                   | [https://react.dev/learn](https://react.dev/learn)                                                                       |
| Synchronizing with Effects    | [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)                 |
| Lifecycle of Reactive Effects | [https://react.dev/learn/lifecycle-of-reactive-effects](https://react.dev/learn/lifecycle-of-reactive-effects)           |
| You Might Not Need an Effect  | [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)             |
| useEffect Reference           | [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)                               |
| Fluent UI                     | [https://developer.microsoft.com/en-us/fluentui](https://developer.microsoft.com/en-us/fluentui)                         |
| Vite Guide                    | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                       |
| TypeScript Docs               | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                             |
| Fetch API                     | [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |

---

# 29. Final Architectural Insight

The most important lesson of App 61 is understanding asynchronous rendering in React.

The UI does not wait for the API.

Instead:

```txt
React renders first.
Effect runs later.
API responds later.
State updates later.
React re-renders later.
```

This architecture becomes the foundation for:

* dashboards
* Graph integrations
* SharePoint apps
* enterprise portals
* analytics systems
* admin panels
* ticket systems
* CRM applications

App 61 is the first true external synchronization app of the ReactLab journey.

---

# Current Project Progress

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 3 |  60 | Corporate Explorer   | Completed |
| Block 4 |  61 | REST API Consumption | Current   |
| Block 4 |  62 | Dashboard with API   | Next      |
