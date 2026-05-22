# Technical Blog Article — App 43: Enterprise Tabs Navigation System with React, Fluent UI, TypeScript, and Vite

Modern enterprise applications rarely display all information on a single screen. As systems grow, interfaces become more modular and organized into sections such as dashboards, reports, projects, settings, analytics, administration, and user management. One of the most common UI patterns used to organize these sections is the **tabs navigation system**.

Tabs are everywhere in professional software:

* Microsoft 365 admin portals
* SharePoint settings pages
* CRMs
* ERPs
* ticketing systems
* analytics dashboards
* developer tools
* enterprise management platforms

Because of this, App 43 is an extremely important milestone in the ReactLab roadmap. According to the project structure, App 43 officially introduces the **Tabs Navigation System** inside Block 3 — Professional Fluent UI Applications. 

This app is not just about switching visible panels. Architecturally, it introduces several critical React concepts:

* state-driven navigation
* conditional rendering
* component composition
* enterprise UI organization
* derived UI from state
* Fluent UI `TabList`
* reusable page sections
* controlled navigation systems

The app also reinforces one of the most important React principles from [React Learn](https://react.dev/learn?utm_source=chatgpt.com):

```txt id="qsvk9v"
UI = function(state)
```

The currently selected tab becomes application state. React automatically derives the visible interface from that state.

This is fundamentally different from older imperative approaches where developers manually showed or hid HTML elements using DOM manipulation.

In React:

* state changes
* React re-renders
* UI updates automatically

That is the React mental model.

---

# Why Tabs Matter in Enterprise Architecture

Tabs solve a major UI problem:

```txt id="lp2z1m"
How do we organize multiple sections inside the same screen?
```

Without tabs:

* screens become overloaded
* dashboards become confusing
* layouts become difficult to navigate
* user experience degrades

Tabs create:

* clear visual separation
* contextual navigation
* organized workflows
* modular UI architecture

Enterprise systems often contain:

* dashboards
* reports
* settings
* analytics
* project pages
* notifications
* integrations

Tabs allow all of these areas to coexist inside one consistent layout.

This is why Fluent UI includes professional tab components as part of the Microsoft design system:

* [Fluent UI Tabs](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/tablist)

---

# Creating the Project

The application begins using Vite with the React TypeScript template.

## Create the main folder

```powershell id="rfl9t4"
mkdir bloco03
cd bloco03
```

## Create the Vite project

```powershell id="4vavt0"
npm create vite@latest app43-tabs-navigation-system -- --template react-ts
```

## Enter the project

```powershell id="duv1s9"
cd app43-tabs-navigation-system
```

## Install dependencies

```powershell id="pz4l8f"
npm install
```

## Install Fluent UI

```powershell id="3r62xe"
npm install @fluentui/react-components @fluentui/react-icons
```

This installs:

* Fluent UI components
* Fluent UI icons
* Microsoft design system dependencies

---

# Creating the Folder Structure

Professional React projects should never place everything inside `App.tsx`.

One of the major objectives of the ReactLab roadmap is learning architectural separation.

Create the folders:

```powershell id="5xkn8v"
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

Create the files:

```powershell id="4x4fy8"
New-Item src\models\TabItem.ts -ItemType File
New-Item src\data\tabs.ts -ItemType File

New-Item src\components\DashboardTab.tsx -ItemType File
New-Item src\components\ProjectsTab.tsx -ItemType File
New-Item src\components\ReportsTab.tsx -ItemType File
New-Item src\components\SettingsTab.tsx -ItemType File
New-Item src\components\TabsLayout.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Project Structure

```txt id="10jjlwm"
src/
  components/
    DashboardTab.tsx
    ProjectsTab.tsx
    ReportsTab.tsx
    SettingsTab.tsx
    TabsLayout.tsx

  data/
    tabs.ts

  models/
    TabItem.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

This organization introduces separation of responsibilities.

| Folder        | Responsibility                  |
| ------------- | ------------------------------- |
| `components/` | UI building blocks              |
| `data/`       | Static application data         |
| `models/`     | TypeScript interfaces and types |
| `styles/`     | Global or reusable CSS          |
| `App.tsx`     | Root application layout         |
| `main.tsx`    | React entry point               |

This structure becomes critical later when applications scale.

---

# Understanding the React Flow

One of the most important things to understand is how React reaches the browser.

The execution flow is:

```txt id="6mdq9e"
index.html
  → loads main.tsx

main.tsx
  → renders App.tsx

App.tsx
  → renders TabsLayout

TabsLayout
  → renders TabList and content components

ReactDOM
  → updates the browser DOM

Browser
  → displays the final interface
```

This flow is the foundation of all React applications.

---

# Understanding `main.tsx`

The file:

```txt id="vifdrm"
src/main.tsx
```

is the true React entry point.

```tsx id="g69h46"
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

This file performs several critical tasks:

* connects React to HTML
* activates Fluent UI
* injects the Microsoft design system
* renders the root application component

---

# Understanding `FluentProvider`

This is one of the most important parts of the application:

```tsx id="11ddj5"
<FluentProvider theme={webLightTheme}>
```

Fluent UI components require a provider because the provider injects:

* colors
* spacing tokens
* typography
* accessibility behavior
* design rules
* Microsoft styling

Without `FluentProvider`, Fluent UI components would lose their visual identity.

The selected theme:

```tsx id="2r8x2u"
webLightTheme
```

is Microsoft’s standard light enterprise theme.

Later apps may introduce:

* dark mode
* dynamic theme switching
* custom enterprise themes

---

# Understanding the Model Layer

The file:

```txt id="b00j5q"
src/models/TabItem.ts
```

contains:

```ts id="mw22nk"
export interface TabItem {
  id: string;
  label: string;
}
```

This interface defines the structure of each tab.

This introduces a critical enterprise concept:

```txt id="hnmzlx"
Predictable state and predictable data structures.
```

TypeScript helps guarantee:

* architectural consistency
* safer refactoring
* autocomplete
* fewer bugs
* maintainability

---

# Understanding the Data Layer

The file:

```txt id="7vt61l"
src/data/tabs.ts
```

contains:

```ts id="sy4nvy"
import type { TabItem } from "../models/TabItem";

export const tabs: TabItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "reports",
    label: "Reports",
  },
  {
    id: "settings",
    label: "Settings",
  },
];
```

This introduces one of the most important React concepts:

```txt id="l5m5q0"
The UI should be derived from data.
```

Instead of manually writing tabs one by one, the application renders them dynamically using:

```tsx id="1qq9ht"
tabs.map(...)
```

This is declarative rendering.

---

# Understanding Declarative Rendering

Old imperative thinking:

```txt id="4fxnl0"
Create tab manually
Attach event manually
Show panel manually
Hide panel manually
```

React declarative thinking:

```txt id="56r64e"
Describe what the UI should look like.
React handles the DOM updates.
```

This distinction is one of the biggest mental shifts in React.

---

# Understanding `TabsLayout.tsx`

The most important component in the application is:

```txt id="98j3ry"
src/components/TabsLayout.tsx
```

This component manages:

* navigation state
* tab rendering
* content rendering
* enterprise layout composition

---

# Understanding React State

Inside the component:

```tsx id="k83xan"
const [selectedTab, setSelectedTab] =
  useState("dashboard");
```

This line introduces the navigation state.

Breaking it apart:

| Part             | Meaning                         |
| ---------------- | ------------------------------- |
| `selectedTab`    | Current selected tab            |
| `setSelectedTab` | Function that updates state     |
| `useState()`     | React Hook for component memory |
| `"dashboard"`    | Initial selected tab            |

This is one of the core React ideas:

```txt id="hj5l8l"
React components remember information using state.
```

Official documentation:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

---

# Why State Matters Here

Without state:

* React would not know which tab is active
* the UI could not re-render correctly
* navigation would not be dynamic

The selected tab is the source of truth for the visible interface.

---

# Understanding `TabList`

The Fluent UI component:

```tsx id="t4s21m"
<TabList>
```

creates enterprise-grade tab navigation.

Fluent UI automatically provides:

* keyboard navigation
* accessibility
* focus management
* Microsoft styling
* enterprise spacing
* responsive behavior

This is one of the biggest advantages of component libraries.

Without Fluent UI, all of this behavior would require manual implementation.

Official documentation:

* [Fluent UI TabList](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/tablist)

---

# Understanding `onTabSelect`

The component uses:

```tsx id="3q5v0z"
onTabSelect={handleTabSelect}
```

When the user clicks a tab:

* Fluent UI fires the event
* the handler receives the selected value
* state updates
* React re-renders

The flow becomes:

```txt id="n5q7kq"
User clicks tab
→ event fires
→ setSelectedTab()
→ state changes
→ React re-renders
→ correct content appears
```

This is the React rendering cycle.

---

# Understanding Derived UI

One of the most important functions is:

```tsx id="v7s8oe"
function renderTabContent()
```

This function determines what component should appear.

```tsx id="u2krcd"
if (selectedTab === "dashboard") {
  return <DashboardTab />;
}
```

Notice something critical:

```txt id="79trm6"
The UI is derived from state.
```

React is not manually hiding HTML elements.

Instead:

* state changes
* React calculates the correct UI
* React renders the correct component

This is the heart of React architecture.

---

# Understanding Component Composition

The component hierarchy becomes:

```txt id="sk3og4"
App
  → TabsLayout
      → DashboardTab
      → ProjectsTab
      → ReportsTab
      → SettingsTab
```

Each component has one responsibility.

This is extremely important in professional React architecture.

---

# Why Small Components Matter

Small components provide:

* easier debugging
* easier reuse
* better organization
* clearer architecture
* easier testing

React applications scale through composition.

---

# Understanding the Content Components

Each tab content component is intentionally simple:

```tsx id="me0kho"
<Card>
  <Title2>Executive Dashboard</Title2>

  <Text>
    Welcome to the enterprise dashboard overview.
  </Text>
</Card>
```

This app focuses on:

* navigation architecture
* layout flow
* rendering behavior

Later apps will make these sections much more advanced.

---

# Understanding Fluent UI `Card`

The `Card` component acts as an enterprise container.

Cards are heavily used in:

* dashboards
* analytics systems
* admin portals
* SharePoint layouts
* Microsoft enterprise applications

The card encapsulates:

* spacing
* padding
* shadows
* borders
* visual separation

Official documentation:

* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

---

# Understanding `map()`

The tabs are rendered with:

```tsx id="74m3nv"
tabs.map((tab) => (
  <Tab
    key={tab.id}
    value={tab.id}
  >
    {tab.label}
  </Tab>
))
```

This transforms data into UI.

Conceptually:

```txt id="drnm5h"
Data
→ React components
→ Visual interface
```

This is one of the most repeated patterns in React development.

---

# Why `key` Matters

```tsx id="5j9ezg"
key={tab.id}
```

Keys help React identify list items efficiently.

Without stable keys:

* React may re-render incorrectly
* performance can degrade
* warnings appear

Keys are essential for dynamic lists.

Official documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# Understanding `App.tsx`

The file:

```txt id="2dzq6t"
src/App.tsx
```

creates the global page layout.

```tsx id="ywhjko"
<main
  style={{
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  }}
>
```

This creates:

* centered layout
* enterprise spacing
* full viewport height
* dashboard-like composition

---

# Why `100vh` Matters

```tsx id="8slkjx"
minHeight: "100vh"
```

This means:

```txt id="9f6vxh"
Occupy the full browser viewport height.
```

This is common in enterprise layouts.

---

# Why Flexbox Is Used

```tsx id="zv2jva"
display: "flex"
```

Flexbox simplifies:

* alignment
* spacing
* responsive positioning

The layout becomes:

* horizontally centered
* vertically organized

---

# Why There Is No `useEffect`

One of the best architectural decisions in this app is what we intentionally did NOT include.

There is:

* no API
* no timers
* no external synchronization

Therefore:

```tsx id="mhf5e0"
useEffect()
```

is unnecessary.

According to React Learn:

> “You Might Not Need an Effect.”

Official documentation:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

This app is pure rendering logic.

---

# The React Mental Model in This App

This app reinforces the core React philosophy:

```txt id="4ig4ep"
State changes
→ React re-renders
→ UI updates automatically
```

React is NOT:

* manual DOM manipulation
* jQuery-style updates
* imperative UI programming

React IS:

* declarative rendering
* component architecture
* state-driven UI

---

# Running the Application

## Start development server

```powershell id="f07rsh"
npm run dev
```

---

# Validate Production Build

```powershell id="h1drq9"
npm run build
```

---

# Preview Production Build

```powershell id="bfrqf2"
npm run preview
```

---

# Technical Summary

| Concept               | Explanation                 |
| --------------------- | --------------------------- |
| `useState`            | Stores selected tab         |
| `TabList`             | Enterprise tab navigation   |
| `Tab`                 | Individual navigation item  |
| Derived UI            | Content rendered from state |
| `map()`               | Data-driven rendering       |
| Conditional Rendering | Dynamic content selection   |
| Fluent UI             | Microsoft design system     |
| TypeScript Interface  | Strong typing               |
| Component Composition | Modular architecture        |
| Declarative Rendering | React-driven UI updates     |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI TabList](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/tablist)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

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
| Block 3 |  43 | Tabs Navigation System       | Current   |
| Block 3 |  44 | Dialog Manager               | Next      |
