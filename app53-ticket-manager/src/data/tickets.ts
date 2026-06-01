import type { Ticket } from "../models/Ticket";

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "SharePoint Permission Issue",
    description:
      "Users cannot access the Finance document library.",
    assignedTo: "Amanda Silva",
    department: "IT",
    status: "Open",
    priority: "High",
  },
  {
    id: 2,
    title: "Teams Meeting Failure",
    description:
      "Corporate Teams meetings disconnect unexpectedly.",
    assignedTo: "Lucas Mendes",
    department: "Infrastructure",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Power BI Dashboard Update",
    description:
      "Monthly analytics dashboard requires refresh.",
    assignedTo: "Renata Costa",
    department: "Business Intelligence",
    status: "Resolved",
    priority: "Low",
  },
];