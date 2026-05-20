# App 18 — File Explorer

App 18 is **Explorer de Arquivos / File Explorer**, inside **Block 1 — Fundamentals and UI**. The roadmap defines it as a corporate file explorer focused on **Explorer layout and icons**. 

Use this project name:

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app18-file-explorer -- --template react-ts
cd app18-file-explorer

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\FileItem.ts -ItemType File
New-Item src\data\files.ts -ItemType File
New-Item src\components\FileToolbar.tsx -ItemType File
New-Item src\components\FolderTree.tsx -ItemType File
New-Item src\components\FileGrid.tsx -ItemType File
```

## `src\models\FileItem.ts`

```ts
export type FileType = "folder" | "word" | "excel" | "pdf" | "image";

export interface FileItem {
  id: number;
  name: string;
  type: FileType;
  owner: string;
  modified: string;
  size: string;
}
```

## `src\data\files.ts`

```ts
import type { FileItem } from "../models/FileItem";

export const files: FileItem[] = [
  {
    id: 1,
    name: "Project Documents",
    type: "folder",
    owner: "PMO Team",
    modified: "Today",
    size: "--",
  },
  {
    id: 2,
    name: "Quarterly Report.docx",
    type: "word",
    owner: "Finance Team",
    modified: "Yesterday",
    size: "245 KB",
  },
  {
    id: 3,
    name: "Budget Forecast.xlsx",
    type: "excel",
    owner: "Controlling",
    modified: "2 days ago",
    size: "1.2 MB",
  },
  {
    id: 4,
    name: "Compliance Guide.pdf",
    type: "pdf",
    owner: "Legal Team",
    modified: "Last week",
    size: "980 KB",
  },
  {
    id: 5,
    name: "Portal Screenshot.png",
    type: "image",
    owner: "UX Team",
    modified: "Last month",
    size: "540 KB",
  },
];
```

## `src\components\FileToolbar.tsx`

```tsx
import {
  Button,
  Input,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowUpload24Regular,
  FolderAdd24Regular,
  Search24Regular,
} from "@fluentui/react-icons";

export function FileToolbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <Toolbar>
        <ToolbarButton icon={<Add24Regular />}>New</ToolbarButton>
        <ToolbarButton icon={<FolderAdd24Regular />}>New folder</ToolbarButton>
        <ToolbarButton icon={<ArrowUpload24Regular />}>Upload</ToolbarButton>
      </Toolbar>

      <Input
        contentBefore={<Search24Regular />}
        placeholder="Search files"
        style={{ width: "280px" }}
      />
    </div>
  );
}
```

## `src\components\FolderTree.tsx`

```tsx
import { Button, Card, Text, Title3 } from "@fluentui/react-components";

import {
  Folder24Regular,
  Home24Regular,
  Star24Regular,
  Clock24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";

const folders = [
  { id: 1, name: "Home", icon: <Home24Regular /> },
  { id: 2, name: "My files", icon: <Folder24Regular /> },
  { id: 3, name: "Favorites", icon: <Star24Regular /> },
  { id: 4, name: "Recent", icon: <Clock24Regular /> },
  { id: 5, name: "Recycle bin", icon: <Delete24Regular /> },
];

export function FolderTree() {
  return (
    <Card
      style={{
        width: "260px",
        padding: "20px",
        minHeight: "100vh",
        borderRadius: 0,
      }}
    >
      <Title3>File Explorer</Title3>
      <Text size={200}>Corporate workspace</Text>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "24px",
        }}
      >
        {folders.map((folder) => (
          <Button
            key={folder.id}
            appearance="subtle"
            icon={folder.icon}
            style={{ justifyContent: "flex-start" }}
          >
            {folder.name}
          </Button>
        ))}
      </div>
    </Card>
  );
}
```

## `src\components\FileGrid.tsx`

```tsx
import {
  Badge,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Folder24Regular,
  Document24Regular,
  DocumentPdf24Regular,
  Image24Regular,
  Table24Regular,
} from "@fluentui/react-icons";

import { files } from "../data/files";
import type { FileItem } from "../models/FileItem";

function getFileIcon(type: FileItem["type"]) {
  if (type === "folder") return <Folder24Regular />;
  if (type === "word") return <Document24Regular />;
  if (type === "excel") return <Table24Regular />;
  if (type === "pdf") return <DocumentPdf24Regular />;
  return <Image24Regular />;
}

function getBadgeText(type: FileItem["type"]) {
  if (type === "folder") return "Folder";
  if (type === "word") return "Word";
  if (type === "excel") return "Excel";
  if (type === "pdf") return "PDF";
  return "Image";
}

export function FileGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "16px",
      }}
    >
      {files.map((file) => (
        <Card key={file.id} style={{ padding: "16px" }}>
          <CardHeader
            image={getFileIcon(file.type)}
            header={<Title3>{file.name}</Title3>}
            description={<Caption1>Owner: {file.owner}</Caption1>}
          />

          <div style={{ display: "grid", gap: "8px", marginTop: "12px" }}>
            <Text size={200}>Modified: {file.modified}</Text>
            <Text size={200}>Size: {file.size}</Text>
            <Badge appearance="tint">{getBadgeText(file.type)}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { FileToolbar } from "./components/FileToolbar";
import { FileGrid } from "./components/FileGrid";
import { FolderTree } from "./components/FolderTree";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <FolderTree />

      <main
        style={{
          flex: 1,
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <Title1>Documents</Title1>
        <Text>
          A static corporate file explorer built with React, TypeScript, Vite,
          and Fluent UI.
        </Text>

        <FileToolbar />
        <FileGrid />
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

## Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## Where we are

| Block   | App | Name                      | Status    |
| ------- | --: | ------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent        | Completed |
| Block 1 |  02 | Profile Card              | Completed |
| Block 1 |  03 | Product List              | Completed |
| Block 1 |  04 | Microsoft Style User Card | Completed |
| Block 1 |  05 | Static Dashboard          | Completed |
| Block 1 |  06 | Corporate Sidebar Menu    | Completed |
| Block 1 |  07 | Visual Task List          | Completed |
| Block 1 |  08 | Timeline Events           | Completed |
| Block 1 |  09 | Employee Table            | Completed |
| Block 1 |  10 | Email List                | Completed |
| Block 1 |  11 | Grid of Cards             | Completed |
| Block 1 |  12 | Image Gallery             | Completed |
| Block 1 |  13 | Movie Catalog             | Completed |
| Block 1 |  14 | Football Teams            | Completed |
| Block 1 |  15 | News Page                 | Completed |
| Block 1 |  16 | Financial Dashboard       | Completed |
| Block 1 |  17 | SharePoint Layout         | Completed |
| Block 1 |  18 | File Explorer             | Current   |
| Block 1 |  19 | Corporate Portal          | Next      |
