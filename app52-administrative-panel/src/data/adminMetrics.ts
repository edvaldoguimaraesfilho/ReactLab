import type { AdminMetric } from "../models/AdminMetric";

export const adminMetrics: AdminMetric[] = [
  {
    id: 1,
    title: "Active Users",
    value: "1,248",
    description: "Users currently enabled in the system",
  },
  {
    id: 2,
    title: "Open Tickets",
    value: "37",
    description: "Support tickets waiting for action",
  },
  {
    id: 3,
    title: "Pending Approvals",
    value: "14",
    description: "Requests waiting for administrator approval",
  },
  {
    id: 4,
    title: "Security Alerts",
    value: "5",
    description: "Important alerts requiring review",
  },
];