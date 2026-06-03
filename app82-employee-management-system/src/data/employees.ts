import type { Employee } from "../models/Employee";

export const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "John Carter",
    email: "john.carter@contoso.com",
    department: "IT",
    position: "Frontend Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@contoso.com",
    department: "Finance",
    position: "Financial Analyst",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@contoso.com",
    department: "Human Resources",
    position: "HR Manager",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily.johnson@contoso.com",
    department: "Operations",
    position: "Operations Lead",
    status: "Active",
  },
];