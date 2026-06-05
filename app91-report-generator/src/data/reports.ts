import type { Report } from "../models/Report";

export const reports: Report[] = [
  {
    id: 1,
    title: "Monthly Sales Report",
    department: "Sales",
    owner: "Ana Martins",
    status: "Ready",
    createdAt: "2026-06-01",
    records: 1280,
  },
  {
    id: 2,
    title: "Audit Access Report",
    department: "Compliance",
    owner: "Rob Smith",
    status: "Draft",
    createdAt: "2026-06-02",
    records: 430,
  },
  {
    id: 3,
    title: "Project Delivery Report",
    department: "PMO",
    owner: "Daniel Costa",
    status: "Published",
    createdAt: "2026-06-03",
    records: 875,
  },
];