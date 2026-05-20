# App 23 — React Calculator

App 23 is **React Calculator**, the third app in **Block 2 — Interactivity and State**, where the roadmap focuses on `useState`, events, forms, derived state, filters, validation, and shared state. App 23 is defined as **“Calculadora React / Calculadora funcional / Eventos, estado derivado”** in the project list. 

React state behaves like a snapshot: setting state does not immediately change the current variable; it schedules a re-render. ([React][1]) For calculator buttons, this matters because every click is an event, and React queues state updates before rendering the next UI. ([React][2]) Fluent UI gives us Microsoft-style `Button`, `Card`, `Input`, and typography components for the interface. ([Microsoft Developer][3])

---

## 1. Create the project

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app23-react-calculator -- --template react-ts
cd app23-react-calculator

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

---

## 2. Create folders and files

```powershell
mkdir src\components
mkdir src\models
mkdir src\styles

New-Item src\models\CalculatorOperator.ts -ItemType File
New-Item src\components\Calculator.tsx -ItemType File
New-Item src\components\CalculatorDisplay.tsx -ItemType File
New-Item src\components\CalculatorKeypad.tsx -ItemType File
```

---

## 3. `src\models\CalculatorOperator.ts`

```ts
export type CalculatorOperator = "+" | "-" | "*" | "/";
```

---

## 4. `src\components\CalculatorDisplay.tsx`

```tsx
import { Card, Text } from "@fluentui/react-components";

interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <Card
      style={{
        padding: "20px",
        textAlign: "right",
        backgroundColor: "#111827",
      }}
    >
      <Text
        size={800}
        weight="semibold"
        style={{
          color: "white",
          wordBreak: "break-all",
        }}
      >
        {value}
      </Text>
    </Card>
  );
}
```

---

## 5. `src\components\CalculatorKeypad.tsx`

```tsx
import { Button } from "@fluentui/react-components";

interface CalculatorKeypadProps {
  onNumberClick: (value: string) => void;
  onOperatorClick: (operator: "+" | "-" | "*" | "/") => void;
  onClear: () => void;
  onEquals: () => void;
}

export function CalculatorKeypad({
  onNumberClick,
  onOperatorClick,
  onClear,
  onEquals,
}: CalculatorKeypadProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
      }}
    >
      <Button onClick={onClear}>C</Button>
      <Button onClick={() => onOperatorClick("/")}>÷</Button>
      <Button onClick={() => onOperatorClick("*")}>×</Button>
      <Button onClick={() => onOperatorClick("-")}>−</Button>

      <Button onClick={() => onNumberClick("7")}>7</Button>
      <Button onClick={() => onNumberClick("8")}>8</Button>
      <Button onClick={() => onNumberClick("9")}>9</Button>
      <Button onClick={() => onOperatorClick("+")}>+</Button>

      <Button onClick={() => onNumberClick("4")}>4</Button>
      <Button onClick={() => onNumberClick("5")}>5</Button>
      <Button onClick={() => onNumberClick("6")}>6</Button>
      <Button appearance="primary" onClick={onEquals}>
        =
      </Button>

      <Button onClick={() => onNumberClick("1")}>1</Button>
      <Button onClick={() => onNumberClick("2")}>2</Button>
      <Button onClick={() => onNumberClick("3")}>3</Button>
      <Button onClick={() => onNumberClick("0")}>0</Button>
    </div>
  );
}
```

---

## 6. `src\components\Calculator.tsx`

```tsx
import { useState } from "react";
import { Card, Text, Title2 } from "@fluentui/react-components";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKeypad } from "./CalculatorKeypad";
import type { CalculatorOperator } from "../models/CalculatorOperator";

export function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<CalculatorOperator | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  function handleNumberClick(value: string) {
    if (waitingForSecondValue) {
      setDisplayValue(value);
      setWaitingForSecondValue(false);
      return;
    }

    setDisplayValue((currentValue) =>
      currentValue === "0" ? value : currentValue + value
    );
  }

  function handleOperatorClick(selectedOperator: CalculatorOperator) {
    setFirstValue(Number(displayValue));
    setOperator(selectedOperator);
    setWaitingForSecondValue(true);
  }

  function calculate(
    leftValue: number,
    rightValue: number,
    selectedOperator: CalculatorOperator
  ) {
    if (selectedOperator === "+") return leftValue + rightValue;
    if (selectedOperator === "-") return leftValue - rightValue;
    if (selectedOperator === "*") return leftValue * rightValue;
    if (selectedOperator === "/") return rightValue === 0 ? NaN : leftValue / rightValue;

    return rightValue;
  }

  function handleEquals() {
    if (firstValue === null || operator === null) {
      return;
    }

    const secondValue = Number(displayValue);
    const result = calculate(firstValue, secondValue, operator);

    setDisplayValue(Number.isNaN(result) ? "Error" : String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
  }

  function handleClear() {
    setDisplayValue("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  }

  return (
    <Card
      style={{
        width: "420px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <Title2>React Calculator</Title2>
        <Text>
          A state-driven calculator built with React, TypeScript, and Fluent UI.
        </Text>
      </div>

      <CalculatorDisplay value={displayValue} />

      <CalculatorKeypad
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onClear={handleClear}
        onEquals={handleEquals}
      />
    </Card>
  );
}
```

---

## 7. `src\App.tsx`

```tsx
import { Calculator } from "./components/Calculator";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px",
      }}
    >
      <Calculator />
    </main>
  );
}

export default App;
```

---

## 8. `src\main.tsx`

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

## 9. `src\index.css`

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

## 10. Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

---

# What App 23 teaches

| Concept               | Where it appears                               |
| --------------------- | ---------------------------------------------- |
| `useState`            | `Calculator.tsx`                               |
| Event handlers        | Button clicks                                  |
| Derived result        | `calculate(...)`                               |
| TypeScript union type | `CalculatorOperator.ts`                        |
| Props                 | `CalculatorDisplay`, `CalculatorKeypad`        |
| Component composition | `App → Calculator → Display/Keypad`            |
| Fluent UI             | `Card`, `Button`, `Text`, `Title2`             |
| State reset           | `handleClear()`                                |
| State transition      | first value → operator → second value → result |

---

# Current Progress

| Block   | App | Name                         | Status    |
| ------- | --: | ---------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent           | Completed |
| Block 1 |  02 | Profile Card                 | Completed |
| Block 1 |  03 | Product List                 | Completed |
| Block 1 |  04 | Microsoft Style User Card    | Completed |
| Block 1 |  05 | Static Dashboard             | Completed |
| Block 1 |  06 | Corporate Sidebar Menu       | Completed |
| Block 1 |  07 | Visual Task List             | Completed |
| Block 1 |  08 | Timeline of Events           | Completed |
| Block 1 |  09 | Employee Table               | Completed |
| Block 1 |  10 | Email List                   | Completed |
| Block 1 |  11 | Grid of Cards                | Completed |
| Block 1 |  12 | Image Gallery                | Completed |
| Block 1 |  13 | Movie Catalog                | Completed |
| Block 1 |  14 | Football Teams List          | Completed |
| Block 1 |  15 | News Page                    | Completed |
| Block 1 |  16 | Static Financial Dashboard   | Completed |
| Block 1 |  17 | SharePoint Style Layout      | Completed |
| Block 1 |  18 | File Explorer                | Completed |
| Block 1 |  19 | Corporate Portal             | Completed |
| Block 1 |  20 | Microsoft Style Landing Page | Completed |
| Block 2 |  21 | Modern Counter               | Completed |
| Block 2 |  22 | Toggle Theme                 | Completed |
| Block 2 |  23 | React Calculator             | Current   |
| Block 2 |  24 | Login Form                   | Next      |

[1]: https://react.dev/learn/state-as-a-snapshot?utm_source=chatgpt.com "State as a Snapshot"
[2]: https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com "Queueing a Series of State Updates"
[3]: https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com "Home - Fluent UI"
