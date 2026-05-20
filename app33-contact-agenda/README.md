# App 33 — Contact Agenda

App 33 introduces one of the most important concepts in modern React:

* managing collections of objects in state
* form state synchronization
* rendering dynamic cards
* controlled inputs
* filtering/searching
* derived UI from state

According to your roadmap, App 33 belongs to:

* Block 2 — Interactivity and State
* Focus:

  * `useState`
  * forms
  * shared state
  * filtering
  * controlled inputs
  * dynamic rendering

The goal is to build a small enterprise-style contact manager using:

* React
* TypeScript
* Fluent UI
* Vite
* controlled forms
* reusable components

This app is extremely important because it introduces a real-world pattern:

```txt
FORM INPUTS
    ↓
STATE UPDATE
    ↓
RE-RENDER
    ↓
UPDATED UI
```

That is the core React mental model.

---

# React Learn Concepts

This app is strongly connected to:

* [React Learn — State: A Component's Memory](https://react.dev/learn/state-a-components-memory?utm_source=chatgpt.com)
* [React Learn — Reacting to Input with State](https://react.dev/learn/reacting-to-input-with-state?utm_source=chatgpt.com)
* [React Learn — Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state?utm_source=chatgpt.com)
* [React Learn — Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

---

# Final Application Features

The app will include:

* contact registration form
* contact cards
* search filter
* dynamic rendering
* Fluent UI cards
* reusable components
* typed models
* derived filtered list

---

# Create the Project

## PowerShell — Create Project

```powershell
cd C:\ReactApps

mkdir bloco02
cd bloco02

npm create vite@latest app33-contact-agenda -- --template react-ts

cd app33-contact-agenda

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Create Project Structure

```powershell
mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles
```

---

# Create Files

```powershell
New-Item src\models\Contact.ts -ItemType File

New-Item src\data\initialContacts.ts -ItemType File

New-Item src\components\ContactCard.tsx -ItemType File
New-Item src\components\ContactList.tsx -ItemType File
New-Item src\components\ContactForm.tsx -ItemType File
New-Item src\components\SearchBar.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# File — `src/models/Contact.ts`

```ts
export interface Contact {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
}
```

---

# File — `src/data/initialContacts.ts`

```ts
import type { Contact } from "../models/Contact";

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Amanda Johnson",
    email: "amanda@contoso.com",
    company: "Contoso",
    phone: "+1 555-0101",
  },
  {
    id: 2,
    name: "Robert Miles",
    email: "robert@fabrikam.com",
    company: "Fabrikam",
    phone: "+1 555-0102",
  },
];
```

---

# File — `src/components/ContactCard.tsx`

```tsx
import {
  Avatar,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import type { Contact } from "../models/Contact";

interface ContactCardProps {
  contact: Contact;
}

export function ContactCard({
  contact,
}: ContactCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={
          <Avatar
            name={contact.name}
            color="colorful"
          />
        }
        header={<Text weight="semibold">{contact.name}</Text>}
        description={<Caption1>{contact.company}</Caption1>}
      />

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Body1>Email: {contact.email}</Body1>

        <Body1>Phone: {contact.phone}</Body1>
      </div>
    </Card>
  );
}
```

---

# File — `src/components/ContactList.tsx`

```tsx
import { ContactCard } from "./ContactCard";

import type { Contact } from "../models/Contact";

interface ContactListProps {
  contacts: Contact[];
}

export function ContactList({
  contacts,
}: ContactListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "24px",
      }}
    >
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
        />
      ))}
    </div>
  );
}
```

---

# File — `src/components/SearchBar.tsx`

```tsx
import { Input } from "@fluentui/react-components";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function SearchBar({
  search,
  onSearchChange,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search contacts..."
      value={search}
      onChange={(_, data) =>
        onSearchChange(data.value)
      }
    />
  );
}
```

---

# File — `src/components/ContactForm.tsx`

```tsx
import { useState } from "react";

import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import type { Contact } from "../models/Contact";

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
}

export function ContactForm({
  onAddContact,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit() {
    if (
      !name.trim() ||
      !email.trim()
    ) {
      return;
    }

    const newContact: Contact = {
      id: Date.now(),
      name,
      email,
      company,
      phone,
    };

    onAddContact(newContact);

    setName("");
    setEmail("");
    setCompany("");
    setPhone("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      <Field label="Name">
        <Input
          value={name}
          onChange={(_, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Email">
        <Input
          value={email}
          onChange={(_, data) =>
            setEmail(data.value)
          }
        />
      </Field>

      <Field label="Company">
        <Input
          value={company}
          onChange={(_, data) =>
            setCompany(data.value)
          }
        />
      </Field>

      <Field label="Phone">
        <Input
          value={phone}
          onChange={(_, data) =>
            setPhone(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Contact
      </Button>
    </div>
  );
}
```

---

# File — `src/App.tsx`

```tsx
import { useState } from "react";

import {
  Card,
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialContacts } from "./data/initialContacts";

import { ContactForm } from "./components/ContactForm";
import { ContactList } from "./components/ContactList";
import { SearchBar } from "./components/SearchBar";

import type { Contact } from "./models/Contact";

function App() {
  const [contacts, setContacts] =
    useState<Contact[]>(initialContacts);

  const [search, setSearch] =
    useState("");

  function handleAddContact(
    contact: Contact
  ) {
    setContacts((previousContacts) => [
      contact,
      ...previousContacts,
    ]);
  }

  const filteredContacts =
    contacts.filter((contact) =>
      contact.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "40px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Contact Agenda
        </Title1>

        <Text>
          Enterprise contact management with
          React and Fluent UI.
        </Text>

        <Card
          style={{
            marginTop: "24px",
            padding: "24px",
          }}
        >
          <SearchBar
            search={search}
            onSearchChange={setSearch}
          />

          <ContactForm
            onAddContact={handleAddContact}
          />
        </Card>

        <ContactList
          contacts={filteredContacts}
        />
      </section>
    </main>
  );
}

export default App;
```

---

# File — `src/main.tsx`

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

# File — `src/index.css`

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

## Development Server

```powershell
npm run dev
```

---

# Validate Production Build

```powershell
npm run build
```

This is extremely important.

It validates:

* TypeScript
* JSX
* imports
* production compilation

---

# Preview Production Build

```powershell
npm run preview
```

---

# Understanding the React Flow

This app introduces a complete React data flow:

```txt
Input
  ↓
onChange
  ↓
setState
  ↓
React Re-Render
  ↓
Updated UI
```

This is the core React architecture.

---

# Important React Concept — Controlled Inputs

This app uses:

```tsx
value={name}

onChange={(_, data) =>
  setName(data.value)
}
```

This means React controls the input.

The input value is always synchronized with React state.

This is called a:

```txt
Controlled Component
```

React Learn strongly recommends this approach for forms.

---

# Important React Concept — Derived State

This part is extremely important:

```tsx
const filteredContacts =
  contacts.filter(...)
```

We are NOT storing filtered contacts in state.

Instead:

```txt
contacts state
  +
search state
  ↓
derived filtered list
```

This follows React Learn best practices:

```txt
Do not duplicate state unnecessarily.
```

---

# Technical Summary

| Concept               | Purpose                         |
| --------------------- | ------------------------------- |
| `useState`            | Component memory                |
| Controlled Inputs     | Synchronize UI and state        |
| Derived State         | Filter without duplicating data |
| `map()`               | Render arrays                   |
| `filter()`            | Dynamic search                  |
| Fluent UI             | Enterprise UI                   |
| Card Composition      | Reusable layout                 |
| Props                 | Component communication         |
| TypeScript Interfaces | Data contracts                  |

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
