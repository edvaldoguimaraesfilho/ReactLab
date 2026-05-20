# Technical Blog Article — App 33: Building a Contact Agenda with React, TypeScript, Fluent UI, and Controlled Components

Modern React applications are fundamentally built around one central idea:

```txt id="lghv94"
The UI is a function of state.
```

This idea may sound simple initially, but it completely changes how frontend applications are designed. Instead of manually manipulating HTML elements, React applications describe the interface declaratively based on the current application state.

In **App 33 — Contact Agenda**, we finally enter one of the most important areas of React development:

* dynamic state management
* controlled forms
* derived state
* array updates
* reusable component composition
* enterprise UI organization

This application belongs to **Block 2 — Interactivity and State** from the React + Fluent UI roadmap. 

The app introduces a real-world enterprise scenario:
a small corporate contact management system.

Even though the application is relatively small, architecturally it introduces many professional React patterns that are used in:

* CRM systems
* internal portals
* Microsoft-style dashboards
* SharePoint solutions
* admin systems
* user management interfaces

The app was built using:

* React
* TypeScript
* Vite
* Fluent UI
* controlled inputs
* reusable components
* declarative rendering

This app is especially important because it introduces the complete React data flow:

```txt id="hckp7z"
User Input
    ↓
Event Handler
    ↓
State Update
    ↓
React Re-Render
    ↓
Updated UI
```

This flow is the heart of React itself.

---

# Project Goal

The objective of App 33 is to create an enterprise-style contact agenda with:

* a contact registration form
* a search filter
* reusable contact cards
* controlled inputs
* dynamic rendering
* Fluent UI styling
* TypeScript models

Unlike earlier static UI apps, this application already behaves like a real business application because the UI changes dynamically according to user interaction.

This is the transition point between:

* static UI rendering
  and
* real reactive applications

---

# React Learn Concepts Used

This app directly connects to several core sections from the official React documentation:

## React State

* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)

## Controlled Inputs

* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)

## Updating Arrays

* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)

## State Structure

* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

These concepts are foundational for all modern React development.

---

# Creating the Project

The application starts with Vite.

## Why Vite?

Vite provides:

* extremely fast startup
* modern ES module support
* instant Hot Module Replacement
* optimized production builds
* simplified React configuration

Project creation:

```powershell id="4qj2yw"
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app33-contact-agenda -- --template react-ts
```

The template:

```txt id="0n96oz"
react-ts
```

automatically configures:

* React
* TypeScript
* Vite
* JSX compilation
* development scripts

---

# Installing Dependencies

After project creation:

```powershell id="6m9mqk"
cd app33-contact-agenda

npm install
```

Install Fluent UI:

```powershell id="c32y2w"
npm install @fluentui/react-components @fluentui/react-icons
```

---

# Creating the Folder Structure

```powershell id="ykkmqf"
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

This structure is extremely important.

Modern React applications scale through separation of responsibility.

---

# Understanding the Folder Structure

## `components/`

Contains reusable UI components.

Examples:

* ContactCard
* ContactList
* SearchBar
* ContactForm

React applications scale by composing components together.

---

## `models/`

Contains TypeScript contracts and interfaces.

This helps define:

* object shapes
* API contracts
* application entities

---

## `data/`

Contains static or mock data.

Later this folder may evolve into:

* API services
* repositories
* fetch layers

---

## `styles/`

Prepared for:

* reusable CSS
* layouts
* theme customizations

---

# Understanding the Contact Model

File:

```txt id="1hjlwm"
src/models/Contact.ts
```

Code:

```ts id="q8u0g8"
export interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
}
```

This is a TypeScript interface.

It defines the exact shape of a contact object.

This means every contact must contain:

```txt id="7jqzvl"
id
name
email
company
phone
```

TypeScript is extremely important in enterprise React applications because it provides:

* type safety
* autocomplete
* safer refactoring
* fewer runtime bugs
* clearer architecture

Without TypeScript, mistakes such as this would be easier:

```ts id="vqwh7j"
name: 123
```

TypeScript immediately detects this problem.

---

# Understanding Initial Data

File:

```txt id="wtxc1w"
src/data/initialContacts.ts
```

This file stores the initial contact list.

```ts id="9v4c1o"
export const initialContacts: Contact[] = [...]
```

The important concept here is:

```txt id="9kt8qg"
The UI is generated from data.
```

React applications are usually data-driven.

Instead of manually creating HTML cards one by one, React transforms data into UI components.

---

# Understanding `App.tsx`

The most important file is:

```txt id="eqx7x3"
src/App.tsx
```

This component orchestrates the entire application.

---

# The First Important useState

```tsx id="1jj4tx"
const [contacts, setContacts] =
  useState<Contact[]>(initialContacts);
```

This is one of the most important lines in the entire app.

It introduces React state.

---

# Understanding useState

`useState` gives memory to a component.

Without state, React components are static.

State allows components to:

* remember values
* react to user interaction
* trigger re-rendering

The syntax:

```tsx id="yc0nqz"
const [contacts, setContacts]
```

creates two things:

| Variable      | Purpose                  |
| ------------- | ------------------------ |
| `contacts`    | current state value      |
| `setContacts` | function to update state |

This is fundamental React syntax.

---

# Why React Re-Renders

When this happens:

```tsx id="p4e3q6"
setContacts(...)
```

React:

1. updates the state
2. re-runs the component function
3. generates new JSX
4. updates the browser DOM

This is why the UI automatically changes.

---

# The Search State

```tsx id="sfp3o7"
const [search, setSearch] =
  useState("");
```

This state stores the current search text.

Again:

* `search` = current value
* `setSearch` = state updater

---

# Controlled Inputs Explained

Inside `SearchBar.tsx`:

```tsx id="8i84pi"
<Input
  value={search}
  onChange={(_, data) =>
    onSearchChange(data.value)
  }
/>
```

This is called a:

```txt id="2c3w7v"
Controlled Input
```

The input value is fully controlled by React state.

The flow becomes:

```txt id="jlwmr0"
User types
    ↓
onChange fires
    ↓
setSearch updates state
    ↓
React re-renders
    ↓
Input displays new value
```

This is one of the most important React patterns.

---

# Why Controlled Inputs Matter

Controlled inputs provide:

* synchronization
* validation
* predictability
* centralized state management

Enterprise applications almost always use controlled forms.

---

# Understanding the Contact Form

File:

```txt id="tl0y0w"
src/components/ContactForm.tsx
```

The form contains multiple state variables:

```tsx id="oh2m6p"
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [company, setCompany] = useState("");
const [phone, setPhone] = useState("");
```

Each input field has its own controlled state.

---

# Understanding the Submit Flow

Inside:

```tsx id="6kt6tw"
function handleSubmit()
```

we create a new contact object:

```tsx id="bbf5i5"
const newContact: Contact = {
  id: Date.now(),
  name,
  email,
  company,
  phone,
};
```

This object is then sent upward:

```tsx id="4jwxg0"
onAddContact(newContact);
```

This is extremely important.

---

# Parent → Child vs Child → Parent Communication

React props normally flow:

```txt id="vgp0kh"
Parent → Child
```

But forms often need to send data back upward.

That happens through callback props.

Flow:

```txt id="8v9lgz"
App.tsx
  passes onAddContact

ContactForm.tsx
  calls onAddContact(newContact)

App.tsx
  receives the new contact
```

This is standard React architecture.

---

# Understanding Array Updates

Inside App.tsx:

```tsx id="qjchdi"
setContacts((previousContacts) => [
  contact,
  ...previousContacts,
]);
```

This introduces immutable array updates.

React state should NOT be mutated directly.

Wrong:

```tsx id="vmh8rt"
contacts.push(contact)
```

Correct:

```tsx id="0lby9d"
[contact, ...previousContacts]
```

This creates a NEW array.

React relies heavily on immutability.

---

# Why Immutability Matters

Immutability helps React:

* detect changes
* optimize rendering
* avoid bugs
* keep updates predictable

This is one of the most important React concepts.

---

# Understanding Derived State

This part is extremely important:

```tsx id="6n13of"
const filteredContacts =
  contacts.filter((contact) =>
    contact.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
```

Notice:

```txt id="3u6oz6"
filteredContacts
is NOT state
```

This is called:

```txt id="5mjlwm"
Derived State
```

The filtered list is calculated from:

* contacts
* search

This follows React Learn best practices:

```txt id="0l4d2y"
Avoid duplicating state unnecessarily.
```

---

# Why Derived State Is Better

Wrong approach:

```txt id="if83h0"
contacts state
filteredContacts state
```

This creates synchronization problems.

Correct approach:

```txt id="rvj7v1"
contacts state
+
search state
↓
derived filtered list
```

This is cleaner and more predictable.

---

# Understanding List Rendering

Inside `ContactList.tsx`:

```tsx id="4wnc4j"
contacts.map((contact) => (
  <ContactCard
    key={contact.id}
    contact={contact}
  />
))
```

This transforms:

* data
  into
* UI

This is declarative rendering.

---

# Understanding React Keys

```tsx id="q5jjf0"
key={contact.id}
```

Keys help React identify list items.

They are critical for:

* performance
* stable rendering
* proper DOM reconciliation

Without stable keys, React may render inefficiently.

---

# Understanding ContactCard

File:

```txt id="rduqjv"
src/components/ContactCard.tsx
```

This component is responsible for displaying one contact.

This is component responsibility separation.

---

# Why Componentization Matters

Instead of creating everything inside App.tsx:

```txt id="3qz1kz"
App
  → ContactList
      → ContactCard
```

This creates:

* reusable architecture
* easier maintenance
* cleaner code
* scalability

This is the heart of React architecture.

---

# Understanding Fluent UI Components

The app uses:

* Card
* CardHeader
* Avatar
* Input
* Button
* Text
* Title1

These components already provide:

* accessibility
* spacing
* keyboard support
* typography
* Microsoft design language

This is why Fluent UI is important in enterprise React development.

---

# Understanding the Avatar Component

```tsx id="y7g8e9"
<Avatar
  name={contact.name}
  color="colorful"
/>
```

The Avatar automatically generates initials from the contact name.

This is extremely common in Microsoft-style applications.

---

# Understanding the Layout

The root layout uses:

```tsx id="6ibp5r"
minHeight: "100vh"
```

This ensures full screen height.

The app also uses:

```tsx id="r03v9h"
maxWidth: "1200px",
margin: "0 auto"
```

This centers the content.

---

# Understanding the Responsive Grid

Inside ContactList:

```tsx id="f3f0rx"
gridTemplateColumns:
  "repeat(auto-fit, minmax(300px, 1fr))"
```

This creates a responsive layout.

Meaning:

```txt id="2j79s0"
Create as many columns as fit.
Each column must be at least 300px wide.
```

This automatically adapts to screen size.

---

# Why No useEffect Yet?

One of the best design decisions in this app is:

```txt id="0wr14p"
No useEffect
```

Why?

Because there are no external systems yet.

React Learn strongly emphasizes:

> Effects should synchronize with external systems.

This app only manages internal UI state.

Therefore:

* `useState` is enough
* `useEffect` would be unnecessary

This is excellent React architecture.

---

# Understanding the Complete React Flow

The complete application flow is:

```txt id="fjlwm5"
User types into form
    ↓
onChange triggers
    ↓
setState updates
    ↓
React re-renders
    ↓
Contact list updates
```

This is modern React.

---

# Production Validation

Run:

```powershell id="jlwmv0"
npm run build
```

This validates:

* TypeScript
* imports
* JSX compilation
* production build

Always validate production builds.

---

# Technical Summary

| Concept               | Purpose                      |
| --------------------- | ---------------------------- |
| `useState`            | Component memory             |
| Controlled Inputs     | Synchronize UI and state     |
| Derived State         | Calculate filtered data      |
| Immutable Updates     | Safe React state updates     |
| `map()`               | Render arrays                |
| `filter()`            | Dynamic filtering            |
| Fluent UI             | Enterprise UI components     |
| TypeScript Interfaces | Strong typing                |
| Callback Props        | Child → parent communication |
| Component Composition | Scalable architecture        |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

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
| Block 2 |  31 | Grade Simulator           | Completed |
| Block 2 |  32 | Inventory Control         | Completed |
| Block 2 |  33 | Contact Agenda            | Current   |
