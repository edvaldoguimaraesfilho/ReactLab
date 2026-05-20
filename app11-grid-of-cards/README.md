# App 11 — Grid of Cards

App 11 is **Grid of Cards**, inside **Block 1 — Fundamentals and UI**. The project list defines App 11 as **“Grid de Cards”**, focused on **dashboard grid, CSS Grid, and reusable components**.  

## Goal

Build a static enterprise dashboard using:

| Concept          | Used for                            |
| ---------------- | ----------------------------------- |
| React components | Split UI into reusable parts        |
| Props            | Send card data into each card       |
| TypeScript model | Define the card structure           |
| Static data file | Keep data separate from UI          |
| CSS Grid         | Build a responsive dashboard layout |
| Fluent UI Card   | Microsoft-style card layout         |

---

# 1. Create the project

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app11-grid-of-cards -- --template react-ts

cd app11-grid-of-cards

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

# 2. Create folders and files

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\DashboardCard.ts -ItemType File
New-Item src\data\dashboardCards.ts -ItemType File
New-Item src\components\DashboardCardItem.tsx -ItemType File
New-Item src\components\DashboardGrid.tsx -ItemType File
```

---

# 3. `src\models\DashboardCard.ts`

```ts
export interface DashboardCard {
  id: number;
  title: string;
  description: string;
  value: string;
  category: string;
}
```

---

# 4. `src\data\dashboardCards.ts`

```ts
import type { DashboardCard } from "../models/DashboardCard";

export const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: "Active Projects",
    description: "Projects currently being executed by the delivery team.",
    value: "24",
    category: "Delivery",
  },
  {
    id: 2,
    title: "Open Tickets",
    description: "Support requests waiting for technical review.",
    value: "138",
    category: "Support",
  },
  {
    id: 3,
    title: "Monthly Reports",
    description: "Reports generated for business and compliance areas.",
    value: "16",
    category: "Reporting",
  },
  {
    id: 4,
    title: "Team Members",
    description: "People currently assigned to enterprise initiatives.",
    value: "42",
    category: "People",
  },
  {
    id: 5,
    title: "Pending Reviews",
    description: "Documents and requests waiting for approval.",
    value: "9",
    category: "Governance",
  },
  {
    id: 6,
    title: "Completed Tasks",
    description: "Tasks completed during the current work cycle.",
    value: "312",
    category: "Productivity",
  },
];
```

---

# 5. `src\components\DashboardCardItem.tsx`

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

import { Board24Regular } from "@fluentui/react-icons";

import type { DashboardCard } from "../models/DashboardCard";

interface DashboardCardItemProps {
  card: DashboardCard;
}

export function DashboardCardItem({ card }: DashboardCardItemProps) {
  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "180px",
      }}
    >
      <CardHeader
        image={<Board24Regular />}
        header={<Title3>{card.title}</Title3>}
        description={<Caption1>{card.category}</Caption1>}
      />

      <Text
        size={900}
        weight="semibold"
        style={{
          marginTop: "12px",
        }}
      >
        {card.value}
      </Text>

      <Body1>{card.description}</Body1>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance="tint">{card.category}</Badge>
      </div>
    </Card>
  );
}
```

---

# 6. `src\components\DashboardGrid.tsx`

```tsx
import { dashboardCards } from "../data/dashboardCards";
import { DashboardCardItem } from "./DashboardCardItem";

export function DashboardGrid() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {dashboardCards.map((card) => (
        <DashboardCardItem key={card.id} card={card} />
      ))}
    </section>
  );
}
```

---

# 7. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { DashboardGrid } from "./components/DashboardGrid";

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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise Card Grid</Title1>

        <Text>
          A responsive dashboard grid built with React, TypeScript, CSS Grid,
          and Fluent UI.
        </Text>

        <DashboardGrid />
      </section>
    </main>
  );
}

export default App;
```

---

# 8. `src\main.tsx`

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

# 9. `src\index.css`

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

# 10. Run and validate

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

# Technical Summary

| File                    | Responsibility               |
| ----------------------- | ---------------------------- |
| `DashboardCard.ts`      | Defines the TypeScript model |
| `dashboardCards.ts`     | Stores static dashboard data |
| `DashboardCardItem.tsx` | Renders one reusable card    |
| `DashboardGrid.tsx`     | Renders the responsive grid  |
| `App.tsx`               | Composes the page            |
| `main.tsx`              | Mounts React and Fluent UI   |
| `index.css`             | Defines global CSS reset     |

---

# Current App Progress

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
| Block 1 |  11 | Grid of Cards             | Current   |
| Block 1 |  12 | Image Gallery             | Next      |
