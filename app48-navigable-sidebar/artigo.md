```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 48: Navigable Sidebar with React, TypeScript, Fluent UI, and Vite

## Introduction

In modern enterprise applications, navigation is one of the most important architectural elements. Before users interact with dashboards, reports, CRM systems, SharePoint portals, ticket systems, analytics pages, or administrative panels, they first interact with navigation.

This is why sidebar layouts are extremely common in professional React applications.

In **App 48 — Navigable Sidebar**, we build a Microsoft-style enterprise navigation system using:

* React
* TypeScript
* Vite
* Fluent UI
* React state
* component composition
* declarative rendering

This application belongs to **Block 3 — Fluent UI Professional Applications**, where the focus evolves from simple UI rendering into enterprise layout architecture and Microsoft-style component systems. 

The app introduces:

* dynamic navigation rendering
* controlled selection state
* enterprise sidebar layouts
* Fluent UI navigation buttons
* TypeScript-driven UI architecture
* state-driven content rendering
* reusable layout composition

Most importantly, this app reinforces one of the most important React concepts:

```txt
UI is derived from state.
```

The selected menu item exists in React state, and the visible content automatically changes according to that state.

---

# 1. What This App Teaches

This app introduces several critical React architecture concepts.

| Concept                | Purpose                                  |
| ---------------------- | ---------------------------------------- |
| `useState`             | Stores the selected navigation item      |
| `map()` rendering      | Converts data into navigation buttons    |
| TypeScript interfaces  | Defines predictable navigation structure |
| Component composition  | Splits layout into focused components    |
| Fluent UI Buttons      | Creates enterprise navigation UI         |
| Conditional appearance | Highlights active navigation item        |
| Derived UI             | Content changes according to state       |
| Flexbox layout         | Creates sidebar + content layout         |

The central mental model is:

```txt
Navigation selection
→ React state changes
→ React re-renders
→ UI updates automatically
```

This is declarative rendering.

---

# 2. Create the Project

PowerShell commands:

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app48-navigable-sidebar -- --template react-ts

cd app48-navigable-sidebar

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
New-Item src\models\NavigationItem.ts -ItemType File
New-Item src\data\navigationItems.ts -ItemType File
New-Item src\components\Sidebar.tsx -ItemType File
New-Item src\components\PageContent.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 3. Final Folder Structure

```txt
app48-navigable-sidebar/
  src/
    components/
      Sidebar.tsx
      PageContent.tsx

    data/
      navigationItems.ts

    models/
      NavigationItem.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
  package.json
  vite.config.ts
```

This structure is important because enterprise React applications must separate responsibilities clearly.

| File                 | Responsibility                    |
| -------------------- | --------------------------------- |
| `NavigationItem.ts`  | Defines navigation data structure |
| `navigationItems.ts` | Stores navigation data            |
| `Sidebar.tsx`        | Renders navigation menu           |
| `PageContent.tsx`    | Renders current selected page     |
| `App.tsx`            | Owns navigation state             |
| `main.tsx`           | Connects React to the browser     |
| `index.css`          | Global CSS reset                  |

---

# 4. Understanding the Navigation Model

## `src\models\NavigationItem.ts`

```ts
export type NavigationIconKey =
  | "dashboard"
  | "users"
  | "documents"
  | "analytics"
  | "settings";

export interface NavigationItem {
  id: string;
  label: string;
  description: string;
  iconKey: NavigationIconKey;
}
```

This file defines the structure of each navigation item.

Each item contains:

| Property      | Purpose                         |
| ------------- | ------------------------------- |
| `id`          | Unique identifier               |
| `label`       | Navigation button text          |
| `description` | Main content description        |
| `iconKey`     | Determines which icon to render |

This is important because enterprise React applications should avoid unstructured objects.

TypeScript guarantees:

* predictable architecture
* safer refactoring
* autocomplete
* compile-time validation

---

# 5. Why `navigationItems.ts` Uses `.ts` Instead of `.tsx`

One extremely important correction in this app is:

```txt
navigationItems.ts
```

instead of:

```txt
navigationItems.tsx
```

Why?

Because this file stores only data.

It does NOT contain JSX.

Correct architecture:

| File Type | Purpose                   |
| --------- | ------------------------- |
| `.ts`     | Data, types, interfaces   |
| `.tsx`    | React components with JSX |

This is critical in React + TypeScript projects.

---

# 6. Understanding Navigation Data

## `src\data\navigationItems.ts`

```ts
import type { NavigationItem } from "../models/NavigationItem";
```

The file exports:

```ts
export const navigationItems: NavigationItem[]
```

This creates a typed array.

Example item:

```ts
{
  id: "dashboard",
  label: "Dashboard",
  description: "Enterprise overview with KPIs and activity summary.",
  iconKey: "dashboard",
}
```

This follows one of the most important React principles:

```txt
The UI should be derived from data.
```

Instead of manually creating navigation buttons one by one, React converts data into UI.

---

# 7. Understanding `Sidebar.tsx`

The sidebar component is responsible for rendering navigation.

Imports:

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";
```

This app uses Fluent UI as the Microsoft enterprise design system.

Fluent UI provides:

* accessibility
* keyboard navigation
* enterprise styling
* typography consistency
* spacing systems
* Microsoft visual identity

Official documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 8. Understanding `getNavigationIcon`

```tsx
function getNavigationIcon(iconKey: NavigationIconKey)
```

This function converts a string into a React icon component.

Example:

```tsx
case "dashboard":
  return <Home24Regular />;
```

This is extremely important architecturally.

Instead of storing JSX inside the data file:

```tsx
icon: <Home24Regular />
```

we store only:

```ts
iconKey: "dashboard"
```

Then the React component decides how to render it.

This keeps:

* data clean
* rendering logic centralized
* architecture more maintainable

---

# 9. Why JSX Must Stay Inside `.tsx`

One of the biggest lessons from this app is:

```txt
JSX belongs in .tsx files.
```

This is JSX:

```tsx
<Home24Regular />
```

JSX is React syntax.

Therefore it must exist only inside:

* React components
* `.tsx` files

This separation improves:

* readability
* architecture
* maintainability

---

# 10. Understanding the Sidebar Layout

The sidebar uses:

```tsx
<Card>
```

as the main navigation container.

Styles:

```tsx
width: "280px",
minHeight: "100vh",
display: "flex",
flexDirection: "column",
gap: "16px",
```

This creates the classic enterprise layout:

```txt
-----------------------------------
| ReactLab                        |
| Enterprise Navigation           |
|                                 |
| Dashboard                       |
| Users                           |
| Documents                       |
| Analytics                       |
| Settings                        |
-----------------------------------
```

---

# 11. Understanding `map()` Rendering

The navigation buttons are generated dynamically:

```tsx
{items.map((item) => (
```

This is one of the most important React patterns.

React converts:

```txt
navigationItems[]
```

into:

```txt
<Button />
<Button />
<Button />
```

Conceptually:

```txt
data
→ React rendering
→ UI
```

Instead of manually creating every button, the UI derives from data.

Official documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 12. Why `key={item.id}` Matters

```tsx
key={item.id}
```

React requires stable keys for lists.

Keys help React:

* identify elements
* update efficiently
* preserve correct rendering

Without keys:

* React shows warnings
* updates become less predictable

Keys are critical in enterprise rendering systems.

---

# 13. Understanding Navigation State

Inside `App.tsx`:

```tsx
const [selectedId, setSelectedId] =
  useState("dashboard");
```

This is the heart of the application.

The selected menu item is stored in React state.

This means:

* React remembers the selected section
* the UI updates automatically
* rendering becomes predictable

Official documentation:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

---

# 14. Understanding the Navigation Flow

The rendering flow is:

```txt
User clicks sidebar button
→ onClick fires
→ setSelectedId updates state
→ React re-renders App
→ selectedItem changes
→ PageContent receives new props
→ visible content updates
```

This is React’s declarative model.

We do NOT manually manipulate the DOM.

---

# 15. Understanding Derived Data

Inside `App.tsx`:

```tsx
const selectedItem =
  navigationItems.find(
    (item) => item.id === selectedId
  ) ?? navigationItems[0];
```

This is derived data.

React calculates:

* which item matches the selected ID

Notice something important:

```txt
selectedItem is NOT stored in state.
```

It is derived from:

* `selectedId`
* `navigationItems`

This follows official React guidance:

> Avoid redundant state.

Official documentation:

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# 16. Understanding Conditional Appearance

The sidebar highlights the selected item:

```tsx
appearance={
  selectedId === item.id
    ? "primary"
    : "subtle"
}
```

This means:

* selected button = primary appearance
* unselected buttons = subtle appearance

This is conditional rendering.

The UI changes according to state.

---

# 17. Understanding `PageContent.tsx`

This component displays the selected section.

Props:

```tsx
interface PageContentProps {
  selectedItem: NavigationItem;
}
```

This means:

* the parent decides what page is active
* `PageContent` simply renders it

This is component composition.

React applications scale by passing data through props.

Official documentation:

* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)

---

# 18. Understanding the Main Layout

`App.tsx` uses:

```tsx
display: "flex"
```

This creates the enterprise structure:

```txt
-----------------------------------------
| Sidebar | Main Content                |
|          |                             |
|          |                             |
-----------------------------------------
```

The sidebar has fixed width:

```tsx
width: "280px"
```

The content area uses:

```tsx
flex: 1
```

meaning:

```txt
Take all remaining available space.
```

This is classic enterprise dashboard architecture.

---

# 19. Understanding `main.tsx`

The React entry point:

```tsx
ReactDOM.createRoot(
  document.getElementById("root")!
)
```

connects React to:

```html
<div id="root"></div>
```

inside `index.html`.

Then:

```tsx
<FluentProvider theme={webLightTheme}>
```

activates the Microsoft Fluent UI design system globally.

This provides:

* typography
* colors
* spacing
* accessibility
* enterprise visual consistency

---

# 20. Why There Is No `useEffect`

This app intentionally does NOT use `useEffect`.

Why?

Because:

* no API exists
* no timer exists
* no external synchronization exists

The UI is fully driven by local state.

Therefore:

```txt
useState is sufficient.
```

This follows React guidance:

> You Might Not Need an Effect

Official documentation:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# 21. Running the Application

Development server:

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Production preview:

```powershell
npm run preview
```

---

# 22. Complete Rendering Flow

```txt
main.tsx
  renders App

App
  stores selectedId state

Sidebar
  receives selectedId and setSelectedId

User clicks a button
  setSelectedId updates state

React re-renders

PageContent
  receives selectedItem

UI updates automatically
```

This is the React mental model.

---

# Technical Summary

| Concept               | Explanation                           |
| --------------------- | ------------------------------------- |
| `useState`            | Stores selected navigation item       |
| `map()`               | Converts data into navigation buttons |
| Derived data          | `selectedItem` calculated from state  |
| Fluent UI Button      | Enterprise navigation component       |
| Flexbox               | Sidebar + content layout              |
| TypeScript interface  | Predictable navigation structure      |
| `.ts`                 | Data/types only                       |
| `.tsx`                | JSX/React components                  |
| Conditional rendering | Active menu highlighting              |
| Props                 | Send selected item into PageContent   |

---

# Concept Table

| Concept           | File                 | Purpose                        |
| ----------------- | -------------------- | ------------------------------ |
| Navigation model  | `NavigationItem.ts`  | Defines navigation structure   |
| Navigation data   | `navigationItems.ts` | Stores sidebar items           |
| Sidebar rendering | `Sidebar.tsx`        | Renders menu buttons           |
| Main content      | `PageContent.tsx`    | Shows selected section         |
| State ownership   | `App.tsx`            | Controls selected navigation   |
| React root        | `main.tsx`           | Connects React to HTML         |
| Global CSS        | `index.css`          | Removes default browser margin |

---

# Official Documentation

| Topic                        | Documentation                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| React Learn                  | [https://react.dev/learn](https://react.dev/learn)                                                                                         |
| Rendering Lists              | [https://react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)                                                         |
| State: A Component’s Memory  | [https://react.dev/learn/state-a-components-memory](https://react.dev/learn/state-a-components-memory)                                     |
| Passing Props to a Component | [https://react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)                               |
| Choosing the State Structure | [https://react.dev/learn/choosing-the-state-structure](https://react.dev/learn/choosing-the-state-structure)                               |
| You Might Not Need an Effect | [https://react.dev/learn/you-might-not-need-an-effect](https://react.dev/learn/you-might-not-need-an-effect)                               |
| Fluent UI React Components   | [https://developer.microsoft.com/en-us/fluentui#/controls/web](https://developer.microsoft.com/en-us/fluentui#/controls/web)               |
| Fluent UI Button             | [https://developer.microsoft.com/en-us/fluentui#/controls/web/button](https://developer.microsoft.com/en-us/fluentui#/controls/web/button) |
| Vite Guide                   | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                                         |
| TypeScript Docs              | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                               |

---

# Final Architectural Insight

This app may appear visually simple, but architecturally it introduces one of the most common enterprise React patterns:

```txt
Sidebar Navigation
→ Selected State
→ Derived Content
→ Enterprise Layout
```

This exact structure later evolves into:

* admin dashboards
* CRM systems
* SharePoint portals
* ERP systems
* analytics platforms
* Microsoft-style enterprise applications

Because in React:

```txt
Navigation is state.
UI derives from state.
React renders the result.
```

---

# Current Project Progress

| Block   | App | Name                  | Status    |
| ------- | --: | --------------------- | --------- |
| Block 3 |  41 | Microsoft Style Login | Completed |
| Block 3 |  42 | Corporate Form        | Completed |
| Block 3 |  43 | Tabs Navigation       | Completed |
| Block 3 |  44 | Dialog Manager        | Completed |
| Block 3 |  45 | Executive Dashboard   | Completed |
| Block 3 |  46 | DataGrid Catalog      | Completed |
| Block 3 |  47 | Enterprise User List  | Completed |
| Block 3 |  48 | Navigable Sidebar     | Current   |
| Block 3 |  49 | Corporate Header      | Next      |
