# Technical Blog Article — App 31: Grade Simulator with React, TypeScript, Fluent UI, and Derived State

Modern React applications are not built by manually manipulating the DOM or writing imperative UI logic. Instead, React applications are built by describing how the interface should look based on the current state of the application. One of the most important concepts in modern React is understanding the difference between:

* real state
* derived state
* controlled inputs
* validation logic
* rendering logic

App 31 — **Grade Simulator** is one of the most important applications in Block 2 because it introduces the idea that React components should calculate UI from state instead of storing redundant information.

This application simulates a school grading system where the user enters:

* first exam grade
* second exam grade
* project grade
* attendance score

React then calculates:

* weighted average
* final status
* validation messages

This app belongs to **Block 2 — Interactivity and State**, whose goal is to teach:

* `useState`
* controlled forms
* events
* validation
* derived state
* conditional rendering
* state structure

The roadmap defines this block as the transition from static UI into dynamic, interactive applications. 

---

# Why This App Is Architecturally Important

At first glance, the app seems simple.

However, this application introduces one of the most important mental shifts in React:

```txt
Do not store values that can be calculated.
```

This principle comes directly from the official React Learn documentation:

> “Avoid redundant state.”

The app stores only the raw user inputs.

Everything else is calculated dynamically:

* average
* approval status
* validation state

This is called **derived state**.

---

# The Development Environment

The project uses:

* React
* TypeScript
* Vite
* Fluent UI
* VS Code
* Node.js

The app was created using Vite because Vite provides:

* fast development server
* Hot Module Replacement
* native ES Modules
* optimized builds
* excellent React support

Project creation:

```powershell
mkdir bloco02
cd bloco02

npm create vite@latest app31-grade-simulator -- --template react-ts

cd app31-grade-simulator

npm install
```

Install Fluent UI:

```powershell
npm install @fluentui/react-components
npm install @fluentui/react-icons
```

Create the architecture folders:

```powershell
mkdir src\components
mkdir src\models
mkdir src\styles
```

Create the files:

```powershell
New-Item src\models\GradeForm.ts -ItemType File
New-Item src\components\GradeSimulator.tsx -ItemType File
New-Item src\components\GradeResultCard.tsx -ItemType File
```

---

# Final Folder Structure

```txt
src/
  components/
    GradeSimulator.tsx
    GradeResultCard.tsx

  models/
    GradeForm.ts

  styles/

  App.tsx
  main.tsx
  index.css
```

This architecture already follows enterprise React organization:

| Folder        | Responsibility               |
| ------------- | ---------------------------- |
| `components/` | Reusable UI components       |
| `models/`     | TypeScript models/interfaces |
| `styles/`     | Future CSS organization      |
| `App.tsx`     | Root application component   |
| `main.tsx`    | React entry point            |

---

# Understanding the TypeScript Model

File:

```txt
src/models/GradeForm.ts
```

Code:

```ts
export interface GradeForm {
  firstExam: string;
  secondExam: string;
  project: string;
  attendance: string;
}
```

This interface defines the structure of the form state.

The important detail is:

```ts
string
```

instead of:

```ts
number
```

Why?

Because HTML input fields always return strings.

Even when:

```tsx
type="number"
```

the browser still provides the value as text.

This is an extremely important React concept.

---

# Why Controlled Inputs Matter

The app uses **controlled inputs**.

A controlled input means:

```txt
React controls the input value.
```

Instead of the browser independently managing the input state, React becomes the source of truth.

Example:

```tsx
<Input
  value={form.firstExam}
  onChange={(_, data) =>
    updateField("firstExam", data.value)
  }
/>
```

Two things happen here:

## 1. React sends the value to the input

```tsx
value={form.firstExam}
```

## 2. React receives updates from the input

```tsx
onChange={(_, data) =>
  updateField("firstExam", data.value)
}
```

This creates a full React-controlled data flow.

---

# Understanding `useState`

The app stores form data using:

```tsx
const [form, setForm] =
  useState<GradeForm>(initialForm);
```

This is one of the most important constructions in React.

The syntax:

```tsx
const [state, setState]
```

means:

| Variable  | Purpose                       |
| --------- | ----------------------------- |
| `form`    | Current state value           |
| `setForm` | Function used to update state |

The generic type:

```tsx
<GradeForm>
```

tells TypeScript:

```txt
This state follows the GradeForm interface.
```

This gives:

* autocomplete
* type safety
* validation
* safer refactoring

---

# Understanding the Initial State

```tsx
const initialForm: GradeForm = {
  firstExam: "",
  secondExam: "",
  project: "",
  attendance: "",
};
```

This defines the initial component state.

When React renders for the first time:

```txt
form =
{
  firstExam: "",
  secondExam: "",
  project: "",
  attendance: ""
}
```

The UI is generated from this object.

---

# Understanding State Updates

The app updates state using:

```tsx
function updateField(
  field: keyof GradeForm,
  value: string
) {
  setForm({
    ...form,
    [field]: value,
  });
}
```

This is one of the most important React patterns.

---

# Understanding the Spread Operator

```tsx
...form
```

copies all existing properties.

Example:

```tsx
form =
{
  firstExam: "8",
  secondExam: "7",
  project: "9",
  attendance: ""
}
```

If the user updates attendance:

```tsx
updateField("attendance", "10")
```

React creates:

```tsx
{
  firstExam: "8",
  secondExam: "7",
  project: "9",
  attendance: "10"
}
```

Instead of mutating the old object directly.

This is critical because React state must be treated as immutable.

---

# Why React State Must Be Immutable

Wrong approach:

```tsx
form.firstExam = "10";
```

Correct approach:

```tsx
setForm({
  ...form,
  firstExam: "10",
});
```

React expects state updates to create new objects.

This allows React to detect changes efficiently.

---

# Understanding Derived State

The app calculates:

```tsx
const average =
  firstExam * 0.35 +
  secondExam * 0.35 +
  project * 0.2 +
  attendance * 0.1;
```

Notice:

```txt
average is NOT stored in state.
```

This is extremely important.

The app could incorrectly do:

```tsx
const [average, setAverage] = useState(0);
```

But this would create duplicated state.

Instead, React Learn recommends calculating values during rendering whenever possible.

---

# Why Derived State Is Better

Derived state avoids synchronization bugs.

Imagine storing:

* grades
* average

separately.

If one changes but the other is not updated correctly, the UI becomes inconsistent.

By calculating average directly from the grades:

```txt
grades become the single source of truth
```

This is one of the core principles of React architecture.

---

# Understanding Validation Logic

The app validates grades using:

```tsx
const hasInvalidGrade =
  firstExam > 10 ||
  secondExam > 10 ||
  project > 10 ||
  attendance > 10 ||
  firstExam < 0 ||
  secondExam < 0 ||
  project < 0 ||
  attendance < 0;
```

This variable is also derived state.

Again:

```txt
No need for useState.
```

The validation is calculated from existing values.

---

# Understanding Conditional Rendering

The app uses:

```tsx
{hasInvalidGrade ? (
  <Card>
    <Text>
      Grades must be between 0 and 10.
    </Text>
  </Card>
) : (
  <GradeResultCard
    average={average}
    status={status}
  />
)}
```

This is React conditional rendering.

The UI changes based on data.

React is not manually hiding or showing elements.

Instead:

```txt
Different JSX is returned depending on state.
```

This is declarative UI programming.

---

# Understanding the Approval Status Logic

The app calculates:

```tsx
const status =
  average >= 7
    ? "Approved"
    : average >= 5
    ? "Recovery"
    : "Failed";
```

This uses nested ternary operators.

Equivalent logic:

```txt
If average >= 7
  Approved

Else if average >= 5
  Recovery

Else
  Failed
```

This is another example of derived state.

---

# Understanding Component Composition

The component hierarchy is:

```txt
App
  GradeSimulator
    GradeResultCard
```

Each component has a single responsibility.

| Component             | Responsibility             |
| --------------------- | -------------------------- |
| `App.tsx`             | Root application           |
| `GradeSimulator.tsx`  | Form and calculations      |
| `GradeResultCard.tsx` | Final result visualization |

This is React composition.

---

# Understanding Props

The result card receives:

```tsx
<GradeResultCard
  average={average}
  status={status}
/>
```

These are props.

Props are component inputs.

The child component receives data from the parent.

---

# Understanding the Result Card

File:

```txt
GradeResultCard.tsx
```

This component is purely presentational.

It does not contain:

* state
* effects
* calculations

It simply receives data and renders UI.

This is a pure component.

---

# Why Pure Components Matter

Pure components are:

* easier to test
* easier to reuse
* easier to understand
* more predictable

React Learn strongly emphasizes component purity.

---

# Understanding Fluent UI Components

The app uses:

* `Card`
* `Input`
* `Field`
* `Button`
* `Badge`
* `Text`
* `Title1`
* `Title2`

Fluent UI provides:

* Microsoft design system
* accessibility
* consistent spacing
* keyboard navigation
* enterprise typography
* visual consistency

---

# Understanding the `Field` Component

Example:

```tsx
<Field label="First Exam - 35%">
```

This wraps the input with:

* label
* spacing
* accessibility association

Without Fluent UI, you would manually create:

```html
<label>
<input>
```

Fluent UI abstracts this professionally.

---

# Understanding the `Badge`

The result status uses:

```tsx
<Badge appearance={badgeAppearance}>
```

The appearance changes dynamically.

This is UI derived from state.

React calculates:

```txt
Approved -> filled
Recovery -> tint
Failed -> outline
```

Then renders the correct UI automatically.

---

# Understanding the Reset Button

```tsx
function resetForm() {
  setForm(initialForm);
}
```

This restores the original state.

Since the UI derives from state:

* inputs reset
* average resets
* status resets
* validation resets

automatically.

This demonstrates one of React’s greatest strengths:

```txt
Update state once.
React updates the UI automatically.
```

---

# Why No `useEffect` Exists Here

This is extremely important.

The app intentionally does NOT use:

```tsx
useEffect()
```

Why?

Because:

* calculations happen during rendering
* no external system exists
* no API exists
* no timer exists
* no DOM synchronization exists

According to React Learn:

> “You Might Not Need an Effect.”

This app is a perfect example.

A beginner mistake would be:

```tsx
useEffect(() => {
  calculateAverage();
}, [form]);
```

This is unnecessary.

The average can simply be calculated directly.

---

# React Mental Model Introduced

This app reinforces the correct React mental model:

```txt
State changes
  ->
React re-renders
  ->
Derived values recalculate
  ->
UI updates automatically
```

You do not manually update the DOM.

You describe the UI from data.

---

# Understanding the Rendering Flow

The rendering flow becomes:

```txt
User types into Input
  ->
onChange fires
  ->
setForm updates state
  ->
React re-renders component
  ->
average recalculates
  ->
status recalculates
  ->
validation recalculates
  ->
UI updates automatically
```

This is one of the most important flows in React.

---

# Production Validation

Run development server:

```powershell
npm run dev
```

Validate production build:

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

The build command validates:

* TypeScript
* JSX
* imports
* bundling
* production compilation

This is equivalent to validating whether the app is production-ready.

---

# Technical Summary

| Concept               | Explanation                       |
| --------------------- | --------------------------------- |
| `useState`            | Component memory                  |
| Controlled Inputs     | React controls form values        |
| Derived State         | Calculated values from state      |
| Validation Logic      | UI validation rules               |
| Conditional Rendering | Different JSX based on conditions |
| Props                 | Component inputs                  |
| Component Composition | App → Simulator → ResultCard      |
| Fluent UI             | Enterprise Microsoft UI           |
| Immutable Updates     | State copied with spread operator |
| TypeScript Interface  | Form structure typing             |
| Pure Components       | Predictable reusable components   |
| Declarative Rendering | UI derived from data              |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Conditional Rendering](https://react.dev/learn/conditional-rendering?utm_source=chatgpt.com)
* [Updating Objects in State](https://react.dev/learn/updating-objects-in-state?utm_source=chatgpt.com)
* [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

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
| Block 2 |  31 | Grade Simulator           | Current   |
| Block 2 |  32 | Inventory Control         | Next      |
