import type { Employee } from "../models/Employee";

export const employees: Employee[] = [
  {
    id: 1,
    name: "Anna Johnson",
    role: "Project Manager",
    department: "PMO",
    location: "New York",
    status: "Active",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Frontend Developer",
    department: "Engineering",
    location: "São Paulo",
    status: "Remote",
  },
  {
    id: 3,
    name: "Emily Carter",
    role: "UX Designer",
    department: "Design",
    location: "London",
    status: "Active",
  },
  {
    id: 4,
    name: "Michael Smith",
    role: "Data Analyst",
    department: "Business Intelligence",
    location: "Toronto",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Sofia Garcia",
    role: "HR Specialist",
    department: "Human Resources",
    location: "Madrid",
    status: "Active",
  },
];