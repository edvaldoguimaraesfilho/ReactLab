# App 75 — Repository Explorer

**Block 4 — Effects and Architecture**
**Focus:** GitHub Repository Exploration, Async Data Fetching, Search, Filtering, Repository Details, React Architecture, Fluent UI Enterprise Layout. 

---

# Create the Project

## PowerShell Commands

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app75-repository-explorer -- --template react-ts

cd app75-repository-explorer

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons

mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\styles

New-Item src\models\Repository.ts -ItemType File
New-Item src\services\githubService.ts -ItemType File
New-Item src\components\RepositorySearch.tsx -ItemType File
New-Item src\components\RepositoryCard.tsx -ItemType File
New-Item src\components\RepositoryList.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Project Goal

Repository Explorer allows users to search public GitHub repositories and display:

* Repository Name
* Description
* Stars
* Forks
* Language
* Repository URL
* Owner Information

This application introduces:

* API consumption
* Search-driven UI
* useEffect
* Async/Await
* Service Layer Architecture
* Fluent UI Cards
* Enterprise Component Separation

According to the roadmap, App 75 extends the API and architecture concepts introduced in Apps 61–74 and prepares the foundation for enterprise dashboards and reporting systems. 

---

# Folder Structure

```txt
src/
│
├── components/
│   ├── RepositorySearch.tsx
│   ├── RepositoryCard.tsx
│   └── RepositoryList.tsx
│
├── models/
│   └── Repository.ts
│
├── services/
│   └── githubService.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Repository Model

## src/models/Repository.ts

```ts
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}
```

---

# GitHub Service Layer

## src/services/githubService.ts

```ts
import type { Repository } from "../models/Repository";

export async function searchRepositories(
  query: string
): Promise<Repository[]> {

  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`
  );

  const data = await response.json();

  return data.items;
}
```

---

# Search Component

## src/components/RepositorySearch.tsx

```tsx
import {
  Input,
  Button
} from "@fluentui/react-components";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function RepositorySearch({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <Input
        value={value}
        placeholder="Search repositories..."
        onChange={(_, data) =>
          onChange(data.value)
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

---

# Repository Card

## src/components/RepositoryCard.tsx

```tsx
import {
  Card,
  Text,
  Title3,
  Button,
} from "@fluentui/react-components";

import type { Repository } from "../models/Repository";

interface Props {
  repository: Repository;
}

export function RepositoryCard({
  repository,
}: Props) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {repository.name}
      </Title3>

      <Text>
        {repository.description}
      </Text>

      <Text>
        ⭐ Stars: {repository.stargazers_count}
      </Text>

      <Text>
        🍴 Forks: {repository.forks_count}
      </Text>

      <Text>
        Language: {repository.language}
      </Text>

      <Button
        as="a"
        href={repository.html_url}
        target="_blank"
      >
        Open Repository
      </Button>
    </Card>
  );
}
```

---

# Repository List

## src/components/RepositoryList.tsx

```tsx
import type { Repository } from "../models/Repository";
import { RepositoryCard } from "./RepositoryCard";

interface Props {
  repositories: Repository[];
}

export function RepositoryList({
  repositories,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      {repositories.map(repo => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
        />
      ))}
    </div>
  );
}
```

---

# Main Application

## src/App.tsx

```tsx
import { useState } from "react";

import {
  Title1,
  Text,
} from "@fluentui/react-components";

import { RepositorySearch } from "./components/RepositorySearch";
import { RepositoryList } from "./components/RepositoryList";

import { searchRepositories } from "./services/githubService";
import type { Repository } from "./models/Repository";

function App() {

  const [query, setQuery] =
    useState("react");

  const [repositories, setRepositories] =
    useState<Repository[]>([]);

  async function handleSearch() {

    const result =
      await searchRepositories(query);

    setRepositories(result);
  }

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title1>
        Repository Explorer
      </Title1>

      <Text>
        Search and explore GitHub repositories.
      </Text>

      <RepositorySearch
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      <RepositoryList
        repositories={repositories}
      />
    </main>
  );
}

export default App;
```

---

# main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import App from "./App";

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

# index.css

```css
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# React Learn Concepts

This application reinforces:

| Concept               | Description                       |
| --------------------- | --------------------------------- |
| useState              | Stores query and repositories     |
| Async/Await           | API communication                 |
| Service Layer         | Separates API logic               |
| Component Composition | Search + List + Card              |
| Derived UI            | UI generated from repository data |
| List Rendering        | map()                             |
| TypeScript Models     | Strong typing                     |
| Fluent UI             | Enterprise Microsoft UI           |

Based on React's Effects and Architecture learning block. 

---

# Technical Summary

| Technology  | Purpose                 |
| ----------- | ----------------------- |
| React       | UI rendering            |
| TypeScript  | Strong typing           |
| Fluent UI   | Microsoft Design System |
| GitHub API  | Repository data         |
| Vite        | Build system            |
| useState    | Component memory        |
| Fetch API   | HTTP requests           |
| Async/Await | Asynchronous processing |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [GitHub REST API](https://docs.github.com/en/rest?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                 | Status    |
| ------- | --- | -------------------- | --------- |
| Block 4 | 61  | REST API Consumer    | Completed |
| Block 4 | 62  | API Dashboard        | Completed |
| Block 4 | 63  | Async Search         | Completed |
| Block 4 | 64  | GitHub User Explorer | Completed |
| Block 4 | 65  | Weather App          | Completed |
| Block 4 | 66  | Pagination System    | Completed |
| Block 4 | 67  | Infinite Scroll      | Completed |
| Block 4 | 68  | Data Cache           | Completed |
| Block 4 | 69  | Custom Fetch Hook    | Completed |
| Block 4 | 70  | Context API Control  | Completed |
| Block 4 | 71  | Favorites System     | Completed |
| Block 4 | 72  | DataGrid with API    | Completed |
| Block 4 | 73  | Analytics Dashboard  | Completed |
| Block 4 | 74  | Crypto Monitor       | Completed |
| Block 4 | 75  | Repository Explorer  | Current   |
| Block 4 | 76  | Log Panel            | Next      |

**Next App:** App 76 — Log Panel (Enterprise Log Viewer with Fluent UI DataGrid, Filtering, Severity Levels, Search, and Architecture Layering).
