```powershell
mkdir bloco03
cd bloco03

npm create vite@latest app51-notification-center -- --template react-ts

cd app51-notification-center

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

Create folders:

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory
```

Create files:

```powershell
New-Item src\models\NotificationItem.ts -ItemType File
New-Item src\data\notifications.ts -ItemType File
New-Item src\components\NotificationCard.tsx -ItemType File
New-Item src\components\NotificationList.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# App 51 — Notification Center

App 51 belongs to Block 3 — Professional Fluent UI Applications. According to the ReactLab roadmap, App 51 is the first large notification-focused enterprise UI system. 

This app introduces:

* enterprise notification layouts
* reusable notification cards
* dynamic list rendering
* conditional visual rendering
* Fluent UI Badge and Card systems
* status-driven UI
* Microsoft-style alert systems
* typed notification models

This is one of the most common UI patterns in:

* Microsoft 365
* SharePoint
* Teams
* Azure portals
* Admin Centers
* CRM systems
* ERP systems
* Enterprise dashboards

The key React mental model is:

```txt
Data
→ React rendering
→ UI composition
→ visual notification system
```

---

# Final Folder Structure

```txt
app51-notification-center/
  src/
    components/
      NotificationCard.tsx
      NotificationList.tsx

    data/
      notifications.ts

    models/
      NotificationItem.ts

    styles/

    App.tsx
    main.tsx
    index.css

  artigo.md
```

---

# 1. Create the Notification Model

## `src\models\NotificationItem.ts`

```ts
export type NotificationType =
  | "success"
  | "warning"
  | "error"
  | "info";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
}
```

---

# 2. Create the Notification Data

## `src\data\notifications.ts`

```ts
import type { NotificationItem } from "../models/NotificationItem";

export const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Deployment Completed",
    message:
      "The production deployment completed successfully.",
    type: "success",
    createdAt: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Storage Warning",
    message:
      "The storage usage exceeded 80% of the allocated quota.",
    type: "warning",
    createdAt: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "Authentication Failure",
    message:
      "Multiple failed login attempts were detected.",
    type: "error",
    createdAt: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System Update",
    message:
      "A new enterprise dashboard update is available.",
    type: "info",
    createdAt: "2 hours ago",
    read: true,
  },
];
```

---

# 3. Create the Notification Card Component

## `src\components\NotificationCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Warning24Regular,
  ErrorCircle24Regular,
  Info24Regular,
} from "@fluentui/react-icons";

import type {
  NotificationItem,
  NotificationType,
} from "../models/NotificationItem";

interface NotificationCardProps {
  notification: NotificationItem;
}

function getNotificationIcon(type: NotificationType) {
  if (type === "success") {
    return <CheckmarkCircle24Regular />;
  }

  if (type === "warning") {
    return <Warning24Regular />;
  }

  if (type === "error") {
    return <ErrorCircle24Regular />;
  }

  return <Info24Regular />;
}

function getBadgeAppearance(type: NotificationType) {
  if (type === "success") {
    return "filled" as const;
  }

  if (type === "warning") {
    return "tint" as const;
  }

  if (type === "error") {
    return "outline" as const;
  }

  return "ghost" as const;
}

export function NotificationCard({
  notification,
}: NotificationCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        width: "100%",
        borderLeft: notification.read
          ? "4px solid #d1d1d1"
          : "4px solid #0f6cbd",
      }}
    >
      <CardHeader
        image={getNotificationIcon(notification.type)}
        header={
          <Title3>
            {notification.title}
          </Title3>
        }
        description={
          <Caption1>
            {notification.createdAt}
          </Caption1>
        }
      />

      <Body1
        style={{
          marginTop: "12px",
        }}
      >
        {notification.message}
      </Body1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Badge
          appearance={getBadgeAppearance(
            notification.type
          )}
        >
          {notification.type.toUpperCase()}
        </Badge>

        <Text size={200}>
          {notification.read
            ? "Read"
            : "Unread"}
        </Text>
      </div>
    </Card>
  );
}
```

---

# 4. Create the Notification List

## `src\components\NotificationList.tsx`

```tsx
import { notifications } from "../data/notifications";
import { NotificationCard } from "./NotificationCard";

export function NotificationList() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
}
```

---

# 5. Create the Root App

## `src\App.tsx`

```tsx
import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { NotificationList } from "./components/NotificationList";

function App() {
  return (
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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Card
          style={{
            padding: "32px",
          }}
        >
          <Title1>
            Enterprise Notification Center
          </Title1>

          <Text>
            Centralized Microsoft-style notification
            management built with React, TypeScript,
            and Fluent UI.
          </Text>

          <NotificationList />
        </Card>
      </section>
    </main>
  );
}

export default App;
```

---

# 6. Create `main.tsx`

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

# 7. Create Global CSS

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

# 8. Run the App

Development:

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

# 9. Understanding the Architecture

The rendering flow is:

```txt
main.tsx
  renders App

App
  renders NotificationList

NotificationList
  maps notification data

NotificationCard
  renders enterprise notification UI
```

The component hierarchy is:

```txt
App
  NotificationList
    NotificationCard
    NotificationCard
    NotificationCard
```

This is pure React composition.

---

# 10. Why `map()` Matters

This line:

```tsx
notifications.map(...)
```

is one of the most important React rendering patterns.

React transforms:

```txt
Notification data
```

into:

```txt
Rendered UI
```

This is declarative rendering.

We are not manually creating DOM elements.

We describe:

```txt
For each notification,
render a NotificationCard.
```

React handles the DOM updates automatically.

Official React documentation:

* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

---

# 11. Why TypeScript Matters

The model:

```ts
NotificationItem
```

guarantees that every notification has:

* id
* title
* message
* type
* createdAt
* read

Without TypeScript:

* data becomes unpredictable
* rendering errors become easier
* refactoring becomes dangerous

This is critical in enterprise React systems.

---

# 12. Why Fluent UI Matters

The app uses:

* Card
* Badge
* Typography
* Fluent icons

Fluent UI automatically provides:

* Microsoft styling
* spacing
* accessibility
* typography consistency
* keyboard support
* enterprise visual identity

Official documentation:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# 13. Why No `useState` Yet?

This app is intentionally static.

There is:

* no live notification updates
* no API
* no dismissal system
* no async behavior

The goal is to master:

* rendering
* composition
* enterprise layout
* data-driven UI

before introducing interactivity.

This follows the React Learn philosophy:

* first understand rendering
* then understand interactivity

Official React documentation:

* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)

---

# 14. Technical Summary

| Concept               | Explanation                         |
| --------------------- | ----------------------------------- |
| TypeScript Model      | Defines the notification structure  |
| Static Data Source    | Simulates enterprise notifications  |
| NotificationCard      | Reusable notification component     |
| NotificationList      | Renders the notification collection |
| `map()`               | Converts data into UI               |
| Fluent UI Card        | Enterprise notification container   |
| Fluent UI Badge       | Status visualization                |
| Conditional Rendering | Different icons and badges per type |
| Composition           | App → List → Card                   |
| Declarative UI        | UI derived from data                |

---

# 15. Concept Table

| Concept            | File                   | Purpose                |
| ------------------ | ---------------------- | ---------------------- |
| Notification model | `NotificationItem.ts`  | Strong typing          |
| Notification data  | `notifications.ts`     | Static enterprise data |
| Reusable card      | `NotificationCard.tsx` | UI composition         |
| List rendering     | `NotificationList.tsx` | Dynamic rendering      |
| Root layout        | `App.tsx`              | Enterprise shell       |
| Fluent Provider    | `main.tsx`             | Microsoft theming      |
| Global CSS         | `index.css`            | Layout reset           |

---

# 16. Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Describing the UI](https://react.dev/learn/describing-the-ui?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Keeping Components Pure](https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI Card](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/card)
* [Fluent UI Badge](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/badge)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# 17. Final React Mental Model

This app reinforces one of the most important React ideas:

```txt
Data
→ Component rendering
→ UI
```

React applications should not manually manipulate the DOM.

Instead:

* data describes the interface
* components render the interface
* React synchronizes the DOM

This is the foundation of scalable enterprise React architecture.

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
| Block 3 |  51 | Notification Center          | Current   |
| Block 3 |  52 | Administrative Panel         | Next      |
