# App 35 — BMI Calculator (Body Mass Index)

App 35 belongs to **Block 2 — Interactivity and State**.
According to the roadmap, App 35 is:

| App | Name           | Main Concept                                           |
| --- | -------------- | ------------------------------------------------------ |
| 35  | BMI Calculator | `useState`, derived state, forms, numeric calculations |

This app is important because it introduces a very important React mental model:

```txt
Derived state should be calculated, not stored.
```

In this application, the BMI value is derived from:

* weight
* height

So instead of storing BMI separately in state, React calculates it during rendering.

This follows the official React guidance from:

* [React Learn — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [React Learn — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# What This App Will Teach

This app introduces:

* controlled inputs
* numeric state
* derived calculations
* conditional rendering
* TypeScript numeric handling
* form interaction
* reusable UI composition
* enterprise Fluent UI form design

---

# Final Application Features

The BMI Calculator will contain:

* Weight input
* Height input
* Automatic BMI calculation
* BMI classification
* Dynamic visual feedback
* Fluent UI enterprise layout
* Responsive card interface

---

# React Concept Introduced

The central concept of this app is:

```txt
UI = function(state)
```

The user changes:

* weight
* height

React re-renders automatically.

The BMI is recalculated every render.

No manual DOM manipulation exists.

No imperative updates exist.

No `document.getElementById()` exists.

---

# Important Formula

BMI is calculated with:

BMI = \frac{weight}{height^2}

Where:

* weight = kilograms
* height = meters

Example:

BMI = \frac{80}{1.75^2}

---

# Step 1 — Create the Project

## PowerShell Commands

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app35-bmi-calculator -- --template react-ts

cd app35-bmi-calculator

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Step 2 — Create the Project Structure

## PowerShell

```powershell
mkdir src\components
mkdir src\models
mkdir src\styles
mkdir src\utils
```

Create files:

```powershell
New-Item src\components\BmiCalculatorCard.tsx -ItemType File
New-Item src\utils\bmiUtils.ts -ItemType File
New-Item src\models\BmiClassification.ts -ItemType File
```

---

# Step 3 — Create the BMI Classification Model

## `src/models/BmiClassification.ts`

```ts
export interface BmiClassification {
  label: string;
  color: string;
}
```

---

# Step 4 — Create BMI Utility Functions

## `src/utils/bmiUtils.ts`

```ts
import type { BmiClassification } from "../models/BmiClassification";

export function calculateBmi(
  weight: number,
  height: number
): number {
  if (weight <= 0 || height <= 0) {
    return 0;
  }

  return weight / (height * height);
}

export function getBmiClassification(
  bmi: number
): BmiClassification {
  if (bmi === 0) {
    return {
      label: "Invalid values",
      color: "gray",
    };
  }

  if (bmi < 18.5) {
    return {
      label: "Underweight",
      color: "#2563eb",
    };
  }

  if (bmi < 25) {
    return {
      label: "Normal",
      color: "#16a34a",
    };
  }

  if (bmi < 30) {
    return {
      label: "Overweight",
      color: "#ca8a04",
    };
  }

  return {
    label: "Obesity",
    color: "#dc2626",
  };
}
```

---

# Why Utility Functions Matter

This is an important architectural step.

Instead of putting all logic inside the component:

```txt
Component = UI responsibility
Utility = calculation responsibility
```

This separation improves:

* readability
* scalability
* testing
* maintainability

This follows React architecture best practices.

---

# Step 5 — Create the Main BMI Component

## `src/components/BmiCalculatorCard.tsx`

```tsx
import { useState } from "react";

import {
  Body1,
  Card,
  Field,
  Input,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  calculateBmi,
  getBmiClassification,
} from "../utils/bmiUtils";

export function BmiCalculatorCard() {
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("1.75");

  const weightValue = Number(weight);
  const heightValue = Number(height);

  const bmi = calculateBmi(
    weightValue,
    heightValue
  );

  const classification =
    getBmiClassification(bmi);

  return (
    <Card
      style={{
        width: "420px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Title2>BMI Calculator</Title2>

      <Body1>
        Calculate Body Mass Index using
        React state and derived calculations.
      </Body1>

      <Field label="Weight (kg)">
        <Input
          value={weight}
          onChange={(_, data) =>
            setWeight(data.value)
          }
        />
      </Field>

      <Field label="Height (m)">
        <Input
          value={height}
          onChange={(_, data) =>
            setHeight(data.value)
          }
        />
      </Field>

      <div
        style={{
          marginTop: "12px",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text
          size={500}
          weight="semibold"
        >
          BMI: {bmi.toFixed(2)}
        </Text>

        <div style={{ marginTop: "12px" }}>
          <Text
            style={{
              color: classification.color,
              fontWeight: 700,
            }}
          >
            {classification.label}
          </Text>
        </div>
      </div>
    </Card>
  );
}
```

---

# Understanding `useState`

The most important part:

```tsx
const [weight, setWeight] = useState("80");
```

This creates:

| Element     | Purpose       |
| ----------- | ------------- |
| `weight`    | current value |
| `setWeight` | updates value |
| `"80"`      | initial state |

This is React state.

React remembers this value between renders.

---

# Why Inputs Use Strings

HTML inputs always return strings.

Even when typing numbers:

```txt
"80"
"1.75"
```

The browser still returns text.

That is why we convert:

```tsx
Number(weight)
```

and:

```tsx
Number(height)
```

before calculations.

---

# Derived State Concept

Notice this:

```tsx
const bmi = calculateBmi(...)
```

BMI is NOT stored in state.

This is extremely important.

Wrong approach:

```tsx
const [bmi, setBmi] = useState(0)
```

Correct approach:

```tsx
const bmi = calculateBmi(...)
```

Because BMI can always be derived from:

* weight
* height

React Learn strongly recommends avoiding duplicated state.

---

# Why No `useEffect`

There is intentionally NO:

```tsx
useEffect(...)
```

Why?

Because no external synchronization exists.

We are simply calculating values during rendering.

This follows:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

This app is extremely important because many beginners misuse `useEffect` for calculations.

---

# Step 6 — Create `App.tsx`

## `src/App.tsx`

```tsx
import { BmiCalculatorCard } from "./components/BmiCalculatorCard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3f2f1",
        padding: "24px",
      }}
    >
      <BmiCalculatorCard />
    </main>
  );
}

export default App;
```

---

# Step 7 — Configure `main.tsx`

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

# Step 8 — Global CSS

## `src/index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}
```

---

# Step 9 — Run the Application

## Start Development Server

```powershell
npm run dev
```

---

# Step 10 — Validate Production Build

```powershell
npm run build
```

This validates:

* TypeScript
* imports
* JSX
* production bundling

---

# Step 11 — Preview Production Build

```powershell
npm run preview
```

---

# Architecture Flow

```txt
main.tsx
  ↓
App.tsx
  ↓
BmiCalculatorCard.tsx
  ↓
bmiUtils.ts
```

---

# Technical Concepts Learned

| Concept               | Purpose                    |
| --------------------- | -------------------------- |
| `useState`            | Component memory           |
| Controlled inputs     | React controls form values |
| Derived state         | Calculated values          |
| Utility functions     | Separate business logic    |
| TypeScript            | Type safety                |
| Fluent UI             | Enterprise components      |
| `Input`               | Controlled field           |
| `Field`               | Accessible form wrapper    |
| `Card`                | Enterprise container       |
| Conditional rendering | Dynamic classification     |
| Numeric conversion    | `Number()`                 |
| JSX                   | Declarative UI             |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Input](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/input)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline Events           | Completed |
| Block 1 |  09 | Employee Table            | Completed |
| Block 1 |  10 | Email List                | Completed |
| Block 1 |  11 | Grid of Cards             | Completed |
| Block 1 |  12 | Image Gallery             | Completed |
| Block 1 |  13 | Movie Catalog             | Completed |
| Block 1 |  14 | Football Teams            | Completed |
| Block 1 |  15 | News Page                 | Completed |
| Block 1 |  16 | Financial Dashboard       | Completed |
| Block 1 |  17 | SharePoint Layout         | Completed |
| Block 1 |  18 | File Explorer             | Completed |
| Block 1 |  19 | Corporate Portal          | Completed |
| Block 1 |  20 | Microsoft Landing Page    | Completed |
| Block 2 |  21 | Modern Counter            | Completed |
| Block 2 |  22 | Toggle Theme              | Completed |
| Block 2 |  23 | React Calculator          | Completed |
| Block 2 |  24 | Login Form                | Completed |
| Block 2 |  25 | User Registration         | Completed |
| Block 2 |  26 | ToDo List                 | Completed |
| Block 2 |  27 | Shopping List             | Completed |
| Block 2 |  28 | Product Filter            | Completed |
| Block 2 |  29 | Employee Search           | Completed |
| Block 2 |  30 | Shopping Cart             | Completed |
| Block 2 |  31 | Grade Simulator           | Completed |
| Block 2 |  32 | Inventory Control         | Completed |
| Block 2 |  33 | Contact Agenda            | Completed |
| Block 2 |  34 | Currency Converter        | Completed |
| Block 2 |  35 | BMI Calculator            | Current   |
| Block 2 |  36 | Installment Simulator     | Next      |
