# App 17 — Layout SharePoint Style

App 17 is **Layout SharePoint**, a static enterprise page inspired by SharePoint-style portals. In the roadmap, App 17 belongs to **Block 1 — Fundamentals and UI** and is defined as “Layout estilo SharePoint / UI inspirada em SharePoint / Fluent UI enterprise.” 

React official docs emphasize building UIs from reusable components, and this app follows that model with `TopBar`, `LeftNavigation`, `HeroSection`, `QuickLinks`, and `NewsSection`. ([React][1]) Vite is used as the build tool and dev server for the React TypeScript app. ([vitejs][2])

## 1. Create the project

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app17-sharepoint-layout -- --template react-ts

cd app17-sharepoint-layout

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

## 2. Create folders and files

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\PortalLink.ts -ItemType File
New-Item src\models\NewsItem.ts -ItemType File

New-Item src\data\portalLinks.ts -ItemType File
New-Item src\data\newsItems.ts -ItemType File

New-Item src\components\TopBar.tsx -ItemType File
New-Item src\components\LeftNavigation.tsx -ItemType File
New-Item src\components\HeroSection.tsx -ItemType File
New-Item src\components\QuickLinks.tsx -ItemType File
New-Item src\components\NewsSection.tsx -ItemType File
```

## 3. `src\models\PortalLink.ts`

```ts
export interface PortalLink {
  id: number;
  title: string;
  description: string;
}
```

## 4. `src\models\NewsItem.ts`

```ts
export interface NewsItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  date: string;
}
```

## 5. `src\data\portalLinks.ts`

```ts
import type { PortalLink } from "../models/PortalLink";

export const portalLinks: PortalLink[] = [
  {
    id: 1,
    title: "Documents",
    description: "Access team files and shared libraries.",
  },
  {
    id: 2,
    title: "Projects",
    description: "Review active initiatives and delivery plans.",
  },
  {
    id: 3,
    title: "People",
    description: "Find departments, roles, and internal contacts.",
  },
  {
    id: 4,
    title: "Reports",
    description: "Open dashboards, KPIs, and monthly summaries.",
  },
];
```

## 6. `src\data\newsItems.ts`

```ts
import type { NewsItem } from "../models/NewsItem";

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New document governance model released",
    category: "Governance",
    summary: "The PMO team published new guidelines for document ownership.",
    date: "May 17, 2026",
  },
  {
    id: 2,
    title: "Quarterly portfolio review scheduled",
    category: "PMO",
    summary: "Project leads should update their delivery dashboards this week.",
    date: "May 16, 2026",
  },
  {
    id: 3,
    title: "SharePoint training material updated",
    category: "Training",
    summary: "The internal learning portal now includes new collaboration lessons.",
    date: "May 15, 2026",
  },
];
```

## 7. `src\components\TopBar.tsx`

```tsx
import {
  Avatar,
  Button,
  Text,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  AppFolder24Regular,
  Search24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand-area">
        <AppFolder24Regular />
        <Text weight="semibold" size={500}>
          Contoso SharePoint Portal
        </Text>
      </div>

      <Toolbar>
        <ToolbarButton icon={<Search24Regular />}>Search</ToolbarButton>
        <ToolbarButton icon={<Settings24Regular />}>Settings</ToolbarButton>
        <Button appearance="primary">New</Button>
        <Avatar name="Edvaldo Guimaraes" />
      </Toolbar>
    </header>
  );
}
```

## 8. `src\components\LeftNavigation.tsx`

```tsx
import { Button, Text } from "@fluentui/react-components";

import {
  Home24Regular,
  Document24Regular,
  People24Regular,
  ChartMultiple24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

const navigationItems = [
  { id: 1, title: "Home", icon: <Home24Regular /> },
  { id: 2, title: "Documents", icon: <Document24Regular /> },
  { id: 3, title: "Teams", icon: <People24Regular /> },
  { id: 4, title: "Reports", icon: <ChartMultiple24Regular /> },
  { id: 5, title: "Settings", icon: <Settings24Regular /> },
];

export function LeftNavigation() {
  return (
    <aside className="left-navigation">
      <Text weight="semibold" size={300}>
        Navigation
      </Text>

      <nav className="nav-list">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            appearance="subtle"
            icon={item.icon}
            className="nav-button"
          >
            {item.title}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
```

## 9. `src\components\HeroSection.tsx`

```tsx
import { Badge, Button, Card, Text, Title1 } from "@fluentui/react-components";

export function HeroSection() {
  return (
    <Card className="hero-card">
      <Badge appearance="filled">Corporate Portal</Badge>

      <Title1>Welcome to the SharePoint Style Layout</Title1>

      <Text size={400}>
        This static React page simulates a modern intranet landing experience
        using Fluent UI, reusable components, typed data, and enterprise layout
        composition.
      </Text>

      <div className="hero-actions">
        <Button appearance="primary">Open Documents</Button>
        <Button appearance="secondary">View Reports</Button>
      </div>
    </Card>
  );
}
```

## 10. `src\components\QuickLinks.tsx`

```tsx
import { Card, CardHeader, Text, Title3 } from "@fluentui/react-components";
import { Folder24Regular } from "@fluentui/react-icons";
import { portalLinks } from "../data/portalLinks";

export function QuickLinks() {
  return (
    <section>
      <Title3>Quick links</Title3>

      <div className="quick-links-grid">
        {portalLinks.map((link) => (
          <Card key={link.id} className="portal-card">
            <CardHeader
              image={<Folder24Regular />}
              header={<Text weight="semibold">{link.title}</Text>}
              description={<Text size={200}>{link.description}</Text>}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}
```

## 11. `src\components\NewsSection.tsx`

```tsx
import { Badge, Card, Text, Title3 } from "@fluentui/react-components";
import { newsItems } from "../data/newsItems";

export function NewsSection() {
  return (
    <section>
      <Title3>Latest news</Title3>

      <div className="news-list">
        {newsItems.map((item) => (
          <Card key={item.id} className="news-card">
            <div className="news-card-header">
              <Badge appearance="tint">{item.category}</Badge>
              <Text size={200}>{item.date}</Text>
            </div>

            <Text weight="semibold">{item.title}</Text>
            <Text size={300}>{item.summary}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

## 12. `src\App.tsx`

```tsx
import { HeroSection } from "./components/HeroSection";
import { LeftNavigation } from "./components/LeftNavigation";
import { NewsSection } from "./components/NewsSection";
import { QuickLinks } from "./components/QuickLinks";
import { TopBar } from "./components/TopBar";

import "./styles/app.css";

function App() {
  return (
    <div className="app-shell">
      <TopBar />

      <div className="page-layout">
        <LeftNavigation />

        <main className="main-content">
          <HeroSection />
          <QuickLinks />
          <NewsSection />
        </main>
      </div>
    </div>
  );
}

export default App;
```

## 13. `src\main.tsx`

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

## 14. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  background-color: #f5f5f5;
}

* {
  box-sizing: border-box;
}
```

## 15. `src\styles\app.css`

```css
.app-shell {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.top-bar {
  height: 64px;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-layout {
  display: flex;
  min-height: calc(100vh - 64px);
}

.left-navigation {
  width: 260px;
  padding: 24px;
  background-color: #ffffff;
  border-right: 1px solid #e5e5e5;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.nav-button {
  justify-content: flex-start;
}

.main-content {
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.portal-card {
  padding: 16px;
}

.news-list {
  display: grid;
  gap: 16px;
  margin-top: 16px;
}

.news-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

## 16. Run and validate

```powershell
npm run dev
```

```powershell
npm run build
```

```powershell
npm run preview
```

## What this app teaches

| Concept                 | Where it appears                                                         |
| ----------------------- | ------------------------------------------------------------------------ |
| SharePoint-style shell  | `TopBar`, `LeftNavigation`, `main-content`                               |
| Component composition   | `App → TopBar / LeftNavigation / HeroSection / QuickLinks / NewsSection` |
| Static typed data       | `portalLinks.ts`, `newsItems.ts`                                         |
| TypeScript models       | `PortalLink.ts`, `NewsItem.ts`                                           |
| List rendering          | `portalLinks.map`, `newsItems.map`                                       |
| Stable keys             | `key={link.id}`, `key={item.id}`                                         |
| Fluent UI enterprise UI | `Card`, `Button`, `Toolbar`, `Avatar`, `Badge`                           |
| CSS layout              | Flexbox, CSS Grid, shell layout                                          |
| No unnecessary effects  | Static page, no API, no `useEffect`                                      |

## Current project progress

| Block   | App | Name                       | Status    |
| ------- | --: | -------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent         | Completed |
| Block 1 |  02 | Profile Card               | Completed |
| Block 1 |  03 | Product List               | Completed |
| Block 1 |  04 | Microsoft Style User Card  | Completed |
| Block 1 |  05 | Static Dashboard           | Completed |
| Block 1 |  06 | Corporate Sidebar Menu     | Completed |
| Block 1 |  07 | Visual Task List           | Completed |
| Block 1 |  08 | Timeline of Events         | Completed |
| Block 1 |  09 | Employee Table             | Completed |
| Block 1 |  10 | Email List                 | Completed |
| Block 1 |  11 | Grid of Cards              | Completed |
| Block 1 |  12 | Image Gallery              | Completed |
| Block 1 |  13 | Movie Catalog              | Completed |
| Block 1 |  14 | Football Teams List        | Completed |
| Block 1 |  15 | News Page                  | Completed |
| Block 1 |  16 | Static Financial Dashboard | Completed |
| Block 1 |  17 | SharePoint Style Layout    | Current   |
| Block 1 |  18 | File Explorer              | Next      |

[1]: https://react.dev/?utm_source=chatgpt.com "React"
[2]: https://vite.dev/guide/?utm_source=chatgpt.com "Getting Started"
