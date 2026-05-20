# App 21d — Counter With History

App 21d expands the counter again. Now we keep a **history of state changes**.

| State     | Purpose                  |
| --------- | ------------------------ |
| `count`   | Current counter value    |
| `step`    | Increment/decrement size |
| `history` | List of previous actions |

This app teaches one very important React concept:

# Updating Arrays in State

---

# PowerShell

```powershell
cd C:\ReactApps\bloco02

npm create vite@latest app21d-counter-with-history -- --template react-ts

cd app21d-counter-with-history

npm install

npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\models
mkdir src\styles

New-Item src\models\HistoryItem.ts -ItemType File
New-Item src\components\CounterWithHistory.tsx -ItemType File
```

---

# `src\models\HistoryItem.ts`

```ts
export interface HistoryItem {
  id: number;
  action: "Increase" | "Decrease" | "Reset";
  previousValue: number;
  nextValue: number;
  step: number;
}
```

---

# `src\components\CounterWithHistory.tsx`

```tsx
import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowReset24Regular,
  Subtract24Regular,
} from "@fluentui/react-icons";

import type { HistoryItem } from "../models/HistoryItem";

export function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function addHistory(
    action: HistoryItem["action"],
    previousValue: number,
    nextValue: number
  ) {
    const item: HistoryItem = {
      id: Date.now(),
      action,
      previousValue,
      nextValue,
      step,
    };

    setHistory([item, ...history]);
  }

  function increase() {
    const nextValue = count + step;

    addHistory("Increase", count, nextValue);
    setCount(nextValue);
  }

  function decrease() {
    const nextValue = count - step;

    addHistory("Decrease", count, nextValue);
    setCount(nextValue);
  }

  function reset() {
    addHistory("Reset", count, 0);
    setCount(0);
  }

  function clearHistory() {
    setHistory([]);
  }

  function handleStepChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = Number(event.target.value);

    if (Number.isNaN(value)) {
      return;
    }

    setStep(value);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "760px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter With History</Title3>}
        description={
          <Text>
            Exploring numbers, arrays, and state history in React.
          </Text>
        }
      />

      <div
        style={{
          textAlign: "center",
          padding: "32px 0",
        }}
      >
        <Title1>{count}</Title1>

        <div style={{ marginTop: "12px" }}>
          <Badge appearance="filled">{status}</Badge>
        </div>
      </div>

      <Field label="Step Value" style={{ marginBottom: "24px" }}>
        <Input
          type="number"
          value={step.toString()}
          onChange={handleStepChange}
        />
      </Field>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button icon={<Subtract24Regular />} onClick={decrease}>
          Decrease
        </Button>

        <Button appearance="primary" icon={<Add24Regular />} onClick={increase}>
          Increase
        </Button>

        <Button icon={<ArrowReset24Regular />} onClick={reset}>
          Reset
        </Button>

        <Button onClick={clearHistory}>
          Clear History
        </Button>
      </div>

      <section
        style={{
          marginTop: "32px",
          borderTop: "1px solid #ddd",
          paddingTop: "24px",
          textAlign: "left",
        }}
      >
        <Title3>History</Title3>

        {history.length === 0 ? (
          <Text>No actions yet.</Text>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {history.map((item) => (
              <Card key={item.id}>
                <Text weight="semibold">{item.action}</Text>

                <Text>
                  {item.previousValue} → {item.nextValue}
                </Text>

                <Text size={200}>Step used: {item.step}</Text>
              </Card>
            ))}
          </div>
        )}
      </section>
    </Card>
  );
}
```

---

# `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { CounterWithHistory } from "./components/CounterWithHistory";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section style={{ textAlign: "center" }}>
        <Title1>App 21d — Counter With History</Title1>

        <Text>
          Exploring array state, immutable updates, and user action history.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterWithHistory />
        </div>
      </section>
    </main>
  );
}

export default App;
```

---

# `src\main.tsx`

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

# `src\index.css`

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

# Run

```powershell
npm run dev
```

# Validate

```powershell
npm run build
npm run preview
```

---

# Technical Summary

| Concept               | Explanation                               |
| --------------------- | ----------------------------------------- |
| `history`             | Array stored in React state               |
| `setHistory`          | Updates the history array                 |
| Immutable update      | `[item, ...history]`                      |
| `map()`               | Renders history items                     |
| Conditional rendering | Shows empty message when history is empty |
| TypeScript model      | `HistoryItem` defines history shape       |
| Multiple states       | `count`, `step`, `history`                |

---

# Current Project Position

| Block   |   App | Name                 | Status    |
| ------- | ----: | -------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI  | Completed |
| Block 2 |    21 | Modern Counter       | Completed |
| Block 2 |   21b | Counter State Lab    | Completed |
| Block 2 |   21c | Counter With Step    | Completed |
| Block 2 |   21d | Counter With History | Current   |
| Block 2 |    22 | Toggle Theme         | Waiting   |
# Understanding `interface` vs `type` in TypeScript for React

This is one of the most important TypeScript topics in React development.

Both `interface` and `type` are used to describe shapes of data.

At first they may look identical, but internally they have important differences.

In React projects:

* both are valid
* both are heavily used
* enterprise projects often mix both
* choosing correctly improves architecture clarity

---

# First Important Concept

Both can describe objects.

These two examples are very similar:

## Using `interface`

```ts
interface User {
  id: number;
  name: string;
}
```

## Using `type`

```ts
type User = {
  id: number;
  name: string;
};
```

Both produce:

```txt
object with:
- id
- name
```

So beginners often ask:

> Why do both exist?

Because they were created for different goals.

---

# Mental Model

A good practical mental model is:

| Feature                   | Best Tool   |
| ------------------------- | ----------- |
| Object contracts          | `interface` |
| Type composition          | `type`      |
| Union types               | `type`      |
| Primitive aliases         | `type`      |
| Function signatures       | both        |
| React props               | both        |
| Extensible object systems | `interface` |

---

# What `interface` Was Designed For

`interface` was created primarily for:

```txt
Object-oriented contracts
```

Think:

```txt
"This object MUST look like this."
```

Example:

```ts
interface Employee {
  id: number;
  name: string;
  department: string;
}
```

This is very common in:

* APIs
* models
* DTOs
* enterprise systems
* React props

---

# What `type` Was Designed For

`type` is more general.

It can represent:

* objects
* unions
* tuples
* primitives
* functions
* mapped types
* conditional types

Example:

```ts
type Status = "Pending" | "Approved" | "Rejected";
```

`interface` CANNOT do this.

---

# Example 1 — Union Types

This only works with `type`.

```ts
type Theme = "light" | "dark";
```

This is extremely common in React apps.

Example:

```ts
const currentTheme: Theme = "light";
```

---

# Example 2 — Primitive Aliases

```ts
type UserId = number;
```

or:

```ts
type ApiUrl = string;
```

Interfaces cannot represent primitives.

---

# Example 3 — Tuples

```ts
type Position = [number, number];
```

This is common for:

* coordinates
* chart points
* RGB colors

Interface cannot do this directly.

---

# Example 4 — Function Types

```ts
type CalculateTotal = (
  price: number,
  quantity: number
) => number;
```

This is useful for:

* callbacks
* hooks
* utilities

---

# Where `interface` Becomes Strong

`interface` shines in extensible object architecture.

Example:

```ts
interface Person {
  name: string;
}

interface Employee extends Person {
  department: string;
}
```

This creates inheritance-like contracts.

Very common in:

* enterprise systems
* APIs
* large React apps

---

# Declaration Merging

One huge difference:

# Interfaces merge automatically

Example:

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```

TypeScript merges them:

```ts
interface User {
  name: string;
  age: number;
}
```

This is called:

```txt
Declaration merging
```

Types CANNOT do this.

---

# Type Cannot Merge

This causes error:

```ts
type User = {
  name: string;
};

type User = {
  age: number;
};
```

Because types cannot be redefined.

---

# Why Declaration Merging Exists

This is useful for:

* extending libraries
* augmenting third-party definitions
* framework integrations

Large enterprise libraries use this heavily.

---

# React Props — Which One Should You Use?

Both work.

## Interface Props

```tsx
interface ButtonProps {
  text: string;
}

function Button(props: ButtonProps) {
  return <button>{props.text}</button>;
}
```

---

## Type Props

```tsx
type ButtonProps = {
  text: string;
};

function Button(props: ButtonProps) {
  return <button>{props.text}</button>;
}
```

Both are valid.

---

# Common Enterprise Convention

Many React enterprise teams use:

| Scenario            | Preferred   |
| ------------------- | ----------- |
| Component props     | `interface` |
| Models/entities     | `interface` |
| Union types         | `type`      |
| Utility composition | `type`      |

---

# Why React Teams Often Prefer `interface`

Because React components often describe:

* contracts
* object shapes
* extensible props

Example:

```tsx
interface CardProps {
  title: string;
  description: string;
}
```

This reads naturally:

```txt
This component expects this contract.
```

---

# Why Modern Advanced TypeScript Uses `type`

Advanced TypeScript features rely heavily on `type`.

Examples:

* unions
* intersections
* conditional types
* mapped types
* utility types

Example:

```ts
type AdminUser = User & {
  permissions: string[];
};
```

This uses intersections.

---

# Interface Extends

```ts
interface User {
  name: string;
}

interface Admin extends User {
  permissions: string[];
}
```

---

# Type Intersections

Equivalent:

```ts
type User = {
  name: string;
};

type Admin = User & {
  permissions: string[];
};
```

Both work.

---

# Important React Example

In your apps we already used both.

## Interface Example

```ts
export interface HistoryItem {
  id: number;
  action: string;
}
```

This is a classic model contract.

---

# Type Example

```ts
export type TaskStatus =
  | "Completed"
  | "Pending"
  | "In Progress";
```

Perfect use case for `type`.

---

# The Most Practical Rule

This simple rule works very well:

| Use                         | Recommendation |
| --------------------------- | -------------- |
| Object model                | `interface`    |
| React props                 | `interface`    |
| Union values                | `type`         |
| Literal values              | `type`         |
| Primitive aliases           | `type`         |
| Complex utility composition | `type`         |

---

# Why React Uses Both

React itself uses:

* interfaces
* types
* generics
* unions
* utility types

Modern TypeScript codebases mix everything.

The important part is:

* consistency
* readability
* architecture clarity

---

# Performance Differences?

Historically:

* interfaces had small compiler advantages

Today:

* practically irrelevant

Choose based on architecture clarity, not performance.

---

# Common Beginner Mistake

Beginners often think:

```txt
type is newer
```

or:

```txt
interface is old
```

Both are modern and important.

Neither replaces the other.

---

# Real Enterprise Example

## Interface

```ts
interface Employee {
  id: number;
  name: string;
  department: string;
}
```

## Type

```ts
type EmployeeStatus =
  | "Active"
  | "Vacation"
  | "Disabled";
```

Perfect combination.

---

# In Your React Project

Recommended style for your 100 apps project:

| Scenario      | Recommendation |
| ------------- | -------------- |
| Models        | `interface`    |
| Props         | `interface`    |
| State unions  | `type`         |
| Theme modes   | `type`         |
| Status values | `type`         |
| DTOs          | `interface`    |

---

# Technical Summary

| Feature               | `interface` | `type`    |
| --------------------- | ----------- | --------- |
| Objects               | Yes         | Yes       |
| Primitives            | No          | Yes       |
| Unions                | No          | Yes       |
| Tuples                | No          | Yes       |
| Functions             | Yes         | Yes       |
| Declaration merging   | Yes         | No        |
| Extends               | Yes         | Yes       |
| Intersections         | Limited     | Excellent |
| React props           | Excellent   | Excellent |
| Advanced TS utilities | Limited     | Excellent |

---

# Official Documentation

## TypeScript

* [TypeScript Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html?utm_source=chatgpt.com)
* [TypeScript Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html?utm_source=chatgpt.com)
* [TypeScript Type Aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html?utm_source=chatgpt.com#type-aliases)

## React + TypeScript

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)

---

# Current Project Position

| Block   |   App | Name                 | Status    |
| ------- | ----: | -------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI  | Completed |
| Block 2 |    21 | Modern Counter       | Completed |
| Block 2 |   21b | Counter State Lab    | Completed |
| Block 2 |   21c | Counter With Step    | Completed |
| Block 2 |   21d | Counter With History | Completed |
| Block 2 |    22 | Toggle Theme         | Next      |
