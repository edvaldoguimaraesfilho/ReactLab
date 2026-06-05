import type { User } from "../models/User";

export const users: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@company.com",
    role: "Administrator",
    department: "IT",
    active: true
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary@company.com",
    role: "Manager",
    department: "Finance",
    active: true
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@company.com",
    role: "Analyst",
    department: "Operations",
    active: false
  }
];