# App 97 — Complete CRM System

**Block 5 — Complete Applications**
**React + TypeScript + Fluent UI + Enterprise Architecture**

> App 97 is **CRM Completo (Complete CRM System)**, one of the final enterprise applications in the ReactLab roadmap. It belongs to the last block of the project and consolidates nearly every concept learned throughout the previous 96 applications, including component composition, forms, DataGrid, state management, services, architecture, Fluent UI, dashboards, and business workflows. 

---

# Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app97-complete-crm-system -- --template react-ts

cd app97-complete-crm-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create the Solution Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
New-Item src\hooks -ItemType Directory
New-Item src\pages -ItemType Directory

New-Item src\models\Customer.ts -ItemType File
New-Item src\services\customerService.ts -ItemType File

New-Item src\components\CustomerGrid.tsx -ItemType File
New-Item src\components\CustomerForm.tsx -ItemType File
New-Item src\components\CustomerSummary.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Application Goal

The CRM manages:

* Customers
* Leads
* Opportunities
* Account Managers
* Customer Status
* Revenue Pipeline
* Customer Lifecycle

Enterprise CRM systems are commonly found in:

* Microsoft Dynamics
* Salesforce
* HubSpot
* Corporate Portals
* ERP Platforms

This application simulates a professional CRM dashboard using Fluent UI.

---

# Folder Structure

```txt
src/
│
├── components/
│   ├── CustomerGrid.tsx
│   ├── CustomerForm.tsx
│   └── CustomerSummary.tsx
│
├── models/
│   └── Customer.ts
│
├── services/
│   └── customerService.ts
│
├── pages/
├── hooks/
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# Customer Model

## src/models/Customer.ts

```ts
export interface Customer {
  id: number;
  company: string;
  contact: string;
  email: string;
  status: "Lead" | "Prospect" | "Customer";
  annualRevenue: number;
}
```

---

# Mock Service Layer

## src/services/customerService.ts

```ts
import type { Customer } from "../models/Customer";

export const customers: Customer[] = [
  {
    id: 1,
    company: "Contoso Ltd",
    contact: "John Smith",
    email: "john@contoso.com",
    status: "Customer",
    annualRevenue: 125000,
  },
  {
    id: 2,
    company: "Northwind Traders",
    contact: "Sarah Johnson",
    email: "sarah@northwind.com",
    status: "Prospect",
    annualRevenue: 65000,
  },
  {
    id: 3,
    company: "Adventure Works",
    contact: "David Brown",
    email: "david@adventureworks.com",
    status: "Lead",
    annualRevenue: 25000,
  },
];
```

---

# Customer Summary Component

## src/components/CustomerSummary.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalCustomers: number;
  totalRevenue: number;
}

export function CustomerSummary({
  totalCustomers,
  totalRevenue,
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
        <Title3>Total Customers</Title3>
        <Text>{totalCustomers}</Text>
      </Card>

      <Card>
        <Title3>Total Revenue</Title3>
        <Text>
          ${totalRevenue.toLocaleString()}
        </Text>
      </Card>
    </div>
  );
}
```

---

# Customer Grid

## src/components/CustomerGrid.tsx

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Customer } from "../models/Customer";

interface Props {
  customers: Customer[];
}

export function CustomerGrid({
  customers,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Company</TableHeaderCell>
          <TableHeaderCell>Contact</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Revenue</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.company}</TableCell>
            <TableCell>{customer.contact}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.status}</TableCell>
            <TableCell>
              ${customer.annualRevenue.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

# Customer Form

## src/components/CustomerForm.tsx

```tsx
import {
  Button,
  Field,
  Input,
  Card,
  Title3,
} from "@fluentui/react-components";

export function CustomerForm() {
  return (
    <Card
      style={{
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <Title3>New Customer</Title3>

      <Field label="Company">
        <Input />
      </Field>

      <Field label="Contact">
        <Input />
      </Field>

      <Field label="Email">
        <Input />
      </Field>

      <Button appearance="primary">
        Save Customer
      </Button>
    </Card>
  );
}
```

---

# Main Application

## src/App.tsx

```tsx
import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { customers } from "./services/customerService";

import { CustomerGrid } from "./components/CustomerGrid";
import { CustomerForm } from "./components/CustomerForm";
import { CustomerSummary } from "./components/CustomerSummary";

function App() {
  const totalRevenue = customers.reduce(
    (sum, customer) => sum + customer.annualRevenue,
    0
  );

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
        }}
      >
        <Title1>
          Enterprise CRM System
        </Title1>

        <CustomerSummary
          totalCustomers={customers.length}
          totalRevenue={totalRevenue}
        />

        <CustomerForm />

        <CustomerGrid customers={customers} />
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

import "./index.css";

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

# React Concepts Practiced

This CRM consolidates concepts from the entire React roadmap:

| Concept           | Usage                |
| ----------------- | -------------------- |
| Components        | CRM modules          |
| Props             | Data flow            |
| TypeScript Models | Customer entity      |
| Services          | Data layer           |
| Fluent UI         | Enterprise UI        |
| Forms             | Customer creation    |
| Tables            | Customer listing     |
| Derived Data      | Revenue totals       |
| Composition       | Dashboard assembly   |
| Architecture      | Enterprise structure |

---

# Technical Summary

| Area                 | Implemented |
| -------------------- | ----------- |
| CRM Dashboard        | Yes         |
| Customer Registry    | Yes         |
| Revenue Tracking     | Yes         |
| Summary Cards        | Yes         |
| Enterprise Layout    | Yes         |
| Fluent UI            | Yes         |
| TypeScript           | Yes         |
| Service Layer        | Yes         |
| React Composition    | Yes         |
| Production Structure | Yes         |

---

# Official Documentation

### React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)

### Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Table Components](https://react.fluentui.dev/?path=%2Fdocs%2Fcomponents-table--docs&utm_source=chatgpt.com)

### Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

### TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                       | Status    |
| ------- | --: | -------------------------- | --------- |
| Block 5 |  93 | Portal SharePoint Inspired | Completed |
| Block 5 |  94 | Corporate Catalog          | Completed |
| Block 5 |  95 | Reservation System         | Completed |
| Block 5 |  96 | Mini ERP Enterprise        | Completed |
| Block 5 |  97 | Complete CRM System        | Current   |
| Block 5 |  98 | Analytics System           | Next      |
| Block 5 |  99 | Microsoft Admin Center     | Upcoming  |
| Block 5 | 100 | React Enterprise Platform  | Final     |

### Overall Progress

**97 / 100 Apps Completed (97%)** 🚀

Roadmap defined in the ReactLab project structure and 100-app learning path.  
