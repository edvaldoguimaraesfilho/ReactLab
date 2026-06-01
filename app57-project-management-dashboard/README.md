```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 57: Project Management Dashboard with React, TypeScript, Vite, and Fluent UI

## Introduction

In **App 57 — Project Management Dashboard**, we enter a more advanced stage of enterprise React architecture. This application belongs to **Block 3 — Professional Fluent UI Applications**, where the objective is to build Microsoft-style enterprise interfaces using modern React patterns, Fluent UI components, component composition, and scalable UI architecture. 

This application simulates a corporate project management environment similar to systems used in:

* Microsoft Planner
* Azure DevOps dashboards
* SharePoint project portals
* PMO dashboards
* Jira-style enterprise systems
* task management portals
* enterprise workflow systems

The application focuses on:

* project cards
* project status visualization
* reusable dashboard widgets
* enterprise layouts
* Fluent UI composition
* derived UI rendering
* data-driven rendering
* component separation

The most important architectural lesson is:

```txt
Data
→ Components
→ Dashboard Rendering
→ Enterprise UI Composition
```

This app intentionally remains frontend-focused. There is:

* no backend
* no API
* no database
* no authentication
* no useEffect

The goal is mastering component composition and enterprise dashboard structure before introducing external systems later in Block 4. 

---

# 1. What This App Teaches

| Concept                | Purpose                             |
| ---------------------- | ----------------------------------- |
| Dashboard architecture | Enterprise UI composition           |
| Project cards          | Reusable business components        |
| Fluent UI layout       | Microsoft-style enterprise design   |
| Static data rendering  | UI derived from structured data     |
| Component composition  | Dashboard broken into focused parts |
| Responsive grid        | Adaptive card layouts               |
| TypeScript models      | Predictable project structure       |
| Badge visualization    | Status representation               |
| Pure components        | Stateless rendering architecture    |

The React mental model remains:

```txt
UI = function(data)
```

---

# 2. Create the Project

## PowerShell Commands

```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app57-project-management-dashboard -- --template react-ts

cd app57-project-management-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 3. Create the Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\Project.ts -ItemType File
New-Item src\data\projects.ts -ItemType File
New-Item src\components\ProjectCard.tsx -ItemType File
New-Item src\components\DashboardHeader.tsx -ItemType File
New-Item src\components\ProjectGrid.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 4. Final Folder Structure

```txt
app57-project-management-dashboard/
  src/
    components/
      DashboardHeader.tsx
      ProjectCard.tsx
      ProjectGrid.tsx

    data/
      projects.ts

    models/
      Project.ts

    styles/

    App.tsx
    main.tsx
    index.css
```

This structure follows the enterprise organization model used across the ReactLab project.

---

# 5. Create the Project Model

## `src\models\Project.ts`

```ts
export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Pending";

export interface Project {
  id: number;
  title: string;
  manager: string;
  department: string;
  progress: number;
  status: ProjectStatus;
}
```

---

# 6. Why Models Matter

This file defines the shape of project data.

Without TypeScript models:

* objects become inconsistent
* refactoring becomes dangerous
* dashboard architecture becomes harder to scale

The interface guarantees:

* every project has an id
* every project has a title
* every project has a progress value
* every project has a valid status

This creates predictable enterprise architecture.

---

# 7. Create the Data Source

## `src\data\projects.ts`

```ts
import type { Project } from "../models/Project";

export const projects: Project[] = [
  {
    id: 1,
    title: "SharePoint Migration",
    manager: "Enterprise Team",
    department: "Infrastructure",
    progress: 85,
    status: "In Progress",
  },
  {
    id: 2,
    title: "CRM Modernization",
    manager: "Business Solutions",
    department: "Sales",
    progress: 100,
    status: "Completed",
  },
  {
    id: 3,
    title: "Power BI Analytics",
    manager: "Analytics Team",
    department: "Finance",
    progress: 45,
    status: "In Progress",
  },
  {
    id: 4,
    title: "HR Self-Service Portal",
    manager: "Internal Systems",
    department: "Human Resources",
    progress: 15,
    status: "Pending",
  },
];
```

---

# 8. Why Static Data Is Important

This app intentionally uses static data.

Why?

Because React rendering must be understood before introducing:

* APIs
* fetch
* async state
* effects
* external synchronization

The UI pipeline becomes:

```txt
Static Data
→ map()
→ Components
→ Dashboard
```

This is foundational React architecture.

---

# 9. Create the Dashboard Header

## `src\components\DashboardHeader.tsx`

```tsx
import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

export function DashboardHeader() {
  return (
    <Card
      style={{
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <Title1>
        Enterprise Project Dashboard
      </Title1>

      <Text>
        Microsoft-style project management interface built with
        React, TypeScript, Vite, and Fluent UI.
      </Text>
    </Card>
  );
}
```

---

# 10. Why Header Components Matter

Enterprise applications are composed of reusable layout sections.

The header becomes:

* reusable
* isolated
* maintainable
* independently testable

This is one of React’s core strengths:

* composition over monolithic pages

---

# 11. Create the Project Card

## `src\components\ProjectCard.tsx`

```tsx
import {
  Badge,
  Card,
  ProgressBar,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Project } from "../models/Project";

interface ProjectCardProps {
  project: Project;
}

function getBadgeAppearance(status: Project["status"]) {
  if (status === "Completed") {
    return "filled" as const;
  }

  if (status === "In Progress") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title3>{project.title}</Title3>

      <Text>
        Manager: {project.manager}
      </Text>

      <Text>
        Department: {project.department}
      </Text>

      <Badge appearance={getBadgeAppearance(project.status)}>
        {project.status}
      </Badge>

      <ProgressBar
        value={project.progress / 100}
      />

      <Text>
        Progress: {project.progress}%
      </Text>
    </Card>
  );
}
```

---

# 12. Understanding Derived UI

The badge appearance is derived from status:

```tsx
getBadgeAppearance(project.status)
```

This is an important React concept:

```txt
UI derives from data.
```

We are not manually styling cards one by one.

Instead:

* project data determines UI appearance
* React re-renders automatically

---

# 13. Understanding `ProgressBar`

```tsx
<ProgressBar value={project.progress / 100} />
```

Fluent UI expects:

* values between 0 and 1

So:

```txt
85%
```

becomes:

```txt
0.85
```

This is normalized progress rendering.

---

# 14. Create the Project Grid

## `src\components\ProjectGrid.tsx`

```tsx
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}
```

---

# 15. Why `map()` Is Central to React

This is one of the most important lines:

```tsx
projects.map((project) => (
```

React takes data and transforms it into UI.

Conceptually:

```txt
Project object
→ ProjectCard component
→ Dashboard card
```

This is declarative rendering.

---

# 16. Why `key={project.id}` Matters

```tsx
key={project.id}
```

Keys help React identify list items efficiently.

Without stable keys:

* rendering becomes inefficient
* React warnings appear
* DOM updates become less predictable

---

# 17. Create the Root App

## `src\App.tsx`

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { DashboardHeader } from "./components/DashboardHeader";
import { ProjectGrid } from "./components/ProjectGrid";

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
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <DashboardHeader />

          <ProjectGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# 18. Why `FluentProvider` Matters

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates:

* Microsoft design tokens
* Fluent UI typography
* spacing system
* accessibility behavior
* component styling

Without it:

* Fluent UI components lose consistent styling

---

# 19. Create `main.tsx`

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

# 20. Create `index.css`

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

# 21. Run the Application

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

# 22. Complete Rendering Flow

```txt
main.tsx
→ renders App

App
→ renders DashboardHeader
→ renders ProjectGrid

ProjectGrid
→ loops through projects array

projects.map(...)
→ renders ProjectCard for each project

ProjectCard
→ renders Fluent UI enterprise card
```

---

# 23. Why There Is No `useEffect`

This app intentionally avoids:

* API calls
* external synchronization
* effects

Why?

Because the dashboard is fully derived from local data.

According to [React Learn — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com):

> Effects should synchronize with external systems.

This app has no external systems yet.

Therefore:

* `useEffect` is unnecessary
* direct rendering is correct

---

# 24. Enterprise UI Architecture Introduced

This app introduces a real enterprise dashboard structure:

```txt
Dashboard
  Header
  Grid
    Cards
      Metrics
      Status
      Progress
```

This architecture later evolves into:

* API dashboards
* analytics systems
* admin portals
* SharePoint-inspired layouts
* PMO dashboards
* ticket systems

---

# 25. Technical Summary

| Concept        | Explanation                       |
| -------------- | --------------------------------- |
| Project model  | Defines project structure         |
| Static data    | Dashboard source                  |
| `map()`        | Converts data into UI             |
| ProjectCard    | Reusable enterprise component     |
| Fluent UI      | Microsoft design system           |
| ProgressBar    | Enterprise progress visualization |
| Badge          | Status visualization              |
| CSS Grid       | Responsive dashboard layout       |
| TypeScript     | Predictable architecture          |
| Pure rendering | UI derived directly from data     |

---

# 26. Concept Table

| Concept           | File                  | Purpose                        |
| ----------------- | --------------------- | ------------------------------ |
| Project interface | `Project.ts`          | Type-safe data structure       |
| Project data      | `projects.ts`         | Dashboard content              |
| Header component  | `DashboardHeader.tsx` | Enterprise page header         |
| Card component    | `ProjectCard.tsx`     | Reusable project visualization |
| Grid component    | `ProjectGrid.tsx`     | Dashboard layout               |
| FluentProvider    | `App.tsx`             | Global Fluent UI theme         |
| ProgressBar       | `ProjectCard.tsx`     | Project progress               |
| Badge rendering   | `ProjectCard.tsx`     | Status visualization           |

---

# 27. Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)
* [Fluent UI ProgressBar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/progressbar)

## Tooling

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# 28. Final Architectural Insight

The most important lesson from App 57 is:

```txt
Enterprise dashboards are component trees.
```

A professional dashboard is not:

* one giant file
* manually duplicated HTML
* imperative UI code

Instead:

```txt
Data
→ reusable components
→ declarative rendering
→ scalable architecture
```

This is the foundation of:

* Microsoft-style dashboards
* SharePoint enterprise portals
* PMO systems
* analytics applications
* React enterprise architecture

---

# Current Project Progress

| Block   |   App | Name                          | Status    |
| ------- | ----: | ----------------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI           | Completed |
| Block 2 | 21–40 | Interactivity and State       | Completed |
| Block 3 |    41 | Microsoft Style Login         | Completed |
| Block 3 |    42 | Corporate Form                | Completed |
| Block 3 |    43 | Tabs Navigation               | Completed |
| Block 3 |    44 | Dialog Manager                | Completed |
| Block 3 |    45 | Executive Dashboard           | Completed |
| Block 3 |    46 | DataGrid Catalog              | Completed |
| Block 3 |    47 | Enterprise User List          | Completed |
| Block 3 |    48 | Navigable Sidebar             | Completed |
| Block 3 |    49 | Corporate Header              | Completed |
| Block 3 |    50 | Professional Toolbar          | Completed |
| Block 3 |    51 | Notification System           | Completed |
| Block 3 |    52 | Administrative Panel          | Completed |
| Block 3 |    53 | Ticket Manager                | Completed |
| Block 3 |    54 | Approval System               | Completed |
| Block 3 |    55 | Corporate Calendar            | Completed |
| Block 3 |    56 | SharePoint Inspired Dashboard | Completed |
| Block 3 |    57 | Project Management Dashboard  | Current   |
| Block 3 |    58 | Support Ticket Control        | Next      |
