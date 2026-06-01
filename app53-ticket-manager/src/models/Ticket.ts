export type TicketStatus =
  | "Open"
  | "In Progress"
  | "Resolved";

export type TicketPriority =
  | "High"
  | "Medium"
  | "Low";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  department: string;
  status: TicketStatus;
  priority: TicketPriority;
}