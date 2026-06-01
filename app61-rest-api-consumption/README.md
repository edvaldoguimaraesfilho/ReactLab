Você está certo. A resposta anterior ficou curta demais. Segue **App 61 no modelo correto da série**.

```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 61: REST API Consumption with React, TypeScript, Vite, Fluent UI, and useEffect

## Introduction

In **App 61 — REST API Consumption**, we officially start **Block 4 — Effects and Architecture** of the ReactLab project. Until App 60, the project focused heavily on interface construction, state, forms, events, Fluent UI components, dashboards, dialogs, tickets, CRM screens, calendars, and enterprise visual composition. Now the project enters a new technical phase: connecting React applications to external systems.

This app is important because modern enterprise React applications rarely live only with static data. Real applications usually need to load information from APIs, services, databases, Microsoft Graph, SharePoint, CRM systems, ERP systems, reporting services, audit logs, ticket systems, or external REST endpoints.

The roadmap defines App 61 as **“Consumo de API REST”**, the first application in **Block 4 — Effects and Architecture**, whose goals include `useEffect`, APIs, loading/error handling, custom hooks, services, models, organization in layers, `useMemo`, `useCallback`, and `useReducer`. 

The central idea of this app is:

```txt
React renders the UI.
useEffect synchronizes with the external API.
The service layer performs the HTTP request.
State stores loading, error, and data.
The UI reacts to each state.
```

React’s official documentation explains that Effects are used to synchronize a component with systems outside React, such as a network request or external service. ([React][1])

---

# 1. What This App Teaches

App 61 teaches the first professional API pattern in React:

```txt
Component
→ useEffect
→ service function
→ fetch API
→ response validation
→ state update
→ UI rendering
```

The app teaches:

| Concept               | Meaning                                          |
| --------------------- | ------------------------------------------------ |
| REST API              | External HTTP endpoint consumed by the React app |
| `useEffect`           | Runs synchronization logic after rendering       |
| Fetch API             | Native browser API used to make HTTP requests    |
| Service layer         | Separates API logic from UI components           |
| TypeScript model      | Defines the shape of the API data                |
| Loading state         | Shows feedback while the API request is running  |
| Error state           | Shows feedback when the request fails            |
| Data state            | Stores the successful API result                 |
| Fluent UI             | Creates a Microsoft-style interface              |
| Component composition | Splits the app into small focused files          |

The most important lesson is:

```txt
Do not put everything inside App.tsx.
Create models, services, and components.
```

---

# 2. Why App 61 Belongs to Block 4

Block 4 is about **Effects and Architecture**.

This is the point where the project moves from local UI behavior into external synchronization.

Before this app, many examples could be built with:

```txt
props
state
events
forms
lists
conditional rendering
Fluent UI components
```

But API consumption adds a new problem:

```txt
The data does not exist when the component first renders.
```

That means the app needs to handle several states:

```txt
Initial render
Loading
Success
Error
Retry
```

This is why App 61 is the correct place to introduce `useEffect`.

React’s documentation also warns that not every problem needs an Effect. Effects are an escape hatch for synchronization with an external system; when there is no external system, you should usually avoid them. ([React][2])

Here, there **is** an external system: a REST API.

So `useEffect` is appropriate.

---

# 3. Create the Project

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

Vite is used because it is a fast modern frontend build tool designed for modern web applications. ([vitejs][3])

---

# 4. Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory
New-Item artigo.md -ItemType File
```

Create the application files:

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
  package.json
  vite.config.ts
  tsconfig.json
```

This structure matters because App 61 is not only about fetching data. It is about learning the first step toward enterprise architecture.

---

# 5. Create the Data Model

## `src\models\Post.ts`

```ts
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
```

This interface defines the expected shape of each post returned by the REST API.

A post contains:

| Property | Type     | Meaning                |
| -------- | -------- | ---------------------- |
| `id`     | `number` | Unique post identifier |
| `userId` | `number` | Owner/user identifier  |
| `title`  | `string` | Post title             |
| `body`   | `string` | Post content           |

This is important because APIs return plain JSON. TypeScript helps the application treat that JSON with a predictable structure.

Without a model, your code becomes weaker:

```ts
const posts: any[] = [];
```

With a model, your code becomes safer:

```ts
const posts: Post[] = [];
```

This improves autocomplete, refactoring, readability, and maintainability.

---

# 6. Create the API Service Layer

## `src\services\postService.ts`

```ts
import type { Post } from "../models/Post";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load posts from the REST API.");
  }

  const data: Post[] = await response.json();

  return data;
}
```

This file is one of the most important parts of the app.

The service layer isolates API logic from the UI.

That means `App.tsx` does not need to know:

```txt
What is the API URL?
How is fetch called?
How is response.ok validated?
How is JSON converted?
What error is thrown?
```

The component only calls:

```ts
const data = await getPosts();
```

This is cleaner and more professional.

---

# 7. Why the Service Layer Matters

A beginner approach would place the entire fetch directly inside the component:

```tsx
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => setPosts(data));
}, []);
```

That works, but it does not scale well.

A professional approach separates responsibilities:

```txt
postService.ts
  knows how to call the API

App.tsx
  knows when to load the data

PostList.tsx
  knows how to render the list

PostCard.tsx
  knows how to render one item
```

This creates a cleaner architecture.

Later, this same pattern can evolve into:

```txt
services/
  userService.ts
  ticketService.ts
  projectService.ts
  reportService.ts
  auditService.ts
  graphService.ts
```

This is the beginning of real enterprise React architecture.

---

# 8. Create the Post Card Component

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

export function PostCard({ post }: PostCardProps) {
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

## Explanation

`PostCard` has one responsibility:

```txt
Render one post.
```

It receives a post through props:

```tsx
interface PostCardProps {
  post: Post;
}
```

This follows the React component model:

```txt
props in
JSX out
```

The component does not fetch data. It does not manage loading. It does not know the API URL.

It only renders the data it receives.

That is good component design.

Fluent UI provides the visual structure through `Card`, `CardHeader`, `Text`, `Caption1`, and `Body1`. Fluent UI is Microsoft’s component system for building web applications with accessible, reusable components. ([Microsoft Developer][4])

---

# 9. Create the Post List Component

## `src\components\PostList.tsx`

```tsx
import type { Post } from "../models/Post";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
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

## Explanation

`PostList` receives an array:

```tsx
posts: Post[];
```

Then it transforms the data into UI:

```tsx
posts.map((post) => (
  <PostCard key={post.id} post={post} />
))
```

This reinforces a core React pattern:

```txt
Data array
→ map()
→ component list
```

The `key` is important because React uses it to identify each rendered item.

This component also uses CSS Grid to create a responsive layout.

The layout means:

```txt
Create as many columns as fit.
Each card must be at least 280px.
Use remaining space equally.
```

---

# 10. Create the Root App

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

import { ArrowClockwise24Regular } from "@fluentui/react-icons";

import { PostList } from "./components/PostList";
import type { Post } from "./models/Post";
import { getPosts } from "./services/postService";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            App 61 demonstrates how to consume a REST API using React,
            TypeScript, Vite, Fluent UI, a service layer, loading state,
            error state, and useEffect.
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
            <Spinner label="Loading posts from the API..." />
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

# 11. Understanding the State Variables

The app has three important pieces of state:

```tsx
const [posts, setPosts] = useState<Post[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

## `posts`

Stores the API data:

```tsx
Post[]
```

At the beginning, it is empty:

```tsx
[]
```

After the API call succeeds, it receives the posts.

## `loading`

Controls whether the app is currently waiting for the API.

When `loading` is `true`, the app shows:

```tsx
<Spinner />
```

## `error`

Stores the error message if the request fails.

It can be:

```tsx
string
```

or:

```tsx
null
```

`null` means there is no error.

---

# 12. Understanding the API Flow

The function:

```tsx
async function loadPosts()
```

controls the full request lifecycle.

The flow is:

```txt
User opens the app
→ useEffect runs
→ loadPosts starts
→ loading becomes true
→ error becomes null
→ getPosts calls the API
→ data returns
→ posts state updates
→ loading becomes false
→ React re-renders the UI
```

If something fails:

```txt
API fails
→ catch block runs
→ error state receives message
→ loading becomes false
→ React shows the error card
```

This is the professional loading/error/data pattern.

---

# 13. Why `try/catch/finally` Is Used

```tsx
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
```

This structure is important.

| Block     | Purpose                       |
| --------- | ----------------------------- |
| `try`     | Runs the successful API logic |
| `catch`   | Handles failures              |
| `finally` | Runs after success or failure |

The `finally` block ensures that loading stops whether the request succeeds or fails.

Without `finally`, the app could stay stuck forever in a loading state after an error.

---

# 14. Why `response.ok` Matters

Inside the service:

```ts
if (!response.ok) {
  throw new Error("Failed to load posts from the REST API.");
}
```

This matters because `fetch` only rejects automatically for network-level failures.

For example, an HTTP 404 or 500 response may still produce a response object.

So professional API code usually checks:

```ts
response.ok
```

before reading the JSON.

The browser Fetch API is the native interface for making network requests from web applications. ([React][5])

---

# 15. Understanding `useEffect`

The key code is:

```tsx
useEffect(() => {
  loadPosts();
}, []);
```

The empty dependency array means:

```txt
Run this effect after the first render.
```

This is appropriate here because:

```txt
The component appears.
The app needs to synchronize with an external API.
The data should be loaded.
```

React describes Effects as a way to synchronize a component with an external system. ([React][1])

The external system in this app is:

```txt
https://jsonplaceholder.typicode.com/posts
```

---

# 16. Why This App Does Need `useEffect`

Earlier apps often avoided `useEffect`.

That was correct.

For example:

```txt
Form validation
Filtering local arrays
Opening dialogs
Changing tabs
Updating counters
```

These usually do not need Effects.

But App 61 is different.

It needs to communicate with an external network resource.

So this app is one of the correct use cases for `useEffect`.

The rule is:

```txt
Internal UI logic → usually no useEffect
External synchronization → useEffect may be needed
```

---

# 17. Why `loadPosts` Is Also Used by the Reload Button

The same function is used in two places:

```tsx
useEffect(() => {
  loadPosts();
}, []);
```

and:

```tsx
<Button onClick={loadPosts}>
  Reload posts
</Button>
```

This is good because the API loading logic is not duplicated.

The function represents one action:

```txt
Load posts from API.
```

It can be triggered:

```txt
Automatically when the app starts
Manually when the user clicks Reload
```

This is a useful enterprise pattern.

---

# 18. Create the React Entry Point

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

This file connects React to the HTML page.

The hierarchy is:

```txt
React.StrictMode
  FluentProvider
    App
```

`FluentProvider` is required so Fluent UI components receive the Microsoft theme, design tokens, and visual system.

---

# 19. Create the Global CSS

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

This removes the default browser margin and applies a Microsoft-style font.

---

# 20. Run the Application

Development server:

```powershell
npm run dev
```

Production validation:

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
index.html
  contains div#root

main.tsx
  mounts React into div#root

App.tsx
  owns posts, loading, and error state

useEffect
  calls loadPosts after initial render

loadPosts
  calls getPosts from postService.ts

postService.ts
  calls REST API using fetch

API response
  returns JSON data

setPosts
  stores API data in React state

React re-renders
  shows PostList

PostList
  maps posts into PostCard components

PostCard
  renders one post with Fluent UI
```

This is the full architecture.

---

# 22. Technical Summary

| Concept          | Explanation                                    |
| ---------------- | ---------------------------------------------- |
| REST API         | External HTTP endpoint that provides JSON data |
| `fetch`          | Browser-native API used for HTTP requests      |
| `useEffect`      | Runs synchronization logic after render        |
| `Post.ts`        | TypeScript model for API data                  |
| `postService.ts` | Service layer responsible for API access       |
| `loading` state  | Controls the loading spinner                   |
| `error` state    | Controls error feedback                        |
| `posts` state    | Stores successful API response data            |
| `PostList`       | Renders a collection of posts                  |
| `PostCard`       | Renders one post                               |
| Fluent UI        | Provides Microsoft-style visual components     |
| Vite             | Provides fast React development tooling        |

---

# 23. Concept Table

| Concept         | File                          | Why It Matters                       |
| --------------- | ----------------------------- | ------------------------------------ |
| Data model      | `src/models/Post.ts`          | Defines the shape of API data        |
| Service layer   | `src/services/postService.ts` | Keeps API code outside UI components |
| API call        | `postService.ts`              | Uses `fetch` to request JSON data    |
| Loading state   | `App.tsx`                     | Shows feedback during async work     |
| Error state     | `App.tsx`                     | Shows feedback when request fails    |
| Data state      | `App.tsx`                     | Stores the successful API response   |
| Effect          | `App.tsx`                     | Loads data after initial render      |
| List rendering  | `PostList.tsx`                | Converts array data into components  |
| Card rendering  | `PostCard.tsx`                | Displays one API item                |
| Fluent Provider | `main.tsx`                    | Applies Microsoft Fluent UI theme    |
| Global CSS      | `index.css`                   | Removes default browser spacing      |

---

# 24. Official Documentation

| Topic                         | Documentation                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| React Learn                   | [https://react.dev/learn](https://react.dev/learn)                                                                       |
| Synchronizing with Effects    | [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)                 |
| You Might Not Need an Effect  | [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)             |
| Lifecycle of Reactive Effects | [https://react.dev/learn/lifecycle-of-reactive-effects](https://react.dev/learn/lifecycle-of-reactive-effects)           |
| useEffect Reference           | [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)                               |
| Fluent UI React Components    | [https://developer.microsoft.com/en-us/fluentui](https://developer.microsoft.com/en-us/fluentui)                         |
| Fluent UI Storybook           | [https://storybooks.fluentui.dev/react](https://storybooks.fluentui.dev/react)                                           |
| Vite Guide                    | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                       |
| TypeScript Docs               | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                             |
| Fetch API                     | [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) |

---

# 25. Final Didactic Insight

The most important lesson from App 61 is that API data is not immediately available during the first render.

React first renders the component.

Then the Effect runs.

Then the API responds.

Then state updates.

Then React renders again.

The mental model is:

```txt
Initial UI
→ Effect runs
→ API request
→ Loading state
→ Data or error state
→ Final UI
```

This app prepares the foundation for:

```txt
App 62 — Dashboard with API
App 63 — Async Search
App 64 — GitHub User Explorer
App 65 — Weather App
App 66 — Pagination System
App 67 — Infinite Scroll
App 68 — Data Cache
App 69 — Custom Fetch Hook
```

So App 61 is not just “fetch data”.

It is the first step toward professional React architecture.

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
| Block 3 |  57 | Project Management            | Completed |
| Block 3 |  58 | Ticket Control                | Completed |
| Block 3 |  59 | Visual CRM                    | Completed |
| Block 3 |  60 | Corporate Explorer            | Completed |
| Block 4 |  61 | REST API Consumption          | Current   |
| Block 4 |  62 | Dashboard with API            | Next      |

[1]: https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com "Synchronizing with Effects"
[2]: https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com "You Might Not Need an Effect"
[3]: https://vite.dev/?utm_source=chatgpt.com "Vite | Next Generation Frontend Tooling"
[4]: https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com "Fluent UI - Get started"
[5]: https://react.dev/reference/react/useEffect?utm_source=chatgpt.com "useEffect"
