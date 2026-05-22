# App 38 — Interactive Quiz

App 38 belongs to **Block 2 — Interactivity and State**.
According to the roadmap, App 38 is the **Interactive Quiz** application. 

This app is extremely important because it introduces:

* complex `useState`
* derived state
* conditional rendering
* event handling
* dynamic UI updates
* score calculation
* array navigation
* user interaction flow

The React Learn concepts most connected to this app are:

* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)

---

# 1. Create the Project

```powershell
mkdir bloco02
cd bloco02

npm create vite@latest app38-interactive-quiz -- --template react-ts

cd app38-interactive-quiz

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# 2. Create the Project Structure

```powershell
mkdir src\components
mkdir src\data
mkdir src\models
mkdir src\styles
```

---

# 3. Create the Files

```powershell
New-Item artigo.md -ItemType File

New-Item src\models\QuizQuestion.ts -ItemType File

New-Item src\data\questions.ts -ItemType File

New-Item src\components\QuizCard.tsx -ItemType File

New-Item src\components\QuizResult.tsx -ItemType File
```

---

# 4. `src\models\QuizQuestion.ts`

```ts
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
```

---

# 5. `src\data\questions.ts`

```ts
import type { QuizQuestion } from "../models/QuizQuestion";

export const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is React primarily used for?",
    options: [
      "Database management",
      "Building user interfaces",
      "Operating systems",
      "Network security",
    ],
    correctAnswer: "Building user interfaces",
  },
  {
    id: 2,
    question: "Which hook is used for component memory?",
    options: [
      "useEffect",
      "useContext",
      "useState",
      "useMemo",
    ],
    correctAnswer: "useState",
  },
  {
    id: 3,
    question: "Which company created Fluent UI?",
    options: [
      "Google",
      "Amazon",
      "Microsoft",
      "Meta",
    ],
    correctAnswer: "Microsoft",
  },
  {
    id: 4,
    question: "What does JSX represent?",
    options: [
      "A database",
      "A CSS engine",
      "A JavaScript syntax extension",
      "A package manager",
    ],
    correctAnswer: "A JavaScript syntax extension",
  },
];
```

---

# 6. `src\components\QuizCard.tsx`

```tsx
import {
  Button,
  Card,
  Radio,
  RadioGroup,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { QuizQuestion } from "../models/QuizQuestion";

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
  isLastQuestion,
}: QuizCardProps) {
  return (
    <Card
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "700px",
      }}
    >
      <Title2>{question.question}</Title2>

      <RadioGroup
        value={selectedAnswer}
        onChange={(_, data) => onSelectAnswer(data.value)}
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {question.options.map((option) => (
          <Radio
            key={option}
            value={option}
            label={option}
          />
        ))}
      </RadioGroup>

      <div
        style={{
          marginTop: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>
          Selected Answer:
          {" "}
          {selectedAnswer || "None"}
        </Text>

        <Button
          appearance="primary"
          disabled={!selectedAnswer}
          onClick={onNextQuestion}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      </div>
    </Card>
  );
}
```

---

# 7. `src\components\QuizResult.tsx`

```tsx
import {
  Badge,
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

import { Button } from "@fluentui/react-components";

export function QuizResult({
  score,
  totalQuestions,
  onRestart,
}: QuizResultProps) {
  const percentage = Math.round(
    (score / totalQuestions) * 100
  );

  return (
    <Card
      style={{
        padding: "40px",
        width: "100%",
        maxWidth: "600px",
        textAlign: "center",
      }}
    >
      <Title1>Quiz Completed</Title1>

      <div
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <Badge appearance="filled" size="extra-large">
          {score} / {totalQuestions}
        </Badge>
      </div>

      <Text
        size={500}
        weight="semibold"
      >
        Final Score: {percentage}%
      </Text>

      <div
        style={{
          marginTop: "32px",
        }}
      >
        <Button
          appearance="primary"
          onClick={onRestart}
        >
          Restart Quiz
        </Button>
      </div>
    </Card>
  );
}
```

---

# 8. `src\App.tsx`

```tsx
import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { QuizCard } from "./components/QuizCard";
import { QuizResult } from "./components/QuizResult";

import { questions } from "./data/questions";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [score, setScore] = useState(0);

  const [isQuizFinished, setIsQuizFinished] =
    useState(false);

  const currentQuestion =
    questions[currentQuestionIndex];

  function handleNextQuestion() {
    const isCorrect =
      selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((previousScore) => previousScore + 1);
    }

    const isLastQuestion =
      currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setIsQuizFinished(true);
      return;
    }

    setCurrentQuestionIndex(
      (previousIndex) => previousIndex + 1
    );

    setSelectedAnswer("");
  }

  function handleRestartQuiz() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setIsQuizFinished(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Title1>Interactive Quiz</Title1>

        <Text>
          A React quiz application using Fluent UI,
          TypeScript, and dynamic state management.
        </Text>

        <div
          style={{
            marginTop: "32px",
          }}
        >
          {isQuizFinished ? (
            <QuizResult
              score={score}
              totalQuestions={questions.length}
              onRestart={handleRestartQuiz}
            />
          ) : (
            <QuizCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={setSelectedAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={
                currentQuestionIndex ===
                questions.length - 1
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
```

---

# 9. `src\main.tsx`

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

# 10. `src\index.css`

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

# 11. Run the Application

```powershell
npm run dev
```

---

# 12. Validate Production Build

```powershell
npm run build
```

---

# 13. Preview Production Build

```powershell
npm run preview
```

---

# 14. React Concepts Introduced

## `useState`

This app heavily expands the use of React state.

```tsx
const [score, setScore] = useState(0);
```

This creates component memory.

React stores:

* current question
* selected answer
* score
* quiz completion state

inside React state.

---

# 15. Derived UI

This app demonstrates one of the most important React ideas:

```txt
UI derives from state.
```

This conditional rendering:

```tsx
{isQuizFinished ? (
  <QuizResult />
) : (
  <QuizCard />
)}
```

changes the UI automatically based on state.

There is:

* no manual DOM manipulation
* no hide/show imperative logic
* no querySelector

React simply re-renders the correct UI.

---

# 16. Event Handling

This app introduces more advanced event handling.

```tsx
onClick={handleNextQuestion}
```

and:

```tsx
onChange={(_, data) =>
  onSelectAnswer(data.value)
}
```

React listens to events declaratively.

---

# 17. Functional State Updates

This is extremely important:

```tsx
setScore((previousScore) => previousScore + 1);
```

This is the recommended React pattern when the next state depends on the previous state.

React Learn strongly recommends this approach. [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

---

# 18. Conditional Rendering

This app uses conditional rendering heavily.

```tsx
isQuizFinished ? (
  <QuizResult />
) : (
  <QuizCard />
)
```

and:

```tsx
{isLastQuestion
  ? "Finish Quiz"
  : "Next Question"}
```

React dynamically changes the interface according to state.

---

# 19. Component Architecture

This app follows a clean architecture:

```txt
App
 ├── QuizCard
 └── QuizResult
```

Data flow:

```txt
App owns the state
 ↓
Props are passed down
 ↓
Child components render UI
```

This is classic React architecture.

---

# 20. Technical Summary

| Concept               | Purpose                 |
| --------------------- | ----------------------- |
| `useState`            | Component memory        |
| Conditional Rendering | Dynamic UI              |
| RadioGroup            | User answer selection   |
| Props                 | Component communication |
| Event Handling        | User interaction        |
| Derived UI            | State-driven rendering  |
| Functional Updates    | Safe state updates      |
| Fluent UI             | Enterprise components   |
| TypeScript            | Type safety             |
| Composition           | Reusable architecture   |

---

# 21. Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Fluent UI RadioGroup](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web/radiogroup)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# 22. Current Project Progress

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
| Block 1 |  17 | SharePoint Style Layout   | Completed |
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
| Block 2 |  37 | Voting Panel              | Completed |
| Block 2 |  38 | Interactive Quiz          | Current   |
| Block 2 |  39 | Team Manager              | Next      |
