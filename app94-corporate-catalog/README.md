# App 94 — Corporate Catalog

According to the project roadmap, **App 94 = Corporate Catalog** and belongs to **Block 5 — Complete Applications**, the phase where all previous React, TypeScript, Fluent UI, architecture, services, state management, filtering, DataGrid, and enterprise UI concepts are consolidated into realistic business applications. 

This application will simulate a corporate product/service catalog similar to what can be found in:

* Microsoft internal portals
* SharePoint product directories
* Procurement systems
* Enterprise service catalogs
* Asset management portals
* Internal company marketplaces

The objective is to combine:

* Fluent UI DataGrid
* Search
* Filtering
* Category management
* Statistics cards
* Service layer
* TypeScript models
* Derived state
* Enterprise layout
* React architecture

---

# Project Creation

## Create Solution

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app94-corporate-catalog -- --template react-ts

cd app94-corporate-catalog

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create Project Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\CatalogItem.ts -ItemType File
New-Item src\data\catalogData.ts -ItemType File
New-Item src\services\catalogService.ts -ItemType File

New-Item src\components\CatalogDashboard.tsx -ItemType File
New-Item src\components\CatalogFilters.tsx -ItemType File
New-Item src\components\CatalogGrid.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
app94-corporate-catalog/

src/
│
├── components/
│   ├── CatalogDashboard.tsx
│   ├── CatalogFilters.tsx
│   └── CatalogGrid.tsx
│
├── models/
│   └── CatalogItem.ts
│
├── data/
│   └── catalogData.ts
│
├── services/
│   └── catalogService.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css

artigo.md
```

---

# Model

## src/models/CatalogItem.ts

```ts
export interface CatalogItem {
  id: number;
  name: string;
  category: string;
  owner: string;
  price: number;
  status: "Available" | "Retired";
}
```

---

# Mock Data

## src/data/catalogData.ts

```ts
import type { CatalogItem } from "../models/CatalogItem";

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    name: "Microsoft 365 License",
    category: "Software",
    owner: "IT",
    price: 150,
    status: "Available",
  },
  {
    id: 2,
    name: "Corporate Laptop",
    category: "Hardware",
    owner: "Infrastructure",
    price: 1200,
    status: "Available",
  },
  {
    id: 3,
    name: "SharePoint Consulting",
    category: "Services",
    owner: "Consulting",
    price: 3000,
    status: "Retired",
  },
];
```

---

# Service Layer

## src/services/catalogService.ts

```ts
import { catalogData } from "../data/catalogData";

export function getCatalogItems() {
  return catalogData;
}
```

---

# Dashboard Component

## src/components/CatalogDashboard.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalItems: number;
  availableItems: number;
}

export function CatalogDashboard({
  totalItems,
  availableItems,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "24px",
      }}
    >
      <Card>
        <Title3>Total Items</Title3>
        <Text>{totalItems}</Text>
      </Card>

      <Card>
        <Title3>Available</Title3>
        <Text>{availableItems}</Text>
      </Card>
    </div>
  );
}
```

---

# Filters Component

## src/components/CatalogFilters.tsx

```tsx
import {
  Input,
} from "@fluentui/react-components";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export function CatalogFilters({
  search,
  onSearchChange,
}: Props) {
  return (
    <Input
      placeholder="Search catalog..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}
```

---

# Catalog Grid

## src/components/CatalogGrid.tsx

```tsx
import {
  Badge,
  Card,
} from "@fluentui/react-components";

import type { CatalogItem } from "../models/CatalogItem";

interface Props {
  items: CatalogItem[];
}

export function CatalogGrid({
  items,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {items.map((item) => (
        <Card key={item.id}>
          <h3>{item.name}</h3>

          <p>Category: {item.category}</p>

          <p>Owner: {item.owner}</p>

          <p>${item.price}</p>

          <Badge
            appearance={
              item.status === "Available"
                ? "filled"
                : "outline"
            }
          >
            {item.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
```

---

# App.tsx

```tsx
import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { CatalogDashboard } from "./components/CatalogDashboard";
import { CatalogFilters } from "./components/CatalogFilters";
import { CatalogGrid } from "./components/CatalogGrid";

import { getCatalogItems } from "./services/catalogService";

function App() {
  const [search, setSearch] = useState("");

  const catalog = getCatalogItems();

  const filteredCatalog = useMemo(() => {
    return catalog.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [catalog, search]);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Corporate Catalog
        </Title1>

        <CatalogDashboard
          totalItems={catalog.length}
          availableItems={
            catalog.filter(
              (x) => x.status === "Available"
            ).length
          }
        />

        <CatalogFilters
          search={search}
          onSearchChange={setSearch}
        />

        <CatalogGrid
          items={filteredCatalog}
        />
      </main>
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

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
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
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

---

# Run

```powershell
npm run dev
```

Build validation:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# React Learn Concepts

This app reinforces:

* State as component memory
* Derived state
* Filtering
* Component composition
* Service layer separation
* TypeScript models
* Enterprise UI architecture
* Memoization with useMemo
* Fluent UI enterprise components

Following the React learning roadmap defined for the 100-app project. 

---

# Technical Summary

| Concept               | Implementation         |
| --------------------- | ---------------------- |
| TypeScript Model      | CatalogItem            |
| Service Layer         | catalogService         |
| Search                | Fluent Input           |
| Derived State         | filteredCatalog        |
| Performance           | useMemo                |
| Enterprise UI         | Fluent UI              |
| Dashboard Cards       | CatalogDashboard       |
| Catalog Rendering     | CatalogGrid            |
| Component Composition | App → Dashboard → Grid |
| State Management      | useState               |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [useState Documentation](https://react.dev/reference/react/useState?utm_source=chatgpt.com)
* [useMemo Documentation](https://react.dev/reference/react/useMemo?utm_source=chatgpt.com)
* [Fluent UI React Components](https://react.fluentui.dev/?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                       | Status    |
| ------- | --- | -------------------------- | --------- |
| Block 5 | 91  | Report Generator           | Completed |
| Block 5 | 92  | Audit System               | Completed |
| Block 5 | 93  | SharePoint Inspired Portal | Completed |
| Block 5 | 94  | Corporate Catalog          | Current   |
| Block 5 | 95  | Reservation System         | Next      |

**Apps completed:** 01 → 94
**Current app:** 94 — Corporate Catalog
**Next app:** 95 — Reservation System
**Remaining:** 95, 96, 97, 98, 99, 100 🚀
