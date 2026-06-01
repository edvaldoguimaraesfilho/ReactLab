```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 59: CRM Visual with React, TypeScript, Vite, and Fluent UI

## Introduction

In **App 59 — CRM Visual**, we build a modern Microsoft-style CRM dashboard interface using **React**, **TypeScript**, **Vite**, and **Fluent UI**. This application belongs to **Block 3 — Professional Fluent UI Applications**, where the project evolves from simple state-based examples into enterprise-grade user interfaces inspired by real business systems. 

CRM stands for:

```txt
Customer Relationship Management
```

CRM systems are among the most common enterprise applications in the corporate world. They are used to manage:

* customers
* leads
* sales pipelines
* support contacts
* business opportunities
* account history
* enterprise workflows

Applications like:

* Microsoft Dynamics
* Salesforce
* HubSpot
* SAP
* ServiceNow

all rely heavily on:

* dashboards
* card layouts
* visual status indicators
* filtering
* user lists
* enterprise forms
* navigation panels

This app introduces the architectural foundation for enterprise CRM systems while reinforcing the React mental model:

```txt
UI derives from state and data.
Components render enterprise interfaces declaratively.
```

---

# 1. Goals of App 59

This app focuses on:

| Goal                   | Description                                  |
| ---------------------- | -------------------------------------------- |
| Enterprise layout      | Microsoft-style CRM composition              |
| Visual cards           | Customer overview panels                     |
| Fluent UI              | Professional Microsoft design system         |
| Component composition  | Splitting UI into reusable parts             |
| Static enterprise data | Rendering business information declaratively |
| Dashboard architecture | Preparing for future API-driven systems      |
| TypeScript models      | Predictable enterprise data structures       |
| Responsive layout      | Flexbox + Grid systems                       |

The app intentionally avoids:

* APIs
* authentication
* backend integration
* reducers
* effects

because the objective here is learning architecture and composition first.

---

# 2. Create the Project

## Create the app

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app59-crm-visual -- --template react-ts

cd app59-crm-visual

npm install
```

## Install Fluent UI

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

---

# 3. Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

---

# 4. Create the Files

```powershell
New-Item src\models\Customer.ts -ItemType File
New-Item src\data\customers.ts -ItemType File
New-Item src\components\CustomerCard.tsx -ItemType File
New-Item src\components\CustomerGrid.tsx -ItemType File
New-Item src\components\CRMHeader.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 5. Final Folder Structure

```txt
app59-crm-visual/
  src/
    components/
      CRMHeader.tsx
      CustomerCard.tsx
      CustomerGrid.tsx

    data/
      customers.ts

    models/
      Customer.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
  package.json
  vite.config.ts
```

This separation is important because enterprise React applications should isolate:

* models
* components
* data
* styles
* layout logic

---

# 6. Create the Customer Model

## `src\models\Customer.ts`

```ts
export type CustomerStatus =
  | "Active"
  | "Pending"
  | "Inactive";

export interface Customer {
  id: number;
  company: string;
  contact: string;
  email: string;
  status: CustomerStatus;
  revenue: string;
}
```

---

# 7. Why TypeScript Models Matter

This interface guarantees that every customer object contains:

| Property  | Type       |
| --------- | ---------- |
| `id`      | number     |
| `company` | string     |
| `contact` | string     |
| `email`   | string     |
| `status`  | union type |
| `revenue` | string     |

This improves:

* predictability
* maintainability
* scalability
* autocomplete
* refactoring safety

Without TypeScript, enterprise React apps become much harder to maintain.

Official documentation:

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# 8. Create Static CRM Data

## `src\data\customers.ts`

```ts
import type { Customer } from "../models/Customer";

export const customers: Customer[] = [
  {
    id: 1,
    company: "Contoso Ltd",
    contact: "John Carter",
    email: "john@contoso.com",
    status: "Active",
    revenue: "$120,000",
  },
  {
    id: 2,
    company: "Northwind Group",
    contact: "Sarah Johnson",
    email: "sarah@northwind.com",
    status: "Pending",
    revenue: "$48,000",
  },
  {
    id: 3,
    company: "Fabrikam Inc",
    contact: "Michael Adams",
    email: "michael@fabrikam.com",
    status: "Inactive",
    revenue: "$12,000",
  },
];
```

---

# 9. Why Static Data Matters

This app intentionally uses local data.

Why?

Because React learning should progress gradually:

```txt
Static UI
→ Component composition
→ State
→ Effects
→ APIs
→ Enterprise architecture
```

At this stage, the goal is:

* rendering
* composition
* data-driven UI

not backend complexity.

---

# 10. Create the CRM Header

## `src\components\CRMHeader.tsx`

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

export function CRMHeader() {
  return (
    <header
      style={{
        marginBottom: "32px",
      }}
    >
      <Title1>
        CRM Visual Dashboard
      </Title1>

      <Text>
        Enterprise customer relationship management interface.
      </Text>
    </header>
  );
}
```

---

# 11. Understanding Component Composition

React applications scale through composition.

Instead of creating:

* one giant file
* one giant layout
* duplicated UI

we split the interface into focused components.

This app follows:

```txt
App
  CRMHeader
  CustomerGrid
    CustomerCard
```

This is one of the most important React concepts.

Official documentation:

* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)

---

# 12. Create the Customer Card

## `src\components\CustomerCard.tsx`

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

import {
  Person24Regular,
} from "@fluentui/react-icons";

import type { Customer } from "../models/Customer";

interface CustomerCardProps {
  customer: Customer;
}

function getBadgeAppearance(
  status: Customer["status"]
) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "Pending") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function CustomerCard({
  customer,
}: CustomerCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<Person24Regular />}
        header={
          <Title3>
            {customer.company}
          </Title3>
        }
        description={
          <Caption1>
            {customer.contact}
          </Caption1>
        }
      />

      <Body1>
        {customer.email}
      </Body1>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge
          appearance={getBadgeAppearance(
            customer.status
          )}
        >
          {customer.status}
        </Badge>

        <Text weight="semibold">
          {customer.revenue}
        </Text>
      </div>
    </Card>
  );
}
```

---

# 13. Understanding Props

The card receives:

```tsx
customer: Customer
```

through props.

Props are React component inputs.

This means the component becomes reusable:

```txt
Different customer
→ same component
→ different rendered result
```

Official documentation:

* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)

---

# 14. Why the Badge Appearance Is Derived

This function:

```tsx
getBadgeAppearance(status)
```

derives the visual appearance from data.

This is important because React encourages:

```txt
UI derived from data.
```

The status controls:

* visual style
* badge appearance
* semantic meaning

This is declarative rendering.

---

# 15. Create the Customer Grid

## `src\components\CustomerGrid.tsx`

```tsx
import { customers } from "../data/customers";
import { CustomerCard } from "./CustomerCard";

export function CustomerGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
      }}
    >
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
        />
      ))}
    </div>
  );
}
```

---

# 16. Understanding `map()`

This is one of the core React rendering patterns:

```tsx
customers.map(...)
```

React transforms data into UI.

Conceptually:

```txt
customer 1 → card 1
customer 2 → card 2
customer 3 → card 3
```

This is declarative rendering.

Official documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 17. Why `key={customer.id}` Matters

Each rendered list item needs a stable key.

```tsx
key={customer.id}
```

helps React identify:

* added items
* removed items
* updated items

Without keys:

* React shows warnings
* rendering becomes less efficient

---

# 18. Create `App.tsx`

## `src\App.tsx`

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { CRMHeader } from "./components/CRMHeader";
import { CustomerGrid } from "./components/CustomerGrid";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
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
          <CRMHeader />

          <CustomerGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# 19. Why `FluentProvider` Matters

This line activates the Microsoft design system globally:

```tsx
<FluentProvider theme={webLightTheme}>
```

It provides:

* colors
* typography
* spacing
* accessibility
* Fluent UI styling

Without it, Fluent UI components lose their visual consistency.

Official documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 20. Create `main.tsx`

## `src\main.tsx`

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

# 21. Create `index.css`

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

---

# 22. Run the Application

## Development

```powershell
npm run dev
```

## Production Build

```powershell
npm run build
```

## Preview Production Build

```powershell
npm run preview
```

---

# 23. Understanding the React Rendering Flow

The rendering flow is:

```txt
main.tsx
  renders App

App
  renders CRMHeader and CustomerGrid

CustomerGrid
  loops through customers

CustomerCard
  renders each customer visually

ReactDOM
  updates the browser DOM
```

This is component-based architecture.

---

# 24. Why This App Matters

This app introduces the visual architecture used in:

* CRMs
* dashboards
* admin portals
* enterprise systems
* SharePoint-style applications
* Microsoft 365 interfaces

Later apps will evolve this structure into:

* API integration
* filtering
* forms
* dialogs
* routing
* authentication
* DataGrid systems

---

# 25. Technical Summary

| Concept              | Explanation                        |
| -------------------- | ---------------------------------- |
| TypeScript Interface | Predictable CRM data structure     |
| Static data          | Declarative rendering source       |
| Props                | Customer data passed to cards      |
| `map()`              | Converts arrays into UI            |
| Fluent UI Card       | Enterprise visual container        |
| Badge                | Visual status indicator            |
| Grid Layout          | Responsive CRM dashboard           |
| FluentProvider       | Global Microsoft theme             |
| Composition          | App split into reusable components |
| Declarative UI       | UI derived from data               |

---

# 26. Concept Table

| Concept        | File               | Purpose                               |
| -------------- | ------------------ | ------------------------------------- |
| Customer model | `Customer.ts`      | Defines enterprise customer structure |
| CRM data       | `customers.ts`     | Provides static dashboard data        |
| Customer card  | `CustomerCard.tsx` | Displays one customer visually        |
| Grid layout    | `CustomerGrid.tsx` | Renders multiple cards                |
| Header         | `CRMHeader.tsx`    | Provides dashboard identity           |
| Root app       | `App.tsx`          | Composes the full layout              |
| ReactDOM       | `main.tsx`         | Mounts React into HTML                |
| Global CSS     | `index.css`        | Removes default browser spacing       |

---

# 27. Official Documentation

| Topic             | Documentation                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| React Learn       | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                     |
| Thinking in React | [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)                             |
| Rendering Lists   | [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)                                 |
| Passing Props     | [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)       |
| Fluent UI         | [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web) |
| Fluent UI Card    | [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)        |
| Fluent UI Badge   | [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)      |
| Vite Guide        | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                      |
| TypeScript Docs   | [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                           |

---

# 28. Final Architectural Insight

The most important lesson from App 59 is:

```txt
Enterprise UIs are data-driven component systems.
```

The CRM dashboard is not manually built card by card.

Instead:

```txt
Data
→ React Components
→ Declarative Rendering
→ Enterprise Interface
```

This same pattern scales into:

* Microsoft dashboards
* CRM systems
* SharePoint portals
* ticket systems
* admin panels
* analytics applications

React is not about manually manipulating HTML.

React is about describing:

* components
* relationships
* rendering logic

and allowing React to synchronize the UI automatically.

---

# Current Project Progress

| Block   | App | Name                          | Status    |
| ------- | --: | ----------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent            | Completed |
| Block 1 |  02 | Profile Card                  | Completed |
| Block 1 |  03 | Product List                  | Completed |
| Block 1 |  04 | Microsoft Style User Card     | Completed |
| Block 1 |  05 | Static Dashboard              | Completed |
| Block 1 |  06 | Corporate Sidebar Menu        | Completed |
| Block 1 |  07 | Visual Task List              | Completed |
| Block 1 |  08 | Timeline Events               | Completed |
| Block 1 |  09 | Employee Table                | Completed |
| Block 1 |  10 | Email List                    | Completed |
| Block 1 |  11 | Grid of Cards                 | Completed |
| Block 1 |  12 | Image Gallery                 | Completed |
| Block 1 |  13 | Movie Catalog                 | Completed |
| Block 1 |  14 | Football Teams                | Completed |
| Block 1 |  15 | News Page                     | Completed |
| Block 1 |  16 | Financial Dashboard           | Completed |
| Block 1 |  17 | SharePoint Style Layout       | Completed |
| Block 1 |  18 | File Explorer                 | Completed |
| Block 1 |  19 | Corporate Portal              | Completed |
| Block 1 |  20 | Microsoft Style Landing Page  | Completed |
| Block 2 |  21 | Modern Counter                | Completed |
| Block 2 |  22 | Toggle Theme                  | Completed |
| Block 2 |  23 | React Calculator              | Completed |
| Block 2 |  24 | Login Form                    | Completed |
| Block 2 |  25 | User Registration             | Completed |
| Block 2 |  26 | Complete ToDo List            | Completed |
| Block 2 |  27 | Shopping List                 | Completed |
| Block 2 |  28 | Product Filter                | Completed |
| Block 2 |  29 | Employee Search               | Completed |
| Block 2 |  30 | Shopping Cart                 | Completed |
| Block 2 |  31 | Grade Simulator               | Completed |
| Block 2 |  32 | Inventory Control             | Completed |
| Block 2 |  33 | Contact Agenda                | Completed |
| Block 2 |  34 | Currency Converter            | Completed |
| Block 2 |  35 | BMI Calculator                | Completed |
| Block 2 |  36 | Installment Simulator         | Completed |
| Block 2 |  37 | Voting Panel                  | Completed |
| Block 2 |  38 | Interactive Quiz              | Completed |
| Block 2 |  39 | Team Manager                  | Completed |
| Block 2 |  40 | Dynamic Dashboard             | Completed |
| Block 3 |  41 | Microsoft Style Login         | Completed |
| Block 3 |  42 | Corporate Form                | Completed |
| Block 3 |  43 | Tabs Navigation               | Completed |
| Block 3 |  44 | Dialog Manager                | Completed |
| Block 3 |  45 | Executive Dashboard           | Completed |
| Block 3 |  46 | DataGrid Catalog              | Completed |
| Block 3 |  47 | Enterprise User List          | Completed |
| Block 3 |  48 | Sidebar Navigation            | Completed |
| Block 3 |  49 | Corporate Header              | Completed |
| Block 3 |  50 | Professional Toolbar          | Completed |
| Block 3 |  51 | Notification Center           | Completed |
| Block 3 |  52 | Administrative Panel          | Completed |
| Block 3 |  53 | Ticket Manager                | Completed |
| Block 3 |  54 | Approval System               | Completed |
| Block 3 |  55 | Corporate Calendar            | Completed |
| Block 3 |  56 | SharePoint Inspired Dashboard | Completed |
| Block 3 |  57 | Project Dashboard             | Completed |
| Block 3 |  58 | Ticket Control                | Completed |
| Block 3 |  59 | CRM Visual                    | Current   |
| Block 3 |  60 | Enterprise Explorer           | Next      |
