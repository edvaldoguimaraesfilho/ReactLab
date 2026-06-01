Per roadmap, **App 47 is “Enterprise User List / Lista de Usuários Enterprise”**, inside **Block 3 — Professional Fluent UI**, focused on **Avatar, Badge, Card/List layout, typed user models, and enterprise user presentation** .

```powershell
cd C:\ReactApps

New-Item bloco03 -ItemType Directory
cd bloco03

npm create vite@latest app47-enterprise-user-list -- --template react-ts
cd app47-enterprise-user-list

npm install
npm install @fluentui/react-components @fluentui/react-icons

New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\EnterpriseUser.ts -ItemType File
New-Item src\data\users.ts -ItemType File
New-Item src\components\UserCard.tsx -ItemType File
New-Item src\components\UserList.tsx -ItemType File
New-Item artigo.md -ItemType File
```

# App 47 — Enterprise User List

## Goal

Build an enterprise-style user directory using React, TypeScript, Vite, and Fluent UI.

This app teaches:

| Concept                | Usage                       |
| ---------------------- | --------------------------- |
| TypeScript model       | User structure              |
| Static enterprise data | `users.ts`                  |
| Reusable component     | `UserCard.tsx`              |
| List rendering         | `users.map(...)`            |
| Fluent UI Avatar       | User identity               |
| Fluent UI Badge        | Status and department       |
| Component composition  | `App → UserList → UserCard` |

## `src\models\EnterpriseUser.ts`

```ts
export type UserStatus = "Available" | "Busy" | "Offline";

export interface EnterpriseUser {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: UserStatus;
}
```

## `src\data\users.ts`

```ts
import type { EnterpriseUser } from "../models/EnterpriseUser";

export const users: EnterpriseUser[] = [
  {
    id: 1,
    name: "Amanda Johnson",
    role: "Project Manager",
    department: "PMO",
    email: "amanda.johnson@contoso.com",
    status: "Available",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Frontend Developer",
    department: "Engineering",
    email: "carlos.mendes@contoso.com",
    status: "Busy",
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "UX Designer",
    department: "Design",
    email: "sophia.williams@contoso.com",
    status: "Offline",
  },
];
```

## `src\components\UserCard.tsx`

```tsx
import {
  Avatar,
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import type { EnterpriseUser } from "../models/EnterpriseUser";

interface UserCardProps {
  user: EnterpriseUser;
}

function getBadgeAppearance(status: EnterpriseUser["status"]) {
  if (status === "Available") {
    return "filled" as const;
  }

  if (status === "Busy") {
    return "tint" as const;
  }

  return "outline" as const;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        width: "100%",
      }}
    >
      <CardHeader
        image={<Avatar name={user.name} />}
        header={<Body1>{user.name}</Body1>}
        description={<Caption1>{user.role}</Caption1>}
      />

      <Text>{user.email}</Text>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge appearance={getBadgeAppearance(user.status)}>
          {user.status}
        </Badge>

        <Badge appearance="outline">
          {user.department}
        </Badge>
      </div>
    </Card>
  );
}
```

## `src\components\UserList.tsx`

```tsx
import { users } from "../data/users";
import { UserCard } from "./UserCard";

export function UserList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

## `src\App.tsx`

```tsx
import { Text, Title1 } from "@fluentui/react-components";
import { UserList } from "./components/UserList";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise User List</Title1>

        <Text>
          A Microsoft-style user directory built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <UserList />
      </section>
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

## Where we are

| Block   | App | Name                  | Status    |
| ------- | --: | --------------------- | --------- |
| Block 3 |  41 | Microsoft Style Login | Completed |
| Block 3 |  42 | Corporate Form        | Completed |
| Block 3 |  43 | Tabs Navigation       | Completed |
| Block 3 |  44 | Dialog Manager        | Completed |
| Block 3 |  45 | Executive Dashboard   | Completed |
| Block 3 |  46 | DataGrid Catalog      | Completed |
| Block 3 |  47 | Enterprise User List  | Current   |
| Block 3 |  48 | Navigable Sidebar     | Next      |



# ReactLab — Complete App List (100 Apps)

Base roadmap defined in the React + Fluent UI learning project. 

---

# BLOCO 1 — FUNDAMENTOS E UI (Apps 01–20)

Base: “Descrevendo a UI” do [React Learn](https://react.dev/learn?utm_source=chatgpt.com)

| App | Name                         |
| --- | ---------------------------- |
| 01  | Hello React Fluent           |
| 02  | Profile Card                 |
| 03  | Product List                 |
| 04  | Microsoft Style User Card    |
| 05  | Static Dashboard             |
| 06  | Corporate Sidebar Menu       |
| 07  | Visual Task List             |
| 08  | Timeline Events              |
| 09  | Employee Table               |
| 10  | Email List                   |
| 11  | Grid of Cards                |
| 12  | Image Gallery                |
| 13  | Movie Catalog                |
| 14  | Football Teams               |
| 15  | News Page                    |
| 16  | Financial Dashboard          |
| 17  | SharePoint Style Layout      |
| 18  | File Explorer                |
| 19  | Corporate Portal             |
| 20  | Microsoft Style Landing Page |

---

# BLOCO 2 — INTERATIVIDADE E ESTADO (Apps 21–40)

Base:

* Adding Interactivity
* Managing State

| App | Name                  |
| --- | --------------------- |
| 21  | Modern Counter        |
| 22  | Toggle Theme          |
| 23  | React Calculator      |
| 24  | Login Form            |
| 25  | User Registration     |
| 26  | Complete ToDo List    |
| 27  | Shopping List         |
| 28  | Product Filter        |
| 29  | Employee Search       |
| 30  | Shopping Cart         |
| 31  | Grade Simulator       |
| 32  | Inventory Control     |
| 33  | Contact Agenda        |
| 34  | Currency Converter    |
| 35  | BMI Calculator        |
| 36  | Installment Simulator |
| 37  | Voting Panel          |
| 38  | Interactive Quiz      |
| 39  | Team Manager          |
| 40  | Dynamic Dashboard     |

---

# BLOCO 3 — FLUENT UI PROFISSIONAL (Apps 41–60)

| App | Name                          |
| --- | ----------------------------- |
| 41  | Microsoft Style Login         |
| 42  | Corporate Form                |
| 43  | Tabs Navigation               |
| 44  | Dialog Manager                |
| 45  | Executive Dashboard           |
| 46  | DataGrid Catalog              |
| 47  | Enterprise User List          |
| 48  | Navigable Sidebar             |
| 49  | Corporate Header              |
| 50  | Professional Toolbar          |
| 51  | Notification System           |
| 52  | Administrative Panel          |
| 53  | Ticket Manager                |
| 54  | Approval System               |
| 55  | Corporate Calendar            |
| 56  | SharePoint Inspired Dashboard |
| 57  | Project Management            |
| 58  | Support Ticket Control        |
| 59  | Visual CRM                    |
| 60  | Enterprise Explorer           |

---

# BLOCO 4 — EFFECTS E ARQUITETURA (Apps 61–80)

Base:

* Synchronizing with Effects
* Escape Hatches

| App | Name                            |
| --- | ------------------------------- |
| 61  | REST API Consumption            |
| 62  | API Dashboard                   |
| 63  | Async Search                    |
| 64  | GitHub User Explorer            |
| 65  | Weather App                     |
| 66  | Pagination System               |
| 67  | Infinite Scroll                 |
| 68  | Data Cache                      |
| 69  | Custom Fetch Hook               |
| 70  | Global Context Control          |
| 71  | Favorites System                |
| 72  | API DataGrid                    |
| 73  | Analytics Dashboard             |
| 74  | Cryptocurrency Monitor          |
| 75  | Repository Explorer             |
| 76  | Logs Dashboard                  |
| 77  | Reports System                  |
| 78  | Performance Simulator           |
| 79  | Layered Architecture            |
| 80  | Mini React Enterprise Framework |

---

# BLOCO 5 — APLICAÇÕES COMPLETAS (Apps 81–100)

| App | Name                            |
| --- | ------------------------------- |
| 81  | Complete CRUD System            |
| 82  | Employee Management             |
| 83  | Financial Dashboard             |
| 84  | Inventory System                |
| 85  | Kanban Board                    |
| 86  | Enterprise Task Manager         |
| 87  | User Management System          |
| 88  | Administrative Portal           |
| 89  | Ticket System                   |
| 90  | Power BI Style Dashboard        |
| 91  | Report Generator                |
| 92  | Audit System                    |
| 93  | SharePoint Inspired Portal      |
| 94  | Corporate Catalog               |
| 95  | Reservation System              |
| 96  | Mini Enterprise ERP             |
| 97  | Complete CRM                    |
| 98  | Analytics System                |
| 99  | Microsoft Style Admin Center    |
| 100 | Final React Enterprise Platform |

---

# Official References

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Fluent UI](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Docs](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
* [Node.js](https://nodejs.org?utm_source=chatgpt.com)
* [VS Code](https://code.visualstudio.com?utm_source=chatgpt.com)

---

# Current Progress

| Block   | Current App             | Status              |
| ------- | ----------------------- | ------------------- |
| Block 1 | Apps 01–20              | Completed           |
| Block 2 | Apps 21–40              | Completed           |
| Block 3 | App 41–44               | In Progress         |
| Current | App 44 — Dialog Manager | Current Development |

Roadmap source files:  
