# ReactLab — 100 React Apps with Fluent UI, TypeScript, Vite, and Modern React Architecture

## Overview

ReactLab is a progressive enterprise-focused React learning repository designed to deeply teach modern React through the construction of **100 real React applications**.

This repository is not focused on memorizing syntax.

Its objective is to internalize the **React mental model** described in the official React documentation and apply it progressively using:

* React 19
* TypeScript
* Vite
* Fluent UI
* ESLint
* Enterprise UI architecture
* Microsoft-style design systems
* Component-driven architecture

Official references:

* [React Learn Documentation](https://react.dev/learn?utm_source=chatgpt.com)
* [React Reference](https://react.dev/reference/react?utm_source=chatgpt.com)
* [Fluent UI Documentation](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)
* [Vite Documentation](https://vite.dev/guide/?utm_source=chatgpt.com)
* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Main Objective

The purpose of this repository is to transform React learning from:

```txt
"How do I use React?"
```

into:

```txt
"How does React think?"
```

The repository progressively teaches:

```txt
Static UI
→ JSX
→ Components
→ Props
→ Rendering
→ State
→ Forms
→ Events
→ Derived State
→ Effects
→ APIs
→ Context
→ Reducers
→ Architecture
→ Enterprise Layouts
→ Complete Applications
```

The learning philosophy is based on repetition and progressive architecture evolution.

---

# Core React Philosophy

This repository follows the official React mental model:

* UI is a function of state
* Components are pure functions
* Rendering is declarative
* State should be minimal
* Derived values should not become duplicated state
* Effects should synchronize with external systems only
* Composition is preferred over inheritance
* Components should be small and reusable

This repository intentionally avoids:

* imperative DOM manipulation
* unnecessary `useEffect`
* jQuery-style thinking
* giant monolithic components

---

# Technology Stack

| Technology     | Purpose                               |
| -------------- | ------------------------------------- |
| React          | Declarative UI library                |
| TypeScript     | Static typing and scalability         |
| Vite           | Modern development server and bundler |
| Fluent UI      | Microsoft enterprise design system    |
| ESLint         | Code quality                          |
| JSX/TSX        | Declarative UI syntax                 |
| Flexbox/Grid   | Layout systems                        |
| React Hooks    | State and lifecycle                   |
| FluentProvider | Global design system provider         |

---

# Why This Repository Exists

Modern React development is much more than rendering HTML.

Professional frontend development requires understanding:

* rendering flow
* component architecture
* JSX compilation
* state-driven UI
* composition
* rendering performance
* hooks
* effects
* TypeScript modeling
* design systems
* enterprise UI patterns

This repository exists to make those concepts visible and understandable.

The goal is to eliminate “black box React”.

---

# Development Environment

## Required Tools

* Node.js LTS
* npm
* Visual Studio Code

Recommended VS Code extensions:

* ESLint
* Prettier
* TypeScript Hero
* Error Lens

---

# Creating a New App

```powershell
mkdir bloco01
cd bloco01

npm create vite@latest app01-hello-react-fluent -- --template react-ts

cd app01-hello-react-fluent

npm install

npm install @fluentui/react-components @fluentui/react-icons
```

---

# Running the Development Server

```powershell
npm run dev
```

Default Vite development server:

```txt
http://localhost:5173
```

---

# Production Validation

Every app must be validated with a production build.

```powershell
npm run build
```

Preview production build:

```powershell
npm run preview
```

---

# Standard Folder Structure

All applications progressively follow this architecture:

```txt
src/
  components/
  data/
  models/
  hooks/
  services/
  styles/
  utils/
  pages/
  App.tsx
  main.tsx
```

---

# Understanding the React Flow

One of the main goals of this repository is understanding how React actually works.

React applications follow this flow:

```txt
index.html
  contains #root

main.tsx
  finds #root

ReactDOM.createRoot()
  creates the React root

<App />
  becomes the root component

Components
  return JSX

JSX
  becomes JavaScript objects

React
  builds the component tree

ReactDOM
  updates the browser DOM

Browser
  renders final HTML
```

Understanding this flow is critical.

---

# What Each Core File Does

| File             | Responsibility              |
| ---------------- | --------------------------- |
| `index.html`     | Browser HTML shell          |
| `main.tsx`       | React entry point           |
| `App.tsx`        | Root application component  |
| `components/`    | Reusable UI pieces          |
| `data/`          | Static/mock data            |
| `models/`        | TypeScript interfaces/types |
| `hooks/`         | Custom React hooks          |
| `services/`      | API and business logic      |
| `styles/`        | CSS organization            |
| `vite.config.ts` | Vite configuration          |
| `package.json`   | Dependencies and scripts    |

---

# Fluent UI Philosophy

This repository uses Fluent UI as the standard visual layer.

Why?

Because Fluent UI provides:

* accessibility
* enterprise consistency
* Microsoft design language
* typography system
* spacing system
* enterprise-ready controls

Examples of Fluent UI components used throughout the repository:

* Button
* Card
* Input
* Dialog
* DataGrid
* Avatar
* Badge
* Toolbar
* TabList
* Dropdown

Official docs:

* [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui?utm_source=chatgpt.com#/controls/web)

---

# React Learn Alignment

The repository progression follows the recommended React Learn order:

| React Learn Section        | Repository Focus |
| -------------------------- | ---------------- |
| Describing the UI          | Block 1          |
| Adding Interactivity       | Block 2          |
| Managing State             | Block 2          |
| Thinking in React          | All blocks       |
| Synchronizing with Effects | Block 4          |
| Escape Hatches             | Block 4          |

Official guide:

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)

---

# Learning Blocks

---

# Block 1 — Fundamentals and UI (Apps 01–20)

Focus:

* JSX
* Components
* Props
* Lists
* Conditional rendering
* Layout composition
* Pure components

Goal:
Understand declarative UI construction.

---

# Block 2 — Interactivity and State (Apps 21–40)

Focus:

* `useState`
* events
* controlled forms
* derived state
* filtering
* dynamic rendering
* state modeling

Goal:
Understand how state drives the UI.

---

# Block 3 — Fluent UI Enterprise Components (Apps 41–60)

Focus:

* FluentProvider
* themes
* Dialogs
* DataGrid
* enterprise layouts
* reusable components

Goal:
Build professional Microsoft-style interfaces.

---

# Block 4 — Effects and Architecture (Apps 61–80)

Focus:

* `useEffect`
* API integration
* loading/error states
* custom hooks
* Context API
* reducers
* service architecture

Goal:
Understand synchronization and scalable architecture.

---

# Block 5 — Complete Applications (Apps 81–100)

Focus:

* CRUD systems
* dashboards
* enterprise architecture
* reusable systems
* routing
* complex UI workflows

Goal:
Build production-style enterprise React applications.

---

# 100 Apps Roadmap

| #  | App                    | Technical Focus           |
| -- | ---------------------- | ------------------------- |
| 01 | Hello React Fluent     | Vite + React + Fluent UI  |
| 02 | Profile Card           | Props and composition     |
| 03 | Product List           | List rendering            |
| 04 | Microsoft User Card    | Reusable enterprise cards |
| 05 | Static Dashboard       | Layout systems            |
| 06 | Corporate Sidebar Menu | Enterprise layout         |
| 07 | Visual Task List       | Pure components           |
| 08 | Timeline Events        | Sequential rendering      |
| 09 | Employee Table         | Table layouts             |
| 10 | Email List             | List composition          |
| 11 | Grid of Cards          | CSS Grid                  |
| 12 | Image Gallery          | Responsive rendering      |
| 13 | Movie Catalog          | Complex composition       |
| 14 | Football Teams         | Data-driven UI            |
| 15 | News Page              | Multi-section layouts     |
| 16 | Financial Dashboard    | Enterprise metrics        |
| 17 | SharePoint Layout      | Microsoft-inspired UI     |
| 18 | File Explorer          | Hierarchical rendering    |
| 19 | Corporate Portal       | Enterprise composition    |
| 20 | Microsoft Landing Page | Advanced layouts          |

---

# Project Philosophy

This repository is intentionally repetitive.

Repetition is critical because React mastery comes from repeatedly practicing:

* rendering
* composition
* state modeling
* JSX thinking
* component organization
* architecture

The objective is to make React patterns become natural.

---

# Enterprise Focus

The repository strongly emphasizes enterprise React architecture inspired by:

* Microsoft ecosystem
* SharePoint-style layouts
* dashboard systems
* admin portals
* enterprise navigation
* Fluent UI design language

The final goal is to prepare for:

* enterprise React development
* admin systems
* dashboards
* SPFx
* Microsoft 365 UI ecosystems
* scalable frontend architecture

---

# What You Will Learn

By completing all 100 apps, the developer should understand:

* modern React architecture
* component composition
* state-driven UI
* Fluent UI ecosystem
* TypeScript architecture
* rendering flow
* hooks
* effects
* Context API
* reducers
* reusable systems
* API integration
* enterprise layouts
* scalable React organization

---

# Final Philosophy

The ultimate goal is to reach the point where:

```txt
Idea
→ State model
→ Component architecture
→ UI composition
→ Fluent UI integration
→ Production-ready React application
```

becomes a natural development process.

This repository is not about memorizing React.

It is about internalizing React.

---

# Official Documentation

| Topic           | Documentation                                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| React Learn     | [https://react.dev/learn](https://react.dev/learn)                                                                                                   |
| React Reference | [https://react.dev/reference/react](https://react.dev/reference/react)                                                                               |
| Fluent UI       | [https://developer.microsoft.com/en-us/fluentui#/controls/web](https://developer.microsoft.com/en-us/fluentui#/controls/web)                         |
| Vite            | [https://vite.dev/guide/](https://vite.dev/guide/)                                                                                                   |
| TypeScript      | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                                         |
| ESLint          | [https://eslint.org/docs/latest/](https://eslint.org/docs/latest/)                                                                                   |
| MDN Flexbox     | [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) |
| MDN Grid        | [https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)                 |

---

# Current Progress

| Block       | Apps              |
| ----------- | ----------------- |
| Block 1     | 01–20             |
| Block 2     | 21–40             |
| Current App | 39 — Team Manager |

# Complete 100 Apps Roadmap

| #  | App Name               | Technical Focus                     |
| -- | ---------------------- | ----------------------------------- |
| 01 | Hello React Fluent     | Vite + React + Fluent UI setup      |
| 02 | Profile Card           | Props and component composition     |
| 03 | Product List           | Dynamic list rendering with `map()` |
| 04 | Microsoft User Card    | Reusable Fluent UI cards            |
| 05 | Static Dashboard       | Layout composition and cards        |
| 06 | Corporate Sidebar Menu | Enterprise sidebar layout           |
| 07 | Visual Task List       | Pure components and rendering       |
| 08 | Timeline Events        | Sequential timeline rendering       |
| 09 | Employee Table         | Table rendering and layout          |
| 10 | Email List             | Outlook-style layouts               |
| 11 | Grid of Cards          | CSS Grid responsive layouts         |
| 12 | Image Gallery          | Responsive image rendering          |
| 13 | Movie Catalog          | Complex card composition            |
| 14 | Football Teams         | Data-driven UI rendering            |
| 15 | News Page              | Multi-section page layouts          |
| 16 | Financial Dashboard    | Enterprise KPI dashboards           |
| 17 | SharePoint Layout      | Microsoft-inspired layouts          |
| 18 | File Explorer          | Hierarchical UI composition         |
| 19 | Corporate Portal       | Enterprise content composition      |
| 20 | Microsoft Landing Page | Advanced enterprise layout          |

---

# Block 2 — Interactivity and State

| #  | App Name              | Technical Focus                   |
| -- | --------------------- | --------------------------------- |
| 21 | Counter               | First `useState` introduction     |
| 22 | Toggle Theme          | Boolean state handling            |
| 23 | Calculator            | Derived calculations and events   |
| 24 | Login Form            | Controlled inputs                 |
| 25 | User Registration     | Multi-field forms                 |
| 26 | ToDo List             | CRUD-style state updates          |
| 27 | Shopping List         | Dynamic collections               |
| 28 | Product Filter        | Filtering and derived state       |
| 29 | Employee Search       | Search filtering                  |
| 30 | Shopping Cart         | Cart state management             |
| 31 | Grade Simulator       | Derived calculations              |
| 32 | Inventory Control     | Array manipulation                |
| 33 | Contact Agenda        | Dynamic form collections          |
| 34 | Currency Converter    | Numeric conversion logic          |
| 35 | BMI Calculator        | Numeric state handling            |
| 36 | Installment Simulator | Financial calculations            |
| 37 | Voting Panel          | Voting state management           |
| 38 | Interactive Quiz      | Conditional rendering and scoring |
| 39 | Team Manager          | Complex collection state          |
| 40 | Dynamic Dashboard     | Combined state-driven UI          |

---

# Block 3 — Fluent UI Enterprise Components

| #  | App Name              | Technical Focus            |
| -- | --------------------- | -------------------------- |
| 41 | Microsoft Style Login | Enterprise login UI        |
| 42 | Corporate Form        | Advanced Fluent UI forms   |
| 43 | Tabs System           | Dynamic TabList navigation |
| 44 | Dialog Manager        | Modal architecture         |
| 45 | Executive Dashboard   | KPI dashboards             |
| 46 | DataGrid Catalog      | Fluent UI DataGrid         |
| 47 | Enterprise User List  | Avatar and Badge systems   |
| 48 | Navigable Sidebar     | Navigation systems         |
| 49 | Corporate Header      | Toolbar and command UI     |
| 50 | Professional Toolbar  | Enterprise actions         |
| 51 | Notification Center   | Toast and alerts           |
| 52 | Admin Panel           | Enterprise admin layouts   |
| 53 | Ticket Manager        | Help desk UI               |
| 54 | Approval System       | Workflow rendering         |
| 55 | Corporate Calendar    | Scheduling layouts         |
| 56 | SharePoint Dashboard  | Microsoft portal layouts   |
| 57 | Project Management    | Enterprise composition     |
| 58 | Service Desk          | Ticket workflow UI         |
| 59 | CRM Dashboard         | CRM-style dashboards       |
| 60 | Enterprise Explorer   | Complex layout systems     |

---

# Block 4 — Effects and Architecture

| #  | App Name              | Technical Focus                  |
| -- | --------------------- | -------------------------------- |
| 61 | REST API Consumption  | `useEffect` + fetch              |
| 62 | API Dashboard         | Loading and error states         |
| 63 | Async Search          | Async rendering                  |
| 64 | GitHub Explorer       | External APIs                    |
| 65 | Weather App           | Data fetching                    |
| 66 | Pagination System     | Stateful paging                  |
| 67 | Infinite Scroll       | Advanced effects                 |
| 68 | Data Cache            | Memoization                      |
| 69 | Custom Fetch Hook     | Reusable hooks                   |
| 70 | Global Context        | Context API                      |
| 71 | Favorites System      | Persistent collections           |
| 72 | API DataGrid          | Remote data rendering            |
| 73 | Analytics Dashboard   | Combined API architecture        |
| 74 | Crypto Monitor        | Real-time API updates            |
| 75 | Repository Explorer   | Async repository browsing        |
| 76 | Logs Panel            | Monitoring dashboards            |
| 77 | Reports System        | Enterprise reporting             |
| 78 | Performance Simulator | Rendering optimization           |
| 79 | Layered Architecture  | Services and models              |
| 80 | Mini React Framework  | Enterprise architecture patterns |

---

# Block 5 — Complete Enterprise Applications

| #   | App Name                   | Technical Focus                    |
| --- | -------------------------- | ---------------------------------- |
| 81  | Full CRUD System           | Complete CRUD architecture         |
| 82  | Employee Management        | Enterprise forms + grids           |
| 83  | Financial Dashboard        | Charts and metrics                 |
| 84  | Inventory System           | Complex state architecture         |
| 85  | Kanban Board               | Drag and Drop                      |
| 86  | Enterprise Task Manager    | Scalable task systems              |
| 87  | User Management System     | Authentication-style flows         |
| 88  | Admin Portal               | Enterprise routing                 |
| 89  | Ticket System              | Complex workflows                  |
| 90  | Power BI Dashboard         | Advanced dashboard composition     |
| 91  | Reports Generator          | Reporting systems                  |
| 92  | Audit System               | Large dataset visualization        |
| 93  | SharePoint Inspired Portal | Microsoft portal architecture      |
| 94  | Corporate Catalog          | Enterprise catalog systems         |
| 95  | Reservation System         | Scheduling architecture            |
| 96  | Mini ERP                   | Enterprise multi-module UI         |
| 97  | CRM Complete               | Enterprise CRM workflows           |
| 98  | Analytics Platform         | Data visualization architecture    |
| 99  | Microsoft Admin Center     | Microsoft-style admin UI           |
| 100 | Final Enterprise Platform  | Full production-ready architecture |

---

# Technical Evolution of the Repository

| Phase          | Main Concepts                |
| -------------- | ---------------------------- |
| Fundamentals   | JSX, components, props       |
| Rendering      | Lists, conditional rendering |
| Interactivity  | Events and `useState`        |
| Forms          | Controlled inputs            |
| State Modeling | Derived state and structure  |
| Fluent UI      | Enterprise UI components     |
| Effects        | API synchronization          |
| Architecture   | Services, hooks, models      |
| Performance    | `useMemo`, `useCallback`     |
| Enterprise     | Dashboards, CRUD, routing    |

---

# Repository Goal

By the end of the 100 apps, the developer should be capable of building:

* modern React applications
* enterprise dashboards
* Microsoft-style portals
* Fluent UI systems
* scalable frontend architecture
* SPFx-style enterprise UI
* reusable component libraries
* production-ready React applications

---

# Current Progress

| Block          | Status            |
| -------------- | ----------------- |
| Block 1        | In Progress       |
| Block 2        | In Progress       |
| Current App    | 39 — Team Manager |
| Remaining Apps | 40–100            |

