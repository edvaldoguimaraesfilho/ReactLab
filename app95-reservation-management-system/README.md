# App 95 — Reservation Management System

**Block 5 — Complete Applications**
**App 95 of 100**
**Focus:** Enterprise Reservation System, Advanced Forms, DataGrid, Fluent UI, State Management, Business Rules, Dashboard Design. 

---

# Solution Overview

App 95 is a complete **Reservation Management System** designed using React, TypeScript, Vite, and Fluent UI.

The system allows users to:

* Create reservations
* View reservations
* Cancel reservations
* Filter reservations
* Display reservation status
* Manage customers
* Track reservation dates
* Display reservation statistics
* Use Microsoft-style enterprise UI

This application simulates systems commonly found in:

* Hotels
* Conference Rooms
* Corporate Facilities
* Equipment Booking
* Vehicle Reservations
* Resource Scheduling Platforms

Following the React Learn philosophy, the UI is completely derived from state. No direct DOM manipulation is used. 

---

# React Concepts Covered

| Concept               | Usage                  |
| --------------------- | ---------------------- |
| useState              | Reservation management |
| Derived State         | Statistics and filters |
| Fluent UI             | Enterprise UI          |
| DataGrid              | Reservation listing    |
| Forms                 | Reservation creation   |
| Conditional Rendering | Status display         |
| Component Composition | Modular architecture   |
| TypeScript Models     | Business entities      |
| Event Handling        | Reservation actions    |
| Dashboard Layout      | Executive view         |

---

# Create the Project

```powershell
mkdir bloco05
cd bloco05

npm create vite@latest app95-reservation-management-system -- --template react-ts

cd app95-reservation-management-system

npm install

npm install @fluentui/react-components
npm install @fluentui/react-icons
```

---

# Create Project Structure

```powershell
New-Item src\components -ItemType Directory
New-Item src\models -ItemType Directory
New-Item src\data -ItemType Directory
New-Item src\services -ItemType Directory
New-Item src\styles -ItemType Directory

New-Item src\models\Reservation.ts -ItemType File
New-Item src\data\reservationData.ts -ItemType File
New-Item src\components\ReservationForm.tsx -ItemType File
New-Item src\components\ReservationGrid.tsx -ItemType File
New-Item src\components\ReservationDashboard.tsx -ItemType File
New-Item src\components\ReservationStatistics.tsx -ItemType File

New-Item artigo.md -ItemType File
```

---

# Reservation Model

## src/models/Reservation.ts

```ts
export type ReservationStatus =
  | "Confirmed"
  | "Pending"
  | "Cancelled";

export interface Reservation {
  id: number;
  customerName: string;
  resourceName: string;
  reservationDate: string;
  status: ReservationStatus;
}
```

---

# Mock Data

## src/data/reservationData.ts

```ts
import type { Reservation } from "../models/Reservation";

export const reservationData: Reservation[] = [
  {
    id: 1,
    customerName: "John Smith",
    resourceName: "Conference Room A",
    reservationDate: "2026-06-15",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    resourceName: "Vehicle 01",
    reservationDate: "2026-06-20",
    status: "Pending",
  },
];
```

---

# Reservation Form

## src/components/ReservationForm.tsx

```tsx
import {
  Button,
  Field,
  Input,
  Card,
  Title3,
} from "@fluentui/react-components";

interface Props {
  customerName: string;
  resourceName: string;
  reservationDate: string;
  setCustomerName: (value: string) => void;
  setResourceName: (value: string) => void;
  setReservationDate: (value: string) => void;
  onAddReservation: () => void;
}

export function ReservationForm(props: Props) {
  return (
    <Card>
      <Title3>Create Reservation</Title3>

      <Field label="Customer">
        <Input
          value={props.customerName}
          onChange={(_, data) =>
            props.setCustomerName(data.value)
          }
        />
      </Field>

      <Field label="Resource">
        <Input
          value={props.resourceName}
          onChange={(_, data) =>
            props.setResourceName(data.value)
          }
        />
      </Field>

      <Field label="Date">
        <Input
          type="date"
          value={props.reservationDate}
          onChange={(_, data) =>
            props.setReservationDate(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={props.onAddReservation}
      >
        Create Reservation
      </Button>
    </Card>
  );
}
```

---

# Reservation Statistics

## src/components/ReservationStatistics.tsx

```tsx
import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export function ReservationStatistics(props: Props) {
  return (
    <Card>
      <Title3>Statistics</Title3>

      <Text>Total: {props.total}</Text>
      <br />

      <Text>Confirmed: {props.confirmed}</Text>
      <br />

      <Text>Pending: {props.pending}</Text>
      <br />

      <Text>Cancelled: {props.cancelled}</Text>
    </Card>
  );
}
```

---

# Reservation Grid

## src/components/ReservationGrid.tsx

```tsx
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Button,
} from "@fluentui/react-components";

import type { Reservation } from "../models/Reservation";

interface Props {
  reservations: Reservation[];
  onCancel: (id: number) => void;
}

export function ReservationGrid({
  reservations,
  onCancel,
}: Props) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Resource</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>
                {reservation.customerName}
              </TableCell>

              <TableCell>
                {reservation.resourceName}
              </TableCell>

              <TableCell>
                {reservation.reservationDate}
              </TableCell>

              <TableCell>
                <Badge>
                  {reservation.status}
                </Badge>
              </TableCell>

              <TableCell>
                <Button
                  appearance="secondary"
                  onClick={() =>
                    onCancel(reservation.id)
                  }
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

---

# Main Application

## src/App.tsx

```tsx
import { useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { reservationData } from "./data/reservationData";
import { ReservationForm } from "./components/ReservationForm";
import { ReservationGrid } from "./components/ReservationGrid";
import { ReservationStatistics } from "./components/ReservationStatistics";

import type { Reservation } from "./models/Reservation";

function App() {
  const [reservations, setReservations] =
    useState<Reservation[]>(reservationData);

  const [customerName, setCustomerName] =
    useState("");

  const [resourceName, setResourceName] =
    useState("");

  const [reservationDate, setReservationDate] =
    useState("");

  function addReservation() {
    const reservation: Reservation = {
      id: Date.now(),
      customerName,
      resourceName,
      reservationDate,
      status: "Pending",
    };

    setReservations([
      ...reservations,
      reservation,
    ]);

    setCustomerName("");
    setResourceName("");
    setReservationDate("");
  }

  function cancelReservation(id: number) {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              status: "Cancelled",
            }
          : reservation
      )
    );
  }

  const confirmed =
    reservations.filter(
      (r) => r.status === "Confirmed"
    ).length;

  const pending =
    reservations.filter(
      (r) => r.status === "Pending"
    ).length;

  const cancelled =
    reservations.filter(
      (r) => r.status === "Cancelled"
    ).length;

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
          display: "grid",
          gap: "24px",
        }}
      >
        <Title1>
          Reservation Management System
        </Title1>

        <ReservationStatistics
          total={reservations.length}
          confirmed={confirmed}
          pending={pending}
          cancelled={cancelled}
        />

        <ReservationForm
          customerName={customerName}
          resourceName={resourceName}
          reservationDate={reservationDate}
          setCustomerName={setCustomerName}
          setResourceName={setResourceName}
          setReservationDate={setReservationDate}
          onAddReservation={addReservation}
        />

        <ReservationGrid
          reservations={reservations}
          onCancel={cancelReservation}
        />
      </main>
    </FluentProvider>
  );
}

export default App;
```

---

# Run the Application

```powershell
npm run dev
```

Production validation:

```powershell
npm run build
```

Preview:

```powershell
npm run preview
```

---

# What We Learned

| Area             | Learning               |
| ---------------- | ---------------------- |
| React State      | Reservation lifecycle  |
| Forms            | Controlled inputs      |
| Business Rules   | Reservation workflow   |
| Fluent UI        | Enterprise controls    |
| Dashboard Design | Statistics cards       |
| Derived State    | KPI calculations       |
| Lists            | Reservation rendering  |
| TypeScript       | Strong typing          |
| Architecture     | Component separation   |
| Enterprise UI    | Microsoft-style design |

---

# Official Documentation

## React

* [React Learn](https://react.dev/learn?utm_source=chatgpt.com)
* [Managing State](https://react.dev/learn/managing-state?utm_source=chatgpt.com)
* [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure?utm_source=chatgpt.com)

## Fluent UI

* [Fluent UI React Components](https://react.fluentui.dev?utm_source=chatgpt.com)
* [Fluent UI Table Components](https://react.fluentui.dev/?path=%2Fdocs%2Fcomponents-table--docs&utm_source=chatgpt.com)

## Vite

* [Vite Guide](https://vite.dev/guide/?utm_source=chatgpt.com)

## TypeScript

* [TypeScript Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)

---

# Current Progress

| Block   | App | Name                          | Status    |
| ------- | --- | ----------------------------- | --------- |
| Block 5 | 91  | Report Generator              | Completed |
| Block 5 | 92  | Audit System                  | Completed |
| Block 5 | 93  | SharePoint Inspired Portal    | Completed |
| Block 5 | 94  | Corporate Catalog             | Completed |
| Block 5 | 95  | Reservation Management System | Current   |
| Block 5 | 96  | Mini ERP Enterprise           | Next      |

**Roadmap Reference:** App 95 corresponds to **"Sistema de Reservas / Reservation System"** in the Complete Applications block of the React + Fluent UI 100 Apps roadmap. 
