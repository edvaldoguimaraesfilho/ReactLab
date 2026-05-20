# Building a Microsoft-Style Employee Table with React, Vite, TypeScript, and Fluent UI

App 09 — **Employee Table** is one of the most important foundational exercises in the React + Fluent UI roadmap because it introduces one of the most common enterprise UI patterns: the corporate data table.

Although visually simple, this application teaches several core concepts of modern React architecture:

* component composition
* declarative rendering
* rendering lists with `map()`
* TypeScript modeling
* reusable UI structures
* Fluent UI enterprise controls
* React rendering flow
* data-driven UI generation

This application belongs to **Block 1 — Fundamentals and UI**, where the focus is understanding how React builds interfaces declaratively before introducing interactivity and state management later in the roadmap. The official roadmap defines App 09 as **“Employee Table / Tabela de Funcionários”**, focused on tables and Microsoft-style layouts. 

The application also continues reinforcing the React mental model introduced in previous apps:

```txt
UI = function(data)
```

Instead of manually creating DOM elements, React renders the UI from structured data models.

---

# Why Enterprise Tables Matter

Tables are one of the most common UI structures in professional systems.

You find them everywhere:

* SharePoint lists
* Microsoft 365 admin portals
* ERP systems
* CRM systems
* HR systems
* inventory systems
* dashboards
* analytics platforms

A table is not just visual layout.

A professional enterprise table usually needs:

* strong data structure
* reusable row rendering
* scalable architecture
* accessibility
* responsive behavior
* consistent typography
* predictable rendering

This app introduces the architectural foundation required before moving into advanced DataGrid systems later in the project roadmap.

---

# Creating the Project

The application starts with Vite.

## PowerShell commands

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app09-employee-table -- --template react-ts

cd app09-employee-table

npm install
```

This command creates:

* React project
* Vite configuration
* TypeScript support
* React entry point
* development server
* build system

---

# Installing Fluent UI

Next, Fluent UI packages are installed.

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

These packages provide Microsoft’s official enterprise UI system.

Fluent UI includes:

* typography
* tables
* cards
* buttons
* badges
* avatars
* dialogs
* layouts
* accessibility features
* design tokens

Without Fluent UI, the application would require large amounts of manual CSS and accessibility work.

---

# Creating the Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

This structure is important because React applications scale through organization.

---

# Understanding the Architecture

The application structure becomes:

```txt
src/
  components/
    EmployeeTable.tsx

  data/
    employees.ts

  models/
    Employee.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

Each file has a responsibility.

| File                | Responsibility               |
| ------------------- | ---------------------------- |
| `main.tsx`          | Mount React into the browser |
| `App.tsx`           | Compose the page             |
| `EmployeeTable.tsx` | Render the table             |
| `employees.ts`      | Provide employee data        |
| `Employee.ts`       | Define TypeScript model      |
| `index.css`         | Global CSS                   |

This separation is one of the core principles of scalable React architecture.

---

# The React Rendering Flow

One of the most important things to understand is how React actually appears in the browser.

The flow is:

```txt
index.html
  contains div#root

main.tsx
  mounts React into #root

App.tsx
  becomes root component

EmployeeTable.tsx
  renders table structure

employees.ts
  provides data

React
  converts JSX into DOM

Browser
  displays HTML
```

React does not replace HTML entirely.

Instead, React injects the application into:

```html
<div id="root"></div>
```

inside `index.html`.

---

# Understanding `main.tsx`

The file:

```txt
src/main.tsx
```

usually contains:

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

This file is the bridge between:

* browser
* React
* Fluent UI
* application components

---

# Why `ReactDOM.createRoot()` Matters

```tsx
ReactDOM.createRoot(...)
```

This creates the React rendering root.

React now controls the DOM element:

```html
<div id="root"></div>
```

This enables:

* React rendering
* virtual DOM updates
* efficient re-rendering
* concurrent rendering architecture

Modern React applications always use `createRoot()`.

---

# Understanding `FluentProvider`

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates Fluent UI globally.

Without it:

* Fluent components lose styling
* typography becomes inconsistent
* themes do not work correctly
* Microsoft design tokens are unavailable

The provider injects:

* colors
* spacing
* typography
* accessibility rules
* visual identity

The selected theme:

```tsx
webLightTheme
```

is Microsoft’s default light theme.

---

# Understanding the Employee Model

The file:

```txt
src/models/Employee.ts
```

contains:

```ts
export type EmployeeStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}
```

This is extremely important.

The interface defines the shape of the data.

Every employee object must contain:

* id
* name
* role
* department
* location
* status

This gives:

* type safety
* better autocomplete
* safer refactoring
* architecture clarity
* fewer runtime bugs

---

# Why TypeScript Matters

Without TypeScript, you could accidentally write:

```ts
status: 123
```

TypeScript prevents this.

It ensures:

```txt
status must be:
- Active
- On Leave
- Inactive
```

This becomes critical in enterprise systems where data structures grow large.

---

# Understanding the Data File

The file:

```txt
src/data/employees.ts
```

contains:

```ts
export const employees: Employee[] = [
```

This creates a strongly typed array.

React applications often separate:

* data
* UI
* logic

This is a very important architectural concept.

The UI should not hardcode information directly inside components.

Instead:

```txt
data -> UI
```

---

# Understanding Declarative Rendering

React is declarative.

That means:

Instead of manually saying:

```txt
create row
append row
create cell
append cell
```

you describe what the UI should look like.

Example:

```tsx
employees.map((employee) => (
  <TableRow>
```

This means:

```txt
For each employee,
render one table row.
```

React handles the DOM updates automatically.

---

# Understanding `EmployeeTable.tsx`

The component imports Fluent UI controls:

```tsx
import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3,
} from "@fluentui/react-components";
```

These are enterprise-grade UI components.

Instead of manually creating:

```html
<table>
<tr>
<td>
```

we use Fluent UI abstractions.

This provides:

* accessibility
* consistent spacing
* Microsoft visual identity
* keyboard navigation
* enterprise styling

---

# Why `Card` Is Used

The table is wrapped inside:

```tsx
<Card>
```

The Card acts as a visual container.

It provides:

* padding
* elevation
* spacing
* visual grouping

This is common in enterprise dashboards.

---

# Understanding Fluent UI Tables

The table structure is:

```tsx
<Table>
  <TableHeader>
  <TableBody>
```

This is conceptually similar to HTML tables:

```html
<table>
<thead>
<tbody>
```

But Fluent UI adds:

* styling
* accessibility
* consistent behavior
* enterprise design integration

---

# Rendering the Header

```tsx
<TableHeader>
  <TableRow>
```

The header defines the table columns.

Each column uses:

```tsx
<TableHeaderCell>
```

This creates:

* Employee
* Role
* Department
* Location
* Status

---

# Rendering the Employee Rows

The most important part:

```tsx
{employees.map((employee) => (
```

This transforms data into UI.

Each employee becomes:

```txt
1 TableRow
```

This is one of React’s most important concepts.

---

# Why `key={employee.id}` Matters

```tsx
key={employee.id}
```

React requires stable keys when rendering lists.

Keys help React:

* identify elements
* update efficiently
* preserve rendering stability

Without keys, React may show warnings and behave inefficiently.

---

# Understanding `Avatar`

```tsx
<Avatar
  name={employee.name}
  color="colorful"
/>
```

The Avatar component generates Microsoft-style profile visuals.

Fluent UI automatically creates:

* initials
* colors
* circular styling
* accessibility labels

This saves significant manual CSS work.

---

# Understanding `TableCellLayout`

```tsx
<TableCellLayout
  media={<Avatar />}
>
```

This component combines:

* media
* text
* layout alignment

It creates the classic Microsoft-style table layout where the avatar appears beside the employee name.

---

# Understanding `Badge`

```tsx
<Badge appearance={getBadgeAppearance(employee.status)}>
```

Badges visually represent status.

This is common in:

* admin systems
* monitoring systems
* dashboards
* HR platforms

---

# Conditional Rendering Logic

The function:

```tsx
function getBadgeAppearance(status)
```

returns different visual styles depending on employee status.

Example:

```tsx
if (status === "Active") {
  return "filled";
}
```

This introduces conditional rendering logic.

The UI changes based on data.

---

# Why This Is Important

This teaches a critical React principle:

```txt
UI derives from data.
```

The component does not manually decide colors visually.

Instead:

```txt
status value -> visual appearance
```

This makes the UI predictable and scalable.

---

# Understanding `App.tsx`

The root component:

```tsx
function App() {
```

renders:

```tsx
<EmployeeTable />
```

This is composition.

React applications scale by combining components together.

The hierarchy becomes:

```txt
App
  EmployeeTable
```

Later apps will evolve into:

```txt
App
  Layout
    Sidebar
    Header
    EmployeeTable
```

---

# Understanding the Layout

The page uses:

```tsx
minHeight: "100vh"
```

This ensures full browser height.

And:

```tsx
maxWidth: "1200px"
margin: "0 auto"
```

This centers the content.

These are standard enterprise layout patterns.

---

# Why No State Yet?

This app intentionally avoids:

* `useState`
* `useEffect`
* API calls

According to [React Learn](https://react.dev/learn?utm_source=chatgpt.com), effects should only synchronize with external systems.

Since this app is static:

* no effects are needed
* no state is needed

This reinforces an extremely important React principle:

```txt
Do not add state or effects unnecessarily.
```

---

# The React Mental Model

This app reinforces the correct React mindset.

React is NOT:

* manually updating DOM nodes
* imperative programming
* jQuery-style manipulation

React IS:

* declarative UI
* component composition
* predictable rendering
* data-driven interfaces

---

# Production Validation

To validate the app:

```powershell
npm run build
```

This performs:

* TypeScript validation
* React compilation
* Vite production build

If the build succeeds, the application is production-ready.

---

# Previewing the Production Build

```powershell
npm run preview
```

This simulates the production deployment locally.

---

# Technical Summary

| Technology            | Purpose                    |
| --------------------- | -------------------------- |
| React                 | Declarative UI rendering   |
| TypeScript            | Static typing              |
| Vite                  | Development/build tooling  |
| Fluent UI             | Microsoft design system    |
| JSX                   | UI syntax                  |
| Functional Components | Reusable UI units          |
| Avatar                | Employee profile visual    |
| Badge                 | Status visualization       |
| Table                 | Enterprise data layout     |
| Card                  | Visual container           |
| `map()`               | Declarative list rendering |
| Props                 | Component inputs           |
| Interfaces            | Data contracts             |

---

# Concepts Learned

| Concept               | Explanation                    |
| --------------------- | ------------------------------ |
| Declarative Rendering | UI derived from data           |
| Component Composition | UI built from reusable pieces  |
| Type Modeling         | Data shape definition          |
| List Rendering        | Rendering arrays into UI       |
| Stable Keys           | Efficient React updates        |
| Enterprise Layout     | Microsoft-style structure      |
| Conditional Rendering | UI appearance based on data    |
| Fluent UI Integration | Enterprise design system usage |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com)
* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Table](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/table)
* [Fluent UI Avatar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/avatar)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Complete Project Progress Table

| Block   | App | Name                       | Main Concepts                             | Status    |
| ------- | --: | -------------------------- | ----------------------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent         | JSX, FluentProvider, Components           | Completed |
| Block 1 |  02 | Profile Card               | Props, Composition, Avatar                | Completed |
| Block 1 |  03 | Product List               | `map()`, Rendering Lists                  | Completed |
| Block 1 |  04 | Microsoft Style User Card  | Enterprise Cards, Typography              | Completed |
| Block 1 |  05 | Static Dashboard           | Layouts, Cards, Grids                     | Completed |
| Block 1 |  06 | Corporate Sidebar Menu     | Flexbox, Navigation Layout                | Completed |
| Block 1 |  07 | Visual Task List           | Pure Components, Composition              | Completed |
| Block 1 |  08 | Timeline of Events         | Sequential Rendering, Timeline UI         | Completed |
| Block 1 |  09 | Employee Table             | Tables, Typed Data, Declarative Rendering | Current   |
| Block 1 |  10 | Email List                 | Outlook-style Layouts                     | Next      |
| Block 1 |  11 | Card Grid                  | Responsive Grids                          | Upcoming  |
| Block 1 |  12 | Image Gallery              | Image Rendering                           | Upcoming  |
| Block 1 |  13 | Movie Catalog              | Catalog UI                                | Upcoming  |
| Block 1 |  14 | Football Teams List        | Reusable Cards                            | Upcoming  |
| Block 1 |  15 | News Portal                | Complex Layouts                           | Upcoming  |
| Block 1 |  16 | Static Financial Dashboard | KPI Panels                                | Upcoming  |
| Block 1 |  17 | SharePoint Style Layout    | Enterprise Layout                         | Upcoming  |
| Block 1 |  18 | File Explorer              | Explorer UI                               | Upcoming  |
| Block 1 |  19 | Corporate Portal           | Intranet Layout                           | Upcoming  |
| Block 1 |  20 | Microsoft Landing Page     | Advanced Composition                      | Upcoming  |

The complete 100-app roadmap structure is defined in the project documentation. 



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# Building a Microsoft-Style Employee Table with React, Vite, TypeScript, and Fluent UI

App 09 — **Employee Table** is one of the most important foundational exercises in the React + Fluent UI roadmap because it introduces one of the most common enterprise UI patterns: the corporate data table.

Although visually simple, this application teaches several core concepts of modern React architecture:

* component composition
* declarative rendering
* rendering lists with `map()`
* TypeScript modeling
* reusable UI structures
* Fluent UI enterprise controls
* React rendering flow
* data-driven UI generation

This application belongs to **Block 1 — Fundamentals and UI**, where the focus is understanding how React builds interfaces declaratively before introducing interactivity and state management later in the roadmap. The official roadmap defines App 09 as **“Employee Table / Tabela de Funcionários”**, focused on tables and Microsoft-style layouts. 

The application also continues reinforcing the React mental model introduced in previous apps:

```txt
UI = function(data)
```

Instead of manually creating DOM elements, React renders the UI from structured data models.

---

# Why Enterprise Tables Matter

Tables are one of the most common UI structures in professional systems.

You find them everywhere:

* SharePoint lists
* Microsoft 365 admin portals
* ERP systems
* CRM systems
* HR systems
* inventory systems
* dashboards
* analytics platforms

A table is not just visual layout.

A professional enterprise table usually needs:

* strong data structure
* reusable row rendering
* scalable architecture
* accessibility
* responsive behavior
* consistent typography
* predictable rendering

This app introduces the architectural foundation required before moving into advanced DataGrid systems later in the project roadmap.

---

# Creating the Project

The application starts with Vite.

## PowerShell commands

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app09-employee-table -- --template react-ts

cd app09-employee-table

npm install
```

This command creates:

* React project
* Vite configuration
* TypeScript support
* React entry point
* development server
* build system

---

# Installing Fluent UI

Next, Fluent UI packages are installed.

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

These packages provide Microsoft’s official enterprise UI system.

Fluent UI includes:

* typography
* tables
* cards
* buttons
* badges
* avatars
* dialogs
* layouts
* accessibility features
* design tokens

Without Fluent UI, the application would require large amounts of manual CSS and accessibility work.

---

# Creating the Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

This structure is important because React applications scale through organization.

---

# Understanding the Architecture

The application structure becomes:

```txt
src/
  components/
    EmployeeTable.tsx

  data/
    employees.ts

  models/
    Employee.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

Each file has a responsibility.

| File                | Responsibility               |
| ------------------- | ---------------------------- |
| `main.tsx`          | Mount React into the browser |
| `App.tsx`           | Compose the page             |
| `EmployeeTable.tsx` | Render the table             |
| `employees.ts`      | Provide employee data        |
| `Employee.ts`       | Define TypeScript model      |
| `index.css`         | Global CSS                   |

This separation is one of the core principles of scalable React architecture.

---

# The React Rendering Flow

One of the most important things to understand is how React actually appears in the browser.

The flow is:

```txt
index.html
  contains div#root

main.tsx
  mounts React into #root

App.tsx
  becomes root component

EmployeeTable.tsx
  renders table structure

employees.ts
  provides data

React
  converts JSX into DOM

Browser
  displays HTML
```

React does not replace HTML entirely.

Instead, React injects the application into:

```html
<div id="root"></div>
```

inside `index.html`.

---

# Understanding `main.tsx`

The file:

```txt
src/main.tsx
```

usually contains:

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

This file is the bridge between:

* browser
* React
* Fluent UI
* application components

---

# Why `ReactDOM.createRoot()` Matters

```tsx
ReactDOM.createRoot(...)
```

This creates the React rendering root.

React now controls the DOM element:

```html
<div id="root"></div>
```

This enables:

* React rendering
* virtual DOM updates
* efficient re-rendering
* concurrent rendering architecture

Modern React applications always use `createRoot()`.

---

# Understanding `FluentProvider`

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates Fluent UI globally.

Without it:

* Fluent components lose styling
* typography becomes inconsistent
* themes do not work correctly
* Microsoft design tokens are unavailable

The provider injects:

* colors
* spacing
* typography
* accessibility rules
* visual identity

The selected theme:

```tsx
webLightTheme
```

is Microsoft’s default light theme.

---

# Understanding the Employee Model

The file:

```txt
src/models/Employee.ts
```

contains:

```ts
export type EmployeeStatus =
  | "Active"
  | "On Leave"
  | "Inactive";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}
```

This is extremely important.

The interface defines the shape of the data.

Every employee object must contain:

* id
* name
* role
* department
* location
* status

This gives:

* type safety
* better autocomplete
* safer refactoring
* architecture clarity
* fewer runtime bugs

---

# Why TypeScript Matters

Without TypeScript, you could accidentally write:

```ts
status: 123
```

TypeScript prevents this.

It ensures:

```txt
status must be:
- Active
- On Leave
- Inactive
```

This becomes critical in enterprise systems where data structures grow large.

---

# Understanding the Data File

The file:

```txt
src/data/employees.ts
```

contains:

```ts
export const employees: Employee[] = [
```

This creates a strongly typed array.

React applications often separate:

* data
* UI
* logic

This is a very important architectural concept.

The UI should not hardcode information directly inside components.

Instead:

```txt
data -> UI
```

---

# Understanding Declarative Rendering

React is declarative.

That means:

Instead of manually saying:

```txt
create row
append row
create cell
append cell
```

you describe what the UI should look like.

Example:

```tsx
employees.map((employee) => (
  <TableRow>
```

This means:

```txt
For each employee,
render one table row.
```

React handles the DOM updates automatically.

---

# Understanding `EmployeeTable.tsx`

The component imports Fluent UI controls:

```tsx
import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3,
} from "@fluentui/react-components";
```

These are enterprise-grade UI components.

Instead of manually creating:

```html
<table>
<tr>
<td>
```

we use Fluent UI abstractions.

This provides:

* accessibility
* consistent spacing
* Microsoft visual identity
* keyboard navigation
* enterprise styling

---

# Why `Card` Is Used

The table is wrapped inside:

```tsx
<Card>
```

The Card acts as a visual container.

It provides:

* padding
* elevation
* spacing
* visual grouping

This is common in enterprise dashboards.

---

# Understanding Fluent UI Tables

The table structure is:

```tsx
<Table>
  <TableHeader>
  <TableBody>
```

This is conceptually similar to HTML tables:

```html
<table>
<thead>
<tbody>
```

But Fluent UI adds:

* styling
* accessibility
* consistent behavior
* enterprise design integration

---

# Rendering the Header

```tsx
<TableHeader>
  <TableRow>
```

The header defines the table columns.

Each column uses:

```tsx
<TableHeaderCell>
```

This creates:

* Employee
* Role
* Department
* Location
* Status

---

# Rendering the Employee Rows

The most important part:

```tsx
{employees.map((employee) => (
```

This transforms data into UI.

Each employee becomes:

```txt
1 TableRow
```

This is one of React’s most important concepts.

---

# Why `key={employee.id}` Matters

```tsx
key={employee.id}
```

React requires stable keys when rendering lists.

Keys help React:

* identify elements
* update efficiently
* preserve rendering stability

Without keys, React may show warnings and behave inefficiently.

---

# Understanding `Avatar`

```tsx
<Avatar
  name={employee.name}
  color="colorful"
/>
```

The Avatar component generates Microsoft-style profile visuals.

Fluent UI automatically creates:

* initials
* colors
* circular styling
* accessibility labels

This saves significant manual CSS work.

---

# Understanding `TableCellLayout`

```tsx
<TableCellLayout
  media={<Avatar />}
>
```

This component combines:

* media
* text
* layout alignment

It creates the classic Microsoft-style table layout where the avatar appears beside the employee name.

---

# Understanding `Badge`

```tsx
<Badge appearance={getBadgeAppearance(employee.status)}>
```

Badges visually represent status.

This is common in:

* admin systems
* monitoring systems
* dashboards
* HR platforms

---

# Conditional Rendering Logic

The function:

```tsx
function getBadgeAppearance(status)
```

returns different visual styles depending on employee status.

Example:

```tsx
if (status === "Active") {
  return "filled";
}
```

This introduces conditional rendering logic.

The UI changes based on data.

---

# Why This Is Important

This teaches a critical React principle:

```txt
UI derives from data.
```

The component does not manually decide colors visually.

Instead:

```txt
status value -> visual appearance
```

This makes the UI predictable and scalable.

---

# Understanding `App.tsx`

The root component:

```tsx
function App() {
```

renders:

```tsx
<EmployeeTable />
```

This is composition.

React applications scale by combining components together.

The hierarchy becomes:

```txt
App
  EmployeeTable
```

Later apps will evolve into:

```txt
App
  Layout
    Sidebar
    Header
    EmployeeTable
```

---

# Understanding the Layout

The page uses:

```tsx
minHeight: "100vh"
```

This ensures full browser height.

And:

```tsx
maxWidth: "1200px"
margin: "0 auto"
```

This centers the content.

These are standard enterprise layout patterns.

---

# Why No State Yet?

This app intentionally avoids:

* `useState`
* `useEffect`
* API calls

According to [React Learn](https://react.dev/learn?utm_source=chatgpt.com), effects should only synchronize with external systems.

Since this app is static:

* no effects are needed
* no state is needed

This reinforces an extremely important React principle:

```txt
Do not add state or effects unnecessarily.
```

---

# The React Mental Model

This app reinforces the correct React mindset.

React is NOT:

* manually updating DOM nodes
* imperative programming
* jQuery-style manipulation

React IS:

* declarative UI
* component composition
* predictable rendering
* data-driven interfaces

---

# Production Validation

To validate the app:

```powershell
npm run build
```

This performs:

* TypeScript validation
* React compilation
* Vite production build

If the build succeeds, the application is production-ready.

---

# Previewing the Production Build

```powershell
npm run preview
```

This simulates the production deployment locally.

---

# Technical Summary

| Technology            | Purpose                    |
| --------------------- | -------------------------- |
| React                 | Declarative UI rendering   |
| TypeScript            | Static typing              |
| Vite                  | Development/build tooling  |
| Fluent UI             | Microsoft design system    |
| JSX                   | UI syntax                  |
| Functional Components | Reusable UI units          |
| Avatar                | Employee profile visual    |
| Badge                 | Status visualization       |
| Table                 | Enterprise data layout     |
| Card                  | Visual container           |
| `map()`               | Declarative list rendering |
| Props                 | Component inputs           |
| Interfaces            | Data contracts             |

---

# Concepts Learned

| Concept               | Explanation                    |
| --------------------- | ------------------------------ |
| Declarative Rendering | UI derived from data           |
| Component Composition | UI built from reusable pieces  |
| Type Modeling         | Data shape definition          |
| List Rendering        | Rendering arrays into UI       |
| Stable Keys           | Efficient React updates        |
| Enterprise Layout     | Microsoft-style structure      |
| Conditional Rendering | UI appearance based on data    |
| Fluent UI Integration | Enterprise design system usage |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Your First Component](https://react.dev/learn/your-first-component?utm_source=chatgpt.com)
* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Table](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/table)
* [Fluent UI Avatar](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/avatar)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Complete Project Progress Table

| Block   | App | Name                       | Main Concepts                             | Status    |
| ------- | --: | -------------------------- | ----------------------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent         | JSX, FluentProvider, Components           | Completed |
| Block 1 |  02 | Profile Card               | Props, Composition, Avatar                | Completed |
| Block 1 |  03 | Product List               | `map()`, Rendering Lists                  | Completed |
| Block 1 |  04 | Microsoft Style User Card  | Enterprise Cards, Typography              | Completed |
| Block 1 |  05 | Static Dashboard           | Layouts, Cards, Grids                     | Completed |
| Block 1 |  06 | Corporate Sidebar Menu     | Flexbox, Navigation Layout                | Completed |
| Block 1 |  07 | Visual Task List           | Pure Components, Composition              | Completed |
| Block 1 |  08 | Timeline of Events         | Sequential Rendering, Timeline UI         | Completed |
| Block 1 |  09 | Employee Table             | Tables, Typed Data, Declarative Rendering | Current   |
| Block 1 |  10 | Email List                 | Outlook-style Layouts                     | Next      |
| Block 1 |  11 | Card Grid                  | Responsive Grids                          | Upcoming  |
| Block 1 |  12 | Image Gallery              | Image Rendering                           | Upcoming  |
| Block 1 |  13 | Movie Catalog              | Catalog UI                                | Upcoming  |
| Block 1 |  14 | Football Teams List        | Reusable Cards                            | Upcoming  |
| Block 1 |  15 | News Portal                | Complex Layouts                           | Upcoming  |
| Block 1 |  16 | Static Financial Dashboard | KPI Panels                                | Upcoming  |
| Block 1 |  17 | SharePoint Style Layout    | Enterprise Layout                         | Upcoming  |
| Block 1 |  18 | File Explorer              | Explorer UI                               | Upcoming  |
| Block 1 |  19 | Corporate Portal           | Intranet Layout                           | Upcoming  |
| Block 1 |  20 | Microsoft Landing Page     | Advanced Composition                      | Upcoming  |

The complete 100-app roadmap structure is defined in the project documentation. 


# App 09 — Employee Table

App 09 is **“Employee Table / Tabela de Funcionários”**, inside **Block 1 — Fundamentals and UI**. In the roadmap, it is defined as a Microsoft-style employee table focused on **tables, basic DataGrid thinking, typed data, component composition, and choosing a clean data structure**. 

## 1. PowerShell commands

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app09-employee-table -- --template react-ts
cd app09-employee-table

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\Employee.ts -ItemType File
New-Item src\data\employees.ts -ItemType File
New-Item src\components\EmployeeTable.tsx -ItemType File
```

## 2. `src\models\Employee.ts`

```ts
export type EmployeeStatus = "Active" | "On Leave" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}
```

## 3. `src\data\employees.ts`

```ts
import type { Employee } from "../models/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager",
    department: "Operations",
    location: "New York",
    status: "Active",
  },
  {
    id: 2,
    name: "Daniel Martins",
    role: "Frontend Developer",
    department: "Engineering",
    location: "São Paulo",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "UX Designer",
    department: "Design",
    location: "London",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Data Analyst",
    department: "Business Intelligence",
    location: "Toronto",
    status: "Inactive",
  },
];
```

## 4. `src\components\EmployeeTable.tsx`

```tsx
import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Title3,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";
import { employees } from "../data/employees";

function getBadgeAppearance(status: Employee["status"]) {
  if (status === "Active") {
    return "filled" as const;
  }

  if (status === "On Leave") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function EmployeeTable() {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "32px",
      }}
    >
      <Title3>Employee Directory</Title3>

      <Table aria-label="Employee table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Employee</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <TableCellLayout
                  media={
                    <Avatar
                      name={employee.name}
                      color="colorful"
                    />
                  }
                >
                  {employee.name}
                </TableCellLayout>
              </TableCell>

              <TableCell>{employee.role}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.location}</TableCell>

              <TableCell>
                <Badge appearance={getBadgeAppearance(employee.status)}>
                  {employee.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

## 5. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { EmployeeTable } from "./components/EmployeeTable";

function App() {
  return (
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
        <Title1>Employee Table</Title1>

        <Text>
          A static Microsoft-style employee table built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>

        <EmployeeTable />
      </section>
    </main>
  );
}

export default App;
```

## 6. `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

## 7. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 8. Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

## What this app teaches

| Concept                     | File                             |
| --------------------------- | -------------------------------- |
| TypeScript model            | `Employee.ts`                    |
| Static data source          | `employees.ts`                   |
| Table rendering             | `EmployeeTable.tsx`              |
| List rendering with `map()` | `employees.map(...)`             |
| Stable React keys           | `key={employee.id}`              |
| Fluent UI table components  | `Table`, `TableRow`, `TableCell` |
| Visual identity             | `Avatar`, `Badge`, `Card`        |
| Root composition            | `App → EmployeeTable`            |

## Where we are

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline of Events        | Completed |
| Block 1 |  09 | Employee Table            | Current   |
| Block 1 |  10 | Email List                | Next      |
