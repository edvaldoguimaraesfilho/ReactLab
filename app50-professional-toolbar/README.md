```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 50: Professional Toolbar with React, Fluent UI, TypeScript, and Vite

App 50 — Toolbar Profissional belongs to Block 3 of the ReactLab roadmap: Professional Fluent UI Applications. In this stage, the project evolves from simple UI rendering into enterprise-grade interface architecture using the Microsoft Fluent UI ecosystem. According to the project roadmap, App 50 focuses on professional toolbar construction, action organization, enterprise layouts, Fluent UI actions, icons, and command systems. 

A toolbar is one of the most common enterprise interface patterns. Modern systems such as Microsoft 365, SharePoint admin centers, Teams, CRMs, dashboards, ticket systems, ERPs, analytics platforms, and file explorers all rely heavily on toolbars to organize commands and actions.

This application teaches one of the most important React mental models:

```txt
UI actions are derived from data and state.
```

The toolbar is not manually constructed button by button in an imperative way. Instead, React receives structured data and declaratively renders the toolbar actions.

This app introduces:

* Fluent UI Toolbar
* command-based UI
* enterprise action composition
* reusable toolbar actions
* data-driven rendering
* conditional rendering
* layout organization
* React composition patterns
* icon-driven interfaces
* professional enterprise spacing

The app continues following:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 1. Create the Project

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app50-professional-toolbar -- --template react-ts

cd app50-professional-toolbar

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 2. Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\ToolbarAction.ts -ItemType File
New-Item src\data\toolbarActions.ts -ItemType File
New-Item src\components\EnterpriseToolbar.tsx -ItemType File
New-Item src\components\DashboardPanel.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 3. Final Folder Structure

```txt
app50-professional-toolbar/
  src/
    components/
      EnterpriseToolbar.tsx
      DashboardPanel.tsx

    data/
      toolbarActions.ts

    models/
      ToolbarAction.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
  package.json
  vite.config.ts
```

This structure follows the architectural model used across the ReactLab project.

---

# 4. Create the Toolbar Model

## `src\models\ToolbarAction.ts`

```ts
import type { JSX } from "react";

export interface ToolbarAction {
  id: number;
  title: string;
  icon: JSX.Element;
  appearance?: "primary" | "subtle" | "transparent";
}
```

---

# Understanding the Model

This interface defines the structure of each toolbar action.

Every action contains:

| Property     | Purpose                |
| ------------ | ---------------------- |
| `id`         | Unique React key       |
| `title`      | Action label           |
| `icon`       | Fluent UI icon         |
| `appearance` | Visual Fluent UI style |

This introduces one of the most important enterprise React ideas:

```txt
The UI should be driven by structured data.
```

Instead of manually hardcoding many buttons, we define data and let React render the UI declaratively.

---

# 5. Create Toolbar Data

## `src\data\toolbarActions.ts`

```tsx
import {
  Add24Regular,
  Delete24Regular,
  Edit24Regular,
  Save24Regular,
  Folder24Regular,
  Document24Regular,
} from "@fluentui/react-icons";

import type { ToolbarAction } from "../models/ToolbarAction";

export const toolbarActions: ToolbarAction[] = [
  {
    id: 1,
    title: "New",
    icon: <Add24Regular />,
    appearance: "primary",
  },
  {
    id: 2,
    title: "Edit",
    icon: <Edit24Regular />,
    appearance: "subtle",
  },
  {
    id: 3,
    title: "Save",
    icon: <Save24Regular />,
    appearance: "subtle",
  },
  {
    id: 4,
    title: "Documents",
    icon: <Document24Regular />,
    appearance: "transparent",
  },
  {
    id: 5,
    title: "Folders",
    icon: <Folder24Regular />,
    appearance: "transparent",
  },
  {
    id: 6,
    title: "Delete",
    icon: <Delete24Regular />,
    appearance: "subtle",
  },
];
```

---

# Why Data-Driven UI Matters

This file represents a very important React architecture pattern.

Instead of:

```tsx
<Button>New</Button>
<Button>Edit</Button>
<Button>Save</Button>
```

we define:

```txt
ToolbarAction[]
```

Then React converts the array into UI using `map()`.

This makes the interface:

* scalable
* reusable
* easier to maintain
* easier to refactor
* easier to extend

---

# 6. Create the Enterprise Toolbar

## `src\components\EnterpriseToolbar.tsx`

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";

import { toolbarActions } from "../data/toolbarActions";

export function EnterpriseToolbar() {
  return (
    <Card
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title2>Enterprise Toolbar</Title2>

      <Text>
        Professional Fluent UI toolbar with enterprise actions.
      </Text>

      <Toolbar
        aria-label="Enterprise toolbar"
      >
        {toolbarActions.map((action, index) => (
          <div
            key={action.id}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ToolbarButton
              appearance={action.appearance}
              icon={action.icon}
            >
              {action.title}
            </ToolbarButton>

            {index < toolbarActions.length - 1 && (
              <ToolbarDivider />
            )}
          </div>
        ))}
      </Toolbar>
    </Card>
  );
}
```

---

# Understanding `Toolbar`

The Fluent UI Toolbar component organizes command-based actions in enterprise layouts.

Toolbars are extremely common in:

* admin systems
* document systems
* dashboards
* CRMs
* ERPs
* SharePoint portals
* Microsoft-style applications

The structure is:

```txt
Toolbar
  ToolbarButton
  ToolbarDivider
```

This creates a consistent Microsoft-style action layout.

Official documentation:

* [Fluent UI Toolbar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/toolbar)

---

# 7. Understanding `map()`

This is one of the most important sections:

```tsx
toolbarActions.map((action) => ...)
```

React transforms data into UI.

Conceptually:

```txt
ToolbarAction[]
→ ToolbarButton[]
```

This is declarative rendering.

Instead of imperatively creating buttons, we describe:

```txt
For each toolbar action,
render a ToolbarButton.
```

React handles the DOM creation automatically.

Official documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 8. Understanding `key={action.id}`

```tsx
key={action.id}
```

React requires stable keys for lists.

Keys help React:

* identify elements
* update efficiently
* preserve rendering stability

Without keys, React cannot reliably track list items.

---

# 9. Understanding `ToolbarDivider`

```tsx
<ToolbarDivider />
```

This visually separates actions.

Enterprise interfaces heavily depend on:

* grouping
* spacing
* visual separation
* action hierarchy

The divider improves usability and organization.

---

# 10. Understanding Toolbar Appearances

Fluent UI supports multiple visual appearances.

| Appearance    | Meaning                 |
| ------------- | ----------------------- |
| `primary`     | Main action             |
| `subtle`      | Secondary action        |
| `transparent` | Minimal visual emphasis |

This creates visual hierarchy.

Example:

```txt
New
```

is primary because creating something is important.

Meanwhile:

```txt
Documents
Folders
```

are navigation/support actions.

---

# 11. Create the Dashboard Panel

## `src\components\DashboardPanel.tsx`

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

export function DashboardPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "24px",
      }}
    >
      <Card>
        <Title3>Projects</Title3>

        <Text>
          14 Active Projects
        </Text>
      </Card>

      <Card>
        <Title3>Teams</Title3>

        <Text>
          8 Enterprise Departments
        </Text>
      </Card>

      <Card>
        <Title3>Reports</Title3>

        <Text>
          32 Monthly Reports
        </Text>
      </Card>
    </div>
  );
}
```

---

# Understanding CSS Grid

The dashboard uses:

```tsx
gridTemplateColumns:
  "repeat(auto-fit, minmax(240px, 1fr))"
```

This creates a responsive layout.

Meaning:

```txt
Create as many columns as possible.
Each column must be at least 240px.
Distribute remaining space evenly.
```

This is widely used in:

* dashboards
* analytics systems
* admin portals
* enterprise panels

---

# 12. Create the Root App

## `src\App.tsx`

```tsx
import {
  FluentProvider,
  webLightTheme,
  Text,
  Title1,
} from "@fluentui/react-components";

import { EnterpriseToolbar } from "./components/EnterpriseToolbar";
import { DashboardPanel } from "./components/DashboardPanel";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div>
            <Title1>
              Professional Toolbar
            </Title1>

            <Text>
              Enterprise Fluent UI toolbar with React and TypeScript.
            </Text>
          </div>

          <EnterpriseToolbar />

          <DashboardPanel />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# Understanding Composition

The structure is:

```txt
App
  EnterpriseToolbar
  DashboardPanel
```

This is React composition.

Each component has one responsibility:

| Component           | Responsibility     |
| ------------------- | ------------------ |
| `App`               | Main layout        |
| `EnterpriseToolbar` | Enterprise actions |
| `DashboardPanel`    | Dashboard metrics  |

This keeps the architecture:

* modular
* reusable
* scalable
* easier to maintain

Official documentation:

* [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com)

---

# 13. Create `main.tsx`

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

# Understanding `main.tsx`

This file:

* connects React to HTML
* mounts the app
* initializes rendering

Flow:

```txt
index.html
→ main.tsx
→ App.tsx
→ EnterpriseToolbar
→ DashboardPanel
```

---

# 14. Create `index.css`

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

# Why Reset CSS Matters

Browsers apply default spacing.

Removing body margin ensures:

* consistent layout
* full-width rendering
* predictable spacing

---

# 15. Run the App

Development server:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Production preview:

```powershell
npm run preview
```

---

# 16. React Mental Model Introduced

This app reinforces:

```txt
UI is derived from data.
```

The toolbar actions come from:

```txt
ToolbarAction[]
```

React renders the interface declaratively.

This is fundamentally different from:

* jQuery
* manual DOM manipulation
* imperative UI programming

React wants:

```txt
Data
→ UI description
→ React rendering
```

---

# 17. Why No `useState` Yet

This app intentionally avoids state.

The toolbar is static.

There is:

* no dynamic interaction
* no external synchronization
* no API
* no forms

Therefore:

* `useState` is unnecessary
* `useEffect` is unnecessary

This follows official React guidance:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# 18. Technical Summary

| Concept              | Explanation                   |
| -------------------- | ----------------------------- |
| Toolbar              | Enterprise command container  |
| ToolbarButton        | Microsoft-style action button |
| ToolbarDivider       | Action separator              |
| `map()`              | Converts data into UI         |
| TypeScript interface | Defines action structure      |
| Fluent UI            | Microsoft design system       |
| JSX                  | Declarative UI syntax         |
| CSS Grid             | Responsive dashboard layout   |
| Composition          | Small reusable components     |
| React rendering      | UI generated from data        |

---

# 19. Concept Table

| Concept            | File                    | Purpose                     |
| ------------------ | ----------------------- | --------------------------- |
| Toolbar model      | `ToolbarAction.ts`      | Defines action structure    |
| Toolbar data       | `toolbarActions.ts`     | Stores toolbar actions      |
| Enterprise toolbar | `EnterpriseToolbar.tsx` | Renders Fluent UI toolbar   |
| Dashboard panel    | `DashboardPanel.tsx`    | Displays enterprise metrics |
| Composition        | `App.tsx`               | Combines components         |
| Rendering          | `main.tsx`              | Mounts React into HTML      |
| Styling            | `index.css`             | Global layout reset         |

---

# 20. Official Documentation

| Topic                      | Documentation                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| React Learn                | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                    |
| Rendering Lists            | [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)                                |
| Your First Component       | [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com)                      |
| Fluent UI Toolbar          | [Fluent UI Toolbar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/toolbar) |
| Fluent UI React Components | [Fluent UI Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)      |
| Vite Guide                 | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                     |
| TypeScript Docs            | [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                                   |

---

# 21. Final Architectural Insight

The toolbar may appear visually simple, but architecturally it introduces one of the most important enterprise React patterns:

```txt
Structured data
→ React rendering
→ enterprise actions
→ reusable UI architecture
```

This same approach scales into:

* admin systems
* SharePoint portals
* CRM command bars
* ERP systems
* file explorers
* analytics dashboards
* Microsoft 365 interfaces

The toolbar is not just a visual component.

It is:

* action architecture
* command organization
* enterprise workflow composition

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
| Block 3 |  49 | Corporate Header             | Completed |
| Block 3 |  50 | Professional Toolbar         | Current   |
