# App 28 — Product Filter

App 28 is the first application in your roadmap where the React mental model from [React Learn](https://react.dev/learn?utm_source=chatgpt.com) really starts becoming visible in practice.

According to your project roadmap, App 28 is:

| App | Name           | Main Concept                                 |
| --- | -------------- | -------------------------------------------- |
| 28  | Product Filter | `filter()`, derived state, Thinking in React |

This application is extremely important because it introduces one of the core principles of modern React:

> The UI should be derived from data and state.

This app teaches:

* controlled inputs
* derived state
* filtering arrays
* search interfaces
* list rendering
* component composition
* avoiding unnecessary state
* React declarative rendering
* `filter()` usage
* `map()` rendering
* enterprise UI layout with Fluent UI

This is also the first app where you begin building interfaces that feel like:

* SharePoint lists
* Microsoft admin portals
* enterprise search interfaces
* product catalogs
* business dashboards

---

# What We Will Build

The application will contain:

* a product search input
* a category dropdown
* a dynamically filtered product grid
* reusable product cards
* Fluent UI styling
* derived filtered lists

The user will:

* type text
* choose a category
* instantly see the filtered products

No manual DOM updates.

React automatically recalculates the UI.

This is the key mental model.

---

# React Mental Model Introduced Here

This app introduces one of the most important concepts in React:

## Derived State

The filtered products should NOT be stored separately.

This is wrong:

```tsx
const [filteredProducts, setFilteredProducts] = useState([]);
```

Why?

Because filtered products can already be calculated from:

* the original products
* the search text
* the selected category

So React Learn recommends:

> Avoid redundant state.

Instead:

```tsx
const filteredProducts = products.filter(...)
```

This is called derived state.

The UI is derived from:

* state
* data
* calculations

NOT manually synchronized.

This app is basically a practical implementation of:

* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# 1. Create the Project

## PowerShell

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app28-product-filter -- --template react-ts

cd app28-product-filter

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 2. Create the Folder Structure

## PowerShell

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

---

# 3. Create the Files

## PowerShell

```powershell
New-Item src\models\Product.ts -ItemType File

New-Item src\data\products.ts -ItemType File

New-Item src\components\ProductCard.tsx -ItemType File

New-Item src\components\ProductGrid.tsx -ItemType File

New-Item src\components\ProductFilters.tsx -ItemType File
```

---

# 4. Product Model

# `src\models\Product.ts`

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}
```

---

# Why This Matters

This defines the shape of a product.

Every product must contain:

* id
* name
* category
* price
* stock

TypeScript now protects the application.

This is critical in enterprise React applications.

---

# 5. Static Product Data

# `src\data\products.ts`

```ts
import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Surface Laptop",
    category: "Hardware",
    price: 1800,
    stock: 12,
  },
  {
    id: 2,
    name: "Microsoft Mouse",
    category: "Accessories",
    price: 80,
    stock: 35,
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 220,
    stock: 18,
  },
  {
    id: 4,
    name: "Azure Subscription",
    category: "Services",
    price: 450,
    stock: 99,
  },
  {
    id: 5,
    name: "Power BI Pro",
    category: "Services",
    price: 120,
    stock: 50,
  },
];
```

---

# Why Static Data First?

Before APIs, React applications usually begin with:

* local arrays
* mock JSON
* static datasets

This allows you to focus on:

* rendering
* filtering
* state structure
* component architecture

without API complexity yet.

---

# 6. Product Card Component

# `src\components\ProductCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        header={<Title3>{product.name}</Title3>}
        description={
          <Text>{product.category}</Text>
        }
      />

      <Body1>
        Enterprise product catalog item.
      </Body1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          alignItems: "center",
        }}
      >
        <Badge appearance="filled">
          ${product.price}
        </Badge>

        <Text size={200}>
          Stock: {product.stock}
        </Text>
      </div>
    </Card>
  );
}
```

---

# What This Component Teaches

This component teaches:

| Concept               | Explanation                       |
| --------------------- | --------------------------------- |
| Props                 | Product data enters the component |
| Reusable UI           | Same card renders many products   |
| Declarative rendering | UI derives from props             |
| Composition           | App → Grid → Card                 |
| Fluent UI             | Enterprise UI structure           |

---

# 7. Product Grid Component

# `src\components\ProductGrid.tsx`

```tsx
import type { Product } from "../models/Product";

import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
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

# Why `map()` Matters

This:

```tsx
products.map(...)
```

transforms:

```txt
Product[]
```

into:

```txt
ProductCard[]
```

This is declarative UI.

You are NOT:

* manually creating HTML
* manually appending nodes

You describe:

* what should exist

React handles:

* DOM updates
* reconciliation
* rendering

---

# 8. Product Filters Component

# `src\components\ProductFilters.tsx`

```tsx
import {
  Dropdown,
  Input,
  Option,
} from "@fluentui/react-components";

interface ProductFiltersProps {
  searchText: string;
  selectedCategory: string;

  onSearchTextChange: (
    value: string
  ) => void;

  onCategoryChange: (
    value: string
  ) => void;
}

export function ProductFilters({
  searchText,
  selectedCategory,
  onSearchTextChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        marginTop: "24px",
        flexWrap: "wrap",
      }}
    >
      <Input
        placeholder="Search product..."
        value={searchText}
        onChange={(event) =>
          onSearchTextChange(
            event.target.value
          )
        }
      />

      <Dropdown
        value={selectedCategory}
        placeholder="Select category"
        selectedOptions={[selectedCategory]}
        onOptionSelect={(_, data) =>
          onCategoryChange(
            data.optionValue || ""
          )
        }
      >
        <Option value="">All</Option>

        <Option value="Hardware">
          Hardware
        </Option>

        <Option value="Accessories">
          Accessories
        </Option>

        <Option value="Services">
          Services
        </Option>
      </Dropdown>
    </div>
  );
}
```

---

# Why Controlled Inputs Matter

This is one of the most important React concepts.

The input value comes FROM React state:

```tsx
value={searchText}
```

And updates React state through:

```tsx
onChange={...}
```

This means React controls the input.

The input does NOT control itself.

This is called a controlled component.

React becomes the source of truth.

Official React concept:

* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

---

# 9. The Main App Component

# `src\App.tsx`

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { useState } from "react";

import { ProductFilters } from "./components/ProductFilters";
import { ProductGrid } from "./components/ProductGrid";

import { products } from "./data/products";

function App() {
  const [searchText, setSearchText] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const filteredProducts =
    products.filter((product) => {
      const matchesText =
        product.name
          .toLowerCase()
          .includes(
            searchText.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === ""
          ? true
          : product.category ===
            selectedCategory;

      return (
        matchesText &&
        matchesCategory
      );
    });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Product Filter
        </Title1>

        <Text>
          Enterprise product filtering
          interface using React and
          Fluent UI.
        </Text>

        <ProductFilters
          searchText={searchText}
          selectedCategory={
            selectedCategory
          }
          onSearchTextChange={
            setSearchText
          }
          onCategoryChange={
            setSelectedCategory
          }
        />

        <ProductGrid
          products={filteredProducts}
        />
      </section>
    </main>
  );
}

export default App;
```

---

# The Most Important Part of This App

This is the heart of the entire application:

```tsx
const filteredProducts =
  products.filter(...)
```

This is derived state.

The filtered list is NOT stored.

It is CALCULATED.

This follows React Learn recommendations.

---

# Understanding `filter()`

The JavaScript `filter()` function creates a new array containing only matching items.

Conceptually:

```txt
Original products
  ↓
Check conditions
  ↓
Return matching products
```

---

# Understanding the Search Logic

```tsx
product.name
  .toLowerCase()
  .includes(
    searchText.toLowerCase()
  );
```

This allows:

* case-insensitive search
* partial matching

Example:

```txt
"surface"
matches
"Surface Laptop"
```

---

# Understanding Category Filtering

```tsx
selectedCategory === ""
  ? true
  : product.category === selectedCategory;
```

This means:

```txt
If no category selected:
  allow everything

Otherwise:
  match only that category
```

---

# Why This App Is So Important

This app introduces:

* real UI logic
* filtering
* controlled inputs
* derived state
* declarative updates

This is the foundation for:

* DataGrid filtering
* SharePoint-style search
* dashboards
* enterprise portals
* admin interfaces

---

# 10. `main.tsx`

# `src\main.tsx`

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
    <FluentProvider
      theme={webLightTheme}
    >
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# 11. `index.css`

# `src\index.css`

```css
body {
  margin: 0;
  font-family:
    "Segoe UI",
    Arial,
    sans-serif;
}

* {
  box-sizing: border-box;
}
```

---

# 12. Run the Application

## Development

```powershell
npm run dev
```

---

# 13. Validate Production Build

```powershell
npm run build
```

This validates:

* TypeScript
* imports
* JSX
* production compilation

---

# 14. Preview Production Build

```powershell
npm run preview
```

---

# Architecture Flow

```txt
main.tsx
  ↓
App.tsx
  ↓
ProductFilters
ProductGrid
  ↓
ProductCard
```

---

# React Concepts Learned

| Concept               | Description                      |
| --------------------- | -------------------------------- |
| `useState`            | Component memory                 |
| Controlled Inputs     | React controls form fields       |
| Derived State         | Filtered products are calculated |
| `filter()`            | Creates filtered arrays          |
| `map()`               | Converts arrays into UI          |
| Props                 | Pass data between components     |
| Composition           | Build UI from smaller pieces     |
| Declarative Rendering | UI derives from state            |
| Fluent UI             | Enterprise design system         |

---

# Technical Summary

| Technology | Purpose                 |
| ---------- | ----------------------- |
| React      | Declarative UI          |
| TypeScript | Static typing           |
| Vite       | Development server      |
| Fluent UI  | Microsoft UI framework  |
| useState   | State management        |
| filter()   | Search/filter logic     |
| map()      | UI rendering            |
| Props      | Component communication |

---

# Official Documentation

## React

* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline of Events        | Completed |
| Block 1 |  09 | Employee Table            | Completed |
| Block 1 |  10 | Email List                | Completed |
| Block 1 |  11 | Card Grid                 | Completed |
| Block 1 |  12 | Image Gallery             | Completed |
| Block 1 |  13 | Movie Catalog             | Completed |
| Block 1 |  14 | Football Teams            | Completed |
| Block 1 |  15 | News Page                 | Completed |
| Block 1 |  16 | Financial Dashboard       | Completed |
| Block 1 |  17 | SharePoint Style Layout   | Completed |
| Block 1 |  18 | File Explorer             | Completed |
| Block 1 |  19 | Corporate Portal          | Completed |
| Block 1 |  20 | Microsoft Landing Page    | Completed |
| Block 2 |  21 | Modern Counter            | Completed |
| Block 2 |  22 | Toggle Theme              | Completed |
| Block 2 |  23 | React Calculator          | Completed |
| Block 2 |  24 | Login Form                | Completed |
| Block 2 |  25 | User Registration         | Completed |
| Block 2 |  26 | Complete ToDo List        | Completed |
| Block 2 |  27 | Shopping List             | Completed |
| Block 2 |  28 | Product Filter            | Current   |
| Block 2 |  29 | Employee Search           | Next      |
