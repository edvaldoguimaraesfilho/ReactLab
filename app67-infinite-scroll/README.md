Perfeito. **App 67 — Infinite Scroll**, seguindo o modelo correto do projeto ReactLab. A estrutura das 100 apps coloca a App 67 como **Infinite Scroll** dentro do Bloco 4 — Effects e Arquitetura. 

# App 67 — Infinite Scroll

## 1. PowerShell commands

```powershell
cd C:\ReactApps

New-Item bloco04 -ItemType Directory
cd bloco04

npm create vite@latest app67-infinite-scroll -- --template react-ts

cd app67-infinite-scroll

npm install

npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\ArticleItem.ts -ItemType File
New-Item src\services\articleService.ts -ItemType File
New-Item src\hooks\useInfiniteArticles.ts -ItemType File
New-Item src\components\ArticleCard.tsx -ItemType File
New-Item src\components\InfiniteArticleList.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 2. `src\models\ArticleItem.ts`

```ts
export interface ArticleItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  readTime: string;
}
```

---

# 3. `src\services\articleService.ts`

```ts
import type { ArticleItem } from "../models/ArticleItem";

const articles: ArticleItem[] = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  title: `Enterprise React Article ${index + 1}`,
  summary:
    "This article explains a modern React concept using TypeScript, Fluent UI, and enterprise architecture patterns.",
  category:
    index % 3 === 0
      ? "React"
      : index % 3 === 1
        ? "Architecture"
        : "Fluent UI",
  readTime: `${4 + (index % 6)} min read`,
}));

export interface ArticlePageResult {
  items: ArticleItem[];
  hasMore: boolean;
}

export async function getArticlesPage(
  page: number,
  pageSize: number
): Promise<ArticlePageResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const items = articles.slice(startIndex, endIndex);

  return {
    items,
    hasMore: endIndex < articles.length,
  };
}
```

---

# 4. `src\hooks\useInfiniteArticles.ts`

```ts
import { useCallback, useEffect, useRef, useState } from "react";
import type { ArticleItem } from "../models/ArticleItem";
import { getArticlesPage } from "../services/articleService";

const PAGE_SIZE = 8;

export function useInfiniteArticles() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const loadArticles = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    const result = await getArticlesPage(page, PAGE_SIZE);

    setArticles((currentArticles) => [
      ...currentArticles,
      ...result.items,
    ]);

    setHasMore(result.hasMore);
    setPage((currentPage) => currentPage + 1);
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    const target = observerTargetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting) {
          loadArticles();
        }
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadArticles]);

  return {
    articles,
    hasMore,
    isLoading,
    observerTargetRef,
  };
}
```

`useEffect` é correto aqui porque estamos sincronizando React com um sistema externo do browser. A documentação oficial do React explica que Effects servem para sincronizar componentes com sistemas externos, e o `IntersectionObserver` é uma Web API externa ao React. ([React][1])

---

# 5. `src\components\ArticleCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import { DocumentText24Regular } from "@fluentui/react-icons";

import type { ArticleItem } from "../models/ArticleItem";

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<DocumentText24Regular />}
        header={<Text weight="semibold">{article.title}</Text>}
        description={<Caption1>{article.readTime}</Caption1>}
      />

      <Body1>{article.summary}</Body1>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance="tint">{article.category}</Badge>
      </div>
    </Card>
  );
}
```

---

# 6. `src\components\InfiniteArticleList.tsx`

```tsx
import {
  Button,
  Spinner,
  Text,
} from "@fluentui/react-components";

import { ArticleCard } from "./ArticleCard";
import { useInfiniteArticles } from "../hooks/useInfiniteArticles";

export function InfiniteArticleList() {
  const {
    articles,
    hasMore,
    isLoading,
    observerTargetRef,
  } = useInfiniteArticles();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "32px",
        }}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <div
        ref={observerTargetRef}
        style={{
          minHeight: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        {isLoading && (
          <Spinner label="Loading more articles..." />
        )}

        {!hasMore && !isLoading && (
          <Text weight="semibold">
            All articles were loaded.
          </Text>
        )}

        {hasMore && !isLoading && (
          <Button appearance="subtle">
            Scroll down to load more
          </Button>
        )}
      </div>
    </>
  );
}
```

---

# 7. `src\App.tsx`

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { InfiniteArticleList } from "./components/InfiniteArticleList";

function App() {
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
        }}
      >
        <Title1>App 67 — Infinite Scroll</Title1>

        <Text>
          An enterprise React infinite scrolling interface using
          TypeScript, Fluent UI, custom hooks, simulated API loading,
          and IntersectionObserver.
        </Text>

        <InfiniteArticleList />
      </section>
    </main>
  );
}

export default App;
```

---

# 8. `src\main.tsx`

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

# 9. `src\index.css`

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

# 10. Run

```powershell
npm run dev
```

Validate:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# Technical Blog Article — App 67: Infinite Scroll with React, TypeScript, Vite, and Fluent UI

## Introduction

In App 67, we build an enterprise-style **Infinite Scroll** interface using React, TypeScript, Vite, Fluent UI, a custom hook, a simulated service layer, and the browser `IntersectionObserver` API.

This app belongs to Block 4 of the ReactLab roadmap, where the focus is **Effects and Architecture**. The purpose is no longer only rendering static UI or handling basic state. Now we start synchronizing React components with external systems, organizing logic into hooks, separating data loading from UI, and building scalable application patterns.

Infinite scroll is common in:

| System                  | Example                    |
| ----------------------- | -------------------------- |
| Microsoft-style portals | activity feeds             |
| SharePoint intranets    | news lists                 |
| CRM systems             | customer records           |
| ticket systems          | issue lists                |
| dashboards              | audit logs                 |
| social feeds            | continuous content loading |

The important React lesson is this:

```txt
Scrolling is not React state by itself.
Visibility detection comes from the browser.
React must synchronize with that external browser API.
```

That is why `useEffect` is appropriate here. React’s official documentation defines Effects as the mechanism for synchronizing with systems outside React, while MDN defines `IntersectionObserver` as a browser API for asynchronously observing element visibility changes. ([React][1])

## Mental Model

The rendering flow is:

```txt
App
  renders InfiniteArticleList

InfiniteArticleList
  calls useInfiniteArticles

useInfiniteArticles
  loads page 1

User scrolls down

IntersectionObserver detects sentinel visibility

Hook loads next page

State updates

React re-renders the article grid
```

The most important idea:

```txt
Data changes.
State changes.
React re-renders.
The UI grows automatically.
```

## Why We Use a Custom Hook

The file:

```txt
src/hooks/useInfiniteArticles.ts
```

contains the loading logic.

This is better than placing everything in `App.tsx`.

Bad architecture:

```txt
App.tsx
  UI
  state
  fetch logic
  observer logic
  pagination logic
```

Better architecture:

```txt
App.tsx
  page layout

InfiniteArticleList.tsx
  list rendering

useInfiniteArticles.ts
  loading and observer logic

articleService.ts
  data access
```

This separation prepares the project for larger enterprise apps.

## Why IntersectionObserver Is Better Than Scroll Events

A beginner might try this:

```ts
window.addEventListener("scroll", ...)
```

But scroll events can fire many times and become harder to control.

`IntersectionObserver` is designed specifically to observe when an element enters the viewport. In this app, the observed element is a small invisible target at the bottom of the list. When it becomes visible, we load the next page.

MDN describes the Intersection Observer API as a way to asynchronously observe changes between a target element and the viewport or an ancestor element. ([MDN Web Docs][2])

## Why Cleanup Matters

This part is critical:

```ts
return () => {
  observer.disconnect();
};
```

The observer belongs to the browser, not React.

When the component unmounts or the effect re-runs, we must disconnect the observer.

This avoids:

| Problem                | Cause                                       |
| ---------------------- | ------------------------------------------- |
| memory leaks           | old observers still active                  |
| duplicate loading      | multiple observers watching the same target |
| unpredictable behavior | stale callbacks                             |
| performance issues     | unnecessary browser work                    |

## Why We Separate the Service Layer

The file:

```txt
src/services/articleService.ts
```

simulates an API.

Today it uses local mock data. Later, the same file could call:

```ts
fetch("https://api.example.com/articles")
```

The UI would not need to know the difference.

This is professional architecture:

```txt
Component does not know where data comes from.
Hook controls loading behavior.
Service controls data access.
```

## Technical Summary

| Concept                | Explanation                                         |
| ---------------------- | --------------------------------------------------- |
| Infinite Scroll        | Loads more content when the user reaches the bottom |
| `useEffect`            | Synchronizes React with `IntersectionObserver`      |
| `useRef`               | Stores the DOM element observed by the browser      |
| `useCallback`          | Stabilizes the loading function used by the effect  |
| `IntersectionObserver` | Browser API that detects element visibility         |
| Service Layer          | Keeps data access outside components                |
| Custom Hook            | Reuses loading logic cleanly                        |
| Fluent UI Card         | Displays enterprise article items                   |
| Fluent UI Spinner      | Shows loading feedback                              |
| State Update           | Adds new articles to the existing list              |

## Concept Table

| File                      | Concept            | Why It Matters                          |
| ------------------------- | ------------------ | --------------------------------------- |
| `ArticleItem.ts`          | TypeScript model   | Defines predictable article structure   |
| `articleService.ts`       | Service layer      | Separates data access from UI           |
| `useInfiniteArticles.ts`  | Custom hook        | Encapsulates loading and observer logic |
| `ArticleCard.tsx`         | Reusable component | Renders each article consistently       |
| `InfiniteArticleList.tsx` | List composition   | Renders cards and sentinel              |
| `App.tsx`                 | Page shell         | Provides layout and page title          |
| `main.tsx`                | React entry        | Mounts React into `index.html`          |
| `index.css`               | Global CSS         | Removes browser default margin          |

## Official Documentation

| Topic                      | Documentation                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React Learn                | [https://react.dev/learn](https://react.dev/learn)                                                                                                       |
| Synchronizing with Effects | [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)                                                 |
| useEffect Reference        | [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)                                                               |
| Intersection Observer API  | [https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) |
| Fluent UI React Components | [https://developer.microsoft.com/en-us/fluentui](https://developer.microsoft.com/en-us/fluentui)                                                         |
| Fluent UI Badge            | [https://fluent2.microsoft.design/components/web/react/core/badge/usage](https://fluent2.microsoft.design/components/web/react/core/badge/usage)         |
| Vite Guide                 | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                                                       |
| TypeScript Docs            | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                                             |

## Final Insight

The most important lesson from App 67 is:

```txt
Infinite scroll is not magic.
It is state + effects + browser observation + rendering.
```

React does not manually append HTML.

React receives new state:

```txt
articles = old articles + new articles
```

Then React re-renders the UI.

That is the correct React mental model.

---

# Where we are now

| Block                              |  Apps | Status                    |
| ---------------------------------- | ----: | ------------------------- |
| Block 1 — Fundamentals and UI      | 01–20 | Completed                 |
| Block 2 — Interactivity and State  | 21–40 | Completed                 |
| Block 3 — Fluent UI Professional   | 41–60 | Completed                 |
| Block 4 — Effects and Architecture | 61–66 | Completed                 |
| Block 4 — Effects and Architecture |    67 | Current — Infinite Scroll |
| Block 4 — Effects and Architecture |    68 | Next — Data Cache         |

# Next apps

| App | Name                            | Status   |
| --: | ------------------------------- | -------- |
|  67 | Infinite Scroll                 | Current  |
|  68 | Data Cache                      | Next     |
|  69 | Custom Fetch Hook               | Upcoming |
|  70 | Global State with Context       | Upcoming |
|  71 | Favorites System                | Upcoming |
|  72 | DataGrid with API               | Upcoming |
|  73 | Analytical Dashboard            | Upcoming |
|  74 | Cryptocurrency Monitor          | Upcoming |
|  75 | Repository Explorer             | Upcoming |
|  76 | Logs Panel                      | Upcoming |
|  77 | Reports System                  | Upcoming |
|  78 | Performance Simulator           | Upcoming |
|  79 | Layered Architecture            | Upcoming |
|  80 | Mini React Enterprise Framework | Upcoming |

[1]: https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com "Synchronizing with Effects"
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API?utm_source=chatgpt.com "Intersection Observer API - MDN Web Docs"
