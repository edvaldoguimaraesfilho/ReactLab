# Technical Blog Article — App 10: Building an Outlook-Style Email List with React, Vite, TypeScript, and Fluent UI

Modern enterprise applications are heavily centered around information organization. One of the most common enterprise UI patterns is the **email inbox layout**, popularized by systems such as Outlook, Microsoft 365, Gmail, ticketing systems, CRM platforms, ERP solutions, and internal corporate portals.

In **App 10 — Email List**, we build a static Outlook-inspired inbox using:

* React
* TypeScript
* Vite
* Fluent UI

This application belongs to **Block 1 — Fundamentals and UI**, where the primary goal is to master:

* JSX
* Components
* Props
* Lists
* Declarative rendering
* Composition
* Enterprise UI structure

According to the roadmap, App 10 focuses on:

* corporate layout
* list rendering
* reusable components
* Outlook-style enterprise UI patterns 

Even though the app is static, architecturally it introduces extremely important concepts that will later evolve into:

* dynamic email systems
* API-driven inboxes
* filtering systems
* search
* unread state
* selection
* routing
* virtualization
* enterprise dashboards

The purpose of this article is not only to explain the code, but to deeply explain:

* how React renders lists
* how JSX becomes HTML
* how components communicate through props
* how Vite serves the application
* how Fluent UI creates enterprise-grade interfaces
* how TypeScript models application data

---

# 1. Creating the Project

The application starts with Vite.

## Why Vite?

Modern React development requires:

* fast startup
* fast rebuilds
* ES Modules
* TypeScript support
* optimized production builds

Vite solves these problems extremely efficiently.

Create the project:

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app10-email-list -- --template react-ts
```

This command:

* creates the folder
* configures React
* configures TypeScript
* configures Vite
* installs React tooling

Then install dependencies:

```powershell
cd app10-email-list

npm install
```

Install Fluent UI:

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

---

# 2. Creating the Folder Structure

Create folders:

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

This project organization is extremely important.

---

# 3. Understanding the Architecture

The final structure becomes:

```txt
src/
  components/
    EmailItem.tsx
    EmailList.tsx

  data/
    emails.ts

  models/
    EmailMessage.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

Each folder has a responsibility.

| Folder       | Responsibility       |
| ------------ | -------------------- |
| `components` | Reusable UI pieces   |
| `data`       | Static/mock data     |
| `models`     | TypeScript contracts |
| `styles`     | CSS organization     |
| `App.tsx`    | Root component       |
| `main.tsx`   | React entry point    |

This separation is one of the foundations of scalable React architecture.

---

# 4. How React Enters the Browser

The application starts with:

```txt
index.html
```

Inside it:

```html
<div id="root"></div>
```

This div is initially empty.

Then:

```html
<script type="module" src="/src/main.tsx"></script>
```

loads React.

The rendering flow is:

```txt
Browser loads index.html
index.html loads main.tsx
main.tsx renders App.tsx
App.tsx renders child components
ReactDOM updates the real browser DOM
Browser displays HTML
```

This is the core React rendering pipeline.

---

# 5. Understanding `main.tsx`

The file:

```txt
src/main.tsx
```

connects React to the browser.

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

---

# 6. Understanding `ReactDOM.createRoot`

```tsx
ReactDOM.createRoot(
  document.getElementById("root")!
)
```

This tells React:

```txt
Render the application inside the HTML element with id="root".
```

The exclamation mark:

```tsx
!
```

is a TypeScript non-null assertion.

It means:

```txt
I guarantee this element exists.
```

---

# 7. Why `React.StrictMode` Exists

```tsx
<React.StrictMode>
```

StrictMode helps detect:

* unsafe rendering
* deprecated APIs
* impure components
* side effects

React expects components to behave like pure functions.

This concept becomes essential later with:

* hooks
* effects
* state updates

---

# 8. Understanding `FluentProvider`

```tsx
<FluentProvider theme={webLightTheme}>
```

This activates Fluent UI globally.

Without it:

* components lose theme styling
* typography becomes inconsistent
* spacing tokens disappear
* accessibility behaviors may break

Fluent UI uses providers to distribute:

* colors
* typography
* spacing
* accessibility rules
* Microsoft design tokens

---

# 9. Understanding the Root Component

`App.tsx` defines the application shell.

```tsx
function App() {
```

This is a React functional component.

React components are functions that:

1. receive props
2. return JSX

This is the foundation of React’s declarative architecture.

---

# 10. Understanding JSX

Inside the component:

```tsx
return (
```

The component returns JSX.

JSX is NOT HTML.

JSX is:

* JavaScript syntax extension
* declarative UI syntax
* compiled into JavaScript

React later converts JSX into real DOM nodes.

---

# 11. The Main Layout

```tsx
<main
  style={{
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "48px",
    boxSizing: "border-box",
  }}
>
```

This creates:

* full viewport layout
* background color
* enterprise spacing
* responsive behavior

---

# 12. Why `100vh` Matters

```tsx
minHeight: "100vh"
```

means:

```txt
Use the full browser viewport height.
```

This is common in enterprise apps because:

* dashboards
* admin portals
* inbox systems

usually occupy the entire screen.

---

# 13. Understanding the Toolbar

Inside `App.tsx`:

```tsx
<Card>
```

contains:

```tsx
<Button appearance="primary">
```

This creates an Outlook-style navigation toolbar.

---

# 14. Why Fluent UI Buttons Matter

This line:

```tsx
<Button appearance="primary">
```

already includes:

* hover behavior
* focus states
* keyboard accessibility
* Microsoft design language
* enterprise styling

Without Fluent UI, all of this would require manual CSS and JavaScript.

---

# 15. Understanding the Icons

```tsx
import {
  Mail24Regular,
  Send24Regular,
  Archive24Regular,
} from "@fluentui/react-icons";
```

Fluent UI icons are:

* SVG-based
* scalable
* theme-aware
* optimized

These icons help visually communicate:

* inbox
* sent emails
* archive area

---

# 16. The Role of `EmailMessage.ts`

```ts
export interface EmailMessage {
  id: number;
  sender: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  category: EmailCategory;
  unread: boolean;
}
```

This defines the shape of an email.

TypeScript interfaces are extremely important because they:

* prevent mistakes
* improve maintainability
* provide autocomplete
* enforce consistency

This becomes critical in enterprise applications.

---

# 17. Understanding the Data Layer

`emails.ts` contains mock data.

```ts
export const emails: EmailMessage[] = [
```

This introduces one of React’s most important ideas:

```txt
The UI should be derived from data.
```

Instead of manually writing:

* email card 1
* email card 2
* email card 3

we define data once and let React generate the UI.

---

# 18. Understanding List Rendering

Inside `EmailList.tsx`:

```tsx
{emails.map((email) => (
  <EmailItem key={email.id} email={email} />
))}
```

This is one of the most important React patterns.

---

# 19. Why `map()` Is Important

`map()` transforms arrays.

Conceptually:

```txt
email data
  becomes
EmailItem components
```

Instead of imperative DOM manipulation:

```txt
create div
append div
create another div
append another div
```

React allows declarative rendering:

```txt
For each email, render one EmailItem.
```

---

# 20. Why `key={email.id}` Matters

```tsx
key={email.id}
```

Keys help React identify list items efficiently.

This becomes extremely important later when:

* adding emails
* removing emails
* filtering emails
* sorting emails

Without keys, React cannot track elements properly.

---

# 21. Understanding Component Composition

The hierarchy is:

```txt
App
  EmailList
    EmailItem
```

This is component composition.

Each component has one responsibility.

---

# 22. Understanding `EmailItem.tsx`

This component renders one email row.

```tsx
interface EmailItemProps {
  email: EmailMessage;
}
```

This defines the props contract.

The component receives:

* one email object

and renders the UI.

---

# 23. Understanding Props

Props are inputs passed into components.

Example:

```tsx
<EmailItem email={email} />
```

This means:

```txt
Pass the email object into EmailItem.
```

Props make components:

* reusable
* configurable
* composable

---

# 24. Understanding the Layout Grid

```tsx
display: "grid",
gridTemplateColumns: "48px 1fr auto",
```

This creates a 3-column structure:

```txt
Avatar | Main content | Time/category
```

The columns mean:

| Value  | Meaning             |
| ------ | ------------------- |
| `48px` | Fixed avatar width  |
| `1fr`  | Flexible content    |
| `auto` | Right-side metadata |

This creates an Outlook-style row layout.

---

# 25. Understanding `Avatar`

```tsx
<Avatar
  name={email.sender}
  initials={email.initials}
/>
```

Fluent UI Avatar automatically creates:

* user circles
* initials
* accessibility behavior
* Microsoft-style visuals

---

# 26. Understanding Conditional Rendering

```tsx
{email.unread && (
  <Badge appearance="filled">
    Unread
  </Badge>
)}
```

This is conditional rendering.

Meaning:

```txt
If unread is true,
show the badge.
```

This is a fundamental React concept.

---

# 27. Why `&&` Works

In JavaScript:

```tsx
condition && expression
```

means:

```txt
If condition is true,
render expression.
```

This is very common in React UIs.

---

# 28. Understanding Dynamic Styling

```tsx
fontWeight: email.unread ? 700 : 400
```

This uses a ternary operator.

Meaning:

```txt
If unread,
use bold font.
Otherwise,
use normal font.
```

This creates the Outlook-like unread visual behavior.

---

# 29. Understanding the Badge

```tsx
<Badge appearance="outline">
```

Fluent UI badges provide:

* labels
* statuses
* categories
* visual metadata

Used here for:

* unread state
* email category

---

# 30. Why the Border Changes

```tsx
borderLeft:
  email.unread
    ? "4px solid #0f6cbd"
    : "4px solid transparent"
```

Unread emails receive a Microsoft blue border.

This mimics real enterprise inbox systems.

---

# 31. Understanding Pure Components

This app intentionally contains:

* no state
* no hooks
* no effects

Why?

Because React Learn emphasizes:

> Components should remain pure whenever possible.

This app is static UI only.

Therefore:

* state is unnecessary
* effects are unnecessary

This is excellent React architecture discipline.

---

# 32. Why No `useEffect` Yet?

A common beginner mistake is using:

```tsx
useEffect()
```

for everything.

React Learn explains:

> Effects synchronize with external systems.

This app has:

* no API
* no timers
* no browser synchronization

Therefore:

* no effect is needed

---

# 33. Understanding Enterprise UI Design

This app introduces:

* information hierarchy
* spacing systems
* metadata organization
* list composition
* visual status indicators

These are extremely important in:

* Outlook
* Microsoft 365
* SharePoint
* admin portals
* dashboards

---

# 34. Understanding React’s Mental Model

React is NOT:

* manually manipulating HTML
* imperative UI programming
* jQuery-style DOM updates

React IS:

* declarative rendering
* component composition
* UI derived from data

This app reinforces that mental model.

---

# 35. Running the Application

Development server:

```powershell
npm run dev
```

Vite starts:

* local server
* TypeScript compilation
* JSX transformation
* Hot Module Replacement

Usually at:

```txt
http://localhost:5173
```

---

# 36. Validating Production Build

```powershell
npm run build
```

This validates:

* TypeScript compilation
* production bundling
* optimized output

This is equivalent to validating if the app is production-ready.

---

# 37. Previewing Production Build

```powershell
npm run preview
```

This serves the production bundle locally.

---

# 38. Why This App Is Important

Even though visually simple, this app introduces:

* data-driven UI
* enterprise layout
* reusable components
* rendering collections
* conditional rendering
* Fluent UI composition
* TypeScript contracts
* Outlook-style architecture

These concepts become the foundation for:

* dynamic inboxes
* dashboards
* ticket systems
* CRM platforms
* SharePoint-like portals

---

# Technical Summary

| Concept               | Purpose                 |
| --------------------- | ----------------------- |
| React                 | Declarative UI          |
| TypeScript            | Strong typing           |
| Vite                  | Fast tooling            |
| Fluent UI             | Microsoft design system |
| JSX                   | Declarative syntax      |
| Props                 | Component inputs        |
| `map()`               | List rendering          |
| `key`                 | Stable React identity   |
| Avatar                | User visualization      |
| Badge                 | Metadata/status         |
| Conditional rendering | Dynamic UI              |
| CSS Grid              | Inbox row layout        |
| Pure components       | Predictable rendering   |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

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
| Block 1 |  10 | Email List                | Current article completed |
| Block 1 |  11 | Grid of Cards             | Next                      |
