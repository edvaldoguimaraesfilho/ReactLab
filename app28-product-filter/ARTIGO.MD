# Technical Blog Article — App 28: Product Filter with React, TypeScript, Vite, and Fluent UI

The **Product Filter** application is one of the most important milestones in the entire React learning roadmap because it introduces the true React mental model described in [React Learn](https://react.dev/learn?utm_source=chatgpt.com).

Up to this point, the previous applications focused mostly on:

* static rendering
* component composition
* layouts
* visual structure
* reusable UI

But App 28 introduces something fundamentally different:

> Dynamic UI derived from state.

This is the moment where React starts feeling like a real application framework rather than just a component renderer.

According to the project roadmap, App 28 belongs to **Block 2 — Interactivity and State**, and specifically focuses on:

* `filter()`
* derived state
* controlled inputs
* Thinking in React
* dynamic filtering
* declarative rendering

The roadmap defines App 28 as:

| App | Name           | Main Learning Goal                           |
| --- | -------------- | -------------------------------------------- |
| 28  | Product Filter | `filter()`, derived state, Thinking in React |

This app may visually look simple, but architecturally it introduces:

* state-driven rendering
* filtering logic
* controlled form fields
* derived UI
* React re-rendering flow
* declarative search systems
* reusable filtering components

This same architecture is later used in:

* SharePoint search interfaces
* admin portals
* dashboards
* enterprise DataGrids
* CRM systems
* ERP systems
* analytics portals
* Microsoft-style catalogs

---

# The Real Goal of This App

The real goal is NOT just filtering products.

The real goal is understanding:

```txt
State changes
  ↓
React re-renders
  ↓
UI recalculates automatically
```

This is the heart of React.

---

# Why This App Is So Important

Many beginners incorrectly think React works like this:

```txt
User types
  ↓
Manually update HTML
  ↓
Manipulate DOM
```

But React works differently.

React expects you to think like this:

```txt
State changes
  ↓
UI is recalculated
  ↓
React updates the DOM automatically
```

This distinction is enormous.

---

# The Core React Principle Introduced Here

This app introduces one of the most important principles in modern React:

## Derived State

The filtered products should NOT be stored separately.

This is a common beginner mistake:

```tsx
const [filteredProducts, setFilteredProducts] = useState([]);
```

Why is this problematic?

Because the filtered list can already be calculated from:

* the original product list
* the search text
* the selected category

React Learn strongly recommends:

> Avoid redundant state.

Official concept:

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

Instead of storing duplicated data, we calculate it dynamically:

```tsx
const filteredProducts = products.filter(...)
```

This is called derived state.

The UI is derived from:

* existing state
* calculations
* data transformations

not manually synchronized copies.

---

# Enterprise Context of This Pattern

This same filtering architecture appears in:

| System             | Example              |
| ------------------ | -------------------- |
| SharePoint         | Document filtering   |
| Power BI portals   | Dashboard filtering  |
| CRM systems        | Customer search      |
| ERP systems        | Inventory filtering  |
| Admin portals      | User management      |
| Microsoft 365      | Dynamic lists        |
| Fluent UI DataGrid | Enterprise filtering |

So App 28 is actually introducing enterprise UI architecture patterns.

---

# Creating the Project

## PowerShell Commands

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app28-product-filter -- --template react-ts

cd app28-product-filter

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

This creates:

* React
* TypeScript
* Vite
* Fluent UI
* enterprise-ready tooling

---

# Why Vite Matters

Vite is the modern frontend tooling system used by this project.

Official docs:

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

Vite provides:

* extremely fast startup
* instant Hot Module Replacement
* native ES Modules
* optimized production builds
* simpler configuration

Unlike older React tooling, Vite does not bundle the entire application before starting development.

Instead, it uses native browser modules during development.

This makes the development experience dramatically faster.

---

# Creating the Folder Structure

## PowerShell

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

This structure is important because React applications scale through organization.

---

# Why Folder Separation Matters

Each folder has a responsibility.

| Folder       | Responsibility       |
| ------------ | -------------------- |
| `components` | Reusable UI pieces   |
| `models`     | TypeScript contracts |
| `data`       | Static/mock data     |
| `styles`     | CSS organization     |

This separation becomes critical in enterprise React systems.

---

# Understanding the Product Model

# `src\models\Product.ts`

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}
```

This file introduces one of the most important TypeScript concepts:

## Interfaces

An interface defines the shape of an object.

Every product must contain:

```txt
id
name
category
price
stock
```

This provides:

* type safety
* autocomplete
* architecture consistency
* safer refactoring
* fewer runtime bugs

---

# Why TypeScript Matters in Enterprise React

Without TypeScript:

```txt
Bugs are often discovered at runtime.
```

With TypeScript:

```txt
Many bugs are discovered while coding.
```

This is why enterprise React almost always uses TypeScript.

---

# The Role of Static Product Data

# `src\data\products.ts`

```ts
export const products: Product[] = [...]
```

This file introduces mock data.

Why static data first?

Because React learning should happen progressively.

Before:

* APIs
* async operations
* useEffect
* remote requests

you first need to understand:

* rendering
* state
* filtering
* derived calculations

Static data isolates the React concepts.

---

# Understanding the Product Card Component

# `ProductCard.tsx`

The ProductCard component is responsible for rendering one product visually.

It receives data through props:

```tsx
interface ProductCardProps {
  product: Product;
}
```

This is fundamental React architecture.

The component does not fetch products.

The component does not own the data.

It simply receives data and renders UI.

This makes the component:

* reusable
* predictable
* testable
* composable

---

# React Components as Pure Functions

React Learn strongly emphasizes:

> Components should behave like pure functions.

Official docs:

* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

Conceptually:

```txt
same input
  ↓
same output
```

In this case:

```txt
Product object
  ↓
Rendered Product Card
```

---

# Fluent UI Enterprise Components

The ProductCard uses Fluent UI components:

```tsx
<Card>
<CardHeader>
<Badge>
<Text>
<Title3>
```

Official docs:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

This is important because Fluent UI provides:

* accessibility
* typography consistency
* spacing systems
* Microsoft design standards
* keyboard navigation
* enterprise visual language

Without Fluent UI, all of this would need manual implementation.

---

# Understanding `ProductGrid.tsx`

The ProductGrid component receives:

```tsx
products: Product[]
```

and transforms that array into UI.

The key line is:

```tsx
products.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))
```

This introduces one of the most important concepts in React:

## Declarative Rendering

You do NOT manually create DOM elements.

You describe:

```txt
For each product,
render a ProductCard.
```

React handles the DOM updates automatically.

---

# Understanding `map()`

The JavaScript `map()` function transforms arrays.

Conceptually:

```txt
Product[]
  ↓
ProductCard[]
```

This is a core React rendering pattern.

Official docs:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# Why `key={product.id}` Matters

Every React list item needs a stable key.

```tsx
key={product.id}
```

Why?

Because React must identify:

* which item changed
* which item moved
* which item was removed
* which item was added

Without keys:

* React warnings appear
* rendering becomes less efficient
* state bugs may happen later

---

# Understanding Controlled Inputs

The ProductFilters component introduces controlled inputs.

Example:

```tsx
<Input
  value={searchText}
  onChange={(event) =>
    onSearchTextChange(
      event.target.value
    )
  }
/>
```

This is one of the biggest conceptual shifts in React.

---

# The Browser Is NOT the Source of Truth

In traditional HTML:

```txt
Input element owns its own value.
```

In React controlled inputs:

```txt
React state owns the value.
```

The input becomes a visual representation of state.

This is why React calls the UI:

* state-driven
* declarative

Official concept:

* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

---

# Understanding `useState`

Inside App.tsx:

```tsx
const [searchText, setSearchText] =
  useState("");
```

This introduces:

* component memory
* reactivity
* state updates

Official docs:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

The syntax is extremely important.

---

# Breaking Down `useState`

```tsx
const [searchText, setSearchText]
```

This creates:

* a state variable
* a setter function

Conceptually:

```txt
searchText
  current value

setSearchText
  function that changes the value
```

React then:

* detects the change
* re-renders the component
* recalculates the UI

---

# The Most Important Logic in the App

This is the core of the entire application:

```tsx
const filteredProducts =
  products.filter((product) => {
```

This is derived state.

The filtered list is calculated dynamically.

---

# Why This Is the Correct React Pattern

This avoids duplicated state.

Wrong:

```tsx
products
filteredProducts
```

Correct:

```tsx
products
searchText
selectedCategory
↓
calculate filteredProducts
```

This follows official React architecture guidance.

---

# Understanding the Search Logic

```tsx
product.name
  .toLowerCase()
  .includes(
    searchText.toLowerCase()
  );
```

This creates:

* case-insensitive search
* partial matching

Example:

```txt
surface
matches
Surface Laptop
```

---

# Understanding Category Filtering

```tsx
selectedCategory === ""
  ? true
  : product.category ===
    selectedCategory;
```

Meaning:

```txt
No category selected?
  show everything

Otherwise:
  show only matching category
```

---

# React Rendering Flow in This App

This is the real React lifecycle happening:

```txt
User types
  ↓
onChange fires
  ↓
setSearchText()
  ↓
React updates state
  ↓
App component re-renders
  ↓
filteredProducts recalculates
  ↓
ProductGrid receives new products
  ↓
UI updates automatically
```

This is the React mental model.

---

# Why No `useEffect` Exists Here

This is another extremely important lesson.

There is NO:

```tsx
useEffect(...)
```

Why?

Because:

* filtering is internal UI logic
* no external synchronization exists
* no API exists
* no timer exists

React Learn strongly warns against unnecessary effects.

Official docs:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

This app is intentionally teaching correct React architecture.

---

# The Role of `main.tsx`

`main.tsx` connects React to the browser DOM.

It:

* loads Fluent UI
* creates the React root
* renders App.tsx

The important part:

```tsx
ReactDOM.createRoot(
  document.getElementById("root")!
)
```

This connects React to:

```html
<div id="root"></div>
```

inside `index.html`.

---

# Why FluentProvider Matters

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates:

* Microsoft typography
* colors
* spacing
* design tokens
* accessibility behavior

Without FluentProvider:

* Fluent UI components lose styling consistency

---

# CSS Structure

# `index.css`

```css
body {
  margin: 0;
  font-family:
    "Segoe UI",
    Arial,
    sans-serif;
}

* {
  box-sizing: border-box;
}
```

This:

* removes default browser spacing
* activates Microsoft-style typography
* stabilizes layout calculations

---

# Production Validation

## Development

```powershell
npm run dev
```

## Production Build

```powershell
npm run build
```

This validates:

* imports
* TypeScript
* JSX
* production compilation

## Preview Production Build

```powershell
npm run preview
```

---

# Technical Summary

| Concept           | Purpose                          |
| ----------------- | -------------------------------- |
| React             | Declarative UI                   |
| TypeScript        | Static typing                    |
| Vite              | Fast tooling                     |
| Fluent UI         | Microsoft design system          |
| useState          | Component memory                 |
| Controlled Inputs | React controls form state        |
| Derived State     | Filtered products are calculated |
| filter()          | Dynamic filtering                |
| map()             | Array → UI rendering             |
| Props             | Component communication          |
| JSX               | Declarative syntax               |
| ProductCard       | Reusable UI component            |
| ProductGrid       | List rendering                   |
| ProductFilters    | Controlled form component        |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Thinking in React](https://react.dev/learn/thinking-in-react?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                      | Status                    |
| ------- | --: | ------------------------- | ------------------------- |
| Block 1 |  01 | Hello React Fluent        | Completed                 |
| Block 1 |  02 | Profile Card              | Completed                 |
| Block 1 |  03 | Product List              | Completed                 |
| Block 1 |  04 | Microsoft Style User Card | Completed                 |
| Block 1 |  05 | Static Dashboard          | Completed                 |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed                 |
| Block 1 |  07 | Visual Task List          | Completed                 |
| Block 1 |  08 | Timeline of Events        | Completed                 |
| Block 1 |  09 | Employee Table            | Completed                 |
| Block 1 |  10 | Email List                | Completed                 |
| Block 1 |  11 | Card Grid                 | Completed                 |
| Block 1 |  12 | Image Gallery             | Completed                 |
| Block 1 |  13 | Movie Catalog             | Completed                 |
| Block 1 |  14 | Football Teams            | Completed                 |
| Block 1 |  15 | News Page                 | Completed                 |
| Block 1 |  16 | Financial Dashboard       | Completed                 |
| Block 1 |  17 | SharePoint Style Layout   | Completed                 |
| Block 1 |  18 | File Explorer             | Completed                 |
| Block 1 |  19 | Corporate Portal          | Completed                 |
| Block 1 |  20 | Microsoft Landing Page    | Completed                 |
| Block 2 |  21 | Modern Counter            | Completed                 |
| Block 2 |  22 | Toggle Theme              | Completed                 |
| Block 2 |  23 | React Calculator          | Completed                 |
| Block 2 |  24 | Login Form                | Completed                 |
| Block 2 |  25 | User Registration         | Completed                 |
| Block 2 |  26 | Complete ToDo List        | Completed                 |
| Block 2 |  27 | Shopping List             | Completed                 |
| Block 2 |  28 | Product Filter            | Current Article Completed |
| Block 2 |  29 | Employee Search           | Next                      |
