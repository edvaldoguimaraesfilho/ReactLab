```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app49-corporate-header -- --template react-ts

cd app49-corporate-header

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\HeaderAction.ts -ItemType File
New-Item src\data\headerActions.ts -ItemType File
New-Item src\components\CorporateHeader.tsx -ItemType File
New-Item src\components\DashboardBody.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 49: Corporate Header with React, Fluent UI, TypeScript, and Vite

## Introduction

In **App 49 — Corporate Header**, we continue exploring **Block 3 — Professional Fluent UI Applications**, where the focus is building enterprise-grade Microsoft-style interfaces using React and Fluent UI. 

A corporate header is one of the most important UI structures in enterprise applications because it centralizes:

* branding
* navigation
* search
* notifications
* user profile access
* quick actions
* command surfaces

This type of interface appears in:

* Microsoft 365
* SharePoint
* Teams
* Power Platform
* admin centers
* CRMs
* dashboards
* ERP systems

The purpose of this app is not only visual. Architecturally, it introduces:

* enterprise layout composition
* reusable header actions
* Fluent UI Toolbar patterns
* responsive header organization
* declarative rendering with lists
* TypeScript-driven UI models
* component separation

This app reinforces one of the most important React concepts:

```txt
The interface is generated from data and components.
```

Instead of manually building repetitive buttons, React renders the header from structured data.

---

# 1. What This App Teaches

| Concept                    | Explanation                           |
| -------------------------- | ------------------------------------- |
| Enterprise header layout   | Professional top navigation structure |
| Fluent UI Toolbar patterns | Microsoft-style action organization   |
| Data-driven rendering      | Header buttons rendered from arrays   |
| Component composition      | Header and content separated          |
| TypeScript models          | Strongly typed action definitions     |
| Declarative rendering      | UI derived from data                  |
| Fluent UI icons            | Enterprise icon system                |
| Flexbox layout             | Horizontal alignment and spacing      |

---

# 2. Final Folder Structure

```txt
app49-corporate-header/
  src/
    components/
      CorporateHeader.tsx
      DashboardBody.tsx

    models/
      HeaderAction.ts

    data/
      headerActions.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

Each file has one responsibility:

| File                  | Responsibility                |
| --------------------- | ----------------------------- |
| `HeaderAction.ts`     | Defines the action model      |
| `headerActions.ts`    | Stores header button data     |
| `CorporateHeader.tsx` | Renders the enterprise header |
| `DashboardBody.tsx`   | Renders page content          |
| `App.tsx`             | Composes the layout           |
| `main.tsx`            | Mounts React                  |
| `index.css`           | Global CSS                    |

---

# 3. Create the Header Model

## `src\models\HeaderAction.ts`

```ts
export interface HeaderAction {
  id: number;
  label: string;
}
```

This interface defines the shape of each header action.

Every action must contain:

| Property | Type   |
| -------- | ------ |
| `id`     | number |
| `label`  | string |

This guarantees predictable rendering.

TypeScript helps prevent architectural mistakes.

---

# 4. Create the Header Data

## `src\data\headerActions.ts`

```ts
import type { HeaderAction } from "../models/HeaderAction";

export const headerActions: HeaderAction[] = [
  {
    id: 1,
    label: "Dashboard",
  },
  {
    id: 2,
    label: "Projects",
  },
  {
    id: 3,
    label: "Teams",
  },
  {
    id: 4,
    label: "Reports",
  },
  {
    id: 5,
    label: "Settings",
  },
];
```

This file introduces a core React architecture principle:

```txt
UI should be derived from data.
```

Instead of manually repeating buttons, we describe the data once and React renders the interface dynamically.

---

# 5. Create the Corporate Header

## `src\components\CorporateHeader.tsx`

```tsx
import {
  Avatar,
  Button,
  Input,
  Text,
  Title3,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  Alert24Regular,
  Home24Regular,
  People24Regular,
  Search24Regular,
  Settings24Regular,
  Document24Regular,
} from "@fluentui/react-icons";

import { headerActions } from "../data/headerActions";

const icons = [
  <Home24Regular />,
  <Document24Regular />,
  <People24Regular />,
  <Alert24Regular />,
  <Settings24Regular />,
];

export function CorporateHeader() {
  return (
    <header
      style={{
        height: "72px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Title3>
          React Enterprise Portal
        </Title3>

        <Toolbar>
          {headerActions.map((action, index) => (
            <ToolbarButton
              key={action.id}
              icon={icons[index]}
            >
              {action.label}
            </ToolbarButton>
          ))}
        </Toolbar>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Input
          contentBefore={<Search24Regular />}
          placeholder="Search"
        />

        <Button
          appearance="subtle"
          icon={<Alert24Regular />}
        />

        <Avatar
          name="Edvaldo Guimaraes"
          badge={{ status: "available" }}
        />
      </div>
    </header>
  );
}
```

---

# 6. Understanding the Header Architecture

The header is divided into two sections:

| Section    | Purpose                               |
| ---------- | ------------------------------------- |
| Left side  | Branding + navigation                 |
| Right side | Search + notifications + user profile |

Layout:

```txt
--------------------------------------------------------
| Logo + Toolbar            Search + Alerts + Avatar   |
--------------------------------------------------------
```

This is the classic Microsoft enterprise pattern.

---

# 7. Why Flexbox Is Used

The root header uses:

```tsx
display: "flex"
justifyContent: "space-between"
alignItems: "center"
```

This creates:

* horizontal layout
* vertical centering
* spacing between sections

The result:

```txt
Left section stays left
Right section stays right
```

Flexbox is one of the most important layout systems in React UI development.

---

# 8. Understanding Toolbar Rendering

The toolbar uses:

```tsx
{headerActions.map((action, index) => (
  <ToolbarButton
    key={action.id}
    icon={icons[index]}
  >
    {action.label}
  </ToolbarButton>
))}
```

This is declarative rendering.

React transforms:

```txt
Dashboard
Projects
Teams
Reports
Settings
```

into Fluent UI toolbar buttons.

The important concept:

```txt
Data
→ map()
→ JSX
→ React rendering
→ final UI
```

---

# 9. Why `key={action.id}` Matters

React lists require stable keys.

```tsx
key={action.id}
```

helps React:

* track elements
* optimize rendering
* correctly update the DOM

Without keys:

* React warnings appear
* rendering becomes less predictable

---

# 10. Understanding Fluent UI Toolbar

Fluent UI provides:

```tsx
<Toolbar>
<ToolbarButton>
```

These components automatically provide:

* keyboard accessibility
* spacing
* Microsoft visual consistency
* focus management
* enterprise interaction patterns

Without Fluent UI, all of this would require manual implementation.

Official documentation:

* [Fluent UI Toolbar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/toolbar)

---

# 11. Understanding Fluent UI Avatar

```tsx
<Avatar
  name="Edvaldo Guimaraes"
  badge={{ status: "available" }}
/>
```

The Avatar component provides:

* profile visualization
* initials generation
* presence indicators
* enterprise user identity

The badge:

```tsx
status: "available"
```

shows the Microsoft-style online indicator.

---

# 12. Understanding the Search Input

```tsx
<Input
  contentBefore={<Search24Regular />}
  placeholder="Search"
/>
```

This demonstrates Fluent UI slot composition.

`contentBefore` injects the icon inside the input.

This is cleaner than manually positioning icons with CSS.

---

# 13. Create the Dashboard Body

## `src\components\DashboardBody.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function DashboardBody() {
  return (
    <main
      style={{
        padding: "32px",
        backgroundColor: "#f5f5f5",
        minHeight: "calc(100vh - 72px)",
        boxSizing: "border-box",
      }}
    >
      <Title2>
        Corporate Dashboard
      </Title2>

      <Text>
        Enterprise React layout with Fluent UI header composition.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Projects</Title2>

          <Text>
            24 active projects currently running.
          </Text>
        </Card>

        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Teams</Title2>

          <Text>
            8 departments connected to the portal.
          </Text>
        </Card>

        <Card
          style={{
            padding: "24px",
          }}
        >
          <Title2>Reports</Title2>

          <Text>
            14 reports generated this month.
          </Text>
        </Card>
      </div>
    </main>
  );
}
```

---

# 14. Understanding CSS Grid

The dashboard uses:

```tsx
gridTemplateColumns:
  "repeat(auto-fit, minmax(260px, 1fr))"
```

Meaning:

```txt
Create responsive columns.
Each column must be at least 260px.
Expand equally if space exists.
```

This creates responsive enterprise cards automatically.

---

# 15. Create `App.tsx`

## `src\App.tsx`

```tsx
import { CorporateHeader } from "./components/CorporateHeader";
import { DashboardBody } from "./components/DashboardBody";

function App() {
  return (
    <>
      <CorporateHeader />

      <DashboardBody />
    </>
  );
}

export default App;
```

This file composes the application.

Architecture:

```txt
App
  CorporateHeader
  DashboardBody
```

This separation improves:

* maintainability
* readability
* scalability

---

# 16. Create `main.tsx`

## `src\main.tsx`

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

This file:

* connects React to HTML
* activates Fluent UI
* enables Microsoft theming

---

# 17. Create `index.css`

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

This removes default browser spacing and applies enterprise typography.

---

# 18. Run the App

Development:

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# 19. Why This App Matters

This app introduces the foundation for:

* enterprise navigation
* admin centers
* SharePoint-style layouts
* dashboard shells
* Microsoft-style applications
* top navigation systems

Future apps will expand this into:

* routing
* notifications
* authentication menus
* command systems
* responsive navigation
* layout persistence

This is a foundational enterprise UI architecture.

---

# 20. Technical Summary

| Concept               | Explanation                        |
| --------------------- | ---------------------------------- |
| Toolbar               | Enterprise command navigation      |
| Avatar                | Microsoft-style user identity      |
| Input with slots      | Search field with embedded icon    |
| Declarative rendering | Toolbar generated from data        |
| CSS Grid              | Responsive dashboard cards         |
| Flexbox               | Header alignment                   |
| TypeScript interface  | Predictable action structure       |
| FluentProvider        | Global Microsoft design system     |
| Fluent UI icons       | Enterprise icon system             |
| Component composition | App divided into reusable sections |

---

# 21. Concept Table

| Concept            | File                  | Purpose                       |
| ------------------ | --------------------- | ----------------------------- |
| Header model       | `HeaderAction.ts`     | Defines action structure      |
| Header data        | `headerActions.ts`    | Stores navigation items       |
| Toolbar rendering  | `CorporateHeader.tsx` | Generates buttons dynamically |
| Avatar             | `CorporateHeader.tsx` | User identity                 |
| Search input       | `CorporateHeader.tsx` | Enterprise search UI          |
| Dashboard cards    | `DashboardBody.tsx`   | Main content area             |
| Layout composition | `App.tsx`             | Combines sections             |
| FluentProvider     | `main.tsx`            | Activates Microsoft theming   |

---

# 22. Official Documentation

| Topic                      | Documentation                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React Learn                | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                     |
| Rendering Lists            | [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)                                 |
| Describing the UI          | [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)                             |
| Keeping Components Pure    | [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)                 |
| Fluent UI React Components | [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web) |
| Fluent UI Toolbar          | [Fluent UI Toolbar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/toolbar)  |
| Fluent UI Avatar           | [Fluent UI Avatar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/avatar)    |
| Vite Guide                 | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                      |
| TypeScript Docs            | [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                           |

---

# 23. Final Architectural Insight

The most important lesson from App 49 is:

```txt
Enterprise layouts are compositions of reusable UI systems.
```

The header is not a static HTML bar.

It is:

* data-driven
* componentized
* typed
* declarative
* reusable

React allows enterprise interfaces to evolve predictably by composing:

* components
* layouts
* state
* data
* design systems

This architecture becomes critical for:

* admin portals
* dashboards
* Microsoft 365-style applications
* SharePoint-inspired systems
* large enterprise React solutions

---

# Current Project Progress

| Block   | App | Name                         | Status    |
| ------- | --: | ---------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent           | Completed |
| Block 1 |  02 | Profile Card                 | Completed |
| Block 1 |  03 | Product List                 | Completed |
| Block 1 |  04 | Microsoft Style User Card    | Completed |
| Block 1 |  05 | Static Dashboard             | Completed |
| Block 1 |  06 | Corporate Sidebar Menu       | Completed |
| Block 1 |  07 | Visual Task List             | Completed |
| Block 1 |  08 | Timeline Events              | Completed |
| Block 1 |  09 | Employee Table               | Completed |
| Block 1 |  10 | Email List                   | Completed |
| Block 1 |  11 | Grid of Cards                | Completed |
| Block 1 |  12 | Image Gallery                | Completed |
| Block 1 |  13 | Movie Catalog                | Completed |
| Block 1 |  14 | Football Teams               | Completed |
| Block 1 |  15 | News Page                    | Completed |
| Block 1 |  16 | Financial Dashboard          | Completed |
| Block 1 |  17 | SharePoint Style Layout      | Completed |
| Block 1 |  18 | File Explorer                | Completed |
| Block 1 |  19 | Corporate Portal             | Completed |
| Block 1 |  20 | Microsoft Style Landing Page | Completed |
| Block 2 |  21 | Modern Counter               | Completed |
| Block 2 |  22 | Toggle Theme                 | Completed |
| Block 2 |  23 | React Calculator             | Completed |
| Block 2 |  24 | Login Form                   | Completed |
| Block 2 |  25 | User Registration            | Completed |
| Block 2 |  26 | Complete ToDo List           | Completed |
| Block 2 |  27 | Shopping List                | Completed |
| Block 2 |  28 | Product Filter               | Completed |
| Block 2 |  29 | Employee Search              | Completed |
| Block 2 |  30 | Shopping Cart                | Completed |
| Block 2 |  31 | Grade Simulator              | Completed |
| Block 2 |  32 | Inventory Control            | Completed |
| Block 2 |  33 | Contact Agenda               | Completed |
| Block 2 |  34 | Currency Converter           | Completed |
| Block 2 |  35 | BMI Calculator               | Completed |
| Block 2 |  36 | Installment Simulator        | Completed |
| Block 2 |  37 | Voting Panel                 | Completed |
| Block 2 |  38 | Interactive Quiz             | Completed |
| Block 2 |  39 | Team Manager                 | Completed |
| Block 2 |  40 | Dynamic Dashboard            | Completed |
| Block 3 |  41 | Microsoft Style Login        | Completed |
| Block 3 |  42 | Corporate Form               | Completed |
| Block 3 |  43 | Tabs Navigation              | Completed |
| Block 3 |  44 | Dialog Manager               | Completed |
| Block 3 |  45 | Executive Dashboard          | Completed |
| Block 3 |  46 | DataGrid Catalog             | Completed |
| Block 3 |  47 | Enterprise User List         | Completed |
| Block 3 |  48 | Navigable Sidebar            | Completed |
| Block 3 |  49 | Corporate Header             | Current   |
| Block 3 |  50 | Professional Toolbar         | Next      |

Base roadmap and project structure defined in the ReactLab files. 
