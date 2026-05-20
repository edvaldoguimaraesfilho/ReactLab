````md

\# ReactLab — 100 React Apps with Fluent UI, TypeScript, and Modern React



\## Overview



ReactLab is a large hands-on learning repository focused on mastering modern React through the construction of \*\*100 progressive React applications\*\* using:



\- React 19

\- TypeScript

\- Vite

\- Fluent UI

\- ESLint

\- Modern React patterns

\- Component-based architecture



The main objective of this repository is not only to learn syntax, but to deeply understand the \*\*mental model of React\*\*, following the official documentation:



\- :contentReference\[oaicite:0]{index=0}

\- :contentReference\[oaicite:1]{index=1}

\- :contentReference\[oaicite:2]{index=2}

\- :contentReference\[oaicite:3]{index=3}



This repository evolves progressively from:



```txt

Static UI

→ Component composition

→ Props

→ Lists

→ State

→ Forms

→ Events

→ Effects

→ API integration

→ Architecture

→ Enterprise dashboards

→ Complete applications

````



The project is heavily inspired by:



\* Microsoft ecosystem design

\* Enterprise UI patterns

\* SharePoint-style layouts

\* Dashboard applications

\* Professional React architecture



\---



\# Main Goals



\## Learn React the Correct Way



The repository follows the official React mental model:



\* UI as a function of state

\* Pure components

\* Declarative rendering

\* State minimalism

\* Component composition

\* Derived UI

\* Proper use of hooks

\* Avoiding unnecessary effects



\---



\# Technology Stack



| Technology    | Purpose                        |

| ------------- | ------------------------------ |

| React         | UI library                     |

| TypeScript    | Static typing                  |

| Vite          | Development server and bundler |

| Fluent UI     | Microsoft design system        |

| ESLint        | Code quality                   |

| React Hooks   | State and lifecycle            |

| CSS Flex/Grid | Layout                         |

| JSX/TSX       | Declarative UI                 |



\---



\# Project Structure Philosophy



Each app is intentionally isolated.



This allows:



\* atomic learning

\* experimentation

\* independent architecture

\* easier debugging

\* easier comparison between approaches



Typical structure:



```txt

appXX-project-name/

&#x20; src/

&#x20;   components/

&#x20;   data/

&#x20;   models/

&#x20;   hooks/

&#x20;   services/

&#x20;   styles/

&#x20;   App.tsx

&#x20;   main.tsx

```



\---



\# Development Environment



\## Required Tools



\* Node.js LTS

\* Visual Studio Code

\* npm



Recommended VS Code extensions:



\* ESLint

\* Prettier

\* TypeScript Hero

\* Error Lens



\---



\# Creating a New App



```powershell

npm create vite@latest appXX-project-name -- --template react-ts



cd appXX-project-name



npm install



npm install @fluentui/react-components @fluentui/react-icons

```



\---



\# Running an App



```powershell

npm run dev

```



\---



\# Production Validation



```powershell

npm run build

```



\---



\# Project Philosophy



This repository is intentionally repetitive.



The repetition is deliberate because React mastery comes from:



\* rendering repetition

\* composition repetition

\* props repetition

\* state repetition

\* architecture repetition



The objective is to internalize React patterns until they become natural.



\---



\# Core Concepts Covered



| Concept      | Description               |

| ------------ | ------------------------- |

| JSX          | Declarative UI syntax     |

| Components   | UI building blocks        |

| Props        | Component input           |

| State        | Component memory          |

| Hooks        | React behavior system     |

| Lists        | Dynamic rendering         |

| Events       | User interaction          |

| Effects      | External synchronization  |

| Composition  | Combining components      |

| TypeScript   | Type-safe architecture    |

| Fluent UI    | Enterprise UI design      |

| Flexbox/Grid | Layout systems            |

| Routing      | Multi-page navigation     |

| Forms        | User input                |

| APIs         | External data             |

| Reducers     | Complex state management  |

| Custom Hooks | Logic reuse               |

| Architecture | Professional organization |



\---



\# Learning Blocks



The 100 apps are divided into progressive learning blocks.



| Block   | Focus                               |

| ------- | ----------------------------------- |

| Block 1 | Fundamentals and UI                 |

| Block 2 | Interactivity and State             |

| Block 3 | Fluent UI and Enterprise Components |

| Block 4 | Effects and Architecture            |

| Block 5 | Complete Applications               |



\---



\# 100 Apps Roadmap



| #   | App Name                | Technical Summary                  |

| --- | ----------------------- | ---------------------------------- |

| 01  | Hello React Fluent      | React/Vite/Fluent UI setup         |

| 02  | Profile Card            | Props and component composition    |

| 03  | Product List            | List rendering with map            |

| 04  | Microsoft User Card     | Reusable Fluent UI cards           |

| 05  | Static Dashboard        | Dashboard layout with cards        |

| 06  | Corporate Sidebar Menu  | Enterprise sidebar layout          |

| 07  | Visual Task List        | Pure components and task rendering |

| 08  | Timeline Events         | Vertical timeline UI               |

| 09  | Employee Table          | Table rendering                    |

| 10  | Email List              | List layouts and spacing           |

| 11  | Grid of Cards           | CSS Grid responsive layouts        |

| 12  | Image Gallery           | Responsive media rendering         |

| 13  | Movie Catalog           | Complex card composition           |

| 14  | Football Teams          | Data-driven rendering              |

| 15  | News Page               | Multi-section layouts              |

| 16  | Financial Dashboard     | Enterprise metrics UI              |

| 17  | Layout Guide            | Layout composition                 |

| 18  | File Explorer           | Hierarchical UI                    |

| 19  | User Directory          | Data cards and layouts             |

| 20  | Company Portal          | Enterprise composition             |

| 21  | Counter                 | First useState introduction        |

| 22  | Toggle Theme            | Dynamic UI state                   |

| 23  | Calculator              | State calculations                 |

| 24  | Login Form              | Controlled forms                   |

| 25  | User Registration       | Multi-field forms                  |

| 26  | ToDo List               | CRUD-style state                   |

| 27  | Shopping List           | Dynamic collections                |

| 28  | Product Filter          | Derived filtered state             |

| 29  | Employee Search         | Search filtering                   |

| 30  | Shopping Cart           | Cart state management              |

| 31  | Grade Simulator         | Derived calculations               |

| 32  | Inventory Control       | Data manipulation                  |

| 33  | Currency Converter      | Conversion logic                   |

| 34  | BMI Calculator          | Numeric state handling             |

| 35  | Installment Simulator   | Financial calculations             |

| 36  | Voting Panel            | Voting state                       |

| 37  | Weather Widget          | API consumption                    |

| 38  | GitHub Profile Viewer   | External API rendering             |

| 39  | CEP Search              | Async fetch patterns               |

| 40  | Currency API Dashboard  | Live API updates                   |

| 41  | Notes App               | Persistent local state             |

| 42  | Kanban Board            | Complex component composition      |

| 43  | Modal Manager           | Dialog architecture                |

| 44  | Accordion System        | Expand/collapse state              |

| 45  | Tabs Navigation         | Dynamic views                      |

| 46  | DataGrid Explorer       | Enterprise grids                   |

| 47  | User CRUD               | Full CRUD operations               |

| 48  | Contacts Manager        | Form architecture                  |

| 49  | Product Dashboard       | Metrics and filters                |

| 50  | Expense Tracker         | Financial state                    |

| 51  | Task Manager            | Advanced task workflows            |

| 52  | Habit Tracker           | Daily state persistence            |

| 53  | Pomodoro Timer          | Timers and effects                 |

| 54  | Stopwatch               | useEffect timing                   |

| 55  | Countdown App           | Cleanup patterns                   |

| 56  | Theme Manager           | Context introduction               |

| 57  | Multi-Step Form         | Complex forms                      |

| 58  | Authentication UI       | Login flow                         |

| 59  | Dashboard Routing       | React Router basics                |

| 60  | Navigation Shell        | Enterprise routing                 |

| 61  | API Service Layer       | Services architecture              |

| 62  | Custom Hooks Intro      | Hook abstraction                   |

| 63  | useReducer App          | Reducer architecture               |

| 64  | Form Validation         | Validation patterns                |

| 65  | Data Fetching Hook      | Async hooks                        |

| 66  | Infinite Scroll         | Dynamic loading                    |

| 67  | Pagination System       | Data paging                        |

| 68  | Search Dashboard        | Search architecture                |

| 69  | Chart Dashboard         | Visualization UI                   |

| 70  | Responsive Admin        | Responsive enterprise UI           |

| 71  | Notification Center     | Toast architecture                 |

| 72  | File Upload UI          | Upload workflows                   |

| 73  | Profile Settings        | Configuration pages                |

| 74  | Theme Switcher          | Dynamic themes                     |

| 75  | Dark Mode Dashboard     | Fluent theming                     |

| 76  | Teams Dashboard         | Multi-section dashboards           |

| 77  | CRM Layout              | Enterprise architecture            |

| 78  | ERP Navigation          | Large-scale layout                 |

| 79  | SharePoint Style Portal | Microsoft-inspired UI              |

| 80  | Analytics Dashboard     | KPI visualization                  |

| 81  | User Permissions UI     | Role rendering                     |

| 82  | Dynamic Sidebar         | Navigation systems                 |

| 83  | Data Visualization Hub  | Dashboard composition              |

| 84  | Enterprise Forms        | Complex forms                      |

| 85  | Audit Log Viewer        | Large datasets                     |

| 86  | API Monitoring Panel    | Real-time UI                       |

| 87  | Workflow Dashboard      | Process visualization              |

| 88  | Notification Dashboard  | Event-driven UI                    |

| 89  | Teams Workspace         | Workspace architecture             |

| 90  | Enterprise Search       | Global search                      |

| 91  | AI Prompt Dashboard     | AI workflow UI                     |

| 92  | Copilot Style Interface | Assistant layouts                  |

| 93  | React Architecture Lab  | Advanced structure                 |

| 94  | Hook Patterns Lab       | Hook design                        |

| 95  | Fluent UI Advanced      | Advanced Fluent components         |

| 96  | Enterprise DataGrid     | Complex grids                      |

| 97  | Performance Lab         | Optimization patterns              |

| 98  | React Testing Lab       | Testing fundamentals               |

| 99  | Production Dashboard    | Production-grade architecture      |

| 100 | Final Enterprise Portal | Complete enterprise application    |



\---



\# Key Learning Outcomes



By completing all 100 apps, the developer should understand:



\* Modern React architecture

\* State-driven UI

\* Enterprise layouts

\* Fluent UI ecosystem

\* Component composition

\* Hook design

\* API integration

\* Professional TypeScript usage

\* Dashboard construction

\* React mental model

\* Production-ready organization



\---



\# Official References



| Topic           | Documentation                                                                                                                                        |

| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |

| React Learn     | \[https://react.dev/learn](https://react.dev/learn)                                                                                                   |

| React Reference | \[https://react.dev/reference/react](https://react.dev/reference/react)                                                                               |

| Fluent UI       | \[https://developer.microsoft.com/en-us/fluentui#/controls/web](https://developer.microsoft.com/en-us/fluentui#/controls/web)                         |

| Vite            | \[https://vite.dev/guide/](https://vite.dev/guide/)                                                                                                   |

| TypeScript      | \[https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)                                                                         |

| ESLint          | \[https://eslint.org/docs/latest/](https://eslint.org/docs/latest/)                                                                                   |

| MDN Flexbox     | \[https://developer.mozilla.org/en-US/docs/Web/CSS/CSS\_flexible\_box\_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS\_flexible\_box\_layout) |

| MDN Grid        | \[https://developer.mozilla.org/en-US/docs/Web/CSS/CSS\_grid\_layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS\_grid\_layout)                 |



\---



\# Repository Objectives



This repository exists to become:



\* a React learning laboratory

\* a Fluent UI reference project

\* an enterprise React architecture catalog

\* a component composition study repository

\* a practical React encyclopedia



\---



\# Final Philosophy



The ultimate goal is to reach the point where:



```txt

Idea

→ Component architecture

→ State model

→ UI composition

→ Fluent UI integration

→ Production-ready React application

```



becomes a natural development flow.



This repository is not about memorizing React.



It is about internalizing React.



\---



```

```



