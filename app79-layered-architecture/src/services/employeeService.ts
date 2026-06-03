import type { Employee } from "../models/Employee";

export async function getEmployees(): Promise<Employee[]> {
  return Promise.resolve([
    {
      id: 1,
      name: "John Carter",
      role: "Software Engineer",
      department: "Technology",
    },
    {
      id: 2,
      name: "Mary Johnson",
      role: "Project Manager",
      department: "Operations",
    },
    {
      id: 3,
      name: "David Smith",
      role: "Business Analyst",
      department: "Strategy",
    },
  ]);
}