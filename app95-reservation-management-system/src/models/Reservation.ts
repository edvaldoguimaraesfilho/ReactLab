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