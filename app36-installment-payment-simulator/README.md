# App 36 — Installment Payment Simulator

App 36 belongs to **Block 2 — Interactivity and State** and introduces one of the most important concepts in React:

* derived state
* numeric calculations
* controlled inputs
* financial simulation
* real-time UI updates
* form state management

According to the roadmap, App 36 is:

> “Simulador de Parcelamento / Installment Payment Simulator” 

This application is extremely important because it simulates a very common enterprise/business scenario:

* financing systems
* e-commerce installments
* banking simulations
* ERP systems
* payment calculations
* credit simulations

The goal is to understand how React recalculates the UI automatically whenever state changes.

---

# React Learn Concepts

This app strongly reinforces:

* [React Learn — State as a Component Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [React Learn — Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [React Learn — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [React Learn — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

This app is especially important for understanding:

```txt
Derived values should NOT become state.
```

The installment result is calculated from existing state.

So:

* amount → state
* installments → state
* interest rate → state

BUT:

* monthly payment → derived calculation
* total payment → derived calculation

This is one of the most important React mental models.

---

# Project Creation

## Create the project

```powershell
mkdir bloco02
cd bloco02

npm create vite@latest app36-installment-payment-simulator -- --template react-ts

cd app36-installment-payment-simulator
```

---

# Install dependencies

```powershell
npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create folders

```powershell
mkdir src\components
mkdir src\models
mkdir src\styles
```

---

# Create files

```powershell
New-Item artigo.md -ItemType File

New-Item src\models\InstallmentSimulation.ts -ItemType File

New-Item src\components\SimulationForm.tsx -ItemType File

New-Item src\components\SimulationResult.tsx -ItemType File
```

---

# Final Structure

```txt
src/
  components/
    SimulationForm.tsx
    SimulationResult.tsx

  models/
    InstallmentSimulation.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

---

# File — `src/models/InstallmentSimulation.ts`

```ts
export interface InstallmentSimulation {
  amount: number;
  installments: number;
  interestRate: number;
}
```

---

# File — `src/components/SimulationResult.tsx`

```tsx
import {
  Body1,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

interface SimulationResultProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function SimulationResult({
  monthlyPayment,
  totalPayment,
  totalInterest,
}: SimulationResultProps) {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <Title2>Simulation Result</Title2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <div>
          <Text weight="semibold">
            Monthly Payment
          </Text>

          <Body1>
            $
            {monthlyPayment.toFixed(2)}
          </Body1>
        </div>

        <div>
          <Text weight="semibold">
            Total Payment
          </Text>

          <Body1>
            $
            {totalPayment.toFixed(2)}
          </Body1>
        </div>

        <div>
          <Text weight="semibold">
            Total Interest
          </Text>

          <Body1>
            $
            {totalInterest.toFixed(2)}
          </Body1>
        </div>
      </div>
    </Card>
  );
}
```

---

# File — `src/components/SimulationForm.tsx`

```tsx
import {
  Field,
  Input,
  Card,
  Title1,
} from "@fluentui/react-components";

import type { InstallmentSimulation } from "../models/InstallmentSimulation";

interface SimulationFormProps {
  simulation: InstallmentSimulation;

  onSimulationChange: (
    simulation: InstallmentSimulation
  ) => void;
}

export function SimulationForm({
  simulation,
  onSimulationChange,
}: SimulationFormProps) {
  function updateField(
    field: keyof InstallmentSimulation,
    value: number
  ) {
    onSimulationChange({
      ...simulation,
      [field]: value,
    });
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title1>
        Installment Payment Simulator
      </Title1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        <Field label="Loan Amount">
          <Input
            type="number"
            value={simulation.amount.toString()}
            onChange={(_, data) =>
              updateField(
                "amount",
                Number(data.value)
              )
            }
          />
        </Field>

        <Field label="Installments">
          <Input
            type="number"
            value={simulation.installments.toString()}
            onChange={(_, data) =>
              updateField(
                "installments",
                Number(data.value)
              )
            }
          />
        </Field>

        <Field label="Interest Rate (%)">
          <Input
            type="number"
            value={simulation.interestRate.toString()}
            onChange={(_, data) =>
              updateField(
                "interestRate",
                Number(data.value)
              )
            }
          />
        </Field>
      </div>
    </Card>
  );
}
```

---

# File — `src/App.tsx`

```tsx
import { useState } from "react";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { SimulationForm } from "./components/SimulationForm";
import { SimulationResult } from "./components/SimulationResult";

import type { InstallmentSimulation } from "./models/InstallmentSimulation";

function App() {
  const [simulation, setSimulation] =
    useState<InstallmentSimulation>({
      amount: 1000,
      installments: 12,
      interestRate: 2,
    });

  const monthlyInterest =
    simulation.interestRate / 100;

  const totalPayment =
    simulation.amount *
    Math.pow(
      1 + monthlyInterest,
      simulation.installments
    );

  const monthlyPayment =
    totalPayment /
    simulation.installments;

  const totalInterest =
    totalPayment - simulation.amount;

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
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <SimulationForm
            simulation={simulation}
            onSimulationChange={setSimulation}
          />

          <SimulationResult
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
          />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# File — `src/main.tsx`

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

# File — `src/index.css`

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

# Understanding the Financial Formula

This app introduces compound interest calculations.

The formula used is:

genui{"math_block_widget_always_prefetch_v2":{"content":"M = P(1+i)^n"}}

Where:

| Variable | Meaning                |
| -------- | ---------------------- |
| `M`      | Total payment          |
| `P`      | Principal amount       |
| `i`      | Interest rate          |
| `n`      | Number of installments |

React recalculates this formula automatically whenever state changes.

This is a perfect example of declarative UI.

---

# Why This App Is Important

This app teaches:

* controlled form inputs
* numeric state handling
* derived calculations
* reusable components
* prop drilling
* financial calculations
* real-time rendering
* React rendering cycle

Most importantly:

```txt
State changes
  →
React re-renders
  →
Derived values recalculate
  →
UI updates automatically
```

This is the core React mental model.

---

# Important React Mental Model

Notice we DO NOT store:

```tsx
monthlyPayment
totalPayment
totalInterest
```

inside state.

This would be incorrect architecture.

Instead:

```txt
State = source of truth
Derived values = calculated during render
```

This follows:

* [React Learn — You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)
* [React Learn — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# Technical Summary

| Concept               | Purpose                                   |
| --------------------- | ----------------------------------------- |
| `useState`            | Store simulation form data                |
| Controlled Inputs     | React controls form values                |
| Derived State         | Financial values calculated during render |
| `Math.pow()`          | Compound interest calculation             |
| Fluent UI `Card`      | Enterprise layout                         |
| Fluent UI `Field`     | Form grouping                             |
| Fluent UI `Input`     | Numeric inputs                            |
| Component Composition | App → Form → Result                       |
| Props                 | Pass data between components              |
| TypeScript Interface  | Strong typing                             |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State as a Component Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                          | Status    |
| ------- | --: | ----------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent            | Completed |
| Block 1 |  02 | Profile Card                  | Completed |
| Block 1 |  03 | Product List                  | Completed |
| Block 1 |  04 | Microsoft Style User Card     | Completed |
| Block 1 |  05 | Static Dashboard              | Completed |
| Block 1 |  06 | Corporate Sidebar Menu        | Completed |
| Block 1 |  07 | Visual Task List              | Completed |
| Block 2 |  21 | Modern Counter                | Completed |
| Block 2 |  22 | Toggle Theme                  | Completed |
| Block 2 |  23 | React Calculator              | Completed |
| Block 2 |  24 | Login Form                    | Completed |
| Block 2 |  25 | User Registration             | Completed |
| Block 2 |  26 | ToDo List                     | Completed |
| Block 2 |  27 | Shopping List                 | Completed |
| Block 2 |  28 | Product Filter                | Completed |
| Block 2 |  29 | Employee Search               | Completed |
| Block 2 |  30 | Shopping Cart                 | Completed |
| Block 2 |  31 | Grade Simulator               | Completed |
| Block 2 |  32 | Inventory Control             | Completed |
| Block 2 |  33 | Contact Agenda                | Completed |
| Block 2 |  34 | Currency Converter            | Completed |
| Block 2 |  35 | BMI Calculator                | Completed |
| Block 2 |  36 | Installment Payment Simulator | Current   |
