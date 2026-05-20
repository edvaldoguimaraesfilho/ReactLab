App 15 is **Página de Notícias / News Page**: a static news portal focused on **complex layouts** and React “Describing the UI” concepts. 

## App 15 — News Page

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app15-news-page -- --template react-ts
cd app15-news-page

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\NewsArticle.ts -ItemType File
New-Item src\data\newsArticles.ts -ItemType File
New-Item src\components\FeaturedArticle.tsx -ItemType File
New-Item src\components\NewsCard.tsx -ItemType File
New-Item src\components\NewsGrid.tsx -ItemType File
```

## `src\models\NewsArticle.ts`

```ts
export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}
```

## `src\data\newsArticles.ts`

```ts
import type { NewsArticle } from "../models/NewsArticle";

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "React Architecture Becomes More Component-Driven",
    summary:
      "Modern React applications are increasingly structured around small, reusable, and predictable components.",
    category: "React",
    author: "Frontend Team",
    date: "May 17, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Fluent UI Improves Enterprise Design Consistency",
    summary:
      "Microsoft Fluent UI helps teams build accessible, consistent, and professional business interfaces.",
    category: "Fluent UI",
    author: "Design System Team",
    date: "May 16, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "TypeScript Reduces UI Refactoring Risk",
    summary:
      "Strong typing improves maintainability when applications grow across components, models, and data files.",
    category: "TypeScript",
    author: "Engineering Team",
    date: "May 15, 2026",
    readTime: "6 min read",
  },
];
```

## `src\components\FeaturedArticle.tsx`

```tsx
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title1,
  Body1,
} from "@fluentui/react-components";

import { News24Regular } from "@fluentui/react-icons";
import type { NewsArticle } from "../models/NewsArticle";

interface FeaturedArticleProps {
  article: NewsArticle;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Card
      style={{
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <CardHeader
        image={<News24Regular />}
        header={<Title1>{article.title}</Title1>}
        description={
          <Text>
            {article.author} • {article.date} • {article.readTime}
          </Text>
        }
      />

      <Badge appearance="filled">{article.category}</Badge>

      <Body1 style={{ marginTop: "20px", maxWidth: "760px" }}>
        {article.summary}
      </Body1>

      <Button appearance="primary" style={{ marginTop: "24px", width: "160px" }}>
        Read article
      </Button>
    </Card>
  );
}
```

## `src\components\NewsCard.tsx`

```tsx
import {
  Badge,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
  Body1,
} from "@fluentui/react-components";

import type { NewsArticle } from "../models/NewsArticle";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        header={<Title3>{article.title}</Title3>}
        description={
          <Caption1>
            {article.author} • {article.date}
          </Caption1>
        }
      />

      <Badge appearance="tint">{article.category}</Badge>

      <Body1 style={{ marginTop: "16px" }}>{article.summary}</Body1>

      <Text size={200} style={{ marginTop: "16px" }}>
        {article.readTime}
      </Text>
    </Card>
  );
}
```

## `src\components\NewsGrid.tsx`

```tsx
import { newsArticles } from "../data/newsArticles";
import { NewsCard } from "./NewsCard";

export function NewsGrid() {
  const secondaryArticles = newsArticles.slice(1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {secondaryArticles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { FeaturedArticle } from "./components/FeaturedArticle";
import { NewsGrid } from "./components/NewsGrid";
import { newsArticles } from "./data/newsArticles";

function App() {
  const featuredArticle = newsArticles[0];

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
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise News Portal</Title1>

        <Text>
          A static Microsoft-style news page built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <FeaturedArticle article={featuredArticle} />
          <NewsGrid />
        </div>
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

## Validate

```powershell
npm run dev
npm run build
npm run preview
```

## Where we are

| Block   | App | Name                       | Status    |
| ------- | --: | -------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent         | Completed |
| Block 1 |  02 | Profile Card               | Completed |
| Block 1 |  03 | Product List               | Completed |
| Block 1 |  04 | Microsoft Style User Card  | Completed |
| Block 1 |  05 | Static Dashboard           | Completed |
| Block 1 |  06 | Corporate Sidebar Menu     | Completed |
| Block 1 |  07 | Visual Task List           | Completed |
| Block 1 |  08 | Timeline Events            | Completed |
| Block 1 |  09 | Employee Table             | Completed |
| Block 1 |  10 | Email List                 | Completed |
| Block 1 |  11 | Grid of Cards              | Completed |
| Block 1 |  12 | Image Gallery              | Completed |
| Block 1 |  13 | Movie Catalog              | Completed |
| Block 1 |  14 | Football Teams             | Completed |
| Block 1 |  15 | News Page                  | Current   |
| Block 1 |  16 | Static Financial Dashboard | Next      |
