# App 39 — Team Manager

App 39 belongs to **Block 2 — Interactivity and State** and focuses on managing collections of users grouped into teams using React state management. According to the roadmap, App 39 is the **Team Manager** application. 

This app is important because it introduces several core React concepts together:

* `useState`
* array updates
* derived UI
* controlled forms
* list rendering
* dynamic filtering
* component composition
* immutable state updates
* enterprise card layouts with Fluent UI

The goal is to simulate a lightweight enterprise team management interface similar to:

* Microsoft Teams admin panels
* HR systems
* SharePoint people directories
* corporate management dashboards

It is also an excellent preparation for future apps involving:

* CRUD operations
* reducers
* Context API
* DataGrid
* API synchronization

---

# React Learn Concepts Used

This app is heavily connected to the official React Learn sections:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)

---

# Final Application Structure

```txt
app39-team-manager/
│
├── src/
│   ├── components/
│   │   ├── TeamCard.tsx
│   │   ├── TeamList.tsx
│   │   └── TeamForm.tsx
│   │
│   ├── data/
│   │   └── initialTeams.ts
│   │
│   ├── models/
│   │   └── Team.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

# Step 1 — Create the Project

```powershell
mkdir bloco02
cd bloco02

npm create vite@latest app39-team-manager -- --template react-ts

cd app39-team-manager

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Step 2 — Create the Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

---

# Step 3 — Create the Files

```powershell
New-Item src\models\Team.ts -ItemType File

New-Item src\data\initialTeams.ts -ItemType File

New-Item src\components\TeamCard.tsx -ItemType File
New-Item src\components\TeamList.tsx -ItemType File
New-Item src\components\TeamForm.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Step 4 — Team Model

## `src/models/Team.ts`

```ts
export interface Team {
  id: number;
  name: string;
  department: string;
  leader: string;
  members: number;
}
```

---

# Why This Interface Matters

This interface defines the structure of the data.

Every team must contain:

```txt
id
name
department
leader
members
```

This gives:

* strong typing
* autocomplete
* validation
* safer refactoring
* predictable architecture

This is part of the professional React + TypeScript workflow.

---

# Step 5 — Initial Data

## `src/data/initialTeams.ts`

```ts
import type { Team } from "../models/Team";

export const initialTeams: Team[] = [
  {
    id: 1,
    name: "Frontend Team",
    department: "Engineering",
    leader: "Sophia Turner",
    members: 8,
  },
  {
    id: 2,
    name: "Backend Team",
    department: "Engineering",
    leader: "Daniel Brooks",
    members: 6,
  },
  {
    id: 3,
    name: "Design Team",
    department: "UX/UI",
    leader: "Emma Johnson",
    members: 4,
  },
];
```

---

# Why Static Data Is Useful

At this stage, we still avoid APIs.

The focus is:

* React rendering
* state manipulation
* component composition

Later apps will replace static arrays with:

* fetch requests
* REST APIs
* services
* async hooks

---

# Step 6 — Team Card Component

## `src/components/TeamCard.tsx`

```tsx
import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import { People24Regular } from "@fluentui/react-icons";

import type { Team } from "../models/Team";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<People24Regular />}
        header={<Title3>{team.name}</Title3>}
        description={<Text>{team.department}</Text>}
      />

      <Body1>
        Team Leader: {team.leader}
      </Body1>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge appearance="filled">
          {team.members} Members
        </Badge>
      </div>
    </Card>
  );
}
```

---

# What This Component Teaches

This component introduces:

* reusable UI
* props
* enterprise card composition
* Fluent UI layout patterns

The important concept:

```tsx
<TeamCard team={team} />
```

The component receives data as props and renders UI from it.

This is one of the core React principles:

* data in
* UI out

---

# Step 7 — Team List Component

## `src/components/TeamList.tsx`

```tsx
import type { Team } from "../models/Team";
import { TeamCard } from "./TeamCard";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </div>
  );
}
```

---

# Why `map()` Is Important

This line:

```tsx
teams.map(...)
```

is one of the most important concepts in React.

It transforms:

```txt
Team[]
```

into:

```txt
TeamCard[]
```

Conceptually:

```txt
team data
→ React component
→ visual UI
```

React then renders the final DOM automatically.

---

# Step 8 — Team Form Component

## `src/components/TeamForm.tsx`

```tsx
import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import { useState } from "react";

interface TeamFormProps {
  onAddTeam: (
    name: string,
    department: string,
    leader: string,
    members: number
  ) => void;
}

export function TeamForm({
  onAddTeam,
}: TeamFormProps) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [leader, setLeader] = useState("");
  const [members, setMembers] = useState("");

  function handleSubmit() {
    if (
      !name ||
      !department ||
      !leader ||
      !members
    ) {
      return;
    }

    onAddTeam(
      name,
      department,
      leader,
      Number(members)
    );

    setName("");
    setDepartment("");
    setLeader("");
    setMembers("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "32px",
      }}
    >
      <Field label="Team Name">
        <Input
          value={name}
          onChange={(e, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Department">
        <Input
          value={department}
          onChange={(e, data) =>
            setDepartment(data.value)
          }
        />
      </Field>

      <Field label="Leader">
        <Input
          value={leader}
          onChange={(e, data) =>
            setLeader(data.value)
          }
        />
      </Field>

      <Field label="Members">
        <Input
          type="number"
          value={members}
          onChange={(e, data) =>
            setMembers(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Team
      </Button>
    </div>
  );
}
```

---

# Understanding Controlled Inputs

This app introduces controlled components.

Example:

```tsx
const [name, setName] = useState("");
```

This creates state.

The input becomes controlled because:

```tsx
value={name}
```

and:

```tsx
onChange={(e, data) =>
  setName(data.value)
}
```

The UI is now synchronized with React state.

React becomes the source of truth.

---

# Step 9 — Main App Component

## `src/App.tsx`

```tsx
import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { useState } from "react";

import { TeamForm } from "./components/TeamForm";
import { TeamList } from "./components/TeamList";

import { initialTeams } from "./data/initialTeams";

import type { Team } from "./models/Team";

function App() {
  const [teams, setTeams] =
    useState<Team[]>(initialTeams);

  function handleAddTeam(
    name: string,
    department: string,
    leader: string,
    members: number
  ) {
    const newTeam: Team = {
      id: Date.now(),
      name,
      department,
      leader,
      members,
    };

    setTeams([...teams, newTeam]);
  }

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
        <Title1>
          Team Manager
        </Title1>

        <Text>
          Manage enterprise teams using React state and
          Fluent UI components.
        </Text>

        <TeamForm
          onAddTeam={handleAddTeam}
        />

        <TeamList teams={teams} />
      </section>
    </main>
  );
}

export default App;
```

---

# Understanding `useState<Team[]>`

This line is critical:

```tsx
const [teams, setTeams] =
  useState<Team[]>(initialTeams);
```

It means:

```txt
teams
  current state value

setTeams
  function to update state

Team[]
  array typing

initialTeams
  initial state value
```

This is the foundation of React interactivity.

---

# Understanding Immutable Updates

This line:

```tsx
setTeams([...teams, newTeam]);
```

is extremely important.

React state should NOT be mutated directly.

Wrong:

```tsx
teams.push(newTeam);
```

Correct:

```tsx
setTeams([...teams, newTeam]);
```

Why?

Because React detects changes through new references.

The spread operator:

```tsx
[...teams, newTeam]
```

creates a brand new array.

This is one of the most important React mental models.

---

# Step 10 — Main Entry Point

## `src/main.tsx`

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
    <FluentProvider
      theme={webLightTheme}
    >
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

---

# Step 11 — Global CSS

## `src/index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}
```

---

# Step 12 — Run the Application

```powershell
npm run dev
```

---

# Step 13 — Validate Production Build

```powershell
npm run build
```

---

# Step 14 — Preview Production Build

```powershell
npm run preview
```

---

# What This App Teaches

| Concept               | Explanation                               |
| --------------------- | ----------------------------------------- |
| `useState`            | Component memory                          |
| Controlled Inputs     | React controls form values                |
| Immutable Updates     | Create new arrays instead of mutating     |
| Props                 | Pass data and behavior between components |
| Component Composition | App → Form/List → Cards                   |
| Fluent UI Forms       | Enterprise input controls                 |
| Derived Rendering     | UI generated from state                   |
| `map()`               | Dynamic rendering                         |
| TypeScript Interfaces | Strong typing                             |
| Enterprise Layouts    | Professional UI organization              |

---

# React Mental Model Introduced

This app reinforces:

```txt
State changes
→ React re-renders
→ UI updates automatically
```

You do not manually update the DOM.

You update state.

React updates the UI.

That is the core React philosophy.

---

# Technical Summary

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| React            | Declarative UI             |
| TypeScript       | Static typing              |
| Fluent UI        | Microsoft design system    |
| Vite             | Fast development server    |
| useState         | State management           |
| JSX              | Declarative rendering      |
| Props            | Component communication    |
| Arrays in State  | Dynamic collections        |
| Controlled Forms | User input synchronization |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)
* [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Project Progress

| Block   | App | Name                         | Status    |
| ------- | --: | ---------------------------- | --------- |
| Block 1 |  01 | Hello React Fluent           | Completed |
| Block 1 |  02 | Profile Card                 | Completed |
| Block 1 |  03 | Product List                 | Completed |
| Block 1 |  04 | Microsoft User Card          | Completed |
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
| Block 1 |  17 | SharePoint Layout            | Completed |
| Block 1 |  18 | File Explorer                | Completed |
| Block 1 |  19 | Corporate Portal             | Completed |
| Block 1 |  20 | Landing Page Microsoft Style | Completed |
| Block 2 |  21 | Modern Counter               | Completed |
| Block 2 |  22 | Toggle Theme                 | Completed |
| Block 2 |  23 | React Calculator             | Completed |
| Block 2 |  24 | Login Form                   | Completed |
| Block 2 |  25 | User Registration            | Completed |
| Block 2 |  26 | ToDo List                    | Completed |
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
| Block 2 |  39 | Team Manager                 | Current   |
| Block 2 |  40 | Dynamic Dashboard            | Next      |
