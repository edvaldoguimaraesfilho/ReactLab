# App 44 — Dialog Manager

App 44 introduces one of the most important UI patterns in enterprise React applications: modal dialogs. In modern systems, dialogs are used for confirmations, alerts, editing forms, approvals, destructive actions, notifications, and workflow interactions. This app belongs to Block 3 — Professional Fluent UI Applications, where the focus shifts toward enterprise-grade interfaces and Microsoft-style component composition. 

The purpose of this application is not simply to “open a popup.” The real goal is understanding:

* controlled UI visibility
* state-driven dialogs
* conditional rendering
* Fluent UI modal architecture
* overlay composition
* event-driven UI
* reusable enterprise components

This app continues following the React mental model defined in:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI Dialog Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dialog)

---

# Creating the Project

```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app44-dialog-manager -- --template react-ts

cd app44-dialog-manager

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Creating the Folder Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

Create the files:

```powershell
New-Item src\components\DialogManager.tsx -ItemType File
New-Item src\components\ActionPanel.tsx -ItemType File
New-Item src\models\DialogState.ts -ItemType File
New-Item artigo.md -ItemType File
```

---

# Final Project Structure

```txt
src/
  components/
    ActionPanel.tsx
    DialogManager.tsx

  models/
    DialogState.ts

  data/

  styles/

  App.tsx
  main.tsx
  index.css
```

---

# Understanding the Goal of This App

This app simulates a small enterprise control panel containing:

* buttons
* actions
* confirmation dialogs
* warning dialogs
* success dialogs

The key idea is:

```txt
The dialog is controlled entirely by React state.
```

The browser is NOT manually opening modals.

React decides:

* when the dialog exists
* what the dialog shows
* when the dialog disappears

This is declarative rendering.

---

# Creating the Model

## `src\models\DialogState.ts`

```ts
export type DialogType =
  | "success"
  | "warning"
  | "delete";

export interface DialogState {
  open: boolean;
  type: DialogType;
  title: string;
  message: string;
}
```

This model defines:

* if the dialog is visible
* what type of dialog it is
* the title
* the message

This is important because enterprise applications should centralize UI state structure instead of scattering random booleans everywhere.

---

# Understanding Why This Model Matters

A beginner approach often looks like:

```tsx
const [isDeleteDialogOpen, setIsDeleteDialogOpen]
const [isWarningDialogOpen, setIsWarningDialogOpen]
const [isSuccessDialogOpen, setIsSuccessDialogOpen]
```

This scales poorly.

Instead, we use:

```tsx
const [dialogState, setDialogState]
```

This creates:

* cleaner architecture
* centralized dialog logic
* reusable patterns
* scalable UI management

---

# Building the Action Panel

## `src\components\ActionPanel.tsx`

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Delete24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";

import type { DialogState } from "../models/DialogState";

interface ActionPanelProps {
  onOpenDialog: (dialog: DialogState) => void;
}

export function ActionPanel({
  onOpenDialog,
}: ActionPanelProps) {
  return (
    <Card
      style={{
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Title2>Enterprise Actions</Title2>

      <Text>
        Select an action to open a Fluent UI dialog.
      </Text>

      <Button
        appearance="primary"
        icon={<CheckmarkCircle24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "success",
            title: "Operation Completed",
            message:
              "The enterprise process completed successfully.",
          })
        }
      >
        Success Dialog
      </Button>

      <Button
        appearance="secondary"
        icon={<Warning24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "warning",
            title: "Warning",
            message:
              "Please review the corporate policy settings.",
          })
        }
      >
        Warning Dialog
      </Button>

      <Button
        appearance="outline"
        icon={<Delete24Regular />}
        onClick={() =>
          onOpenDialog({
            open: true,
            type: "delete",
            title: "Delete Record",
            message:
              "This action cannot be undone.",
          })
        }
      >
        Delete Dialog
      </Button>
    </Card>
  );
}
```

---

# Understanding Callback Props

This line is extremely important:

```tsx
onOpenDialog: (dialog: DialogState) => void;
```

The parent component controls the dialog state.

The child component only requests changes.

This is React’s recommended architecture:

```txt
State lives in the parent.
Children receive props and callbacks.
```

Official documentation:

* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)

---

# Why This Pattern Matters

This creates:

* predictable rendering
* centralized state
* reusable components
* scalable architecture

Instead of the child directly mutating UI behavior, the parent remains the single source of truth.

---

# Building the Dialog Component

## `src\components\DialogManager.tsx`

```tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Text,
} from "@fluentui/react-components";

import type { DialogState } from "../models/DialogState";

interface DialogManagerProps {
  dialogState: DialogState;
  onClose: () => void;
}

export function DialogManager({
  dialogState,
  onClose,
}: DialogManagerProps) {
  return (
    <Dialog open={dialogState.open}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            {dialogState.title}
          </DialogTitle>

          <DialogContent>
            <Text>
              {dialogState.message}
            </Text>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={onClose}
              >
                Close
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
```

---

# Understanding Fluent UI Dialog Architecture

Fluent UI dialogs are highly structured.

The hierarchy is:

```txt
Dialog
  DialogSurface
    DialogBody
      DialogTitle
      DialogContent
      DialogActions
```

Each part has a responsibility.

---

# Why Enterprise UI Libraries Use Structured Dialogs

This architecture guarantees:

* accessibility
* keyboard navigation
* focus trapping
* screen reader compatibility
* overlay management
* enterprise styling consistency

Without a UI library, implementing accessible dialogs correctly is surprisingly difficult.

---

# Understanding the `open` Prop

```tsx
<Dialog open={dialogState.open}>
```

This is controlled UI.

React state determines visibility.

The dialog is NOT opening itself.

Instead:

```txt
State changes
→ React re-renders
→ Dialog receives open=true
→ Dialog appears
```

This reinforces the React mental model:

```txt
UI derives from state.
```

---

# Building the Root App

## `src\App.tsx`

```tsx
import { useState } from "react";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ActionPanel } from "./components/ActionPanel";
import { DialogManager } from "./components/DialogManager";

import type { DialogState } from "./models/DialogState";

const initialDialogState: DialogState = {
  open: false,
  type: "success",
  title: "",
  message: "",
};

function App() {
  const [dialogState, setDialogState] =
    useState<DialogState>(initialDialogState);

  function handleCloseDialog() {
    setDialogState({
      ...dialogState,
      open: false,
    });
  }

  return (
    <FluentProvider theme={webLightTheme}>
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
        <div
          style={{
            width: "420px",
          }}
        >
          <ActionPanel
            onOpenDialog={setDialogState}
          />

          <DialogManager
            dialogState={dialogState}
            onClose={handleCloseDialog}
          />
        </div>
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# Understanding the Main State Flow

The architecture flow is:

```txt
User clicks button
→ ActionPanel calls onOpenDialog()
→ App updates dialogState
→ React re-renders
→ DialogManager receives new props
→ Dialog becomes visible
```

This is pure declarative UI.

---

# Why `DialogManager` Receives Props

Notice:

```tsx
<DialogManager
  dialogState={dialogState}
  onClose={handleCloseDialog}
/>
```

The dialog component itself has no internal visibility logic.

This creates:

* predictable behavior
* reusable dialogs
* easier debugging
* centralized control

---

# Understanding Immutable Updates

```tsx
setDialogState({
  ...dialogState,
  open: false,
});
```

The spread operator copies the existing object and only changes:

* `open`

This follows immutable React update patterns.

Official documentation:

* [Updating Objects in State](https://react.dev/learn/updating-objects-in-state?utm_source=chatgpt.com)

---

# Why There Is No `useEffect`

This app intentionally avoids effects.

There is:

* no API
* no timers
* no external synchronization

Dialogs here are pure UI state.

According to React Learn:

> “Effects should synchronize with external systems.”

Official documentation:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# `src\main.tsx`

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

# Running the Application

Development server:

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# React Mental Model Introduced

This app reinforces a critical enterprise React concept:

```txt
Visibility is state.
Dialogs are derived UI.
React controls rendering.
```

React applications do NOT manually manipulate:

* DOM visibility
* CSS display toggles
* modal opening behavior

Instead:

```txt
State changes
→ React re-renders
→ UI updates automatically
```

---

# Technical Summary

| Concept               | Explanation                       |
| --------------------- | --------------------------------- |
| `useState`            | Component memory                  |
| Dialog State          | Centralized modal control         |
| Controlled Dialog     | Visibility derived from state     |
| Callback Props        | Child requests parent updates     |
| Fluent UI Dialog      | Enterprise modal system           |
| Immutable Updates     | Predictable state updates         |
| Conditional UI        | Dialog appears based on state     |
| Composition           | App → ActionPanel → DialogManager |
| TypeScript Interfaces | Strong typing                     |
| Declarative Rendering | UI derived from state             |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)
* [Updating Objects in State](https://react.dev/learn/updating-objects-in-state?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI Dialog](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/dialog)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

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
| Block 3 |  42 | Corporate Form               | Completed |
| Block 3 |  43 | Tabs Navigation              | Completed |
| Block 3 |  44 | Dialog Manager               | Current   |
| Block 3 |  45 | Executive Dashboard          | Next      |
