export type EventStatus =
  | "Confirmed"
  | "Pending"
  | "Canceled";

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  organizer: string;
  location: string;
  status: EventStatus;
}