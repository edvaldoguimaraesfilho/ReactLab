import type { DashboardCard } from "../models/DashboardCard";

export const dashboardCards: DashboardCard[] = [
  {
    id: 1,
    title: "Active Projects",
    description: "Projects currently being executed by the delivery team.",
    value: "24",
    category: "Delivery",
  },
  {
    id: 2,
    title: "Open Tickets",
    description: "Support requests waiting for technical review.",
    value: "138",
    category: "Support",
  },
  {
    id: 3,
    title: "Monthly Reports",
    description: "Reports generated for business and compliance areas.",
    value: "16",
    category: "Reporting",
  },
  {
    id: 4,
    title: "Team Members",
    description: "People currently assigned to enterprise initiatives.",
    value: "42",
    category: "People",
  },
  {
    id: 5,
    title: "Pending Reviews",
    description: "Documents and requests waiting for approval.",
    value: "9",
    category: "Governance",
  },
  {
    id: 6,
    title: "Completed Tasks",
    description: "Tasks completed during the current work cycle.",
    value: "312",
    category: "Productivity",
  },
];