export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketPriority = "High" | "Medium" | "Low";

export interface Ticket {
  id: number;
  title: string;
  requester: string;
  department: string;
  status: TicketStatus;
  priority: TicketPriority;
}