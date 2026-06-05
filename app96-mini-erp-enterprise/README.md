# App 96 — Mini ERP Enterprise

App 96 belongs to **Block 5 — Complete Applications** and is defined as **Mini ERP Enterprise** in the ReactLab roadmap. It represents one of the most advanced applications in the entire learning journey, consolidating React architecture, Fluent UI enterprise components, TypeScript models, DataGrid usage, business workflows, dashboards, forms, and modular architecture. 

---

```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 96: Mini ERP Enterprise with React, TypeScript, Fluent UI, and Vite

## Introduction

Enterprise Resource Planning (ERP) systems are among the most complex business applications in modern software development.

Organizations use ERP platforms to centralize:

* Employees
* Products
* Inventory
* Orders
* Suppliers
* Reports
* Financial information
* Operational workflows

In App 96 we create a **Mini ERP Enterprise Dashboard** inspired by real-world business applications.

The objective is not to build SAP-sized functionality.

The objective is to learn:

* Enterprise React architecture
* Fluent UI professional layouts
* Multi-module composition
* DataGrid usage
* Dashboard design
* State management
* TypeScript modeling
* Component separation

This application consolidates everything learned from Apps 01–95.

---

# Learning Objectives

This application introduces:

| Area           | Concepts                 |
| -------------- | ------------------------ |
| React          | Component composition    |
| TypeScript     | Business models          |
| Fluent UI      | Enterprise UI            |
| Architecture   | Layered organization     |
| Dashboard      | KPI cards                |
| DataGrid       | Business tables          |
| Forms          | Enterprise forms         |
| State          | Shared application state |
| Layout         | ERP-style shell          |
| Business Logic | Domain modeling          |

---

# Project Creation

## Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app96-mini-erp-enterprise -- --template react-ts

cd app96-mini-erp-enterprise

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\services
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\Employee.ts -ItemType File
New-Item src\models\Product.ts -ItemType File

New-Item src\data\employees.ts -ItemType File
New-Item src\data\products.ts -ItemType File

New-Item src\components\KpiCards.tsx -ItemType File
New-Item src\components\EmployeeGrid.tsx -ItemType File
New-Item src\components\ProductGrid.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Folder Structure

```txt
src/
│
├── components/
│   ├── EmployeeGrid.tsx
│   ├── ProductGrid.tsx
│   └── KpiCards.tsx
│
├── models/
│   ├── Employee.ts
│   └── Product.ts
│
├── data/
│   ├── employees.ts
│   └── products.ts
│
├── services/
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Employee Model

## Employee.ts

```ts
export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
}
```

---

# Product Model

## Product.ts

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
}
```

---

# Employees Data

## employees.ts

```ts
import type { Employee } from "../models/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    department: "Finance",
    position: "Manager",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    department: "Sales",
    position: "Coordinator",
  },
  {
    id: 3,
    name: "Michael Brown",
    department: "IT",
    position: "Architect",
  },
];
```

---

# Products Data

## products.ts

```ts
import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Laptop Pro",
    category: "Hardware",
    stock: 42,
  },
  {
    id: 2,
    name: "Office License",
    category: "Software",
    stock: 150,
  },
  {
    id: 3,
    name: "Monitor 27",
    category: "Hardware",
    stock: 28,
  },
];
```

---

# KPI Cards Component

## KpiCards.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface KpiCardsProps {
  employees: number;
  products: number;
}

export function KpiCards({
  employees,
  products,
}: KpiCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "16px",
      }}
    >
      <Card>
        <Title3>Total Employees</Title3>
        <Text>{employees}</Text>
      </Card>

      <Card>
        <Title3>Total Products</Title3>
        <Text>{products}</Text>
      </Card>
    </div>
  );
}
```

---

# Employee Grid

## EmployeeGrid.tsx

```tsx
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  employees: Employee[];
}

export function EmployeeGrid({
  employees,
}: Props) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

# Product Grid

## ProductGrid.tsx

```tsx
import {
  Card,
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

export function ProductGrid({
  products,
}: Props) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

# App.tsx

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { employees } from "./data/employees";
import { products } from "./data/products";

import { KpiCards } from "./components/KpiCards";
import { EmployeeGrid } from "./components/EmployeeGrid";
import { ProductGrid } from "./components/ProductGrid";

function App() {
  return (
    <main
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Title1>Mini ERP Enterprise</Title1>

      <Text>
        Enterprise Resource Planning Dashboard
      </Text>

      <KpiCards
        employees={employees.length}
        products={products.length}
      />

      <EmployeeGrid employees={employees} />

      <ProductGrid products={products} />
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

# Running the Application

Development:

```powershell
npm run dev
```

Production Validation:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# React Learn Concepts

This application reinforces:

* Component Composition
* Rendering Lists
* Keeping Components Pure
* Sharing Data with Props
* Thinking in React
* Enterprise UI Architecture

Based on the React learning roadmap defined for the ReactLab project. 

---

# Technical Summary

| Concept               | Purpose                     |
| --------------------- | --------------------------- |
| Interface             | Strong typing               |
| Props                 | Component communication     |
| Card                  | KPI presentation            |
| Table                 | Business data visualization |
| Component Composition | ERP architecture            |
| FluentProvider        | Microsoft theme             |
| React Rendering       | Declarative UI              |
| TypeScript            | Enterprise maintainability  |

---

# Official Documentation

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Fluent UI React Components](https://react.fluentui.dev/?utm_source=chatgpt.com)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                            | Status    |
| ------- | --- | ------------------------------- | --------- |
| Block 5 | 91  | Report Generator                | Completed |
| Block 5 | 92  | Audit System                    | Completed |
| Block 5 | 93  | SharePoint Inspired Portal      | Completed |
| Block 5 | 94  | Corporate Catalog               | Completed |
| Block 5 | 95  | Reservation System              | Completed |
| Block 5 | 96  | Mini ERP Enterprise             | Current   |
| Block 5 | 97  | Complete CRM                    | Next      |
| Block 5 | 98  | Analytics System                | Upcoming  |
| Block 5 | 99  | Microsoft Style Admin Center    | Upcoming  |
| Block 5 | 100 | Final React Enterprise Platform | Upcoming  |

**Apps remaining:** 97, 98, 99, 100. 🚀
