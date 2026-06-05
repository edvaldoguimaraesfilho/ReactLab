import type { AdminAlert } from "../models/AdminAlert";

export const alerts: AdminAlert[] = [
  {
    id: 1,
    title: "12 users have licenses expiring soon.",
    severity: "High",
  },
  {
    id: 2,
    title: "Security baseline review is pending.",
    severity: "Medium",
  },
  {
    id: 3,
    title: "Weekly usage report is ready.",
    severity: "Low",
  },
];