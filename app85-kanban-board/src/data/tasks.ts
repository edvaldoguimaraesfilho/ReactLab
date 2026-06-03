import type { KanbanTask } from "../models/KanbanTask";

export const tasks: KanbanTask[] = [
  {
    id: 1,
    title: "Design Login Screen",
    description: "Create Microsoft-style login page.",
    owner: "UI Team",
    priority: "High",
    status: "To Do",
  },
  {
    id: 2,
    title: "Implement API Service",
    description: "Create service layer.",
    owner: "Backend Team",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Review Dashboard",
    description: "Validate KPI layout.",
    owner: "Product Team",
    priority: "Low",
    status: "Review",
  },
  {
    id: 4,
    title: "Deploy Release",
    description: "Publish production package.",
    owner: "DevOps",
    priority: "High",
    status: "Done",
  }
];