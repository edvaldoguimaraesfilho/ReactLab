# App 13 — Movie Catalog

App 13 is **“Catálogo de Filmes / Movie Catalog”**, inside **Block 1 — Fundamentals and UI**. In the project table, App 13 is defined as a **Netflix-style catalog** focused on **declarative structure** and linked to **Thinking in React**. 

## 1. PowerShell setup

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app13-movie-catalog -- --template react-ts
cd app13-movie-catalog

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\Movie.ts -ItemType File
New-Item src\data\movies.ts -ItemType File
New-Item src\components\MovieCard.tsx -ItemType File
New-Item src\components\MovieCatalog.tsx -ItemType File
```

## 2. `src\models\Movie.ts`

```ts
export interface Movie {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: string;
  duration: string;
  description: string;
}
```

## 3. `src\data\movies.ts`

```ts
import type { Movie } from "../models/Movie";

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Silent Orbit",
    genre: "Science Fiction",
    year: 2024,
    rating: "PG-13",
    duration: "2h 08m",
    description: "A space crew discovers a lost signal near Jupiter.",
  },
  {
    id: 2,
    title: "Corporate Shadows",
    genre: "Thriller",
    year: 2023,
    rating: "R",
    duration: "1h 52m",
    description: "A financial analyst uncovers a hidden enterprise conspiracy.",
  },
  {
    id: 3,
    title: "Azure City",
    genre: "Drama",
    year: 2022,
    rating: "PG",
    duration: "1h 44m",
    description: "A young architect rebuilds her career in a futuristic city.",
  },
  {
    id: 4,
    title: "The Last Repository",
    genre: "Technology",
    year: 2025,
    rating: "PG-13",
    duration: "2h 15m",
    description: "A developer protects the final source code archive.",
  },
];
```

## 4. `src\components\MovieCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import { Filmstrip24Regular } from "@fluentui/react-icons";
import type { Movie } from "../models/Movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "260px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        image={<Filmstrip24Regular />}
        header={<Title3>{movie.title}</Title3>}
        description={
          <Caption1>
            {movie.year} • {movie.duration}
          </Caption1>
        }
      />

      <Body1>{movie.description}</Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance="filled">{movie.genre}</Badge>
        <Text size={200}>Rating: {movie.rating}</Text>
      </div>
    </Card>
  );
}
```

## 5. `src\components\MovieCatalog.tsx`

```tsx
import { movies } from "../data/movies";
import { MovieCard } from "./MovieCard";

export function MovieCatalog() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

## 6. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { MovieCatalog } from "./components/MovieCatalog";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#111827",
        color: "white",
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
        <Title1 style={{ color: "white" }}>Movie Catalog</Title1>

        <Text style={{ color: "#d1d5db" }}>
          A static Netflix-style movie catalog built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <MovieCatalog />
      </section>
    </main>
  );
}

export default App;
```

## 7. `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webDarkTheme,
} from "@fluentui/react-components";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webDarkTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

## 8. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 9. Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## What this app teaches

| Concept          | File                              |
| ---------------- | --------------------------------- |
| TypeScript model | `Movie.ts`                        |
| Static data      | `movies.ts`                       |
| Reusable card    | `MovieCard.tsx`                   |
| List rendering   | `MovieCatalog.tsx`                |
| `map()`          | `movies.map(...)`                 |
| Stable keys      | `key={movie.id}`                  |
| Composition      | `App → MovieCatalog → MovieCard`  |
| Fluent UI        | `Card`, `Badge`, `Text`, `Title1` |

## Where we are

| App | Name                      | Status    |
| --: | ------------------------- | --------- |
|  01 | Hello React Fluent        | Completed |
|  02 | Profile Card              | Completed |
|  03 | Product List              | Completed |
|  04 | Microsoft Style User Card | Completed |
|  05 | Static Dashboard          | Completed |
|  06 | Corporate Sidebar Menu    | Completed |
|  07 | Visual Task List          | Completed |
|  08 | Timeline Events           | Completed |
|  09 | Employee Table            | Completed |
|  10 | Email List                | Completed |
|  11 | Grid of Cards             | Completed |
|  12 | Image Gallery             | Completed |
|  13 | Movie Catalog             | Current   |
|  14 | Football Teams List       | Next      |
