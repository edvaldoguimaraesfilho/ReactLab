# App 06 — Corporate Sidebar Menu

According to the project roadmap, App 06 is:

| App | Name                   | Main Concept                                                                   |
| --- | ---------------------- | ------------------------------------------------------------------------------ |
| 06  | Corporate Sidebar Menu | Enterprise layout, navigation UI, conditional rendering, Fluent UI composition |

This app is part of **Block 1 — Fundamentals and UI**. 

The primary goal of this application is to learn:

* Layout composition
* Sidebar architecture
* Reusable navigation items
* Fluent UI containers
* Flexbox layout systems
* Declarative rendering
* Component organization
* Enterprise UI structure

React Learn concepts related to this app:

* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)
* [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)

Fluent UI documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Button](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/button)

---

# Final Application Goal

You will build a Microsoft-style enterprise layout containing:

* Left sidebar navigation
* Company branding area
* Navigation menu items
* Main content panel
* Dashboard cards
* Fluent UI styling
* Responsive Flexbox layout

The final result should resemble:

* Microsoft admin portals
* SharePoint layouts
* corporate intranet portals
* dashboard applications

---

# Step 1 — Create the Project

## PowerShell Commands

```powershell
mkdir bloco01
cd bloco01

npm create vite@latest app06-corporate-sidebar-menu -- --template react-ts

cd app06-corporate-sidebar-menu

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Step 2 — Open VS Code

```powershell
code .
```

---

# Step 3 — Recommended Folder Structure

Create the folders:

```powershell
mkdir src\components
mkdir src\data
mkdir src\styles
```

---

# Step 4 — Create the Navigation Model

## File

```txt
src/data/navigationItems.ts
```

## Code

```tsx
export interface NavigationItem {
  id: number;
  title: string;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 1,
    title: "Dashboard",
  },
  {
    id: 2,
    title: "Projects",
  },
  {
    id: 3,
    title: "Teams",
  },
  {
    id: 4,
    title: "Reports",
  },
  {
    id: 5,
    title: "Settings",
  },
];
```

---

# Why This File Matters

This introduces a critical React architectural concept:

## UI derived from data

Instead of manually writing sidebar buttons repeatedly, the interface is generated from structured data.

This is foundational React thinking.

React prefers:

* data-driven UI
* declarative rendering
* reusable rendering logic

This file also introduces:

```tsx
export interface NavigationItem
```

This is TypeScript typing.

It defines the shape of the object.

Each navigation item MUST contain:

* id
* title

This improves:

* autocomplete
* maintainability
* type safety
* scalability

---

# Step 5 — Create the Sidebar Component

## File

```txt
src/components/Sidebar.tsx
```

## Code

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  Home24Regular,
  Folder24Regular,
  People24Regular,
  Document24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

import {
  navigationItems,
} from "../data/navigationItems";

const icons = [
  <Home24Regular />,
  <Folder24Regular />,
  <People24Regular />,
  <Document24Regular />,
  <Settings24Regular />,
];

export function Sidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: "0",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <Title2>Enterprise Portal</Title2>

        <Text>
          Microsoft Style Navigation
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        {navigationItems.map((item, index) => (
          <Button
            key={item.id}
            appearance="subtle"
            icon={icons[index]}
            style={{
              justifyContent: "flex-start",
            }}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </Card>
  );
}
```

---

# Important React Concepts Here

## Rendering Lists

This section:

```tsx
navigationItems.map(...)
```

is one of the most important React patterns.

React renders collections declaratively.

Instead of:

```html
<button>Dashboard</button>
<button>Projects</button>
<button>Teams</button>
```

we derive the UI from data.

This is a core React mental model.

---

# Why key={item.id} Matters

```tsx
key={item.id}
```

Keys help React identify elements efficiently during rendering updates.

Without keys:

* React rendering becomes inefficient
* React may reuse incorrect DOM nodes

Keys are fundamental in dynamic rendering.

---

# Step 6 — Create Dashboard Content Component

## File

```txt
src/components/DashboardContent.tsx
```

## Code

```tsx
import {
  Card,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

export function DashboardContent() {
  return (
    <main
      style={{
        flex: 1,
        padding: "32px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Corporate Dashboard
      </Title1>

      <Text>
        Welcome to the enterprise portal.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <Card>
          <Title3>Projects</Title3>

          <Text>
            24 Active Projects
          </Text>
        </Card>

        <Card>
          <Title3>Teams</Title3>

          <Text>
            8 Departments
          </Text>
        </Card>

        <Card>
          <Title3>Reports</Title3>

          <Text>
            14 Monthly Reports
          </Text>
        </Card>
      </div>
    </main>
  );
}
```

---

# Important Layout Concepts

## CSS Grid

This section:

```tsx
gridTemplateColumns:
  "repeat(auto-fit, minmax(240px, 1fr))"
```

creates a responsive grid automatically.

This means:

* cards resize dynamically
* layout adapts to screen width
* enterprise responsiveness improves

This is a modern dashboard pattern.

---

# Step 7 — Update App.tsx

## File

```txt
src/App.tsx
```

## Code

```tsx
import { Sidebar } from "./components/Sidebar";
import { DashboardContent } from "./components/DashboardContent";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <DashboardContent />
    </div>
  );
}

export default App;
```

---

# Why Flexbox Is Important Here

```tsx
display: "flex"
```

creates a horizontal application layout.

The structure becomes:

```txt
| Sidebar | Main Content |
```

This is the foundation of:

* admin panels
* portals
* SharePoint layouts
* Microsoft enterprise systems

---

# Step 8 — Update main.tsx

## File

```txt
src/main.tsx
```

## Code

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

# Step 9 — Run the Application

## PowerShell

```powershell
npm run dev
```

---

# Expected Final Result

The application should display:

* Enterprise left sidebar
* Navigation buttons with icons
* Corporate dashboard area
* Responsive cards
* Fluent UI styling
* Microsoft visual identity

---

# Architectural Concepts Learned

| Concept               | Explanation                    |
| --------------------- | ------------------------------ |
| JSX                   | Declarative UI syntax          |
| Functional Components | Reusable UI functions          |
| Props                 | Component configuration        |
| map() Rendering       | Dynamic list rendering         |
| Flexbox               | Main application layout        |
| CSS Grid              | Responsive dashboard cards     |
| Fluent UI             | Microsoft design system        |
| TypeScript Interfaces | Strong typing                  |
| Component Composition | Building UI from smaller parts |
| Data-driven UI        | Rendering from structured data |

---

# Why This App Is Important

This app introduces the true structure of enterprise React applications.

Unlike simple tutorial pages, this architecture resembles real-world systems:

* admin dashboards
* SharePoint portals
* CRMs
* ERP systems
* intranet applications

This is the beginning of professional React layout architecture.

---

# Technical Summary

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| React        | UI rendering            |
| TypeScript   | Static typing           |
| Vite         | Build tool              |
| Fluent UI    | Enterprise UI framework |
| Flexbox      | Main layout             |
| CSS Grid     | Dashboard cards         |
| Fluent Icons | Enterprise icons        |
| map()        | Dynamic rendering       |
| Interfaces   | Data contracts          |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Button](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/button)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                   | Status    |
| ------- | --: | ---------------------- | --------- |
| Block 1 |  01 | Hello React Fluent     | Completed |
| Block 1 |  02 | Profile Card           | Completed |
| Block 1 |  03 | Product List           | Completed |
| Block 1 |  04 | Microsoft User Card    | Completed |
| Block 1 |  05 | Static Dashboard       | Completed |
| Block 1 |  06 | Corporate Sidebar Menu | Current   |
| Block 1 |  07 | Visual Task List       | Next      |

Project roadmap defined in the uploaded files. 


# React + Fluent UI — 100 Apps Roadmap

The complete roadmap for the React + Fluent UI learning project is defined in the uploaded project structure documents. 

---

# BLOCK 1 — FUNDAMENTALS AND UI (Apps 01–20)

Based on:

* [React Learn — Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)

| App | Name                         |
| --- | ---------------------------- |
| 01  | Hello React Fluent           |
| 02  | Profile Card                 |
| 03  | Product List                 |
| 04  | Microsoft Style User Card    |
| 05  | Static Dashboard             |
| 06  | Corporate Sidebar Menu       |
| 07  | Visual Task List             |
| 08  | Events Timeline              |
| 09  | Employees Table              |
| 10  | Email List                   |
| 11  | Cards Grid                   |
| 12  | Image Gallery                |
| 13  | Movies Catalog               |
| 14  | Football Teams List          |
| 15  | News Portal                  |
| 16  | Static Financial Dashboard   |
| 17  | SharePoint Style Layout      |
| 18  | File Explorer                |
| 19  | Corporate Portal             |
| 20  | Microsoft Style Landing Page |

---

# BLOCK 2 — INTERACTIVITY AND STATE (Apps 21–40)

Based on:

* [Adding Interactivity](https://react.dev/learn/adding-interactivity?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)

| App | Name                  |
| --- | --------------------- |
| 21  | Modern Counter        |
| 22  | Toggle Theme          |
| 23  | React Calculator      |
| 24  | Login Form            |
| 25  | User Registration     |
| 26  | Complete ToDo List    |
| 27  | Shopping List         |
| 28  | Product Filter        |
| 29  | Employee Search       |
| 30  | Shopping Cart         |
| 31  | Grades Simulator      |
| 32  | Inventory Control     |
| 33  | Contacts Agenda       |
| 34  | Currency Converter    |
| 35  | BMI Calculator        |
| 36  | Installment Simulator |
| 37  | Voting Panel          |
| 38  | Interactive Quiz      |
| 39  | Team Manager          |
| 40  | Dynamic Dashboard     |

---

# BLOCK 3 — PROFESSIONAL FLUENT UI (Apps 41–60)

Based on:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

| App | Name                          |
| --- | ----------------------------- |
| 41  | Microsoft Style Login         |
| 42  | Corporate Form                |
| 43  | Tabs System                   |
| 44  | Dialog Manager                |
| 45  | Executive Dashboard           |
| 46  | DataGrid Catalog              |
| 47  | Enterprise Users List         |
| 48  | Navigable Sidebar             |
| 49  | Corporate Header              |
| 50  | Professional Toolbar          |
| 51  | Notifications System          |
| 52  | Administrative Panel          |
| 53  | Tickets Manager               |
| 54  | Approval System               |
| 55  | Corporate Agenda              |
| 56  | SharePoint Inspired Dashboard |
| 57  | Projects Management           |
| 58  | Support Tickets Control       |
| 59  | Visual CRM                    |
| 60  | Corporate Explorer            |

---

# BLOCK 4 — EFFECTS AND ARCHITECTURE (Apps 61–80)

Based on:

* [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects?utm_source=chatgpt.com)
* [Escape Hatches](https://react.dev/learn/escape-hatches?utm_source=chatgpt.com)

| App | Name                            |
| --- | ------------------------------- |
| 61  | REST API Consumption            |
| 62  | API Dashboard                   |
| 63  | Async Search                    |
| 64  | GitHub User Explorer            |
| 65  | Weather App                     |
| 66  | Pagination System               |
| 67  | Infinite Scroll                 |
| 68  | Data Cache                      |
| 69  | Custom Fetch Hook               |
| 70  | Global Context Control          |
| 71  | Favorites System                |
| 72  | API DataGrid                    |
| 73  | Analytics Dashboard             |
| 74  | Cryptocurrency Monitor          |
| 75  | Repositories Explorer           |
| 76  | Logs Dashboard                  |
| 77  | Reports System                  |
| 78  | Performance Simulator           |
| 79  | Layered Architecture            |
| 80  | Mini React Enterprise Framework |

---

# BLOCK 5 — COMPLETE APPLICATIONS (Apps 81–100)

| App | Name                            |
| --- | ------------------------------- |
| 81  | Complete CRUD System            |
| 82  | Employees Management            |
| 83  | Financial Dashboard             |
| 84  | Inventory System                |
| 85  | Kanban Board                    |
| 86  | Enterprise Tasks Manager        |
| 87  | Users System                    |
| 88  | Administrative Portal           |
| 89  | Tickets System                  |
| 90  | Power BI Style Dashboard        |
| 91  | Reports Generator               |
| 92  | Audit System                    |
| 93  | SharePoint Inspired Portal      |
| 94  | Corporate Catalog               |
| 95  | Reservation System              |
| 96  | Mini Enterprise ERP             |
| 97  | Complete CRM                    |
| 98  | Analytics Platform              |
| 99  | Microsoft Style Admin Center    |
| 100 | Final React Enterprise Platform |

---

# Current Progress

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Current   |
| Block 1 |  07 | Visual Task List          | Next      |

Roadmap source files uploaded in the project conversation. 
