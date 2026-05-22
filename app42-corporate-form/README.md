# Technical Blog Article — App 42: Corporate Form with React, Fluent UI, TypeScript, and Vite

```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app42-corporate-form -- --template react-ts

cd app42-corporate-form

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create the project structure:

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles

New-Item src\models\EmployeeFormData.ts -ItemType File
New-Item src\components\CorporateForm.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# Introduction

In App 42 — Corporate Form, we continue Block 3 of the ReactLab roadmap, focused on professional Fluent UI applications and enterprise UI architecture. After App 41 introduced Microsoft-style authentication interfaces, this application expands the form architecture into a more realistic enterprise scenario.

This app simulates a corporate employee registration form built with:

* React
* TypeScript
* Vite
* Fluent UI

The goal is not backend persistence yet. The objective is learning:

* enterprise form composition
* controlled inputs
* derived validation
* reusable form architecture
* Fluent UI form controls
* React rendering flow
* state-driven UI

This app follows the React mental model defined in:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

The roadmap defines App 42 as “Corporate Form / Fluent Form Controls / Enterprise UI Composition.” 

---

# Why Enterprise Forms Matter

Enterprise systems are heavily form-driven.

Examples:

* employee registration
* project creation
* SharePoint metadata forms
* CRM customer forms
* ERP workflows
* approval systems
* ticket systems
* audit forms

React forms are important because they introduce:

* complex state
* validation
* conditional rendering
* controlled components
* derived UI
* scalable architecture

This app intentionally remains frontend-only because mastering React rendering behavior is more important before introducing APIs.

---

# Project Structure

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

This separation is critical because React applications scale through architecture organization.

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

This is one of the biggest advantages of TypeScript in React:

* predictable state
* safer refactoring
* autocomplete
* compile-time validation

Without interfaces, large enterprise forms become difficult to maintain.

---

# Building the Corporate Form Component

## `src/components/CorporateForm.tsx`

```tsx
import { useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Field,
  Input,
  Text,
  Title2,
  Dropdown,
  Option,
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
        maxWidth: "600px",
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
          Enterprise registration form using Fluent UI.
        </Text>
      </div>

      <Field label="Full Name">
        <Input
          value={formData.fullName}
          onChange={(_, data) =>
            setFormData({
              ...formData,
              fullName: data.value,
            })
          }
          placeholder="Enter employee name"
        />
      </Field>

      <Field label="Corporate Email">
        <Input
          value={formData.email}
          onChange={(_, data) =>
            setFormData({
              ...formData,
              email: data.value,
            })
          }
          placeholder="Enter corporate email"
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
          onChange={(_, data) =>
            setFormData({
              ...formData,
              role: data.value,
            })
          }
          placeholder="Enter role"
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

# Understanding the React State Architecture

One of the most important constructions is:

```tsx
const [formData, setFormData] =
  useState<EmployeeFormData>(initialFormData);
```

This creates the form memory.

React forms work through:

```txt
User Input
→ State Update
→ React Re-render
→ Updated UI
```

The form does not store values directly inside the HTML input.

React state becomes the source of truth.

Official documentation:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

---

# Controlled Inputs

Every field uses:

* `value`
* `onChange`

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

This creates a controlled component.

React fully controls:

* the value
* the updates
* the rendering cycle

This architecture is fundamental in enterprise React systems.

---

# Why Immutable Updates Matter

This pattern:

```tsx
setFormData({
  ...formData,
  fullName: data.value,
})
```

is immutable updating.

The spread operator:

```tsx
...formData
```

copies existing properties.

Then React replaces only:

```tsx
fullName
```

Without immutable updates:

* state synchronization becomes dangerous
* rendering bugs become common
* debugging becomes difficult

---

# Derived Validation

Notice this:

```tsx
const isFormValid =
  isNameValid &&
  isEmailValid &&
  isDepartmentValid &&
  isRoleValid;
```

This value is NOT state.

It is calculated from state.

This is:

```txt
Derived State
```

Official React guidance strongly recommends avoiding redundant state.

Bad:

```tsx
const [isFormValid, setIsFormValid]
```

Good:

```tsx
const isFormValid = ...
```

Official documentation:

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# Why Fluent UI Matters

Fluent UI transforms the app into a Microsoft-style enterprise experience.

Components used:

* Card
* Field
* Input
* Dropdown
* Checkbox
* Button
* Typography

Benefits:

* accessibility
* spacing consistency
* keyboard navigation
* Microsoft visual standards
* responsive behavior
* reusable enterprise UI

Official docs:

* [Fluent UI Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# Understanding the Dropdown Component

This app introduces a more advanced enterprise control:

```tsx
<Dropdown>
```

Dropdowns are extremely common in:

* SharePoint forms
* admin systems
* CRM workflows
* ERP applications

The selection updates state through:

```tsx
onOptionSelect
```

This reinforces React’s event-driven architecture.

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

React renders UI conditionally based on state-derived logic.

Official docs:

* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

---

# App Layout

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
        boxSizing: "border-box",
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
* Microsoft-style composition

---

# React Entry Point

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

This activates:

* React rendering
* Fluent UI theming
* Microsoft design system
* StrictMode validation

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

This removes browser default spacing and establishes enterprise typography.

---

# Why There Is No `useEffect`

This app intentionally avoids effects.

There is:

* no API
* no timers
* no external synchronization

According to React philosophy:

> Effects synchronize with external systems.

This application only uses internal rendering logic.

Therefore:

* effects are unnecessary
* state alone is sufficient

Official docs:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# Running the Application

Development mode:

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

# React Mental Model Reinforced

This application reinforces:

```txt
UI = function(state)
```

The interface derives from:

* form state
* validation rules
* derived calculations
* conditional rendering

React handles:

* rendering
* synchronization
* DOM updates

---

# Technical Summary

| Concept               | Explanation                      |
| --------------------- | -------------------------------- |
| `useState`            | Component memory                 |
| Controlled Components | React controls inputs            |
| Derived Validation    | Validation calculated from state |
| Immutable Updates     | Safe object replacement          |
| Fluent UI Dropdown    | Enterprise selection control     |
| Fluent UI Checkbox    | Boolean state control            |
| Conditional Rendering | UI shown based on state          |
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
