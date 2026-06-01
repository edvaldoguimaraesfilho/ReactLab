# App 56 — Dashboard SharePoint Inspired

## 1. Criar o projeto

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app56-sharepoint-inspired-dashboard -- --template react-ts

cd app56-sharepoint-inspired-dashboard

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

## 2. Criar pastas e arquivos

```powershell
New-Item src\components -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\DashboardModels.ts -ItemType File
New-Item src\data\dashboardData.ts -ItemType File

New-Item src\components\DashboardHeader.tsx -ItemType File
New-Item src\components\QuickLinks.tsx -ItemType File
New-Item src\components\NewsSection.tsx -ItemType File
New-Item src\components\MetricsPanel.tsx -ItemType File
New-Item src\components\ActivityPanel.tsx -ItemType File

New-Item artigo.md -ItemType File
```

# Estrutura final

```txt
app56-sharepoint-inspired-dashboard/
  src/
    components/
      ActivityPanel.tsx
      DashboardHeader.tsx
      MetricsPanel.tsx
      NewsSection.tsx
      QuickLinks.tsx

    data/
      dashboardData.ts

    models/
      DashboardModels.ts

    styles/

    App.tsx
    main.tsx
    index.css
```

# 3. `src\models\DashboardModels.ts`

```ts
export interface QuickLinkItem {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  publishedDate: string;
}

export interface MetricItem {
  id: number;
  label: string;
  value: string;
  description: string;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}
```

# 4. `src\data\dashboardData.ts`

```ts
import type {
  ActivityItem,
  MetricItem,
  NewsItem,
  QuickLinkItem,
} from "../models/DashboardModels";

export const quickLinks: QuickLinkItem[] = [
  {
    id: 1,
    title: "Documents",
    description: "Access corporate document libraries.",
    url: "#",
  },
  {
    id: 2,
    title: "Projects",
    description: "Open the project management workspace.",
    url: "#",
  },
  {
    id: 3,
    title: "Teams",
    description: "View department and team resources.",
    url: "#",
  },
  {
    id: 4,
    title: "Reports",
    description: "Open business reports and dashboards.",
    url: "#",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New SharePoint Portal Layout Released",
    category: "Intranet",
    summary:
      "The corporate portal now includes improved navigation, quick links, and dashboard sections.",
    publishedDate: "May 24, 2026",
  },
  {
    id: 2,
    title: "Document Governance Update",
    category: "Compliance",
    summary:
      "New metadata standards were introduced for corporate document libraries.",
    publishedDate: "May 22, 2026",
  },
  {
    id: 3,
    title: "Executive Dashboard Improvements",
    category: "Analytics",
    summary:
      "The analytics team updated KPI cards and activity tracking sections.",
    publishedDate: "May 20, 2026",
  },
];

export const metrics: MetricItem[] = [
  {
    id: 1,
    label: "Active Sites",
    value: "48",
    description: "SharePoint-style workspaces currently active.",
  },
  {
    id: 2,
    label: "Documents",
    value: "12.4K",
    description: "Indexed files across corporate libraries.",
  },
  {
    id: 3,
    label: "Departments",
    value: "16",
    description: "Business areas connected to the portal.",
  },
  {
    id: 4,
    label: "Monthly Visits",
    value: "8.7K",
    description: "Estimated portal visits this month.",
  },
];

export const activities: ActivityItem[] = [
  {
    id: 1,
    user: "Ana Martins",
    action: "updated",
    target: "Project Governance Library",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "Carlos Silva",
    action: "published",
    target: "Monthly Operations Report",
    time: "32 minutes ago",
  },
  {
    id: 3,
    user: "Microsoft 365 Admin",
    action: "created",
    target: "Finance Department Workspace",
    time: "1 hour ago",
  },
];
```

# 5. `src\components\DashboardHeader.tsx`

```tsx
import {
  Avatar,
  Button,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  Search24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function DashboardHeader() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Title1>SharePoint Inspired Dashboard</Title1>

        <Text>
          Corporate portal experience built with React and Fluent UI.
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Button icon={<Search24Regular />}>Search</Button>
        <Button icon={<Settings24Regular />}>Settings</Button>
        <Avatar name="Portal Admin" />
      </div>
    </header>
  );
}
```

# 6. `src\components\QuickLinks.tsx`

```tsx
import {
  Button,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  Document24Regular,
  Folder24Regular,
  PeopleTeam24Regular,
  ChartMultiple24Regular,
} from "@fluentui/react-icons";

import { quickLinks } from "../data/dashboardData";

const icons = [
  <Document24Regular />,
  <Folder24Regular />,
  <PeopleTeam24Regular />,
  <ChartMultiple24Regular />,
];

export function QuickLinks() {
  return (
    <section>
      <Title2>Quick Links</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {quickLinks.map((item, index) => (
          <Card key={item.id}>
            <CardHeader
              image={icons[index]}
              header={<Text weight="semibold">{item.title}</Text>}
              description={<Text>{item.description}</Text>}
            />

            <Button appearance="primary">Open</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

# 7. `src\components\NewsSection.tsx`

```tsx
import {
  Badge,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import { News24Regular } from "@fluentui/react-icons";

import { newsItems } from "../data/dashboardData";

export function NewsSection() {
  return (
    <section>
      <Title2>Corporate News</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {newsItems.map((news) => (
          <Card key={news.id}>
            <CardHeader
              image={<News24Regular />}
              header={<Text weight="semibold">{news.title}</Text>}
              description={<Text>{news.publishedDate}</Text>}
            />

            <Badge appearance="tint">{news.category}</Badge>

            <Text>{news.summary}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

# 8. `src\components\MetricsPanel.tsx`

```tsx
import {
  Card,
  Text,
  Title2,
  Title3,
} from "@fluentui/react-components";

import { metrics } from "../data/dashboardData";

export function MetricsPanel() {
  return (
    <section>
      <Title2>Portal Metrics</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <Text>{metric.label}</Text>
            <Title3>{metric.value}</Title3>
            <Text size={200}>{metric.description}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

# 9. `src\components\ActivityPanel.tsx`

```tsx
import {
  Avatar,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { activities } from "../data/dashboardData";

export function ActivityPanel() {
  return (
    <section>
      <Title2>Recent Activity</Title2>

      <Card
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              borderBottom: "1px solid #eeeeee",
              paddingBottom: "12px",
            }}
          >
            <Avatar name={activity.user} />

            <div>
              <Text weight="semibold">{activity.user}</Text>

              <br />

              <Text>
                {activity.action} {activity.target}
              </Text>

              <br />

              <Text size={200}>{activity.time}</Text>
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}
```

# 10. `src\App.tsx`

```tsx
import { DashboardHeader } from "./components/DashboardHeader";
import { QuickLinks } from "./components/QuickLinks";
import { NewsSection } from "./components/NewsSection";
import { MetricsPanel } from "./components/MetricsPanel";
import { ActivityPanel } from "./components/ActivityPanel";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <DashboardHeader />

      <main
        style={{
          padding: "32px",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <MetricsPanel />
        <QuickLinks />
        <NewsSection />
        <ActivityPanel />
      </main>
    </div>
  );
}

export default App;
```

# 11. `src\main.tsx`

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

# 12. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

# 13. Rodar a aplicação

```powershell
npm run dev
```

# 14. Validar build

```powershell
npm run build
```

# 15. Preview do build

```powershell
npm run preview
```

# O que esta App ensina

| Conceito                | Onde aparece                         |
| ----------------------- | ------------------------------------ |
| Component composition   | `App.tsx` compondo todos os blocos   |
| Data-driven UI          | `dashboardData.ts` alimentando cards |
| TypeScript models       | `DashboardModels.ts`                 |
| Fluent UI Cards         | Quick links, news, metrics, activity |
| SharePoint-style layout | Header + dashboard sections          |
| Declarative rendering   | `.map()` transformando dados em UI   |
| Enterprise layout       | Grid, spacing, header, sections      |
| Pure components         | Sem `useState`, sem `useEffect`      |

# Lista do Bloco 3 — onde estamos

| App | Nome                          | Status    |
| --: | ----------------------------- | --------- |
|  41 | Login Microsoft Style         | Completed |
|  42 | Corporate Form                | Completed |
|  43 | Tabs Navigation               | Completed |
|  44 | Dialog Manager                | Completed |
|  45 | Executive Dashboard           | Completed |
|  46 | DataGrid Catalog              | Completed |
|  47 | Enterprise User List          | Completed |
|  48 | Navigable Sidebar             | Completed |
|  49 | Corporate Header              | Completed |
|  50 | Professional Toolbar          | Completed |
|  51 | Notification System           | Completed |
|  52 | Administrative Panel          | Completed |
|  53 | Ticket Manager                | Completed |
|  54 | Approval System               | Completed |
|  55 | Corporate Calendar            | Completed |
|  56 | SharePoint Inspired Dashboard | Current   |
|  57 | Project Management            | Next      |
|  58 | Ticket Control                | Upcoming  |
|  59 | Visual CRM                    | Upcoming  |
|  60 | Corporate Explorer            | Upcoming  |
