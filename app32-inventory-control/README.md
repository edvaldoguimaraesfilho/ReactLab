# App 32 — Inventory Control

App 32 belongs to Block 2 — Interactivity and State.
The focus now is learning how React handles:

* dynamic lists
* controlled forms
* derived state
* inventory calculations
* state updates with arrays
* immutable updates
* enterprise UI composition

According to the roadmap, App 32 is:

> “Controle de Estoque / Inventory Control” 

This app is extremely important because it introduces a very common enterprise scenario:

* products
* quantities
* stock levels
* low stock alerts
* inventory tables
* add/remove/update flows

This is one of the first apps where React starts feeling like a real business application instead of isolated UI exercises.

---

# What This App Will Teach

| Concept               | Purpose                                 |
| --------------------- | --------------------------------------- |
| `useState`            | Store inventory items                   |
| Controlled Inputs     | React controls form fields              |
| Array State Updates   | Add/remove products                     |
| Derived State         | Inventory totals calculated dynamically |
| `map()` rendering     | Generate UI from data                   |
| Conditional Rendering | Low stock alerts                        |
| Fluent UI Tables      | Enterprise visual structure             |
| Immutable Updates     | Correct React state management          |

---

# React Learn Concepts

This app connects directly with:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

---

# 1. Create the Project

## PowerShell Commands

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app32-inventory-control -- --template react-ts

cd app32-inventory-control

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 2. Create the Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\InventoryItem.ts -ItemType File

New-Item src\data\initialInventory.ts -ItemType File

New-Item src\components\InventoryForm.tsx -ItemType File
New-Item src\components\InventoryTable.tsx -ItemType File
New-Item src\components\InventorySummary.tsx -ItemType File
```

---

# 3. Create the Inventory Model

# `src\models\InventoryItem.ts`

```ts
export interface InventoryItem {
  id: number;
  productName: string;
  category: string;
  quantity: number;
  price: number;
}
```

---

# 4. Create Initial Data

# `src\data\initialInventory.ts`

```ts
import type { InventoryItem } from "../models/InventoryItem";

export const initialInventory: InventoryItem[] = [
  {
    id: 1,
    productName: "Surface Laptop",
    category: "Hardware",
    quantity: 12,
    price: 5200,
  },
  {
    id: 2,
    productName: "Xbox Controller",
    category: "Accessories",
    quantity: 4,
    price: 450,
  },
  {
    id: 3,
    productName: "Office License",
    category: "Software",
    quantity: 30,
    price: 899,
  },
];
```

---

# 5. Create Inventory Form

# `src\components\InventoryForm.tsx`

```tsx
import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

interface InventoryFormProps {
  productName: string;
  setProductName: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  quantity: string;
  setQuantity: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  onAddItem: () => void;
}

export function InventoryForm({
  productName,
  setProductName,
  category,
  setCategory,
  quantity,
  setQuantity,
  price,
  setPrice,
  onAddItem,
}: InventoryFormProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      <Field label="Product Name">
        <Input
          value={productName}
          onChange={(_, data) => setProductName(data.value)}
        />
      </Field>

      <Field label="Category">
        <Input
          value={category}
          onChange={(_, data) => setCategory(data.value)}
        />
      </Field>

      <Field label="Quantity">
        <Input
          type="number"
          value={quantity}
          onChange={(_, data) => setQuantity(data.value)}
        />
      </Field>

      <Field label="Price">
        <Input
          type="number"
          value={price}
          onChange={(_, data) => setPrice(data.value)}
        />
      </Field>

      <div
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Button
          appearance="primary"
          onClick={onAddItem}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}
```

---

# 6. Create Inventory Table

# `src\components\InventoryTable.tsx`

```tsx
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { InventoryItem } from "../models/InventoryItem";

interface InventoryTableProps {
  items: InventoryItem[];
}

export function InventoryTable({
  items,
}: InventoryTableProps) {
  return (
    <Table
      aria-label="Inventory Table"
      style={{
        marginTop: "32px",
      }}
    >
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Product</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Quantity</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.productName}</TableCell>

            <TableCell>{item.category}</TableCell>

            <TableCell>{item.quantity}</TableCell>

            <TableCell>
              $
              {item.price.toFixed(2)}
            </TableCell>

            <TableCell>
              {item.quantity <= 5 ? (
                <Badge appearance="filled">
                  Low Stock
                </Badge>
              ) : (
                <Badge appearance="tint">
                  Available
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

# 7. Create Inventory Summary

# `src\components\InventorySummary.tsx`

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { InventoryItem } from "../models/InventoryItem";

interface InventorySummaryProps {
  items: InventoryItem[];
}

export function InventorySummary({
  items,
}: InventorySummaryProps) {
  const totalProducts = items.length;

  const totalUnits = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalInventoryValue = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      <Card>
        <Title3>Total Products</Title3>

        <Text>{totalProducts}</Text>
      </Card>

      <Card>
        <Title3>Total Units</Title3>

        <Text>{totalUnits}</Text>
      </Card>

      <Card>
        <Title3>Total Inventory Value</Title3>

        <Text>
          $
          {totalInventoryValue.toFixed(2)}
        </Text>
      </Card>
    </div>
  );
}
```

---

# 8. Create the Main App

# `src\App.tsx`

```tsx
import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialInventory } from "./data/initialInventory";

import { InventoryForm } from "./components/InventoryForm";
import { InventorySummary } from "./components/InventorySummary";
import { InventoryTable } from "./components/InventoryTable";

import type { InventoryItem } from "./models/InventoryItem";

function App() {
  const [items, setItems] =
    useState<InventoryItem[]>(initialInventory);

  const [productName, setProductName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [price, setPrice] =
    useState("");

  function handleAddItem() {
    if (
      !productName ||
      !category ||
      !quantity ||
      !price
    ) {
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now(),
      productName,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    setItems([...items, newItem]);

    setProductName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  }

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
        <Title1>
          Inventory Control
        </Title1>

        <Text>
          Enterprise inventory management interface
          built with React and Fluent UI.
        </Text>

        <InventoryForm
          productName={productName}
          setProductName={setProductName}
          category={category}
          setCategory={setCategory}
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setPrice={setPrice}
          onAddItem={handleAddItem}
        />

        <InventorySummary items={items} />

        <InventoryTable items={items} />
      </section>
    </main>
  );
}

export default App;
```

---

# 9. Create `main.tsx`

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
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# 10. Create Global CSS

# `src\index.css`

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

# 11. Run the Application

```powershell
npm run dev
```

---

# 12. Validate Production Build

```powershell
npm run build
```

---

# 13. Preview Production Build

```powershell
npm run preview
```

---

# Understanding the Most Important React Concepts

# `useState`

```tsx
const [items, setItems] =
  useState<InventoryItem[]>(initialInventory);
```

This creates component memory.

React stores:

```txt
items
```

inside the component state.

Whenever:

```tsx
setItems(...)
```

is called, React re-renders the UI.

---

# Why This Matters

The table is NOT manually updated.

React automatically updates the UI because the UI is derived from state.

This is the React mental model:

```txt
UI = function(state)
```

---

# Controlled Inputs

```tsx
<Input
  value={productName}
  onChange={(_, data) =>
    setProductName(data.value)
  }
/>
```

The input value comes from React state.

This means React fully controls the form.

This is called a:

```txt
Controlled Component
```

---

# Immutable Updates

```tsx
setItems([...items, newItem]);
```

This is one of the most important React patterns.

We NEVER do:

```tsx
items.push(newItem);
```

because React state must be immutable.

Instead:

```tsx
[...items, newItem]
```

creates a NEW array.

---

# Derived State

Inside `InventorySummary.tsx`:

```tsx
const totalUnits = items.reduce(
  (sum, item) => sum + item.quantity,
  0
);
```

The totals are NOT stored separately.

They are derived from existing state.

This follows React Learn recommendations:

> Avoid redundant state.

---

# Conditional Rendering

```tsx
{item.quantity <= 5 ? (
  <Badge appearance="filled">
    Low Stock
  </Badge>
) : (
  <Badge appearance="tint">
    Available
  </Badge>
)}
```

React conditionally renders different UI depending on data.

---

# Technical Summary

| Concept               | Usage                   |
| --------------------- | ----------------------- |
| `useState`            | State management        |
| Controlled Inputs     | Form handling           |
| `map()`               | Dynamic table rendering |
| `reduce()`            | Inventory calculations  |
| Derived State         | Dynamic totals          |
| Immutable Updates     | Correct React updates   |
| Conditional Rendering | Stock status            |
| Fluent UI Table       | Enterprise UI           |
| Component Composition | Modular architecture    |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

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
| Block 2 |  21 | Modern Counter            | Completed |
| Block 2 |  22 | Toggle Theme              | Completed |
| Block 2 |  23 | React Calculator          | Completed |
| Block 2 |  24 | Login Form                | Completed |
| Block 2 |  25 | User Registration         | Completed |
| Block 2 |  26 | ToDo List                 | Completed |
| Block 2 |  27 | Shopping List             | Completed |
| Block 2 |  28 | Product Filter            | Completed |
| Block 2 |  29 | Employee Search           | Completed |
| Block 2 |  30 | Shopping Cart             | Completed |
| Block 2 |  31 | Grade Simulator           | Completed |
| Block 2 |  32 | Inventory Control         | Current   |
| Block 2 |  33 | Contact Agenda            | Next      |
