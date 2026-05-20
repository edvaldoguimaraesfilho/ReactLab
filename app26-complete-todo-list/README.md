# App 26 — Complete ToDo List with React, TypeScript, and Fluent UI

App 26 is the evolution of the earlier static task applications.
Now we move into a **real interactive ToDo application**, where the user can:

* add tasks
* remove tasks
* toggle completed state
* dynamically update the UI
* understand immutable state updates
* understand array manipulation in React
* practice controlled inputs
* practice event handling

This app belongs to:

## Block 2 — Interactivity and State

According to the roadmap, App 26 focuses on:

* `useState`
* updating arrays in state
* controlled forms
* immutable updates
* dynamic rendering
* event handling
* derived UI from state

Reference from the project structure:
“ToDo List — add/remove/update — Updating Arrays in State” 

---

# React Learn Concept

The central React Learn concept here is:

## Updating Arrays in State

Official documentation:

* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Responding to Events](https://react.dev/learn/responding-to-events?utm_source=chatgpt.com)

This app is extremely important because beginners often try to directly modify arrays.

React requires immutable updates.

This means:

```txt
DO NOT modify arrays directly.
CREATE NEW ARRAYS instead.
```

---

# Final Features

The app will support:

* Add task
* Toggle completed status
* Delete task
* Dynamic task count
* Empty state message
* Fluent UI styling
* TypeScript models
* Controlled input
* Component composition

---

# PowerShell — Create the Project

## Create project

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app26-complete-todo-list -- --template react-ts

cd app26-complete-todo-list

npm install
```

---

# Install Fluent UI

```powershell
npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create folders

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

---

# Create files

```powershell
New-Item src\models\TodoItem.ts -ItemType File

New-Item src\data\initialTodos.ts -ItemType File

New-Item src\components\TodoForm.tsx -ItemType File
New-Item src\components\TodoCard.tsx -ItemType File
New-Item src\components\TodoList.tsx -ItemType File
```

---

# Project Structure

```txt
src/
  components/
    TodoForm.tsx
    TodoCard.tsx
    TodoList.tsx

  data/
    initialTodos.ts

  models/
    TodoItem.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

---

# 1. Create the Model

# `src/models/TodoItem.ts`

```ts
export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}
```

---

# Why This Model Matters

This interface defines the shape of every task.

Each task must contain:

| Property    | Type    |
| ----------- | ------- |
| `id`        | number  |
| `title`     | string  |
| `completed` | boolean |

This gives:

* strong typing
* autocomplete
* safer updates
* predictable architecture

---

# 2. Create Initial Data

# `src/data/initialTodos.ts`

```ts
import type { TodoItem } from "../models/TodoItem";

export const initialTodos: TodoItem[] = [
  {
    id: 1,
    title: "Study React state management",
    completed: true,
  },
  {
    id: 2,
    title: "Build Fluent UI components",
    completed: false,
  },
  {
    id: 3,
    title: "Understand immutable updates",
    completed: false,
  },
];
```

---

# Why Initial Data Exists

This allows the UI to start with existing tasks.

Later, real applications may load data from:

* APIs
* databases
* local storage
* SharePoint
* Microsoft Graph

For now, we simulate that with local static data.

---

# 3. Create TodoForm Component

# `src/components/TodoForm.tsx`

```tsx
import { useState } from "react";

import {
  Button,
  Input,
} from "@fluentui/react-components";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

export function TodoForm({
  onAddTodo,
}: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit() {
    if (title.trim() === "") {
      return;
    }

    onAddTodo(title);

    setTitle("");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        marginTop: "24px",
      }}
    >
      <Input
        placeholder="Enter a new task"
        value={title}
        onChange={(event, data) =>
          setTitle(data.value)
        }
      />

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Task
      </Button>
    </div>
  );
}
```

---

# Understanding Controlled Inputs

This is one of the most important concepts in React.

The input value comes from state:

```tsx
value={title}
```

When the user types:

```tsx
onChange={(event, data) =>
  setTitle(data.value)
}
```

React updates state.

Flow:

```txt
User types
  ↓
onChange fires
  ↓
setTitle updates state
  ↓
React re-renders
  ↓
Input receives updated value
```

This is called a:

# Controlled Component

---

# Understanding useState

```tsx
const [title, setTitle] = useState("");
```

This creates:

| Variable   | Purpose             |
| ---------- | ------------------- |
| `title`    | current input value |
| `setTitle` | updates the value   |

React Learn calls state:

> “A component’s memory.”

---

# 4. Create TodoCard Component

# `src/components/TodoCard.tsx`

```tsx
import {
  Badge,
  Button,
  Card,
  Text,
} from "@fluentui/react-components";

import {
  CheckmarkCircle24Regular,
  Delete24Regular,
} from "@fluentui/react-icons";

import type { TodoItem } from "../models/TodoItem";

interface TodoCardProps {
  todo: TodoItem;

  onToggleTodo: (id: number) => void;

  onDeleteTodo: (id: number) => void;
}

export function TodoCard({
  todo,
  onToggleTodo,
  onDeleteTodo,
}: TodoCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textDecoration: todo.completed
              ? "line-through"
              : "none",
          }}
        >
          {todo.title}
        </Text>

        <Badge
          appearance={
            todo.completed
              ? "filled"
              : "outline"
          }
        >
          {todo.completed
            ? "Completed"
            : "Pending"}
        </Badge>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        <Button
          icon={<CheckmarkCircle24Regular />}
          appearance="secondary"
          onClick={() =>
            onToggleTodo(todo.id)
          }
        >
          Toggle
        </Button>

        <Button
          icon={<Delete24Regular />}
          appearance="primary"
          onClick={() =>
            onDeleteTodo(todo.id)
          }
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}
```

---

# Understanding Props

This component receives:

| Prop           | Purpose         |
| -------------- | --------------- |
| `todo`         | task data       |
| `onToggleTodo` | toggle callback |
| `onDeleteTodo` | delete callback |

This is component communication.

The parent owns the state.

The child requests updates through callbacks.

---

# 5. Create TodoList Component

# `src/components/TodoList.tsx`

```tsx
import { Text } from "@fluentui/react-components";

import type { TodoItem } from "../models/TodoItem";

import { TodoCard } from "./TodoCard";

interface TodoListProps {
  todos: TodoItem[];

  onToggleTodo: (id: number) => void;

  onDeleteTodo: (id: number) => void;
}

export function TodoList({
  todos,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Text
        style={{
          marginTop: "32px",
          display: "block",
        }}
      >
        No tasks available.
      </Text>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}
```

---

# Understanding Conditional Rendering

```tsx
if (todos.length === 0)
```

React can render different UI depending on conditions.

This is called:

# Conditional Rendering

Official documentation:

* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

---

# Understanding map()

```tsx
todos.map((todo) => (
```

This transforms data into UI.

Conceptually:

```txt
Todo array
  ↓
map()
  ↓
React components
  ↓
Rendered UI
```

---

# 6. Create App.tsx

# `src/App.tsx`

```tsx
import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialTodos } from "./data/initialTodos";

import type { TodoItem } from "./models/TodoItem";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  const [todos, setTodos] =
    useState<TodoItem[]>(initialTodos);

  function handleAddTodo(title: string) {
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);
  }

  function handleToggleTodo(id: number) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleDeleteTodo(id: number) {
    const filteredTodos =
      todos.filter((todo) =>
        todo.id !== id
      );

    setTodos(filteredTodos);
  }

  const completedTasks =
    todos.filter((todo) =>
      todo.completed
    ).length;

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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Complete ToDo List
        </Title1>

        <Text>
          Interactive React ToDo application
          with Fluent UI.
        </Text>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <Text>
            Total Tasks: {todos.length}
          </Text>

          <br />

          <Text>
            Completed Tasks:
            {" "}
            {completedTasks}
          </Text>
        </div>

        <TodoForm
          onAddTodo={handleAddTodo}
        />

        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </section>
    </main>
  );
}

export default App;
```

---

# Understanding Immutable Array Updates

This is the MOST important concept of the app.

---

# WRONG WAY ❌

```tsx
todos.push(newTodo)
```

This mutates the array.

React does not want direct mutations.

---

# CORRECT WAY ✅

```tsx
setTodos([
  ...todos,
  newTodo,
]);
```

This creates a NEW array.

---

# Understanding Spread Operator

```tsx
...todos
```

This copies all existing items.

Then:

```tsx
newTodo
```

is appended.

Result:

```txt
old items + new item
```

---

# Understanding Toggle Logic

```tsx
todos.map((todo) => {
```

We create a NEW array.

When the correct item is found:

```tsx
return {
  ...todo,
  completed: !todo.completed,
};
```

This creates a NEW object.

Again:

```txt
No mutation.
Only new copies.
```

This is core React architecture.

---

# Understanding filter()

```tsx
todos.filter((todo) =>
  todo.id !== id
);
```

This creates a new array without the deleted item.

---

# Derived State

```tsx
const completedTasks =
  todos.filter((todo) =>
    todo.completed
  ).length;
```

This value is NOT stored in state.

It is derived from existing state.

React Learn strongly recommends:

> Do not duplicate state unnecessarily.

---

# 7. Create main.tsx

# `src/main.tsx`

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

# 8. Create index.css

# `src/index.css`

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

# Run the App

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

# Technical Concepts Learned

| Concept               | Where                        |
| --------------------- | ---------------------------- |
| `useState`            | App.tsx                      |
| Controlled Inputs     | TodoForm                     |
| Props                 | TodoCard                     |
| Callback Functions    | Parent → Child communication |
| `map()`               | Rendering arrays             |
| `filter()`            | Removing tasks               |
| Immutable updates     | setTodos                     |
| Derived state         | completedTasks               |
| Conditional rendering | Empty task message           |
| Fluent UI             | Buttons, Cards, Badges       |
| Component composition | App → TodoList → TodoCard    |

---

# Official Documentation

## React

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Responding to Events](https://react.dev/learn/responding-to-events?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Rendering Lists](https://react.dev/learn/rendering-lists?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

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
| Block 2 |  26 | Complete ToDo List        | Current   |
| Block 2 |  27 | Shopping List             | Next      |
