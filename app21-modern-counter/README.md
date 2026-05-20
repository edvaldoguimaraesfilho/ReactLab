# App 21 — Modern Counter

App 21 starts **Block 2 — Interactivity and State**. The roadmap defines App 21 as **“Contador Moderno / Modern Counter”**, focused on `useState` and buttons. 

## PowerShell

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app21-modern-counter -- --template react-ts
cd app21-modern-counter

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\styles

New-Item src\components\CounterPanel.tsx -ItemType File
```

## `src\components\CounterPanel.tsx`

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

export function CounterPanel() {
  const [count, setCount] = useState(0);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "520px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Interactive Counter</Title3>}
        description={
          <Text>
            First state-driven React component using useState and events.
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

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button icon={<Subtract24Regular />} onClick={decrement}>
          Decrease
        </Button>

        <Button appearance="primary" icon={<Add24Regular />} onClick={increment}>
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

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { CounterPanel } from "./components/CounterPanel";

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
        <Title1>App 21 — Modern Counter</Title1>

        <Text>
          This app introduces React state, event handlers, and derived UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <CounterPanel />
        </div>
      </section>
    </main>
  );
}

export default App;
```

## `src\main.tsx`

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

## `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## Run

```powershell
npm run dev
```

## Validate

```powershell
npm run build
npm run preview
```

## What this app teaches

| Concept               | Where                                   |
| --------------------- | --------------------------------------- |
| `useState`            | `const [count, setCount] = useState(0)` |
| Event handling        | `onClick={increment}`                   |
| State update          | `setCount(count + 1)`                   |
| Derived value         | `status` calculated from `count`        |
| No unnecessary effect | No `useEffect` needed                   |
| Fluent UI             | `Card`, `Button`, `Badge`, `Text`       |

## Where we are

| Block   |   App | Name                | Status    |
| ------- | ----: | ------------------- | --------- |
| Block 1 | 01–20 | Fundamentals and UI | Completed |
| Block 2 |    21 | Modern Counter      | Current   |
| Block 2 |    22 | Toggle Theme        | Next      |
