import type { EmployeePerformance }
from "../models/EmployeePerformance";

export const employees: EmployeePerformance[] =
Array.from({ length: 5000 }, (_, index) => ({
  id: index + 1,
  name: `Employee ${index + 1}`,
  department: [
    "IT",
    "HR",
    "Finance",
    "Operations"
  ][index % 4],
  score: Math.floor(Math.random() * 100),
}));