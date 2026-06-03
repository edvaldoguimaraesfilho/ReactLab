import type { TaskItem } from "../models/TaskItem";

export const initialTasks: TaskItem[] = [
  {
    id: 1,
    title: "Review SharePoint Migration Plan",
    description: "Validate task ownership, timeline, and risk points.",
    owner: "Project Manager",
    department: "IT",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 2,
    title: "Prepare Monthly Usage Report",
    description: "Collect metrics and prepare the executive summary.",
    owner: "Reporting Analyst",
    department: "Operations",
    status: "Not Started",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Validate Fluent UI Standards",
    description: "Check spacing, accessibility, and visual consistency.",
    owner: "Frontend Team",
    department: "Engineering",
    status: "Completed",
    priority: "Low",
  },
];