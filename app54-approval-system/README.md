```powershell
New-Item artigo.md -ItemType File
```

# Technical Blog Article — App 54: Approval System with React, TypeScript, Vite, and Fluent UI

## Introduction

In **App 54 — Approval System**, we continue advancing through **Block 3 — Professional Fluent UI Applications**, where the focus is enterprise interface architecture using React and the Microsoft Fluent UI ecosystem. According to the project roadmap, App 54 is officially the **Approval System**, following the Ticket Manager and preceding the Corporate Agenda application. 

This application introduces one of the most common enterprise workflows:

```txt
Pending Request
→ Review
→ Approve or Reject
→ UI updates automatically
```

Approval systems appear everywhere in enterprise software:

* SharePoint workflows
* Microsoft Teams integrations
* HR systems
* ERP systems
* financial approval chains
* procurement systems
* document approval portals
* ticket escalation systems
* administrative dashboards

The main purpose of this app is to teach how React handles:

* state-driven enterprise workflows
* conditional rendering
* immutable state updates
* list rendering
* derived UI
* action-driven component updates
* enterprise component composition

The app intentionally avoids:

* APIs
* databases
* authentication
* backend persistence

because the goal is to master the React rendering model first.

This app follows the official React mental model:

```txt
UI = function(state)
```

Official references:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 1. What This App Teaches

| Concept               | Description                         |
| --------------------- | ----------------------------------- |
| Enterprise workflow   | Simulates approval processes        |
| State-driven UI       | Requests change visually from state |
| Immutable updates     | Arrays updated safely               |
| Conditional rendering | Status changes affect UI            |
| Fluent UI Cards       | Enterprise approval panels          |
| React list rendering  | Dynamic request rendering           |
| Derived appearance    | Badge styles derived from status    |
| Component composition | Small reusable UI pieces            |

The architectural goal is understanding:

```txt
Data changes
→ React re-renders
→ Enterprise UI updates automatically
```

---

# 2. Create the Project

## Create the application

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app54-approval-system -- --template react-ts

cd app54-approval-system

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 3. Create the Folder Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\ApprovalRequest.ts -ItemType File
New-Item src\data\approvalRequests.ts -ItemType File
New-Item src\components\ApprovalCard.tsx -ItemType File
New-Item src\components\ApprovalBoard.tsx -ItemType File
New-Item artigo.md -ItemType File
```

---

# 4. Final Project Structure

```txt
app54-approval-system/
  src/
    components/
      ApprovalCard.tsx
      ApprovalBoard.tsx

    data/
      approvalRequests.ts

    models/
      ApprovalRequest.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
  package.json
  vite.config.ts
```

This structure follows the ReactLab architecture pattern.

---

# 5. Create the Approval Model

## `src\models\ApprovalRequest.ts`

```ts
export type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export interface ApprovalRequest {
  id: number;
  title: string;
  requester: string;
  department: string;
  status: ApprovalStatus;
  description: string;
}
```

---

# 6. Understanding the Model

The interface defines the shape of each approval request.

This gives the application:

* predictable data
* safer refactoring
* autocomplete
* enterprise consistency
* type safety

Each request contains:

* identification
* requester information
* department
* approval status
* workflow description

This is enterprise-style modeling.

---

# 7. Create Initial Data

## `src\data\approvalRequests.ts`

```ts
import type { ApprovalRequest } from "../models/ApprovalRequest";

export const approvalRequests: ApprovalRequest[] = [
  {
    id: 1,
    title: "Budget Expansion",
    requester: "Maria Johnson",
    department: "Finance",
    status: "Pending",
    description:
      "Request for additional quarterly operational budget.",
  },
  {
    id: 2,
    title: "Hardware Purchase",
    requester: "David Wilson",
    department: "Infrastructure",
    status: "Pending",
    description:
      "Approval required for enterprise workstation acquisition.",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    requester: "Sophia Miller",
    department: "Marketing",
    status: "Approved",
    description:
      "Digital campaign approved for Q4 execution.",
  },
];
```

---

# 8. Why Static Data Matters

At this stage we intentionally use local data.

This helps isolate the React concepts:

* rendering
* state updates
* component composition
* derived UI

without introducing:

* APIs
* async behavior
* loading states
* server synchronization

This is aligned with React Learn philosophy:
learn rendering first, external synchronization later.

---

# 9. Create the Approval Card

## `src\components\ApprovalCard.tsx`

```tsx
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  Clock24Regular,
} from "@fluentui/react-icons";

import type {
  ApprovalRequest,
  ApprovalStatus,
} from "../models/ApprovalRequest";

interface ApprovalCardProps {
  request: ApprovalRequest;
  onUpdateStatus: (
    id: number,
    status: ApprovalStatus
  ) => void;
}

function getStatusIcon(status: ApprovalStatus) {
  if (status === "Approved") {
    return <CheckmarkCircle24Regular />;
  }

  if (status === "Rejected") {
    return <DismissCircle24Regular />;
  }

  return <Clock24Regular />;
}

function getBadgeAppearance(status: ApprovalStatus) {
  if (status === "Approved") {
    return "filled" as const;
  }

  if (status === "Rejected") {
    return "outline" as const;
  }

  return "tint" as const;
}

export function ApprovalCard({
  request,
  onUpdateStatus,
}: ApprovalCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <CardHeader
        image={getStatusIcon(request.status)}
        header={<Title3>{request.title}</Title3>}
        description={
          <Text>
            {request.requester} — {request.department}
          </Text>
        }
      />

      <Text>{request.description}</Text>

      <Badge appearance={getBadgeAppearance(request.status)}>
        {request.status}
      </Badge>

      {request.status === "Pending" && (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Button
            appearance="primary"
            onClick={() =>
              onUpdateStatus(request.id, "Approved")
            }
          >
            Approve
          </Button>

          <Button
            appearance="secondary"
            onClick={() =>
              onUpdateStatus(request.id, "Rejected")
            }
          >
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}
```

---

# 10. Understanding Conditional Rendering

This section is extremely important:

```tsx
{request.status === "Pending" && (
```

This means:

```txt
Only show the action buttons
if the request is still pending.
```

This is declarative rendering.

We do not manually hide elements.

Instead:

```txt
State changes
→ React decides what should appear
```

Official documentation:

* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

---

# 11. Understanding Derived UI

Notice this:

```tsx
getBadgeAppearance(request.status)
```

The badge appearance is derived from the request status.

This means:

* Approved → filled
* Rejected → outline
* Pending → tint

The UI derives from data.

This is the React mental model.

---

# 12. Create the Approval Board

## `src\components\ApprovalBoard.tsx`

```tsx
import { useState } from "react";

import {
  Title1,
  Text,
} from "@fluentui/react-components";

import { approvalRequests } from "../data/approvalRequests";

import {
  ApprovalCard,
} from "./ApprovalCard";

import type {
  ApprovalRequest,
  ApprovalStatus,
} from "../models/ApprovalRequest";

export function ApprovalBoard() {
  const [requests, setRequests] =
    useState<ApprovalRequest[]>(
      approvalRequests
    );

  function handleUpdateStatus(
    id: number,
    status: ApprovalStatus
  ) {
    setRequests((currentRequests) =>
      currentRequests.map((request) => {
        if (request.id === id) {
          return {
            ...request,
            status,
          };
        }

        return request;
      })
    );
  }

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title1>Enterprise Approval System</Title1>

      <Text>
        React and Fluent UI approval workflow dashboard.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        {requests.map((request) => (
          <ApprovalCard
            key={request.id}
            request={request}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </section>
  );
}
```

---

# 13. Understanding Immutable Updates

The critical logic is:

```tsx
setRequests((currentRequests) =>
  currentRequests.map((request) => {
```

This is immutable array updating.

React expects state to be immutable.

We do not mutate:

```tsx
request.status = status;
```

That is incorrect.

Instead we create a new object:

```tsx
return {
  ...request,
  status,
};
```

This creates:

* predictable rendering
* safer state updates
* easier debugging
* React-friendly architecture

Official documentation:

* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)

---

# 14. Why `map()` Matters

`map()` transforms arrays.

Conceptually:

```txt
Request data
→ ApprovalCard components
```

React rendering is heavily based on:

* arrays
* mapping
* composition

This is one of the most important React patterns.

---

# 15. Create `App.tsx`

## `src\App.tsx`

```tsx
import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ApprovalBoard } from "./components/ApprovalBoard";

function App() {
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
        <ApprovalBoard />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# 16. Create `main.tsx`

## `src\main.tsx`

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

# 17. Create `index.css`

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

---

# 18. Run the Application

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

# 19. Complete Rendering Flow

```txt
User clicks Approve
→ handleUpdateStatus executes
→ React state updates
→ requests array changes
→ React re-renders ApprovalBoard
→ ApprovalCard receives new status
→ Badge changes automatically
→ Buttons disappear
```

This is pure React architecture.

---

# 20. Why There Is No `useEffect`

This app intentionally avoids `useEffect`.

There is no:

* API synchronization
* timers
* subscriptions
* browser events
* localStorage sync

Everything is internal UI state.

So:

* `useState` is correct
* `useEffect` would be unnecessary

Official guidance:

* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

---

# 21. Technical Summary

| Concept               | Explanation                        |
| --------------------- | ---------------------------------- |
| `useState`            | Stores approval requests           |
| Immutable updates     | Arrays updated safely              |
| `map()` rendering     | Dynamic card rendering             |
| Conditional rendering | Buttons hidden after approval      |
| Fluent UI Card        | Enterprise approval container      |
| Derived UI            | Badge appearance depends on status |
| TypeScript model      | Strong typing                      |
| Callback props        | Child triggers parent updates      |
| React rendering       | UI derived from state              |
| FluentProvider        | Global Microsoft theme             |

---

# 22. Concept Table

| Concept               | File                  | Purpose                          |
| --------------------- | --------------------- | -------------------------------- |
| Approval model        | `ApprovalRequest.ts`  | Defines request structure        |
| Static data           | `approvalRequests.ts` | Initial enterprise workflow data |
| Approval card         | `ApprovalCard.tsx`    | Individual approval UI           |
| Approval board        | `ApprovalBoard.tsx`   | State owner and rendering        |
| Conditional rendering | `ApprovalCard.tsx`    | Show/hide actions                |
| Immutable updates     | `ApprovalBoard.tsx`   | Safe React updates               |
| Enterprise layout     | `App.tsx`             | Full-screen dashboard            |
| Global styling        | `index.css`           | Reset browser defaults           |

---

# 23. Official Documentation

| Topic                       | Documentation                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React Learn                 | [React Learn](https://react.dev/learn?utm_source=chatgpt.com)                                                     |
| Rendering Lists             | [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)                                 |
| Conditional Rendering       | [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)                     |
| Updating Arrays in State    | [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)               |
| State: A Component’s Memory | [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)           |
| Fluent UI Components        | [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web) |
| Fluent UI Card              | [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)        |
| Fluent UI Badge             | [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)      |
| Vite Guide                  | [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)                                                      |
| TypeScript Docs             | [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)                                    |

---

# 24. Final Architectural Insight

The most important lesson from App 54 is:

```txt
Enterprise workflows are state transitions.
```

A request changes from:

* Pending
* Approved
* Rejected

React simply reflects the current state visually.

This same architecture appears later in:

* ticket systems
* SharePoint workflows
* approval chains
* CRMs
* ERP dashboards
* Microsoft admin portals
* enterprise DataGrid systems

Mastering this pattern prepares you for real enterprise React development.

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
| Block 3 |  44 | Dialog Manager               | Completed |
| Block 3 |  45 | Executive Dashboard          | Completed |
| Block 3 |  46 | DataGrid Catalog             | Completed |
| Block 3 |  47 | Enterprise User List         | Completed |
| Block 3 |  48 | Sidebar Navigation           | Completed |
| Block 3 |  49 | Corporate Header             | Completed |
| Block 3 |  50 | Professional Toolbar         | Completed |
| Block 3 |  51 | Notification Center          | Completed |
| Block 3 |  52 | Administrative Panel         | Completed |
| Block 3 |  53 | Ticket Manager               | Completed |
| Block 3 |  54 | Approval System              | Current   |
| Block 3 |  55 | Corporate Agenda             | Next      |
