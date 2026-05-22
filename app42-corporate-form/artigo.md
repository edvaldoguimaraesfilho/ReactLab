# Technical Blog Article — App 42: Corporate Form with React, Fluent UI, TypeScript, and Vite

## Introduction

In modern enterprise applications, forms are everywhere.

Before users interact with dashboards, reports, workflows, APIs, or administrative systems, they usually begin by filling out a form. Because of this, forms are one of the most important architectural concepts in React.

Examples of enterprise forms include:

* employee registration
* onboarding systems
* SharePoint metadata forms
* ERP workflows
* CRM customer forms
* corporate approval systems
* IT service portals
* Microsoft 365 administration interfaces

App 42 — Corporate Form represents an important transition inside the ReactLab roadmap. Earlier applications focused heavily on:

* JSX
* rendering
* component composition
* lists
* state
* controlled inputs
* conditional rendering

Now the architecture evolves into professional enterprise UI composition using Fluent UI and Microsoft-style patterns. 

This application introduces:

* enterprise form architecture
* Fluent UI form systems
* controlled React forms
* immutable state updates
* dropdown controls
* checkbox state management
* derived validation
* enterprise layout composition
* Microsoft-style visual hierarchy

The application intentionally avoids:

* APIs
* databases
* authentication
* backend persistence
* `useEffect`

because the objective is mastering React’s rendering and state model before synchronizing with external systems.

The application follows the official React philosophy:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Fluent UI Documentation](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# Creating the Project

The project starts using Vite with the React TypeScript template.

```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app42-corporate-form -- --template react-ts

cd app42-corporate-form

npm install
```

Install Fluent UI:

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

---

# Creating the Folder Structure

Professional React applications should separate responsibilities from the beginning.

Create the folders:

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create the files:

```powershell
New-Item src\models\EmployeeFormData.ts -ItemType File
New-Item src\components\CorporateForm.tsx -ItemType File
New-Item artigo.md -ItemType File
```

Final structure:

```txt
src/
  components/
    CorporateForm.tsx

  models/
    EmployeeFormData.ts

  data/

  styles/

  App.tsx
  main.tsx
  index.css
```

This architecture becomes extremely important later in enterprise applications.

---

# Understanding the Goal of the App

This app simulates an employee registration form.

The interface allows the user to:

* enter a name
* enter a corporate email
* select a department
* define a role
* enable or disable employee status

Visually, the app looks simple.

Architecturally, however, it introduces some of the most important React concepts:

* controlled components
* state-driven rendering
* derived validation
* immutable updates
* enterprise composition

This app reinforces the most important React principle:

```txt
UI = function(state)
```

The interface derives entirely from state.

---

# Creating the Model Layer

## `src/models/EmployeeFormData.ts`

```ts
export interface EmployeeFormData {
  fullName: string;
  email: string;
  department: string;
  role: string;
  active: boolean;
}
```

This interface defines the structure of the form state.

This is extremely important in enterprise React architecture because state should always have predictable structure.

Without TypeScript interfaces:

* state becomes unpredictable
* refactoring becomes dangerous
* architecture becomes fragile

With interfaces:

* autocomplete improves
* type safety increases
* errors appear earlier
* code becomes self-documented

The interface guarantees:

* `fullName` is a string
* `email` is a string
* `department` is a string
* `role` is a string
* `active` is a boolean

Official documentation:

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Building the Corporate Form

## `src/components/CorporateForm.tsx`

```tsx
import { useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Field,
  Input,
  Option,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { EmployeeFormData } from "../models/EmployeeFormData";

const initialFormData: EmployeeFormData = {
  fullName: "",
  email: "",
  department: "",
  role: "",
  active: true,
};

export function CorporateForm() {
  const [formData, setFormData] =
    useState<EmployeeFormData>(initialFormData);

  const isNameValid =
    formData.fullName.trim().length >= 3;

  const isEmailValid =
    formData.email.includes("@");

  const isDepartmentValid =
    formData.department.length > 0;

  const isRoleValid =
    formData.role.trim().length >= 2;

  const isFormValid =
    isNameValid &&
    isEmailValid &&
    isDepartmentValid &&
    isRoleValid;

  function handleSubmit() {
    alert("Employee successfully registered.");
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "640px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div>
        <Title2>
          Corporate Employee Form
        </Title2>

        <Text>
          Enterprise registration form built with React and Fluent UI.
        </Text>
      </div>

      <Field label="Full Name">
        <Input
          value={formData.fullName}
          placeholder="Enter employee name"
          onChange={(_, data) =>
            setFormData({
              ...formData,
              fullName: data.value,
            })
          }
        />
      </Field>

      <Field label="Corporate Email">
        <Input
          value={formData.email}
          placeholder="Enter corporate email"
          onChange={(_, data) =>
            setFormData({
              ...formData,
              email: data.value,
            })
          }
        />
      </Field>

      <Field label="Department">
        <Dropdown
          placeholder="Select department"
          value={formData.department}
          onOptionSelect={(_, data) =>
            setFormData({
              ...formData,
              department: data.optionValue ?? "",
            })
          }
        >
          <Option value="IT">IT</Option>
          <Option value="HR">HR</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Operations">Operations</Option>
        </Dropdown>
      </Field>

      <Field label="Role">
        <Input
          value={formData.role}
          placeholder="Enter role"
          onChange={(_, data) =>
            setFormData({
              ...formData,
              role: data.value,
            })
          }
        />
      </Field>

      <Checkbox
        checked={formData.active}
        label="Employee is active"
        onChange={(_, data) =>
          setFormData({
            ...formData,
            active: !!data.checked,
          })
        }
      />

      <Button
        appearance="primary"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Register Employee
      </Button>

      {!isFormValid && (
        <Text>
          Please complete all required fields.
        </Text>
      )}
    </Card>
  );
}
```

---

# Understanding `useState`

One of the most important lines in React appears here:

```tsx
const [formData, setFormData] =
  useState<EmployeeFormData>(initialFormData);
```

Breaking it apart:

| Part                 | Meaning                         |
| -------------------- | ------------------------------- |
| `formData`           | Current state value             |
| `setFormData`        | Function that updates state     |
| `useState()`         | React Hook for component memory |
| `<EmployeeFormData>` | TypeScript typing               |
| `initialFormData`    | Initial state object            |

React components render repeatedly.

Normal variables disappear after rendering.

State survives between renders.

This is why React calls state:

> “A Component’s Memory.”

Official documentation:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

---

# Controlled Components

The form uses controlled inputs.

Example:

```tsx
<Input
  value={formData.fullName}
  onChange={(_, data) =>
    setFormData({
      ...formData,
      fullName: data.value,
    })
  }
/>
```

This means React controls the input value.

The browser is no longer the source of truth.

Instead:

* React stores the value
* React updates the value
* React re-renders the interface

Rendering cycle:

```txt
User types
→ onChange fires
→ state updates
→ React re-renders
→ UI updates automatically
```

This is one of the foundations of React architecture.

Official documentation:

* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

---

# Immutable State Updates

One of the most important React patterns appears here:

```tsx
setFormData({
  ...formData,
  fullName: data.value,
})
```

The spread operator:

```tsx
...formData
```

copies the existing object.

Then:

```tsx
fullName: data.value
```

replaces only one property.

Without the spread operator:

```tsx
setFormData({
  fullName: data.value
})
```

all the other properties would disappear.

React strongly encourages immutable updates because:

* rendering becomes predictable
* debugging becomes easier
* state tracking becomes cleaner

---

# Derived Validation

Another important concept:

```tsx
const isFormValid =
  isNameValid &&
  isEmailValid &&
  isDepartmentValid &&
  isRoleValid;
```

Notice:

```txt
isFormValid is NOT state.
```

It is calculated from state.

This is:

```txt
Derived State
```

React officially recommends avoiding redundant state whenever possible.

Bad:

```tsx
const [isFormValid, setIsFormValid]
```

Good:

```tsx
const isFormValid = ...
```

Why?

* fewer bugs
* less synchronization logic
* cleaner rendering
* simpler architecture

Official docs:

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# Understanding Fluent UI

Fluent UI provides the Microsoft enterprise design system.

This app uses:

* Card
* Field
* Input
* Dropdown
* Checkbox
* Button
* Typography components

Benefits:

* accessibility
* keyboard navigation
* Microsoft visual identity
* enterprise spacing
* reusable UI systems
* responsive behavior

Official docs:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# Understanding the Dropdown

The app introduces a professional enterprise control:

```tsx
<Dropdown>
```

Dropdowns are extremely common in:

* SharePoint forms
* ERP systems
* admin portals
* CRM workflows

The selection updates state through:

```tsx
onOptionSelect
```

This reinforces React’s event-driven rendering model.

Official docs:

* [Fluent UI Dropdown](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dropdown)

---

# Understanding Conditional Rendering

This section:

```tsx
{!isFormValid && (
  <Text>
    Please complete all required fields.
  </Text>
)}
```

demonstrates conditional rendering.

React renders UI dynamically according to state-derived logic.

Official docs:

* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

---

# Understanding `App.tsx`

## `src/App.tsx`

```tsx
import { CorporateForm } from "./components/CorporateForm";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "32px",
      }}
    >
      <CorporateForm />
    </main>
  );
}

export default App;
```

This creates:

* centered layout
* enterprise spacing
* Microsoft-style visual composition

The form becomes the main focus of the application.

---

# Understanding `main.tsx`

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

This file:

* connects React to the browser
* activates Fluent UI theming
* enables Microsoft design tokens
* initializes the rendering engine

Without:

```tsx
<FluentProvider>
```

Fluent UI components lose their Microsoft design system.

---

# Global CSS

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

This:

* removes browser default spacing
* establishes enterprise typography
* improves layout consistency

---

# Why There Is No `useEffect`

This application intentionally avoids effects.

There is:

* no API
* no timers
* no backend synchronization

According to React philosophy:

> Effects synchronize with external systems.

Since this app only uses internal rendering logic:

* state is enough
* effects are unnecessary

Official docs:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# Running the Application

Development:

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

# Technical Summary

| Concept               | Explanation                      |
| --------------------- | -------------------------------- |
| `useState`            | Component memory                 |
| Controlled Inputs     | React controls form fields       |
| Immutable Updates     | Safe object replacement          |
| Derived Validation    | Validation calculated from state |
| Dropdown              | Enterprise selection control     |
| Checkbox              | Boolean state rendering          |
| Conditional Rendering | UI rendered from state           |
| Fluent UI Card        | Enterprise container             |
| Flexbox               | Layout system                    |
| TypeScript Interface  | Strongly typed form structure    |
| FluentProvider        | Global Microsoft theming         |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Input](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/input)
* [Fluent UI Dropdown](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dropdown)
* [Fluent UI Checkbox](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/checkbox)
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
| Block 3 |  42 | Corporate Form               | Current   |
| Block 3 |  43 | Tabs Navigation System       | Next      |

Project roadmap and architecture references are defined in the uploaded ReactLab files. 
