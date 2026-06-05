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