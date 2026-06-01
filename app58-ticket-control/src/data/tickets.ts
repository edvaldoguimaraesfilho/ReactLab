import type { Ticket } from "../models/Ticket";

export const tickets: Ticket[] = [
  {
    id: 1001,
    title: "Cannot access SharePoint library",
    requester: "Ana Martins",
    department: "Operations",
    status: "Open",
    priority: "High",
  },
  {
    id: 1002,
    title: "Power BI dashboard is not refreshing",
    requester: "Carlos Silva",
    department: "Finance",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 1003,
    title: "Teams meeting room equipment issue",
    requester: "Julia Costa",
    department: "Facilities",
    status: "Resolved",
    priority: "Low",
  },
];