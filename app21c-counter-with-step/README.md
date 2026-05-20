# App 21c — Counter With Step

App 21c expands the counter system and introduces a second piece of state.

Now the application has:

| State   | Purpose                  |
| ------- | ------------------------ |
| `count` | Current counter value    |
| `step`  | Increment/decrement size |

This is extremely important because it introduces one of the most fundamental React concepts:

# Multiple States in One Component

Until now:

```tsx
const [count, setCount]
```

Now we also have:

```tsx
const [step, setStep]
```

This app teaches:

* multiple states
* controlled inputs
* numeric conversion
* derived rendering
* state synchronization
* event-driven state updates

---

# PowerShell

```powershell
cd C:\ReactApps\bloco02

npm create vite@latest app21c-counter-with-step -- --template react-ts

cd app21c-counter-with-step

npm install

npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\styles

New-Item src\components\CounterWithStep.tsx -ItemType File
```

---

# `src\components\CounterWithStep.tsx`

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

export function CounterWithStep() {
  const [count, setCount] = useState(0);

  const [step, setStep] = useState(1);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function increase() {
    setCount(count + step);
  }

  function decrease() {
    setCount(count - step);
  }

  function reset() {
    setCount(0);
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
        maxWidth: "640px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter With Step</Title3>}
        description={
          <Text>
            Exploring multiple states and controlled inputs in React.
          </Text>
        }
      />

      <div
        style={{
          textAlign: "center",
          padding: "40px 0",
        }}
      >
        <Title1>{count}</Title1>

        <div style={{ marginTop: "16px" }}>
          <Badge appearance="filled">{status}</Badge>
        </div>
      </div>

      <Field
        label="Step Value"
        style={{
          marginBottom: "24px",
        }}
      >
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
        <Button
          icon={<Subtract24Regular />}
          onClick={decrease}
        >
          Decrease
        </Button>

        <Button
          appearance="primary"
          icon={<Add24Regular />}
          onClick={increase}
        >
          Increase
        </Button>

        <Button
          icon={<ArrowReset24Regular />}
          onClick={reset}
        >
          Reset
        </Button>
      </div>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #ddd",
        }}
      >
        <Text>
          Current step: {step}
        </Text>
      </div>
    </Card>
  );
}
```

---

# `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";

import { CounterWithStep } from "./components/CounterWithStep";

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
        <Title1>
          App 21c — Counter With Step
        </Title1>

        <Text>
          Exploring multiple React states and controlled inputs.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterWithStep />
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
```

# Preview

```powershell
npm run preview
```

---

# Understanding the New Concepts

# Multiple States

This app introduces:

```tsx
const [count, setCount]
const [step, setStep]
```

A component can have:

* one state
* many states
* complex states

React tracks them independently.

---

# Controlled Input

This is the first controlled form field in the project.

```tsx
<Input
  value={step.toString()}
  onChange={handleStepChange}
/>
```

The input value comes directly from React state.

This means:

```txt
React state controls the input.
```

Not the browser.

---

# Why This Matters

In traditional HTML:

```html
<input>
```

the browser controls the value internally.

In React controlled inputs:

```txt
state controls the value
```

This creates:

* predictable UI
* validation
* synchronization
* centralized logic

---

# Numeric Conversion

HTML inputs return strings.

Even numeric inputs return strings.

This means:

```tsx
event.target.value
```

is always:

```txt
string
```

So we convert:

```tsx
Number(event.target.value)
```

This is extremely important.

---

# State Synchronization

Now the UI depends on TWO states:

```txt
count
step
```

The buttons use both:

```tsx
setCount(count + step)
```

This demonstrates how state values can interact together.

---

# Why This App Is Important

App 21c introduces the foundation for:

* forms
* calculators
* filters
* dynamic inputs
* controlled UI systems
* enterprise data entry

This is one of the most important transitions in React learning.

---

# Technical Summary

| Concept            | Explanation                |
| ------------------ | -------------------------- |
| `count`            | Main counter state         |
| `step`             | Increment/decrement size   |
| Multiple states    | Several `useState()` calls |
| Controlled input   | Input controlled by React  |
| Numeric conversion | `Number()` conversion      |
| Derived rendering  | UI generated from state    |
| Event handling     | Button and input events    |

---

# Official Documentation

## React Learn

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Responding to Events](https://react.dev/learn/responding-to-events?utm_source=chatgpt.com)
* [Rendering and Commit](https://react.dev/learn/render-and-commit?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# Current Project Position

| Block   |   App | Name                 | Status    |
| ------- | ----: | -------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI  | Completed |
| Block 2 |    21 | Modern Counter       | Completed |
| Block 2 |   21b | Counter State Lab    | Completed |
| Block 2 |   21c | Counter With Step    | Current   |
| Block 2 |   21d | Counter With History | Next      |
| Block 2 |    22 | Toggle Theme         | Waiting   |
