Below is the complete technical blog article for **App 72 — API DataGrid Explorer**, following the ReactLab pattern, with PowerShell commands, architecture explanation, React mental model, technical summary, concept table, and official documentation.

```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 72: API DataGrid Explorer with React, TypeScript, Vite, and Fluent UI

## Introduction

As React applications evolve from simple interfaces into enterprise systems, one of the most common requirements becomes displaying large amounts of data retrieved from external APIs.

In App 72 — API DataGrid Explorer, we build a complete enterprise-style data visualization application using React, TypeScript, Vite, and Fluent UI. This application demonstrates how to retrieve information from a REST API, organize the data through a service layer, manage loading and error states, and present everything inside a professional Fluent UI table.

This application belongs to Block 4 — Effects and Architecture, where the focus shifts from local state management into synchronization with external systems. According to the official React documentation, Effects should be used only when a component needs to communicate with something outside React itself.

In this project, that external system is a REST API.

The architecture introduces several enterprise-level concepts:

* Service Layer
* Custom Hooks
* API Consumption
* Loading States
* Error Handling
* Fluent UI Data Presentation
* Separation of Concerns
* React Effects

This app serves as the foundation for dashboards, administration panels, reporting systems, SharePoint-style portals, CRMs, ERPs, and enterprise data visualization platforms.

---

# Why This Application Matters

Many beginner React projects place API logic directly inside components.

For example:

```tsx
useEffect(() => {
  fetch(...)
}, []);
```

Although this works, it becomes difficult to maintain as projects grow.

Enterprise applications typically separate responsibilities:

```txt
UI Layer
     ↓
Custom Hook
     ↓
Service Layer
     ↓
REST API
```

This structure makes the application:

* easier to maintain
* easier to test
* easier to scale
* easier to debug

This app introduces that architecture.

---

# Creating the Project

Create the project using Vite:

```powershell
mkdir bloco04
cd bloco04

npm create vite@latest app72-api-datagrid-explorer -- --template react-ts

cd app72-api-datagrid-explorer

npm install
```

Install Fluent UI:

```powershell
npm install @fluentui/react-components
npm install @fluentui/react-icons
```

Create folders:

```powershell
mkdir src\components
mkdir src\models
mkdir src\services
mkdir src\hooks
mkdir src\styles
```

Create files:

```powershell
New-Item src\models\User.ts -ItemType File
New-Item src\services\UserService.ts -ItemType File
New-Item src\hooks\useUsers.ts -ItemType File
New-Item src\components\UserDataGrid.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Project Structure

```txt
src/
│
├── components/
│   └── UserDataGrid.tsx
│
├── hooks/
│   └── useUsers.ts
│
├── models/
│   └── User.ts
│
├── services/
│   └── UserService.ts
│
├── App.tsx
├── main.tsx
└── index.css
```

Each folder has a specific responsibility.

This separation is one of the most important enterprise React practices.

---

# Understanding the User Model

The User interface defines the structure of data received from the API.

```ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
```

TypeScript ensures:

* predictable data
* autocomplete
* compile-time validation
* safer refactoring

Without TypeScript, the application would rely on assumptions about the API response.

---

# Understanding the Service Layer

The service layer is responsible for communicating with external systems.

```ts
export async function getUsers(): Promise<User[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  return response.json();
}
```

Notice that the React component does not know how the data is retrieved.

Its only responsibility is displaying information.

The service handles:

* HTTP requests
* API endpoints
* error generation
* response conversion

This separation is fundamental in enterprise architecture.

---

# Understanding the Custom Hook

The custom hook acts as a bridge between the UI and the service layer.

```tsx
const {
  users,
  loading,
  error,
} = useUsers();
```

The hook encapsulates:

* API loading
* state creation
* error handling
* side effects

This allows components to remain clean.

Instead of:

```tsx
Component
  fetch
  loading
  error
  rendering
```

we get:

```txt
Component
     ↓
useUsers()
     ↓
Data
```

Much simpler.

---

# Understanding useEffect

This app introduces a correct useEffect scenario.

```tsx
useEffect(() => {
  loadUsers();
}, []);
```

Why is useEffect appropriate here?

Because the component is synchronizing with an external system:

```txt
REST API
```

According to React Learn:

Effects should synchronize components with external systems.

Examples include:

* APIs
* timers
* browser subscriptions
* localStorage
* websockets

Since this application retrieves external data, useEffect is appropriate.

---

# Loading State

One of the most common mistakes in beginner applications is ignoring loading behavior.

Without loading:

```txt
User opens app
Blank screen appears
User wonders if something is broken
```

Instead:

```tsx
<Spinner label="Loading users..." />
```

provides immediate feedback.

This greatly improves user experience.

---

# Error Handling

Network requests can fail.

Reasons include:

* no internet connection
* server unavailable
* invalid endpoint
* timeout

The hook captures these scenarios:

```tsx
catch {
  setError("Unable to load data.");
}
```

Then React displays:

```tsx
<Text>{error}</Text>
```

This ensures the UI remains predictable even during failures.

---

# Understanding React Rendering

The rendering cycle works like this:

```txt
App starts
     ↓
useUsers executes
     ↓
loading = true
     ↓
Spinner appears
     ↓
API returns data
     ↓
users updated
     ↓
loading = false
     ↓
React re-renders
     ↓
DataGrid appears
```

Notice:

React never manually updates the DOM.

State changes.

React re-renders.

UI updates automatically.

---

# Understanding Fluent UI Tables

The application uses Fluent UI table components.

```tsx
<Table>
```

Enterprise applications often rely heavily on tables because business data is naturally tabular.

Examples:

* employees
* products
* tickets
* customers
* invoices
* projects
* reports

Fluent UI provides:

* accessibility
* keyboard navigation
* Microsoft design consistency
* responsive behavior

without requiring manual implementation.

---

# Why We Use a DataGrid Pattern

Although Fluent UI also provides DataGrid components, starting with a table helps understand the underlying structure.

The pattern remains the same:

```txt
Data Source
     ↓
Array
     ↓
map()
     ↓
Rows
     ↓
Rendered UI
```

This pattern appears everywhere in React.

---

# Understanding List Rendering

The DataGrid uses:

```tsx
users.map(...)
```

This is one of React's most important concepts.

React does not manually create rows.

Instead:

```txt
For each user
create one row
```

The UI is derived from data.

This is declarative rendering.

---

# React Mental Model

This app reinforces the core React principle:

```txt
UI = f(state)
```

Current state determines:

* loading screen
* error message
* data table

The UI automatically adapts.

No manual DOM manipulation is required.

---

# Enterprise Architecture Introduced

This application introduces the architecture used by many corporate React applications:

```txt
Models
    ↓
Services
    ↓
Custom Hooks
    ↓
Components
    ↓
UI
```

Future apps will expand this architecture with:

* Context API
* Reducers
* Authentication
* Routing
* Dashboards
* Analytics
* Enterprise portals

---

# Running the Application

Development:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Preview production version:

```powershell
npm run preview
```

---

# Technical Summary

| Concept               | Purpose                        |
| --------------------- | ------------------------------ |
| TypeScript Interface  | Defines API data structure     |
| Service Layer         | Encapsulates API communication |
| Custom Hook           | Reuses loading logic           |
| useEffect             | Synchronizes with API          |
| useState              | Stores data and UI state       |
| Loading State         | Improves UX                    |
| Error State           | Handles failures               |
| Fluent UI Table       | Enterprise data presentation   |
| map()                 | Converts data into UI          |
| Component Composition | Separates responsibilities     |

---

# Concept Mapping

| File             | Responsibility     |
| ---------------- | ------------------ |
| User.ts          | Data model         |
| UserService.ts   | API access         |
| useUsers.ts      | State and effects  |
| UserDataGrid.tsx | Data visualization |
| App.tsx          | Page composition   |
| main.tsx         | React entry point  |
| index.css        | Global styles      |

---

# Official Documentation

## React

* [https://react.dev/learn](https://react.dev/learn)
* [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects)
* [https://react.dev/learn/reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
* [https://react.dev/learn/state-a-components-memory](https://react.dev/learn/state-a-components-memory)
* [https://react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)

## Fluent UI

* [https://developer.microsoft.com/en-us/fluentui#/controls/web](https://developer.microsoft.com/en-us/fluentui#/controls/web)

## Vite

* [https://vite.dev/guide/](https://vite.dev/guide/)

## TypeScript

* [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)

## JSONPlaceholder

* [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com)

---

# Final Architectural Insight

App 72 is much more than a simple API example.

It introduces the first complete enterprise data pipeline:

```txt
REST API
     ↓
Service Layer
     ↓
Custom Hook
     ↓
React State
     ↓
Fluent UI DataGrid
     ↓
Enterprise User Interface
```

This architecture is the same pattern used in:

* Microsoft 365 applications
* SharePoint portals
* CRM systems
* ERP platforms
* Analytics dashboards
* Administrative portals

Mastering this pattern prepares you for the next phase of React enterprise development.

# Current Project Progress

| Block       | App    | Name                      | Status                        |
| ----------- | ------ | ------------------------- | ----------------------------- |
| Block 1     | 01–20  | Fundamentals and UI       | Completed                     |
| Block 2     | 21–40  | Interactivity and State   | Completed                     |
| Block 3     | 41–60  | Fluent UI Professional    | Completed                     |
| Block 4     | 61–71  | Effects and Architecture  | Completed                     |
| **Block 4** | **72** | **API DataGrid Explorer** | **Current Article Completed** |
| Block 4     | 73     | Analytical Dashboard      | Next                          |
| Block 4     | 74     | Cryptocurrency Monitor    | Upcoming                      |
| Block 4     | 75     | Repository Explorer       | Upcoming                      |

**Current Position:** Block 4 → App 72/100 → API DataGrid Explorer.
