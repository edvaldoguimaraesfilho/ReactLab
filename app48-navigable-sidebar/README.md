Yes. Let’s redo **App 48 correctly**: data will stay in `.ts`, and JSX icons will stay only inside `.tsx` components.

# App 48 — Correct Structure

```powershell
cd C:\ReactApps\bloco03

Remove-Item app48-navigable-sidebar -Recurse -Force

npm create vite@latest app48-navigable-sidebar -- --template react-ts
cd app48-navigable-sidebar

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\NavigationItem.ts -ItemType File
New-Item src\data\navigationItems.ts -ItemType File
New-Item src\components\Sidebar.tsx -ItemType File
New-Item src\components\PageContent.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# `src\models\NavigationItem.ts`

```ts
export type NavigationIconKey =
  | "dashboard"
  | "users"
  | "documents"
  | "analytics"
  | "settings";

export interface NavigationItem {
  id: string;
  label: string;
  description: string;
  iconKey: NavigationIconKey;
}
```

# `src\data\navigationItems.ts`

```ts
import type { NavigationItem } from "../models/NavigationItem";

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Enterprise overview with KPIs and activity summary.",
    iconKey: "dashboard",
  },
  {
    id: "users",
    label: "Users",
    description: "Manage enterprise users, departments, and roles.",
    iconKey: "users",
  },
  {
    id: "documents",
    label: "Documents",
    description: "Access corporate files, policies, and reports.",
    iconKey: "documents",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Review business metrics and performance indicators.",
    iconKey: "analytics",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Configure application preferences and system options.",
    iconKey: "settings",
  },
];
```

# `src\components\Sidebar.tsx`

```tsx
import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  Home24Regular,
  People24Regular,
  Document24Regular,
  Settings24Regular,
  ChartMultiple24Regular,
} from "@fluentui/react-icons";

import type {
  NavigationIconKey,
  NavigationItem,
} from "../models/NavigationItem";

interface SidebarProps {
  items: NavigationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function getNavigationIcon(iconKey: NavigationIconKey) {
  switch (iconKey) {
    case "dashboard":
      return <Home24Regular />;

    case "users":
      return <People24Regular />;

    case "documents":
      return <Document24Regular />;

    case "analytics":
      return <ChartMultiple24Regular />;

    case "settings":
      return <Settings24Regular />;
  }
}

export function Sidebar({
  items,
  selectedId,
  onSelect,
}: SidebarProps) {
  return (
    <Card
      style={{
        width: "280px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title2>ReactLab</Title2>

      <Text size={200}>Enterprise Navigation</Text>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        {items.map((item) => (
          <Button
            key={item.id}
            icon={getNavigationIcon(item.iconKey)}
            appearance={selectedId === item.id ? "primary" : "subtle"}
            onClick={() => onSelect(item.id)}
            style={{
              justifyContent: "flex-start",
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
```

# `src\components\PageContent.tsx`

```tsx
import {
  Card,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import type { NavigationItem } from "../models/NavigationItem";

interface PageContentProps {
  selectedItem: NavigationItem;
}

export function PageContent({
  selectedItem,
}: PageContentProps) {
  return (
    <main
      style={{
        flex: 1,
        padding: "40px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>{selectedItem.label}</Title1>

      <Text>{selectedItem.description}</Text>

      <Card
        style={{
          marginTop: "32px",
          padding: "32px",
        }}
      >
        <Title3>Current Section</Title3>

        <Text>
          You are viewing the {selectedItem.label} area. The content changes
          because React state controls the selected navigation item.
        </Text>
      </Card>
    </main>
  );
}
```

# `src\App.tsx`

```tsx
import { useState } from "react";

import { navigationItems } from "./data/navigationItems";
import { Sidebar } from "./components/Sidebar";
import { PageContent } from "./components/PageContent";

function App() {
  const [selectedId, setSelectedId] = useState("dashboard");

  const selectedItem =
    navigationItems.find((item) => item.id === selectedId) ??
    navigationItems[0];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar
        items={navigationItems}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      <PageContent selectedItem={selectedItem} />
    </div>
  );
}

export default App;
```

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

# Run

```powershell
npm run dev
npm run build
npm run preview
```

Correct rule:

| File   | Correct content                        |
| ------ | -------------------------------------- |
| `.ts`  | Types, interfaces, data, no JSX        |
| `.tsx` | React components, JSX, Fluent UI icons |

# Where we are

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 3 |  47 | Enterprise User List | Completed |
| Block 3 |  48 | Navigable Sidebar    | Current   |
| Block 3 |  49 | Corporate Header     | Next      |
