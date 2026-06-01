# App 71 — Favorites System

## React + TypeScript + Fluent UI + Context API Integration

App 71 belongs to **Block 4 — Effects and Architecture** and extends the concepts learned in App 70 (Global Context Control). The objective is to build a reusable **Favorites System** where users can mark items as favorites, remove favorites, and view favorite items across the entire application using a centralized Context Provider. This follows the roadmap defined for the ReactLab project. 

---

# Project Goal

Build a professional Microsoft-style Favorites Management System featuring:

* Global Favorites Context
* React Context API
* Fluent UI Cards
* Add to Favorites
* Remove from Favorites
* Favorites Counter
* Shared Global State
* TypeScript Models
* Enterprise Component Architecture

This app demonstrates one of the most common enterprise patterns:

```txt
Multiple Components
        ↓
 Shared Global State
        ↓
 React Context
        ↓
 Automatic UI Updates
```

---

# React Learn Concepts

This application is based on:

* Passing Data Deeply with Context
* Sharing State Between Components
* Managing State
* Reusing Logic with Components

Official documentation:

* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)

---

# Create the Project

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app71-favorites-system -- --template react-ts

cd app71-favorites-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
mkdir src\components
mkdir src\context
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\Product.ts -ItemType File

New-Item src\data\products.ts -ItemType File

New-Item src\context\FavoritesContext.tsx -ItemType File

New-Item src\components\ProductCard.tsx -ItemType File
New-Item src\components\ProductList.tsx -ItemType File
New-Item src\components\FavoritesPanel.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── FavoritesPanel.tsx
│
├── context/
│   └── FavoritesContext.tsx
│
├── models/
│   └── Product.ts
│
├── data/
│   └── products.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Product Model

## src/models/Product.ts

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
}
```

---

# Mock Data

## src/data/products.ts

```ts
import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Microsoft Surface",
    category: "Hardware",
  },
  {
    id: 2,
    name: "Microsoft Teams",
    category: "Software",
  },
  {
    id: 3,
    name: "SharePoint Online",
    category: "Collaboration",
  },
  {
    id: 4,
    name: "Power BI",
    category: "Analytics",
  },
];
```

---

# Favorites Context

## src/context/FavoritesContext.tsx

```tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import type { Product } from "../models/Product";

interface FavoritesContextType {
  favorites: Product[];

  addFavorite: (product: Product) => void;

  removeFavorite: (id: number) => void;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] =
    useState<Product[]>([]);

  function addFavorite(product: Product) {
    const exists =
      favorites.some(
        (item) => item.id === product.id
      );

    if (!exists) {
      setFavorites([...favorites, product]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites(
      favorites.filter(
        (item) => item.id !== id
      )
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}
```

---

# Product Card

## src/components/ProductCard.tsx

```tsx
import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Star24Regular,
} from "@fluentui/react-icons";

import type { Product } from "../models/Product";

import { useFavorites }
  from "../context/FavoritesContext";

interface Props {
  product: Product;
}

export function ProductCard({
  product,
}: Props) {
  const { addFavorite } =
    useFavorites();

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {product.name}
      </Title3>

      <Text>
        {product.category}
      </Text>

      <Button
        appearance="primary"
        icon={<Star24Regular />}
        onClick={() =>
          addFavorite(product)
        }
      >
        Favorite
      </Button>
    </Card>
  );
}
```

---

# Product List

## src/components/ProductList.tsx

```tsx
import { products }
  from "../data/products";

import { ProductCard }
  from "./ProductCard";

export function ProductList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
```

---

# Favorites Panel

## src/components/FavoritesPanel.tsx

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { useFavorites }
  from "../context/FavoritesContext";

export function FavoritesPanel() {
  const {
    favorites,
    removeFavorite,
  } = useFavorites();

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>
        Favorites ({favorites.length})
      </Title2>

      {favorites.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: "12px",
          }}
        >
          <Text>
            {item.name}
          </Text>

          <Button
            appearance="secondary"
            onClick={() =>
              removeFavorite(item.id)
            }
          >
            Remove
          </Button>
        </div>
      ))}
    </Card>
  );
}
```

---

# App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import {
  FavoritesProvider,
} from "./context/FavoritesContext";

import {
  ProductList,
} from "./components/ProductList";

import {
  FavoritesPanel,
} from "./components/FavoritesPanel";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <FavoritesProvider>

        <main
          style={{
            padding: "40px",
            display: "grid",
            gap: "32px",
          }}
        >
          <FavoritesPanel />

          <ProductList />

        </main>

      </FavoritesProvider>
    </FluentProvider>
  );
}

export default App;
```

---

# main.tsx

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

ReactDOM
  .createRoot(
    document.getElementById("root")!
  )
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
```

---

# index.css

```css
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background: #f3f2f1;
}

* {
  box-sizing: border-box;
}
```

---

# Architecture Flow

```txt
FavoritesProvider
        │
        ▼
 Context API
        │
 ┌──────┴──────┐
 │             │
 ▼             ▼
ProductList  FavoritesPanel
 │             │
 ▼             ▼
ProductCard  Favorite Items
```

---

# Technical Summary

| Concept               | Purpose                  |
| --------------------- | ------------------------ |
| Context API           | Global state             |
| useContext            | Access shared state      |
| useState              | Favorites storage        |
| Fluent UI Card        | Product display          |
| Fluent UI Button      | User actions             |
| TypeScript Interface  | Product model            |
| Immutable Updates     | Safe state changes       |
| Component Composition | Reusable architecture    |
| Derived UI            | Favorites counter        |
| Enterprise Pattern    | Shared application state |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context?utm_source=chatgpt.com)
* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                   | Status    |
| ------- | --- | ---------------------- | --------- |
| Block 4 | 68  | Data Cache             | Completed |
| Block 4 | 69  | Custom Fetch Hook      | Completed |
| Block 4 | 70  | Global Context Control | Completed |
| Block 4 | 71  | Favorites System       | Current   |
| Block 4 | 72  | API DataGrid           | Next      |
| Block 4 | 73  | Analytics Dashboard    | Upcoming  |
| Block 4 | 74  | Cryptocurrency Monitor | Upcoming  |
| Block 4 | 75  | Repository Explorer    | Upcoming  |

**Current App:** 71 — Favorites System
**Next App:** 72 — API DataGrid 
