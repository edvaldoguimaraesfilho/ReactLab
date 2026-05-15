import type { TaskItem } from "../models/TaskItem";

export const tasks: TaskItem[] = [
  {
    id: 1,
    title: "Prepare project structure",
    description: "Create folders, base files, and initial architecture.",
    owner: "Development Team",
    status: "Completed",
    priority: "High",
  },
  {
    id: 2,
    title: "Design task card component",
    description: "Create a reusable visual card for each task.",
    owner: "UI Team",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Review Fluent UI layout",
    description: "Validate spacing, typography, and card composition.",
    owner: "Design System Team",
    status: "Pending",
    priority: "Low",
  },
];