import type { Ticket } from "../models/Ticket";

export const mockTickets: Ticket[] = [
  {
    id: 1,
    title: "Cannot access SharePoint",
    description: "User cannot open the portal",
    category: "SharePoint",
    priority: "High",
    status: "New",
    assignedTo: "John",
    createdAt: "2026-06-03",
  },
  {
    id: 2,
    title: "Email issue",
    description: "Mailbox synchronization failed",
    category: "Exchange",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Sarah",
    createdAt: "2026-06-02",
  },
];