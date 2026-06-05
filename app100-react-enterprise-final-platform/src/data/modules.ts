import type { AdminModule } from "../models/AdminModule";

export const modules: AdminModule[] = [
  {
    id: 1,
    title: "Users",
    description: "Enterprise user administration",
    users: 425,
  },
  {
    id: 2,
    title: "Products",
    description: "Corporate product catalog",
    users: 180,
  },
  {
    id: 3,
    title: "Reports",
    description: "Reporting and analytics center",
    users: 92,
  },
  {
    id: 4,
    title: "Settings",
    description: "Global configuration management",
    users: 37,
  },
];