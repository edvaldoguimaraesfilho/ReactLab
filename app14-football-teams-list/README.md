# App 14 — Football Teams List

App 14 is **“Lista de Times de Futebol / Football Teams List”** in Block 1. In the roadmap, it is focused on **cards of clubs**, **reusable components**, and React’s **Your First Component** concept. 

## 1. Create the project

```powershell
cd C:\ReactApps
mkdir bloco01
cd bloco01

npm create vite@latest app14-football-teams-list -- --template react-ts

cd app14-football-teams-list

npm install
npm install @fluentui/react-components @fluentui/react-icons
```

## 2. Create folders and files

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles

New-Item src\models\FootballTeam.ts -ItemType File
New-Item src\data\footballTeams.ts -ItemType File
New-Item src\components\TeamCard.tsx -ItemType File
New-Item src\components\TeamList.tsx -ItemType File
```

## 3. `src\models\FootballTeam.ts`

```ts
export interface FootballTeam {
  id: number;
  name: string;
  country: string;
  league: string;
  stadium: string;
  founded: number;
  primaryColor: string;
}
```

## 4. `src\data\footballTeams.ts`

```ts
import type { FootballTeam } from "../models/FootballTeam";

export const footballTeams: FootballTeam[] = [
  {
    id: 1,
    name: "Manchester City",
    country: "England",
    league: "Premier League",
    stadium: "Etihad Stadium",
    founded: 1880,
    primaryColor: "#6CABDD",
  },
  {
    id: 2,
    name: "Real Madrid",
    country: "Spain",
    league: "La Liga",
    stadium: "Santiago Bernabéu",
    founded: 1902,
    primaryColor: "#FEBE10",
  },
  {
    id: 3,
    name: "Bayern Munich",
    country: "Germany",
    league: "Bundesliga",
    stadium: "Allianz Arena",
    founded: 1900,
    primaryColor: "#DC052D",
  },
  {
    id: 4,
    name: "Palmeiras",
    country: "Brazil",
    league: "Brasileirão Série A",
    stadium: "Allianz Parque",
    founded: 1914,
    primaryColor: "#006437",
  },
];
```

## 5. `src\components\TeamCard.tsx`

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

import { Trophy24Regular } from "@fluentui/react-icons";

import type { FootballTeam } from "../models/FootballTeam";

interface TeamCardProps {
  team: FootballTeam;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
        borderTop: `6px solid ${team.primaryColor}`,
      }}
    >
      <CardHeader
        image={<Trophy24Regular />}
        header={<Title3>{team.name}</Title3>}
        description={<Caption1>{team.country}</Caption1>}
      />

      <Body1>
        {team.name} plays in the {team.league}.
      </Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "16px",
        }}
      >
        <Badge appearance="filled">{team.league}</Badge>
        <Text size={200}>Stadium: {team.stadium}</Text>
        <Text size={200}>Founded: {team.founded}</Text>
      </div>
    </Card>
  );
}
```

## 6. `src\components\TeamList.tsx`

```tsx
import { footballTeams } from "../data/footballTeams";
import { TeamCard } from "./TeamCard";

export function TeamList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {footballTeams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
```

## 7. `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { TeamList } from "./components/TeamList";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Football Teams List</Title1>

        <Text>
          A static React and Fluent UI application that displays football teams
          using reusable typed components.
        </Text>

        <TeamList />
      </section>
    </main>
  );
}

export default App;
```

## 8. `src\main.tsx`

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

## 9. `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## 10. Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## What this app teaches

| Concept            | Where it appears                  |
| ------------------ | --------------------------------- |
| TypeScript model   | `FootballTeam.ts`                 |
| Static data        | `footballTeams.ts`                |
| Reusable component | `TeamCard.tsx`                    |
| List rendering     | `TeamList.tsx`                    |
| Stable keys        | `key={team.id}`                   |
| Props              | `team: FootballTeam`              |
| Composition        | `App → TeamList → TeamCard`       |
| Fluent UI          | `Card`, `Badge`, `Text`, `Title1` |

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
| Block 1 |  12 | Image Gallery             | Completed |
| Block 1 |  13 | Movie Catalog             | Completed |
| Block 1 |  14 | Football Teams List       | Current   |
| Block 1 |  15 | News Page                 | Next      |
