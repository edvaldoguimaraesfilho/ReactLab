# App 37 — Voting Panel

App 37 introduces one of the most important concepts in React:

* multiple state updates
* derived UI
* event-driven rendering
* dynamic counters
* conditional styling
* rendering based on state changes

This app belongs to **Block 2 — Interactivity and State** and focuses heavily on `useState`, event handling, derived values, and React’s rendering cycle. According to the roadmap, App 37 is the **Voting Panel** application. 

The main learning objective is understanding how React re-renders the UI whenever state changes.

---

# React Concepts Introduced

This app teaches:

* `useState`
* state-driven rendering
* event handlers
* updating numbers in state
* derived totals
* conditional rendering
* list rendering with state
* immutable updates
* component composition

React Learn concepts:

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Responding to Events](https://react.dev/learn/responding-to-events?utm_source=chatgpt.com)
* [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# Final Application Goal

The application will display:

* voting candidates
* current vote counts
* percentage calculations
* leading candidate highlight
* total votes
* interactive vote buttons

This is the first app where the UI changes significantly after user interaction.

---

# PowerShell — Create the Project

```powershell
mkdir bloco02
cd bloco02

npm create vite@latest app37-voting-panel -- --template react-ts

cd app37-voting-panel

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create the Folder Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

---

# Create the Files

```powershell
New-Item src\models\Candidate.ts -ItemType File

New-Item src\data\candidates.ts -ItemType File

New-Item src\components\CandidateCard.tsx -ItemType File

New-Item src\components\VotingBoard.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Project Structure

```txt
src/
  components/
    CandidateCard.tsx
    VotingBoard.tsx

  data/
    candidates.ts

  models/
    Candidate.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

---

# 1. `src/models/Candidate.ts`

```ts
export interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
}
```

---

# Why This Interface Matters

This interface defines the shape of a candidate object.

Every candidate must contain:

```txt
id
name
party
votes
```

This creates:

* predictable architecture
* IntelliSense
* safer refactoring
* compile-time validation

---

# 2. `src/data/candidates.ts`

```ts
import type { Candidate } from "../models/Candidate";

export const initialCandidates: Candidate[] = [
  {
    id: 1,
    name: "Alice Johnson",
    party: "Innovation Party",
    votes: 0,
  },
  {
    id: 2,
    name: "Michael Smith",
    party: "Enterprise Alliance",
    votes: 0,
  },
  {
    id: 3,
    name: "Sophia Williams",
    party: "Future Vision",
    votes: 0,
  },
];
```

---

# Why Separate Data from Components?

This separation is extremely important.

The component should focus on:

```txt
Rendering UI
```

The data file should focus on:

```txt
Providing data
```

This creates cleaner architecture.

---

# 3. `src/components/CandidateCard.tsx`

```tsx
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  PersonVote24Regular,
  Trophy24Regular,
} from "@fluentui/react-icons";

import type { Candidate } from "../models/Candidate";

interface CandidateCardProps {
  candidate: Candidate;
  totalVotes: number;
  isLeader: boolean;
  onVote: (id: number) => void;
}

export function CandidateCard({
  candidate,
  totalVotes,
  isLeader,
  onVote,
}: CandidateCardProps) {
  const percentage =
    totalVotes === 0
      ? 0
      : ((candidate.votes / totalVotes) * 100).toFixed(1);

  return (
    <Card
      style={{
        padding: "24px",
        border: isLeader
          ? "2px solid #0f6cbd"
          : "1px solid #d6d6d6",
      }}
    >
      <CardHeader
        image={
          isLeader ? (
            <Trophy24Regular />
          ) : (
            <PersonVote24Regular />
          )
        }
        header={<Title3>{candidate.name}</Title3>}
        description={<Text>{candidate.party}</Text>}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Badge appearance="filled">
          Votes: {candidate.votes}
        </Badge>

        <Text>
          Percentage: {percentage}%
        </Text>

        {isLeader && totalVotes > 0 && (
          <Badge appearance="tint">
            Current Leader
          </Badge>
        )}

        <Button
          appearance="primary"
          onClick={() => onVote(candidate.id)}
        >
          Vote
        </Button>
      </div>
    </Card>
  );
}
```

---

# Important React Concepts Here

## Props

```tsx
interface CandidateCardProps
```

The component receives external data.

React components become reusable through props.

---

## Derived State

```tsx
const percentage =
```

This value is NOT stored in state.

It is calculated from existing state.

This is extremely important.

React Learn strongly recommends:

```txt
Do not store derived values in state.
```

Instead:

```txt
Calculate them during rendering.
```

---

# Percentage Formula

The percentage formula is:

\text{Percentage}=\frac{\text{candidate votes}}{\text{total votes}}\times100

This is derived dynamically during rendering.

---

# Conditional Rendering

```tsx
{isLeader && totalVotes > 0 && (
```

This means:

```txt
Render the leader badge only if:
- candidate is leader
- totalVotes > 0
```

This is classic React conditional rendering.

---

# Event Handling

```tsx
onClick={() => onVote(candidate.id)}
```

When the button is clicked:

1. React calls `onVote`
2. State changes
3. React re-renders
4. UI updates automatically

This is the React rendering cycle.

---

# 4. `src/components/VotingBoard.tsx`

```tsx
import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialCandidates } from "../data/candidates";

import { CandidateCard } from "./CandidateCard";

import type { Candidate } from "../models/Candidate";

export function VotingBoard() {
  const [candidates, setCandidates] =
    useState<Candidate[]>(initialCandidates);

  function handleVote(id: number) {
    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) => {
        if (candidate.id === id) {
          return {
            ...candidate,
            votes: candidate.votes + 1,
          };
        }

        return candidate;
      })
    );
  }

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  const highestVoteCount = Math.max(
    ...candidates.map((candidate) => candidate.votes)
  );

  return (
    <section>
      <Title1>Voting Panel</Title1>

      <Text>
        Enterprise voting dashboard built with React and Fluent UI.
      </Text>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "32px",
        }}
      >
        <Text weight="semibold">
          Total Votes: {totalVotes}
        </Text>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            totalVotes={totalVotes}
            isLeader={
              candidate.votes === highestVoteCount &&
              totalVotes > 0
            }
            onVote={handleVote}
          />
        ))}
      </div>
    </section>
  );
}
```

---

# The Most Important Part of This App

## `useState`

```tsx
const [candidates, setCandidates]
```

This is the application's memory.

React stores the candidate list between renders.

---

# Understanding `setCandidates`

```tsx
setCandidates(...)
```

This updates state.

When state changes:

```txt
React automatically re-renders the component.
```

This is the heart of React.

---

# Why We Use `map()`

```tsx
previousCandidates.map(...)
```

We NEVER mutate state directly.

Bad:

```tsx
candidate.votes++
```

Good:

```tsx
return {
  ...candidate,
  votes: candidate.votes + 1,
};
```

This creates a NEW object.

React expects immutable updates.

---

# The Spread Operator

```tsx
...candidate
```

This copies the previous object.

Then:

```tsx
votes: candidate.votes + 1
```

overrides only the votes property.

---

# Understanding `reduce()`

```tsx
const totalVotes = candidates.reduce(...)
```

This calculates the total votes.

Formula:

\text{Total Votes}=\sum_{i=1}^{n}\text{candidate votes}_i

Again:

```txt
This is derived state.
```

We calculate it during rendering instead of storing it separately.

---

# Understanding the Leader Logic

```tsx
const highestVoteCount = Math.max(...)
```

This finds the highest vote total.

Then:

```tsx
candidate.votes === highestVoteCount
```

determines the current leader.

---

# Why This Is Important

This app teaches a critical React principle:

```txt
The UI is a function of state.
```

We do NOT manually update the DOM.

We only update state.

React updates the interface automatically.

---

# 5. `src/App.tsx`

```tsx
import { VotingBoard } from "./components/VotingBoard";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <VotingBoard />
      </div>
    </main>
  );
}

export default App;
```

---

# 6. `src/main.tsx`

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

---

# 7. `src/index.css`

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

# Run the Application

```powershell
npm run dev
```

---

# Validate Production Build

```powershell
npm run build
```

---

# Preview Production Build

```powershell
npm run preview
```

---

# What This App Teaches

| Concept               | Explanation                |
| --------------------- | -------------------------- |
| `useState`            | Component memory           |
| Event handling        | React button interaction   |
| Immutable updates     | Safe React state updates   |
| `map()`               | Transforming arrays        |
| `reduce()`            | Derived totals             |
| Conditional rendering | Dynamic UI sections        |
| Derived state         | Calculated values          |
| React rendering cycle | State → render → UI update |
| Fluent UI             | Enterprise components      |
| Props                 | Component configuration    |

---

# React Mental Model Introduced

This app is extremely important because it introduces:

```txt
State changes drive rendering.
```

This is the core of React.

The flow becomes:

```txt
User clicks button
→ Event handler runs
→ State updates
→ React re-renders
→ UI updates automatically
```

---

# Official Documentation

## React

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Responding to Events](https://react.dev/learn/responding-to-events?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Technical Summary

| File                | Responsibility           |
| ------------------- | ------------------------ |
| `Candidate.ts`      | TypeScript model         |
| `candidates.ts`     | Initial application data |
| `CandidateCard.tsx` | Candidate UI             |
| `VotingBoard.tsx`   | State management         |
| `App.tsx`           | Root layout              |
| `main.tsx`          | React entry point        |
| `index.css`         | Global styling           |

---

# Current Project Progress

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
| Block 1 |  18 | File Explorer             | Completed |
| Block 1 |  19 | Corporate Portal          | Completed |
| Block 1 |  20 | Microsoft Landing Page    | Completed |
| Block 2 |  21 | Modern Counter            | Completed |
| Block 2 |  22 | Toggle Theme              | Completed |
| Block 2 |  23 | React Calculator          | Completed |
| Block 2 |  24 | Login Form                | Completed |
| Block 2 |  25 | User Registration         | Completed |
| Block 2 |  26 | ToDo List                 | Completed |
| Block 2 |  27 | Shopping List             | Completed |
| Block 2 |  28 | Product Filter            | Completed |
| Block 2 |  29 | Employee Search           | Completed |
| Block 2 |  30 | Shopping Cart             | Completed |
| Block 2 |  31 | Grade Simulator           | Completed |
| Block 2 |  32 | Inventory Control         | Completed |
| Block 2 |  33 | Contact Agenda            | Completed |
| Block 2 |  34 | Currency Converter        | Completed |
| Block 2 |  35 | BMI Calculator            | Completed |
| Block 2 |  36 | Installment Simulator     | Completed |
| Block 2 |  37 | Voting Panel              | Current   |
