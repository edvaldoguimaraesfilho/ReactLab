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