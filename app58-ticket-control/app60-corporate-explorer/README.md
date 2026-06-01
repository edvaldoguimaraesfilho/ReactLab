App 60 is **Corporate Explorer**, the final app of **Block 3 — Professional Fluent UI**, after App 59 CRM Visual and before Block 4 starts with Effects/API architecture. The roadmap defines App 60 as **Explorer Corporativo / Corporate Explorer** inside Block 3. 

# App 60 — Corporate Explorer

## PowerShell setup

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app60-corporate-explorer -- --template react-ts
cd app60-corporate-explorer

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\ExplorerItem.ts -ItemType File
New-Item src\data\explorerItems.ts -ItemType File
New-Item src\components\ExplorerSidebar.tsx -ItemType File
New-Item src\components\ExplorerToolbar.tsx -ItemType File
New-Item src\components\ExplorerGrid.tsx -ItemType File
New-Item artigo.md -ItemType File
```

## `src\models\ExplorerItem.ts`

```ts
export type ExplorerItemType = "Folder" | "Document" | "Report" | "Image";

export interface ExplorerItem {
  id: number;
  name: string;
  type: ExplorerItemType;
  owner: string;
  modified: string;
  status: "Active" | "Archived" | "Review";
}
```

## `src\data\explorerItems.ts`

```ts
import type { ExplorerItem } from "../models/ExplorerItem";

export const explorerItems: ExplorerItem[] = [
  {
    id: 1,
    name: "Finance Reports",
    type: "Folder",
    owner: "Finance Team",
    modified: "2026-05-20",
    status: "Active",
  },
  {
    id: 2,
    name: "Q2 Executive Summary.docx",
    type: "Document",
    owner: "PMO Office",
    modified: "2026-05-22",
    status: "Review",
  },
  {
    id: 3,
    name: "Sales Dashboard.pdf",
    type: "Report",
    owner: "Sales Team",
    modified: "2026-05-18",
    status: "Active",
  },
  {
    id: 4,
    name: "Corporate Banner.png",
    type: "Image",
    owner: "Marketing",
    modified: "2026-05-15",
    status: "Archived",
  },
];
```

## `src\components\ExplorerSidebar.tsx`

```tsx
import { Button, Card, Text, Title3 } from "@fluentui/react-components";
import {
  Folder24Regular,
  Document24Regular,
  ChartMultiple24Regular,
  Image24Regular,
} from "@fluentui/react-icons";

export function ExplorerSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Title3>Corporate Explorer</Title3>
      <Text size={200}>Enterprise content areas</Text>

      <Button appearance="subtle" icon={<Folder24Regular />}>Folders</Button>
      <Button appearance="subtle" icon={<Document24Regular />}>Documents</Button>
      <Button appearance="subtle" icon={<ChartMultiple24Regular />}>Reports</Button>
      <Button appearance="subtle" icon={<Image24Regular />}>Images</Button>
    </Card>
  );
}
```

## `src\components\ExplorerToolbar.tsx`

```tsx
import { Button, Input, Toolbar, ToolbarButton } from "@fluentui/react-components";
import {
  Add24Regular,
  ArrowUpload24Regular,
  Search24Regular,
} from "@fluentui/react-icons";

export function ExplorerToolbar() {
  return (
    <Toolbar
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", gap: "12px" }}>
        <ToolbarButton icon={<Add24Regular />}>New</ToolbarButton>
        <ToolbarButton icon={<ArrowUpload24Regular />}>Upload</ToolbarButton>
      </div>

      <Input
        contentBefore={<Search24Regular />}
        placeholder="Search corporate content"
      />
    </Toolbar>
  );
}
```

## `src\components\ExplorerGrid.tsx`

```tsx
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import { explorerItems } from "../data/explorerItems";

export function ExplorerGrid() {
  return (
    <Card style={{ padding: "24px" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Owner</TableHeaderCell>
            <TableHeaderCell>Modified</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {explorerItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.owner}</TableCell>
              <TableCell>{item.modified}</TableCell>
              <TableCell>
                <Badge appearance="tint">{item.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { ExplorerSidebar } from "./components/ExplorerSidebar";
import { ExplorerToolbar } from "./components/ExplorerToolbar";
import { ExplorerGrid } from "./components/ExplorerGrid";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ExplorerSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Title1>Corporate Content Explorer</Title1>
        <Text>
          A Microsoft-style enterprise explorer built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <ExplorerToolbar />
          <ExplorerGrid />
        </div>
      </main>
    </div>
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
npm run build
npm run preview
```

## Where we are

| Block   | App | Name                 | Status    |
| ------- | --: | -------------------- | --------- |
| Block 3 |  58 | Ticket Control       | Completed |
| Block 3 |  59 | CRM Visual           | Completed |
| Block 3 |  60 | Corporate Explorer   | Current   |
| Block 4 |  61 | REST API Consumption | Next      |
