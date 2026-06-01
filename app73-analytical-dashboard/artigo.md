Segue o artigo completo para o **App 73 — Analytical Dashboard**, no padrão ReactLab.

# App 73 — Analytical Dashboard

## Building an Enterprise Analytics Dashboard with React, TypeScript, Fluent UI, and Modern React Architecture

### Introduction

Modern enterprise applications revolve around data. Whether we are building administrative portals, CRM systems, ERP platforms, SharePoint-inspired solutions, or executive dashboards, the ultimate goal is usually the same: transform raw information into actionable insights.

In App 73 — Analytical Dashboard, we introduce one of the most common patterns found in professional React applications: the KPI Dashboard.

This application belongs to Block 4 — Effects and Architecture and combines several concepts learned in previous applications:

* React Components
* TypeScript Models
* Service Layer Pattern
* useState
* useEffect
* Conditional Rendering
* Fluent UI
* Responsive Layouts
* Enterprise Architecture

The objective is not simply displaying cards on the screen.

The objective is understanding how React applications retrieve information from external systems and transform that information into meaningful visual components.

This application follows the official React philosophy:

UI = f(State)

The dashboard does not manually update HTML elements.

Instead:

```txt
Service returns data
↓
State changes
↓
React re-renders
↓
Dashboard updates automatically
```

This is the React mental model.

---

# Creating the Project

Create the project using Vite and TypeScript.

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app73-analytical-dashboard -- --template react-ts

cd app73-analytical-dashboard

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create the folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create the files:

```powershell
New-Item src\models\DashboardMetrics.ts -ItemType File
New-Item src\services\dashboardService.ts -ItemType File

New-Item src\components\DashboardHeader.tsx -ItemType File
New-Item src\components\KpiCard.tsx -ItemType File
New-Item src\components\MetricsGrid.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Final Folder Structure

```txt
src/
│
├── components/
│   ├── DashboardHeader.tsx
│   ├── KpiCard.tsx
│   └── MetricsGrid.tsx
│
├── models/
│   └── DashboardMetrics.ts
│
├── services/
│   └── dashboardService.ts
│
├── styles/
│
├── App.tsx
├── main.tsx
└── index.css
```

This architecture follows a very common enterprise pattern.

Each folder has a single responsibility.

---

# Understanding the Model Layer

The model layer defines the structure of the information used by the application.

```ts
export interface DashboardMetrics {
  totalUsers: number;
  activeProjects: number;
  openTickets: number;
  revenue: number;
}
```

The interface defines the shape of the data.

Benefits:

* Type safety
* Better autocomplete
* Safer refactoring
* Predictable architecture

One important note:

Since this is an interface, modern TypeScript projects require:

```ts
import type { DashboardMetrics }
from "../models/DashboardMetrics";
```

instead of:

```ts
import { DashboardMetrics }
from "../models/DashboardMetrics";
```

because Vite enables:

```json
"verbatimModuleSyntax": true
```

by default.

---

# Why a Service Layer Exists

A common beginner mistake is placing API logic directly inside components.

Bad:

```tsx
function App() {
  fetch(...)
}
```

Professional architecture:

```txt
Service Layer
        ↓
React Component
        ↓
UI
```

The service becomes responsible for retrieving data.

The component becomes responsible for rendering data.

This separation makes applications easier to maintain.

---

# Simulating an Enterprise API

The service simulates a REST API.

```ts
export async function getDashboardMetrics() {
  await new Promise(resolve =>
    setTimeout(resolve, 1200)
  );

  return {
    totalUsers: 1450,
    activeProjects: 37,
    openTickets: 82,
    revenue: 325000,
  };
}
```

The artificial delay allows us to visualize loading behavior.

Real systems frequently wait for:

* APIs
* Databases
* Authentication Providers
* SharePoint Services
* Microsoft Graph

Loading states become critical.

---

# Understanding React Effects

One of the most important concepts introduced in this application is:

```tsx
useEffect()
```

The dashboard needs to retrieve information when the component appears.

React provides Effects specifically for this purpose.

```tsx
useEffect(() => {
  loadMetrics();
}, []);
```

The empty dependency array means:

```txt
Run once when the component mounts.
```

The execution flow becomes:

```txt
Component loads
↓
Effect executes
↓
Service is called
↓
Data returns
↓
State updates
↓
React re-renders
```

This is the correct use of Effects.

---

# Understanding State

The application uses two state variables.

```tsx
const [metrics, setMetrics]
const [loading, setLoading]
```

Each one has a different responsibility.

## Metrics State

Stores business information.

```txt
Users
Projects
Tickets
Revenue
```

## Loading State

Controls user feedback.

```txt
Loading...
```

while data is being retrieved.

Without loading states, dashboards often appear broken.

Professional applications always communicate system status.

---

# Conditional Rendering

The dashboard displays different interfaces depending on state.

Loading:

```tsx
<Spinner />
```

Loaded:

```tsx
<MetricsGrid />
```

React evaluates the current state and renders the appropriate interface.

This is called Conditional Rendering.

Instead of:

```txt
Show spinner manually
Hide spinner manually
Show dashboard manually
```

React simply evaluates state.

---

# KPI Cards

The KPI card is the primary building block of the dashboard.

Each card displays:

```txt
Metric
Value
```

Examples:

```txt
Total Users
1450

Revenue
$325,000

Open Tickets
82
```

These components appear everywhere in enterprise software.

Examples:

* Microsoft Admin Center
* SharePoint Dashboards
* Power BI Portals
* CRM Systems
* ERP Applications

Because they allow decision makers to quickly understand business performance.

---

# Component Composition

The application follows a layered component architecture.

```txt
App
│
├── DashboardHeader
│
└── MetricsGrid
      │
      ├── KpiCard
      ├── KpiCard
      ├── KpiCard
      └── KpiCard
```

Benefits:

* Reusability
* Simplicity
* Scalability
* Maintainability

Each component has a single responsibility.

---

# Responsive Design

The dashboard uses CSS Grid.

```tsx
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))"
```

This creates responsive behavior automatically.

Large screens:

```txt
[Card][Card][Card][Card]
```

Medium screens:

```txt
[Card][Card]
[Card][Card]
```

Small screens:

```txt
[Card]
[Card]
[Card]
[Card]
```

No additional JavaScript is required.

CSS Grid handles the adaptation.

---

# Why Fluent UI

Fluent UI provides:

* Microsoft styling
* Accessibility
* Responsive behavior
* Design consistency
* Enterprise-grade components

Instead of creating everything manually:

```html
<div>
```

we use:

```tsx
<Card>
```

which already includes:

* spacing
* borders
* typography
* accessibility

This accelerates enterprise development.

---

# React Mental Model

The most important lesson from App 73 is understanding how React thinks.

Many developers initially think:

```txt
Get data
Find HTML
Update HTML
```

That is not React.

React expects:

```txt
Get data
Update state
React updates UI
```

The dashboard demonstrates this perfectly.

The service returns information.

State changes.

React automatically updates the interface.

No DOM manipulation is necessary.

---

# Enterprise Architecture Introduced

This application introduces several important enterprise patterns.

## Model Layer

```txt
models/
```

Defines data structures.

## Service Layer

```txt
services/
```

Handles external systems.

## Presentation Layer

```txt
components/
```

Displays information.

## Container Layer

```txt
App.tsx
```

Coordinates state and effects.

These patterns appear repeatedly in large React applications.

---

# Technical Summary

| Concept               | Description                         |
| --------------------- | ----------------------------------- |
| useEffect             | Synchronizes with external services |
| useState              | Stores dashboard state              |
| Service Layer         | Retrieves business data             |
| Fluent UI             | Enterprise design system            |
| KPI Cards             | Dashboard metrics                   |
| TypeScript Models     | Strong typing                       |
| Conditional Rendering | Loading vs Dashboard                |
| CSS Grid              | Responsive layout                   |
| Component Composition | Modular architecture                |
| Async/Await           | Asynchronous data loading           |

---

# Official Documentation

React Learn

[https://react.dev/learn](https://react.dev/learn)

Synchronizing with Effects

[https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)

State: A Component's Memory

[https://react.dev/learn/state-a-components-memory](https://react.dev/learn/state-a-components-memory)

Conditional Rendering

[https://react.dev/learn/conditional-rendering](https://react.dev/learn/conditional-rendering)

Fluent UI

[https://developer.microsoft.com/en-us/fluentui#/controls/web](https://developer.microsoft.com/en-us/fluentui#/controls/web)

Fluent UI Card

[https://developer.microsoft.com/en-us/fluentui#/controls/web/card](https://developer.microsoft.com/en-us/fluentui#/controls/web/card)

Vite

[https://vite.dev/guide/](https://vite.dev/guide/)

TypeScript

[https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

---

# Final Insight

App 73 is much more than a dashboard.

It introduces the foundation of modern enterprise React architecture:

```txt
External Data
↓
Service Layer
↓
React Effect
↓
State
↓
Components
↓
Business Dashboard
```

This same architecture will be reused in future applications such as analytics systems, administrative portals, SharePoint-inspired solutions, reporting systems, and enterprise dashboards.

Mastering App 73 means understanding one of the most important patterns in professional React development.

# Current Progress

| Block       |    App | Name                       | Status      |
| ----------- | -----: | -------------------------- | ----------- |
| Block 4     |     61 | REST API Consumption       | Completed   |
| Block 4     |     62 | API Dashboard              | Completed   |
| Block 4     |     63 | Async Search               | Completed   |
| Block 4     |     64 | GitHub Explorer            | Completed   |
| Block 4     |     65 | Weather App                | Completed   |
| Block 4     |     66 | Pagination System          | Completed   |
| Block 4     |     67 | Infinite Scroll            | Completed   |
| Block 4     |     68 | Data Cache                 | Completed   |
| Block 4     |     69 | Custom Fetch Hook          | Completed   |
| Block 4     |     70 | Context API Control        | Completed   |
| Block 4     |     71 | Favorites System           | Completed   |
| Block 4     |     72 | API DataGrid               | Completed   |
| **Block 4** | **73** | **Analytical Dashboard**   | **Current** |
| Block 4     | **74** | **Cryptocurrency Monitor** | **Next**    |
