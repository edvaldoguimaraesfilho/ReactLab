import type { AdminModule } from "../models/AdminModule";

export const modules: AdminModule[] = [
  {
    id: 1,
    name: "Users",
    description: "Manage enterprise users.",
    users: 254,
  },
  {
    id: 2,
    name: "Groups",
    description: "Manage security groups.",
    users: 48,
  },
  {
    id: 3,
    name: "Devices",
    description: "Manage registered devices.",
    users: 312,
  },
  {
    id: 4,
    name: "Reports",
    description: "Enterprise analytics center.",
    users: 76,
  },
];