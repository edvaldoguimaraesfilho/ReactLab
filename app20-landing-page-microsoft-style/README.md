App 20 is **Landing Page Microsoft Style**, the last app of **Block 1 — Fundamentals and UI**. The project roadmap defines App 20 exactly as this app, focused on advanced component composition and Fluent UI visual structure. 

# App 20 — Landing Page Microsoft Style

## PowerShell

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app20-landing-page-microsoft-style -- --template react-ts
cd app20-landing-page-microsoft-style

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\FeatureItem.ts -ItemType File
New-Item src\data\features.ts -ItemType File
New-Item src\components\HeroSection.tsx -ItemType File
New-Item src\components\FeatureCard.tsx -ItemType File
New-Item src\components\FeaturesGrid.tsx -ItemType File
New-Item src\components\FooterSection.tsx -ItemType File
```

## `src\models\FeatureItem.ts`

```ts
export interface FeatureItem {
  id: number;
  title: string;
  description: string;
}
```

## `src\data\features.ts`

```ts
import type { FeatureItem } from "../models/FeatureItem";

export const features: FeatureItem[] = [
  {
    id: 1,
    title: "Enterprise Design",
    description: "A clean Microsoft-inspired visual structure using Fluent UI.",
  },
  {
    id: 2,
    title: "Reusable Components",
    description: "The page is divided into small React components.",
  },
  {
    id: 3,
    title: "Modern Frontend Stack",
    description: "Built with React, TypeScript, Vite, and Fluent UI.",
  },
];
```

## `src\components\HeroSection.tsx`

```tsx
import { Button, Text, Title1 } from "@fluentui/react-components";

export function HeroSection() {
  return (
    <section
      style={{
        padding: "72px 48px",
        background: "linear-gradient(135deg, #f3f6fb, #ffffff)",
        textAlign: "center",
      }}
    >
      <Title1>Build Modern Enterprise Apps with React</Title1>

      <Text size={500}>
        A Microsoft-style landing page built with React, TypeScript, Vite, and
        Fluent UI.
      </Text>

      <div style={{ marginTop: "32px" }}>
        <Button appearance="primary" size="large">
          Get Started
        </Button>
      </div>
    </section>
  );
}
```

## `src\components\FeatureCard.tsx`

```tsx
import { Card, Text, Title3 } from "@fluentui/react-components";
import type { FeatureItem } from "../models/FeatureItem";

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>{feature.title}</Title3>
      <Text>{feature.description}</Text>
    </Card>
  );
}
```

## `src\components\FeaturesGrid.tsx`

```tsx
import { features } from "../data/features";
import { FeatureCard } from "./FeatureCard";

export function FeaturesGrid() {
  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "56px 48px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "24px",
      }}
    >
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
}
```

## `src\components\FooterSection.tsx`

```tsx
import { Text } from "@fluentui/react-components";

export function FooterSection() {
  return (
    <footer
      style={{
        padding: "32px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text size={200}>
        App 20 — Landing Page Microsoft Style | React + Fluent UI
      </Text>
    </footer>
  );
}
```

## `src\App.tsx`

```tsx
import { HeroSection } from "./components/HeroSection";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { FooterSection } from "./components/FooterSection";

function App() {
  return (
    <main>
      <HeroSection />
      <FeaturesGrid />
      <FooterSection />
    </main>
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

# Current Apps

| App | Name                         | Status    |
| --: | ---------------------------- | --------- |
|  01 | Hello React Fluent           | Completed |
|  02 | Profile Card                 | Completed |
|  03 | Product List                 | Completed |
|  04 | Microsoft Style User Card    | Completed |
|  05 | Static Dashboard             | Completed |
|  06 | Corporate Sidebar Menu       | Completed |
|  07 | Visual Task List             | Completed |
|  08 | Timeline Events              | Completed |
|  09 | Employee Table               | Completed |
|  10 | Email List                   | Completed |
|  11 | Grid of Cards                | Completed |
|  12 | Image Gallery                | Completed |
|  13 | Movie Catalog                | Completed |
|  14 | Football Teams               | Completed |
|  15 | News Page                    | Completed |
|  16 | Financial Dashboard          | Completed |
|  17 | SharePoint Style Layout      | Completed |
|  18 | File Explorer                | Completed |
|  19 | Corporate Portal             | Completed |
|  20 | Landing Page Microsoft Style | Current   |
