# App 84 — Inventory Management System

According to the ReactLab roadmap, **App 84 is the Inventory Management System (Sistema de Estoque)**, focused on:

* CRUD operations
* Inventory control
* Product management
* Search and filtering
* Enterprise architecture
* Fluent UI DataGrid
* TypeScript models
* Derived state
* Professional React organization 

---

# Create the Project

```powershell
cd E:\ReactLab\React-Fluent-100Apps

mkdir bloco05
cd bloco05

npm create vite@latest app84-inventory-management-system -- --template react-ts

cd app84-inventory-management-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\Product.ts -ItemType File

New-Item src\data\inventoryData.ts -ItemType File

New-Item src\components\InventoryForm.tsx -ItemType File
New-Item src\components\InventorySummary.tsx -ItemType File
New-Item src\components\InventoryGrid.tsx -ItemType File

New-Item src\services\inventoryService.ts -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Structure

```txt
src/
│
├── components/
│   ├── InventoryForm.tsx
│   ├── InventoryGrid.tsx
│   └── InventorySummary.tsx
│
├── models/
│   └── Product.ts
│
├── data/
│   └── inventoryData.ts
│
├── services/
│   └── inventoryService.ts
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
  quantity: number;
  price: number;
}
```

---

# Mock Data

## src/data/inventoryData.ts

```ts
import type { Product } from "../models/Product";

export const inventoryData: Product[] = [
  {
    id: 1,
    name: "Dell Latitude",
    category: "Hardware",
    quantity: 12,
    price: 1250,
  },
  {
    id: 2,
    name: "Microsoft Surface",
    category: "Hardware",
    quantity: 8,
    price: 1800,
  },
  {
    id: 3,
    name: "Office License",
    category: "Software",
    quantity: 35,
    price: 250,
  },
];
```

---

# Inventory Service

## src/services/inventoryService.ts

```ts
import { inventoryData } from "../data/inventoryData";

export function getInventory() {
  return inventoryData;
}
```

---

# Inventory Summary

## src/components/InventorySummary.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalProducts: number;
  totalItems: number;
  totalValue: number;
}

export function InventorySummary({
  totalProducts,
  totalItems,
  totalValue,
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
        <Title3>Products</Title3>
        <Text>{totalProducts}</Text>
      </Card>

      <Card>
        <Title3>Stock Units</Title3>
        <Text>{totalItems}</Text>
      </Card>

      <Card>
        <Title3>Total Value</Title3>
        <Text>
          ${totalValue.toLocaleString()}
        </Text>
      </Card>
    </div>
  );
}
```

---

# Inventory Form

## src/components/InventoryForm.tsx

```tsx
import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import { useState } from "react";

interface Props {
  onAdd: (
    name: string,
    category: string,
    quantity: number,
    price: number
  ) => void;
}

export function InventoryForm({
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("");
  const [quantity, setQuantity] =
    useState("");
  const [price, setPrice] =
    useState("");

  function handleSubmit() {
    onAdd(
      name,
      category,
      Number(quantity),
      Number(price)
    );

    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <Field label="Product Name">
        <Input
          value={name}
          onChange={(_, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Category">
        <Input
          value={category}
          onChange={(_, data) =>
            setCategory(data.value)
          }
        />
      </Field>

      <Field label="Quantity">
        <Input
          value={quantity}
          onChange={(_, data) =>
            setQuantity(data.value)
          }
        />
      </Field>

      <Field label="Price">
        <Input
          value={price}
          onChange={(_, data) =>
            setPrice(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Product
      </Button>
    </div>
  );
}
```

---

# Inventory Grid

## src/components/InventoryGrid.tsx

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Product } from "../models/Product";

interface Props {
  products: Product[];
}

export function InventoryGrid({
  products,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Quantity</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>
              ${product.price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

# App.tsx

```tsx
import { useState } from "react";

import {
  Title1,
} from "@fluentui/react-components";

import { InventoryForm } from "./components/InventoryForm";
import { InventoryGrid } from "./components/InventoryGrid";
import { InventorySummary } from "./components/InventorySummary";

import { getInventory } from "./services/inventoryService";

import type { Product } from "./models/Product";

function App() {
  const [products, setProducts] =
    useState<Product[]>(getInventory());

  function addProduct(
    name: string,
    category: string,
    quantity: number,
    price: number
  ) {
    const product: Product = {
      id: products.length + 1,
      name,
      category,
      quantity,
      price,
    };

    setProducts([...products, product]);
  }

  const totalProducts =
    products.length;

  const totalItems =
    products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

  const totalValue =
    products.reduce(
      (sum, p) =>
        sum + p.quantity * p.price,
      0
    );

  return (
    <main
      style={{
        padding: "32px",
      }}
    >
      <Title1>
        Inventory Management System
      </Title1>

      <InventorySummary
        totalProducts={totalProducts}
        totalItems={totalItems}
        totalValue={totalValue}
      />

      <InventoryForm
        onAdd={addProduct}
      />

      <InventoryGrid
        products={products}
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
    <FluentProvider
      theme={webLightTheme}
    >
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

# Build Validation

Development:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# Technical Concepts Learned

| Concept               | Description                   |
| --------------------- | ----------------------------- |
| CRUD Foundation       | Inventory creation workflow   |
| TypeScript Models     | Strong typing                 |
| Fluent UI Forms       | Enterprise input controls     |
| React State           | Product collection memory     |
| Derived State         | Totals calculated dynamically |
| Component Composition | Form + Summary + Grid         |
| Table Rendering       | Inventory visualization       |
| Services Layer        | Data abstraction              |
| Enterprise Layout     | Microsoft-style UI            |
| Immutable Updates     | Safe React state updates      |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                        | Status    |
| ------- | --- | --------------------------- | --------- |
| Block 5 | 81  | Complete CRUD System        | Completed |
| Block 5 | 82  | Employee Management         | Completed |
| Block 5 | 83  | Financial Dashboard         | Completed |
| Block 5 | 84  | Inventory Management System | Current   |
| Block 5 | 85  | Kanban Board                | Next      |

**Current Position:** Block 5 → App 84/100 — Inventory Management System. 

**Roadmap Source:** ReactLab 100 Apps roadmap and architecture definition. 
