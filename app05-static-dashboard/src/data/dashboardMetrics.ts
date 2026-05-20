import type { DashboardMetric } from "../models/DashboardMetric";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: 1,
    title: "Active Users",
    value: "12,480",
    description: "Users currently registered in the platform",
  },
  {
    id: 2,
    title: "Monthly Revenue",
    value: "$84,250",
    description: "Estimated revenue for the current month",
  },
  {
    id: 3,
    title: "Open Tickets",
    value: "136",
    description: "Support tickets waiting for resolution",
  },
  {
    id: 4,
    title: "System Health",
    value: "98.7%",
    description: "Current operational availability",
  },
];