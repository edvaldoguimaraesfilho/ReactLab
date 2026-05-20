# App 12 — Image Gallery

App 12 is **“Galeria de Imagens / Image Gallery”** in Block 1. It focuses on **props, list rendering, image-based cards, and conditional rendering**, following the project roadmap for Apps 01–20. 

Official concepts: React list rendering uses `map()` to transform arrays into components, and conditional rendering uses JavaScript conditions inside JSX. ([React][1])

## 1. PowerShell setup

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app12-image-gallery -- --template react-ts
cd app12-image-gallery

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\GalleryImage.ts -ItemType File
New-Item src\data\galleryImages.ts -ItemType File
New-Item src\components\GalleryCard.tsx -ItemType File
New-Item src\components\GalleryGrid.tsx -ItemType File
```

## 2. `src\models\GalleryImage.ts`

```ts
export interface GalleryImage {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  featured: boolean;
}
```

## 3. `src\data\galleryImages.ts`

```ts
import type { GalleryImage } from "../models/GalleryImage";

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Modern Workspace",
    category: "Office",
    description: "A clean Microsoft-style workspace for productivity.",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
    featured: true,
  },
  {
    id: 2,
    title: "Team Collaboration",
    category: "People",
    description: "A visual card representing teamwork and planning.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    featured: false,
  },
  {
    id: 3,
    title: "Cloud Architecture",
    category: "Technology",
    description: "A technical visual for cloud and enterprise systems.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    featured: true,
  },
  {
    id: 4,
    title: "Dashboard Review",
    category: "Analytics",
    description: "A dashboard-inspired image for data analysis.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    featured: false,
  },
];
```

## 4. `src\components\GalleryCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { GalleryImage } from "../models/GalleryImage";

interface GalleryCardProps {
  image: GalleryImage;
}

export function GalleryCard({ image }: GalleryCardProps) {
  return (
    <Card style={{ overflow: "hidden" }}>
      <Image
        src={`${image.imageUrl}?auto=format&fit=crop&w=900&q=80`}
        alt={image.title}
        fit="cover"
        style={{
          width: "100%",
          height: "220px",
        }}
      />

      <CardHeader
        header={<Title3>{image.title}</Title3>}
        description={<Text>{image.category}</Text>}
      />

      <Body1>{image.description}</Body1>

      <CardFooter>
        {image.featured ? (
          <Badge appearance="filled" color="brand">
            Featured
          </Badge>
        ) : (
          <Badge appearance="outline">Standard</Badge>
        )}
      </CardFooter>
    </Card>
  );
}
```

## 5. `src\components\GalleryGrid.tsx`

```tsx
import { galleryImages } from "../data/galleryImages";
import { GalleryCard } from "./GalleryCard";

export function GalleryGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      {galleryImages.map((image) => (
        <GalleryCard key={image.id} image={image} />
      ))}
    </div>
  );
}
```

## 6. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { GalleryGrid } from "./components/GalleryGrid";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>Image Gallery</Title1>

        <Text>
          A responsive image gallery built with React, TypeScript, and Fluent UI.
        </Text>

        <GalleryGrid />
      </section>
    </main>
  );
}

export default App;
```

## 7. `src\main.tsx`

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

## 8. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 9. Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## Technical summary

| Concept               | Where                            |
| --------------------- | -------------------------------- |
| TypeScript model      | `GalleryImage.ts`                |
| Static data           | `galleryImages.ts`               |
| Props                 | `GalleryCard({ image })`         |
| List rendering        | `galleryImages.map(...)`         |
| Stable keys           | `key={image.id}`                 |
| Conditional rendering | `image.featured ? ... : ...`     |
| Fluent UI             | `Card`, `Image`, `Badge`, `Text` |
| Responsive layout     | CSS Grid                         |

## Current progress

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
| Block 1 |  11 | Grid of Cards             | Completed |
| Block 1 |  12 | Image Gallery             | Current   |
| Block 1 |  13 | Movie Catalog             | Next      |

[1]: https://react.dev/learn/rendering-lists?utm_source=chatgpt.com "Rendering Lists"
