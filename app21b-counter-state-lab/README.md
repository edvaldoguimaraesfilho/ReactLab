# App 21b — Counter State Lab

We will not change the main sequence.

| Official App | Status               |
| ------------ | -------------------- |
| App 21       | Modern Counter       |
| App 21b      | Counter State Lab    |
| App 21c      | Counter With Step    |
| App 21d      | Counter With History |

## Goal of App 21b

App 21b explores `useState` more deeply:

| Concept               | Practice                    |
| --------------------- | --------------------------- |
| State                 | `count`                     |
| Event handlers        | increase, decrease, reset   |
| Derived UI            | positive, negative, neutral |
| Conditional rendering | different message by value  |
| State rules           | never mutate directly       |

---

# PowerShell

```powershell
cd C:\ReactApps\bloco02

npm create vite@latest app21b-counter-state-lab -- --template react-ts
cd app21b-counter-state-lab

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\styles

New-Item src\components\CounterStateLab.tsx -ItemType File
```

---

# `src\components\CounterStateLab.tsx`

```tsx
import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowReset24Regular,
  Subtract24Regular,
} from "@fluentui/react-icons";

export function CounterStateLab() {
  const [count, setCount] = useState(0);

  const isPositive = count > 0;
  const isNegative = count < 0;
  const isNeutral = count === 0;

  const status = isNeutral
    ? "Neutral"
    : isPositive
      ? "Positive"
      : "Negative";

  const message = isNeutral
    ? "The counter is at the initial value."
    : isPositive
      ? "The counter is above zero."
      : "The counter is below zero.";

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter State Lab</Title3>}
        description={
          <Text>
            Exploring React state, derived values, and conditional rendering.
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

        <Text
          style={{
            display: "block",
            marginTop: "16px",
          }}
        >
          {message}
        </Text>
      </div>

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
      </div>
    </Card>
  );
}
```

---

# `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { CounterStateLab } from "./components/CounterStateLab";

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
        <Title1>App 21b — Counter State Lab</Title1>

        <Text>
          A deeper experiment with state, derived values, and conditional UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterStateLab />
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
```

---

# Technical Summary

| Concept        | Explanation                                    |
| -------------- | ---------------------------------------------- |
| `count`        | Real state stored by React                     |
| `setCount`     | Function that changes state                    |
| `isPositive`   | Derived value                                  |
| `isNegative`   | Derived value                                  |
| `isNeutral`    | Derived value                                  |
| `status`       | Text calculated from state                     |
| `message`      | Conditional UI message                         |
| No `useEffect` | Not needed because there is no external system |

# Next variants

| Variant | Focus                            |
| ------- | -------------------------------- |
| App 21b | Derived state and conditional UI |
| App 21c | Counter with custom step value   |
| App 21d | Counter with history of changes  |

# Current position

| Block   |   App | Name                 | Status    |
| ------- | ----: | -------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI  | Completed |
| Block 2 |    21 | Modern Counter       | Completed |
| Block 2 |   21b | Counter State Lab    | Current   |
| Block 2 |   21c | Counter With Step    | Next      |
| Block 2 |   21d | Counter With History | Planned   |
| Block 2 |    22 | Toggle Theme         | Waiting   |
