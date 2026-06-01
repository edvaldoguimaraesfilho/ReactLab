import type { Project } from "../models/Project";

export const projects: Project[] = [
  {
    id: 1,
    title: "SharePoint Migration",
    manager: "Enterprise Team",
    department: "Infrastructure",
    progress: 85,
    status: "In Progress",
  },
  {
    id: 2,
    title: "CRM Modernization",
    manager: "Business Solutions",
    department: "Sales",
    progress: 100,
    status: "Completed",
  },
  {
    id: 3,
    title: "Power BI Analytics",
    manager: "Analytics Team",
    department: "Finance",
    progress: 45,
    status: "In Progress",
  },
  {
    id: 4,
    title: "HR Self-Service Portal",
    manager: "Internal Systems",
    department: "Human Resources",
    progress: 15,
    status: "Pending",
  },
];