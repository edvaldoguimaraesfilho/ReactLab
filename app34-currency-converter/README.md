# App 34 — Currency Converter

App 34 belongs to **Block 2 — Interactivity and State** and focuses on building a **Currency Converter** using React, TypeScript, Vite, and Fluent UI. This app introduces an extremely important React concept:

* multiple related states
* derived values
* controlled inputs
* event-driven rendering
* data transformation
* numeric calculations
* UI synchronization

According to the roadmap, App 34 is:

| App | Name               | Focus                                     |
| --- | ------------------ | ----------------------------------------- |
| 34  | Currency Converter | Forms, state, calculations, derived state |

The roadmap for the 100 apps project defines this app inside the “Managing State” phase of React learning. 

The most important React concept here is:

> The interface updates automatically when state changes.

This app is very important because it reinforces the modern React mental model:

```txt
State changes
    ↓
React re-renders
    ↓
Derived calculations update
    ↓
UI updates automatically
```

No manual DOM manipulation is necessary.

---

# What We Will Build

The application will contain:

* amount input
* source currency dropdown
* target currency dropdown
* exchange rates
* automatic conversion result
* Fluent UI enterprise layout
* reusable components
* TypeScript models

This is still a frontend-only app.

We will NOT use APIs yet because API consumption belongs mainly to Block 4 (Effects and Architecture). 

So the exchange rates will be static mock data.

---

# React Concepts Introduced

This app teaches:

| Concept               | Purpose                               |
| --------------------- | ------------------------------------- |
| `useState`            | Store UI state                        |
| Controlled Inputs     | React controls form fields            |
| Derived State         | Calculated conversion result          |
| Event Handling        | React updates state from user actions |
| TypeScript Types      | Strong typing                         |
| Component Composition | Reusable UI pieces                    |
| Fluent UI Inputs      | Enterprise UI                         |
| Dropdowns             | Selection controls                    |
| Numeric calculations  | Derived rendering                     |

---

# Project Creation

## Create the project

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app34-currency-converter -- --template react-ts

cd app34-currency-converter
```

---

# Install dependencies

```powershell
npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create project structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

---

# Create files

```powershell
New-Item src\models\CurrencyRate.ts -ItemType File

New-Item src\data\currencyRates.ts -ItemType File

New-Item src\components\CurrencyConverterCard.tsx -ItemType File
```

---

# Folder Structure

```txt
src/
  components/
    CurrencyConverterCard.tsx

  data/
    currencyRates.ts

  models/
    CurrencyRate.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

---

# Step 1 — Create the TypeScript Model

## `src/models/CurrencyRate.ts`

```ts
export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
}
```

---

# Why This Interface Matters

This interface defines the structure of a currency object.

Every currency must contain:

```txt
code
name
rate
```

TypeScript now guarantees consistency.

Example:

```ts
{
  code: "USD",
  name: "US Dollar",
  rate: 1
}
```

This prevents accidental mistakes.

For example:

```ts
rate: "abc"
```

would generate a TypeScript error.

---

# Step 2 — Create Static Currency Data

## `src/data/currencyRates.ts`

```ts
import type { CurrencyRate } from "../models/CurrencyRate";

export const currencyRates: CurrencyRate[] = [
  {
    code: "USD",
    name: "US Dollar",
    rate: 1,
  },
  {
    code: "EUR",
    name: "Euro",
    rate: 0.93,
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    rate: 5.42,
  },
  {
    code: "GBP",
    name: "British Pound",
    rate: 0.79,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    rate: 156.4,
  },
];
```

---

# Why Data Is Separate

This is an extremely important architecture concept.

The UI should NOT contain hardcoded business data.

Instead:

```txt
data/
    contains information

components/
    render the information
```

This separation improves:

* organization
* scalability
* readability
* maintainability

Later, static data can become:

```txt
API responses
database results
external services
```

without changing component structure significantly.

---

# Step 3 — Create the Main Converter Component

## `src/components/CurrencyConverterCard.tsx`

```tsx
import { useState } from "react";

import {
  Card,
  Dropdown,
  Field,
  Input,
  Option,
  Text,
  Title2,
  Button,
} from "@fluentui/react-components";

import { ArrowSwap24Regular } from "@fluentui/react-icons";

import { currencyRates } from "../data/currencyRates";

export function CurrencyConverterCard() {
  const [amount, setAmount] = useState("1");

  const [fromCurrency, setFromCurrency] = useState("USD");

  const [toCurrency, setToCurrency] = useState("BRL");

  function convertCurrency() {
    const fromRate =
      currencyRates.find(
        (currency) => currency.code === fromCurrency
      )?.rate ?? 1;

    const toRate =
      currencyRates.find(
        (currency) => currency.code === toCurrency
      )?.rate ?? 1;

    const numericAmount = Number(amount);

    const usdValue = numericAmount / fromRate;

    const convertedValue = usdValue * toRate;

    return convertedValue.toFixed(2);
  }

  function swapCurrencies() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

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
      <Title2>Currency Converter</Title2>

      <Field label="Amount">
        <Input
          value={amount}
          onChange={(_, data) => setAmount(data.value)}
        />
      </Field>

      <Field label="From Currency">
        <Dropdown
          value={fromCurrency}
          selectedOptions={[fromCurrency]}
          onOptionSelect={(_, data) =>
            setFromCurrency(data.optionValue || "USD")
          }
        >
          {currencyRates.map((currency) => (
            <Option
              key={currency.code}
              value={currency.code}
            >
              {currency.code} - {currency.name}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Field label="To Currency">
        <Dropdown
          value={toCurrency}
          selectedOptions={[toCurrency]}
          onOptionSelect={(_, data) =>
            setToCurrency(data.optionValue || "BRL")
          }
        >
          {currencyRates.map((currency) => (
            <Option
              key={currency.code}
              value={currency.code}
            >
              {currency.code} - {currency.name}
            </Option>
          ))}
        </Dropdown>
      </Field>

      <Button
        appearance="secondary"
        icon={<ArrowSwap24Regular />}
        onClick={swapCurrencies}
      >
        Swap Currencies
      </Button>

      <Card
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
        }}
      >
        <Text size={500}>
          {amount} {fromCurrency} =
        </Text>

        <Title2>
          {convertCurrency()} {toCurrency}
        </Title2>
      </Card>
    </Card>
  );
}
```

---

# Understanding the State

This app uses three states:

```tsx
const [amount, setAmount] = useState("1");

const [fromCurrency, setFromCurrency] = useState("USD");

const [toCurrency, setToCurrency] = useState("BRL");
```

These represent:

| State          | Meaning          |
| -------------- | ---------------- |
| `amount`       | User input value |
| `fromCurrency` | Source currency  |
| `toCurrency`   | Target currency  |

---

# Why `useState` Is Important

`useState` gives memory to the component.

Without state:

```txt
The UI cannot react to user interaction.
```

When state changes:

```txt
React re-renders the component automatically.
```

This is the foundation of interactive React applications.

---

# The Most Important Concept — Derived State

The conversion result is NOT stored in state.

Instead, it is CALCULATED.

This is extremely important.

We DO NOT do this:

```tsx
const [result, setResult] = useState(...)
```

Instead:

```tsx
function convertCurrency() {
```

calculates the value dynamically.

This follows React Learn guidance:

> Avoid redundant state.

The result is derived from:

* amount
* fromCurrency
* toCurrency

So it should be calculated, not stored.

---

# Currency Conversion Formula

The conversion logic is:

```txt
1. Convert source currency into USD base
2. Convert USD base into target currency
```

The formula is:

```txt
usdValue = amount / sourceRate

finalValue = usdValue * targetRate
```

Example:

```txt
100 BRL → USD → EUR
```

This is much cleaner than manually handling every currency pair.

---

# Currency Conversion Flow

```txt
User types amount
    ↓
User selects currencies
    ↓
State updates
    ↓
React re-renders
    ↓
convertCurrency() runs again
    ↓
New value appears automatically
```

This is pure React declarative rendering.

---

# Understanding Controlled Inputs

The amount input:

```tsx
<Input
  value={amount}
  onChange={(_, data) => setAmount(data.value)}
/>
```

This is a controlled input.

Meaning:

```txt
React controls the input value.
```

The input does NOT store its own data independently.

Instead:

```txt
Input value comes from React state.
```

This is one of the most important React form concepts.

---

# Understanding Dropdown State

The dropdown:

```tsx
selectedOptions={[fromCurrency]}
```

binds the selected value to React state.

When the user selects an option:

```tsx
onOptionSelect={(_, data) =>
  setFromCurrency(data.optionValue || "USD")
}
```

React updates state.

Then React re-renders the component.

---

# Why We Use `map()`

The dropdown options are generated dynamically:

```tsx
{currencyRates.map((currency) => (
```

This converts:

```txt
CurrencyRate[]
```

into:

```txt
Option[]
```

React rendering is data-driven.

---

# Why `key={currency.code}` Matters

```tsx
key={currency.code}
```

Keys help React identify elements efficiently.

Without keys:

* React warns
* rendering becomes less predictable

Keys should always be stable and unique.

---

# Understanding the Swap Function

```tsx
function swapCurrencies() {
  setFromCurrency(toCurrency);
  setToCurrency(fromCurrency);
}
```

This swaps currencies instantly.

This demonstrates:

```txt
Multiple state updates
inside one event handler.
```

---

# Step 4 — Configure App.tsx

## `src/App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";

import { CurrencyConverterCard } from "./components/CurrencyConverterCard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f2f1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <Title1>Currency Converter</Title1>

        <Text>
          React + Fluent UI currency conversion interface.
        </Text>

        <CurrencyConverterCard />
      </section>
    </main>
  );
}

export default App;
```

---

# Step 5 — Configure main.tsx

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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# Step 6 — Configure Global CSS

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

---

# Run the Project

## Development Server

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

# Why This App Is Important

This app introduces one of the core principles of React:

```txt
The UI is derived from state.
```

The interface changes automatically when:

* amount changes
* dropdown selection changes
* currencies swap

No manual DOM updates exist.

---

# React Mental Model

This app reinforces:

```txt
User Interaction
    ↓
Event Handler
    ↓
State Update
    ↓
React Re-render
    ↓
Updated UI
```

This is modern React architecture.

---

# Technical Summary

| Concept              | Purpose                      |
| -------------------- | ---------------------------- |
| `useState`           | Component memory             |
| Controlled Input     | React controls form values   |
| Dropdown State       | Selected option state        |
| Derived State        | Calculated conversion result |
| `map()`              | Dynamic rendering            |
| TypeScript Interface | Data typing                  |
| Fluent UI            | Enterprise UI                |
| Event Handling       | User interaction             |
| Re-rendering         | Automatic UI updates         |
| Declarative UI       | UI derived from state        |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Dropdown](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dropdown)
* [Fluent UI Input](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/input)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

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
| Block 1 |  08 | Timeline of Events        | Completed |
| Block 1 |  09 | Employee Table            | Completed |
| Block 1 |  10 | Email List                | Completed |
| Block 1 |  11 | Grid of Cards             | Completed |
| Block 1 |  12 | Image Gallery             | Completed |
| Block 1 |  13 | Movie Catalog             | Completed |
| Block 1 |  14 | Football Teams            | Completed |
| Block 1 |  15 | News Page                 | Completed |
| Block 1 |  16 | Financial Dashboard       | Completed |
| Block 1 |  17 | SharePoint Style Layout   | Completed |
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
| Block 2 |  34 | Currency Converter        | Current   |
| Block 2 |  35 | BMI Calculator            | Next      |
