# App 31 — Grade Simulator

App 31 is **Simulador de Notas / Grade Simulator**, inside **Block 2 — Interactivity and State**, after App 30 Shopping Cart and before App 32 Inventory Control. The roadmap defines Block 2 as focused on `useState`, events, forms, derived state, filters, validation, and shared state. 

React concept: **controlled inputs + derived state**. React recommends keeping only essential state and calculating values from existing state when possible. ([React][1])

## PowerShell setup

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app31-grade-simulator -- --template react-ts
cd app31-grade-simulator

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\models
mkdir src\styles

New-Item src\models\GradeForm.ts -ItemType File
New-Item src\components\GradeSimulator.tsx -ItemType File
New-Item src\components\GradeResultCard.tsx -ItemType File
```

## `src\models\GradeForm.ts`

```ts
export interface GradeForm {
  firstExam: string;
  secondExam: string;
  project: string;
  attendance: string;
}
```

## `src\components\GradeResultCard.tsx`

```tsx
import { Badge, Card, Text, Title2 } from "@fluentui/react-components";

interface GradeResultCardProps {
  average: number;
  status: "Approved" | "Recovery" | "Failed";
}

export function GradeResultCard({ average, status }: GradeResultCardProps) {
  const badgeAppearance =
    status === "Approved" ? "filled" : status === "Recovery" ? "tint" : "outline";

  return (
    <Card style={{ padding: "24px" }}>
      <Title2>Final Result</Title2>

      <Text size={600}>Average: {average.toFixed(2)}</Text>

      <Badge appearance={badgeAppearance}>{status}</Badge>
    </Card>
  );
}
```

## `src\components\GradeSimulator.tsx`

```tsx
import { useState } from "react";

import {
  Button,
  Card,
  Field,
  Input,
  Text,
  Title1,
} from "@fluentui/react-components";

import type { GradeForm } from "../models/GradeForm";
import { GradeResultCard } from "./GradeResultCard";

const initialForm: GradeForm = {
  firstExam: "",
  secondExam: "",
  project: "",
  attendance: "",
};

function toNumber(value: string) {
  return Number(value || 0);
}

export function GradeSimulator() {
  const [form, setForm] = useState<GradeForm>(initialForm);

  const firstExam = toNumber(form.firstExam);
  const secondExam = toNumber(form.secondExam);
  const project = toNumber(form.project);
  const attendance = toNumber(form.attendance);

  const average =
    firstExam * 0.35 +
    secondExam * 0.35 +
    project * 0.2 +
    attendance * 0.1;

  const status =
    average >= 7 ? "Approved" : average >= 5 ? "Recovery" : "Failed";

  const hasInvalidGrade =
    firstExam > 10 ||
    secondExam > 10 ||
    project > 10 ||
    attendance > 10 ||
    firstExam < 0 ||
    secondExam < 0 ||
    project < 0 ||
    attendance < 0;

  function updateField(field: keyof GradeForm, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  function resetForm() {
    setForm(initialForm);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Title1>Grade Simulator</Title1>

        <Text>
          Enter the student grades and React will calculate the final average
          automatically using derived state.
        </Text>

        <Card style={{ padding: "24px", marginTop: "32px" }}>
          <Field label="First Exam - 35%">
            <Input
              type="number"
              value={form.firstExam}
              onChange={(_, data) => updateField("firstExam", data.value)}
            />
          </Field>

          <Field label="Second Exam - 35%">
            <Input
              type="number"
              value={form.secondExam}
              onChange={(_, data) => updateField("secondExam", data.value)}
            />
          </Field>

          <Field label="Project - 20%">
            <Input
              type="number"
              value={form.project}
              onChange={(_, data) => updateField("project", data.value)}
            />
          </Field>

          <Field label="Attendance - 10%">
            <Input
              type="number"
              value={form.attendance}
              onChange={(_, data) => updateField("attendance", data.value)}
            />
          </Field>

          <Button appearance="secondary" onClick={resetForm}>
            Reset
          </Button>
        </Card>

        {hasInvalidGrade ? (
          <Card style={{ padding: "24px", marginTop: "24px" }}>
            <Text>
              Grades must be between 0 and 10.
            </Text>
          </Card>
        ) : (
          <div style={{ marginTop: "24px" }}>
            <GradeResultCard average={average} status={status} />
          </div>
        )}
      </section>
    </main>
  );
}
```

## `src\App.tsx`

```tsx
import { GradeSimulator } from "./components/GradeSimulator";

function App() {
  return <GradeSimulator />;
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

## Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## Technical summary

| Concept               | Where it appears                            |
| --------------------- | ------------------------------------------- |
| `useState`            | Stores the grade form                       |
| Controlled inputs     | `value` + `onChange`                        |
| Derived state         | `average`, `status`, `hasInvalidGrade`      |
| Validation            | Grade range 0–10                            |
| Conditional rendering | Error card or result card                   |
| TypeScript model      | `GradeForm.ts`                              |
| Component separation  | `GradeSimulator` + `GradeResultCard`        |
| Fluent UI             | `Card`, `Input`, `Field`, `Button`, `Badge` |

## Where we are

| Block   | App | Name              | Status    |
| ------- | --: | ----------------- | --------- |
| Block 2 |  21 | Modern Counter    | Completed |
| Block 2 |  22 | Toggle Theme      | Completed |
| Block 2 |  23 | React Calculator  | Completed |
| Block 2 |  24 | Login Form        | Completed |
| Block 2 |  25 | User Registration | Completed |
| Block 2 |  26 | ToDo List         | Completed |
| Block 2 |  27 | Shopping List     | Completed |
| Block 2 |  28 | Product Filter    | Completed |
| Block 2 |  29 | Employee Search   | Completed |
| Block 2 |  30 | Shopping Cart     | Completed |
| Block 2 |  31 | Grade Simulator   | Current   |
| Block 2 |  32 | Inventory Control | Next      |

[1]: https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com "Choosing the State Structure"
