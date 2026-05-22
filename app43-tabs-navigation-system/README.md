# App 43 — Tabs Navigation System with React, Fluent UI, TypeScript, and Vite

## Introduction

In App 43 we continue Block 3 of the ReactLab roadmap, focused on professional enterprise interfaces with Fluent UI and Microsoft-style application architecture. According to the roadmap, App 43 is the **Tabs Navigation System**, introducing Fluent UI `TabList`, dynamic visual sections, state-driven navigation, and enterprise layout organization. 

This application is extremely important because tabs are one of the most common navigation patterns in professional systems such as:

* Microsoft 365 portals
* SharePoint admin pages
* CRM systems
* ERP dashboards
* ticket systems
* analytics platforms
* settings pages
* enterprise management portals

The goal of this app is to teach:

* React controlled navigation
* Fluent UI `TabList`
* derived UI from state
* conditional rendering
* enterprise page organization
* reusable content sections
* component composition
* layout separation

This app follows the official React mental model:

```txt
UI = function(state)
```

The currently selected tab becomes the state, and React automatically renders the correct content section based on that state.

Official references:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI TabList](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/tablist)

---

# Create the Project

## Create the folder

```powershell
mkdir bloco03
cd bloco03
```

## Create the Vite project

```powershell
npm create vite@latest app43-tabs-navigation-system -- --template react-ts
```

## Enter the project

```powershell
cd app43-tabs-navigation-system
```

## Install dependencies

```powershell
npm install
```

## Install Fluent UI

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create the Folder Structure

## Create folders

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

## Create files

```powershell
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

# Final Structure

```txt
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

---

# Create the Tab Model

## `src/models/TabItem.ts`

```ts
export interface TabItem {
  id: string;
  label: string;
}
```

This interface defines the structure of each navigation tab.

---

# Create the Tabs Data

## `src/data/tabs.ts`

```ts
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

This introduces an important React principle:

```txt
UI should be derived from data.
```

---

# Create the Dashboard Tab

## `src/components/DashboardTab.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function DashboardTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>Executive Dashboard</Title2>

      <Text>
        Welcome to the enterprise dashboard overview.
      </Text>
    </Card>
  );
}
```

---

# Create the Projects Tab

## `src/components/ProjectsTab.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function ProjectsTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>Projects Center</Title2>

      <Text>
        Track ongoing enterprise projects and team activities.
      </Text>
    </Card>
  );
}
```

---

# Create the Reports Tab

## `src/components/ReportsTab.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function ReportsTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>Reports Portal</Title2>

      <Text>
        Analyze monthly reports and KPI performance indicators.
      </Text>
    </Card>
  );
}
```

---

# Create the Settings Tab

## `src/components/SettingsTab.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function SettingsTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>System Settings</Title2>

      <Text>
        Configure enterprise preferences and platform options.
      </Text>
    </Card>
  );
}
```

---

# Create the Main Tabs Layout

## `src/components/TabsLayout.tsx`

```tsx
import { useState } from "react";

import {
  Card,
  Tab,
  TabList,
  Title1,
} from "@fluentui/react-components";

import type {
  SelectTabData,
  SelectTabEvent,
} from "@fluentui/react-components";

import { tabs } from "../data/tabs";

import { DashboardTab } from "./DashboardTab";
import { ProjectsTab } from "./ProjectsTab";
import { ReportsTab } from "./ReportsTab";
import { SettingsTab } from "./SettingsTab";

export function TabsLayout() {
  const [selectedTab, setSelectedTab] =
    useState("dashboard");

  function handleTabSelect(
    _event: SelectTabEvent,
    data: SelectTabData
  ) {
    setSelectedTab(data.value as string);
  }

  function renderTabContent() {
    if (selectedTab === "dashboard") {
      return <DashboardTab />;
    }

    if (selectedTab === "projects") {
      return <ProjectsTab />;
    }

    if (selectedTab === "reports") {
      return <ReportsTab />;
    }

    return <SettingsTab />;
  }

  return (
    <Card
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "1100px",
      }}
    >
      <Title1>Enterprise Tabs Navigation</Title1>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={handleTabSelect}
        style={{
          marginTop: "24px",
          marginBottom: "32px",
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {renderTabContent()}
    </Card>
  );
}
```

---

# Create `App.tsx`

## `src/App.tsx`

```tsx
import { TabsLayout } from "./components/TabsLayout";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
    >
      <TabsLayout />
    </main>
  );
}

export default App;
```

---

# Create `main.tsx`

## `src/main.tsx`

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

# Create `index.css`

## `src/index.css`

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

# Run the Application

## Start development server

```powershell
npm run dev
```

---

# Validate Production Build

```powershell
npm run build
```

---

# Preview Production Build

```powershell
npm run preview
```

---

# Understanding the Architecture

This app introduces one of the most important React concepts:

```txt
Navigation controlled by state
```

The selected tab is stored in:

```tsx
const [selectedTab, setSelectedTab]
```

When the user clicks a tab:

```txt
User clicks tab
→ onTabSelect fires
→ state updates
→ React re-renders
→ correct content appears
```

This is pure React declarative rendering.

---

# Why `TabList` Matters

Fluent UI `TabList` provides:

* keyboard navigation
* accessibility
* Microsoft design patterns
* enterprise spacing
* focus management
* screen reader support

Without Fluent UI, all of this would require manual implementation.

Official documentation:

* [Fluent UI Tabs](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/tablist)

---

# Understanding Derived UI

Notice this function:

```tsx
function renderTabContent()
```

The content is NOT manually hidden with DOM manipulation.

Instead:

```txt
React derives the UI from state.
```

This is one of the most important React ideas.

---

# Why No `useEffect`

This app intentionally does NOT use:

```tsx
useEffect()
```

Because:

* there is no API
* no timer
* no external synchronization

Everything is internal UI rendering logic.

Official React guidance:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# Technical Summary

| Concept               | Explanation                     |
| --------------------- | ------------------------------- |
| `useState`            | Stores selected tab             |
| `TabList`             | Enterprise tab navigation       |
| `Tab`                 | Individual navigation item      |
| Derived UI            | Content rendered from state     |
| Conditional Rendering | Dynamic component selection     |
| `map()`               | Data-driven tab rendering       |
| Fluent UI             | Microsoft design system         |
| TypeScript Interface  | Strong typing                   |
| Composition           | TabsLayout → Content Components |
| Declarative UI        | React controls rendering        |

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
