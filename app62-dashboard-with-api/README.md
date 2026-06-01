# App 62 — Dashboard with API

App 62 belongs to **Block 4 — Effects and Architecture**, focused on `useEffect`, APIs, loading/error states, services, hooks, and layered organization. 

```powershell
cd C:\ReactApps

New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app62-dashboard-with-api -- --template react-ts
cd app62-dashboard-with-api

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\DashboardPost.ts -ItemType File
New-Item src\services\dashboardService.ts -ItemType File
New-Item src\components\KpiCard.tsx -ItemType File
New-Item src\components\PostsPanel.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## `src\models\DashboardPost.ts`

```ts
export interface DashboardPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

## `src\services\dashboardService.ts`

```ts
import type { DashboardPost } from "../models/DashboardPost";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getDashboardPosts(): Promise<DashboardPost[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load dashboard data.");
  }

  return response.json();
}
```

## `src\components\KpiCard.tsx`

```tsx
import { Card, Text, Title2 } from "@fluentui/react-components";

interface KpiCardProps {
  title: string;
  value: string;
  description: string;
}

export function KpiCard({ title, value, description }: KpiCardProps) {
  return (
    <Card style={{ padding: "24px" }}>
      <Text>{title}</Text>
      <Title2>{value}</Title2>
      <Text size={200}>{description}</Text>
    </Card>
  );
}
```

## `src\components\PostsPanel.tsx`

```tsx
import { Card, Text, Title3 } from "@fluentui/react-components";
import type { DashboardPost } from "../models/DashboardPost";

interface PostsPanelProps {
  posts: DashboardPost[];
}

export function PostsPanel({ posts }: PostsPanelProps) {
  return (
    <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
      {posts.slice(0, 6).map((post) => (
        <Card key={post.id} style={{ padding: "20px" }}>
          <Title3>{post.title}</Title3>
          <Text>{post.body}</Text>
        </Card>
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  ArrowClockwise24Regular,
  Database24Regular,
} from "@fluentui/react-icons";

import type { DashboardPost } from "./models/DashboardPost";
import { getDashboardPosts } from "./services/dashboardService";
import { KpiCard } from "./components/KpiCard";
import { PostsPanel } from "./components/PostsPanel";

function App() {
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboardData() {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardPosts();
      setPosts(data);
    } catch {
      setError("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalPosts = posts.length;
  const totalUsers = new Set(posts.map((post) => post.userId)).size;
  const latestPost = posts[0]?.title ?? "No data";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <div>
            <Title1>Dashboard with API</Title1>
            <Text>
              Enterprise dashboard consuming external REST data with loading
              and error states.
            </Text>
          </div>

          <Button
            appearance="primary"
            icon={<ArrowClockwise24Regular />}
            onClick={loadDashboardData}
          >
            Refresh
          </Button>
        </div>

        {loading && (
          <div style={{ marginTop: "40px" }}>
            <Spinner label="Loading dashboard data..." />
          </div>
        )}

        {error && (
          <Card style={{ marginTop: "32px", padding: "24px" }}>
            <Text weight="semibold">{error}</Text>
          </Card>
        )}

        {!loading && !error && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
                marginTop: "32px",
              }}
            >
              <KpiCard
                title="Total Posts"
                value={String(totalPosts)}
                description="Records loaded from the API."
              />

              <KpiCard
                title="Users"
                value={String(totalUsers)}
                description="Distinct users found in the response."
              />

              <KpiCard
                title="Latest Item"
                value="API"
                description={latestPost}
              />

              <KpiCard
                title="Source"
                value="REST"
                description="Data loaded with fetch and useEffect."
              />
            </div>

            <div style={{ marginTop: "40px" }}>
              <Title1>
                <Database24Regular /> Recent API Records
              </Title1>

              <PostsPanel posts={posts} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
```

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

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

## Run

```powershell
npm run dev
npm run build
npm run preview
```

## Technical Summary

| Concept       | Use                                     |
| ------------- | --------------------------------------- |
| `useEffect`   | Load API data when the component mounts |
| `fetch`       | Call external REST endpoint             |
| Service layer | Keep API logic outside `App.tsx`        |
| Loading state | Show `Spinner` while waiting            |
| Error state   | Show feedback if request fails          |
| Derived data  | Calculate KPIs from `posts`             |
| Fluent UI     | Build Microsoft-style dashboard cards   |

## Progress

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 4 |  61 | REST API Consumption | Completed |
| Block 4 |  62 | Dashboard with API   | Current   |
| Block 4 |  63 | Async Search         | Next      |
