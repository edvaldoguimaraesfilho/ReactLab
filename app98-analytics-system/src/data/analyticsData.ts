import type { AnalyticsMetric } from "../models/AnalyticsMetric";

export const analyticsData: AnalyticsMetric[] = [
  {
    id: 1,
    category: "Sales",
    metric: "Monthly Revenue",
    value: 125000,
    trend: "Up",
    owner: "Finance",
  },
  {
    id: 2,
    category: "Marketing",
    metric: "Lead Generation",
    value: 4200,
    trend: "Up",
    owner: "Marketing",
  },
  {
    id: 3,
    category: "Operations",
    metric: "Process Efficiency",
    value: 89,
    trend: "Stable",
    owner: "Operations",
  },
  {
    id: 4,
    category: "Support",
    metric: "Ticket Resolution",
    value: 96,
    trend: "Up",
    owner: "Support",
  },
];