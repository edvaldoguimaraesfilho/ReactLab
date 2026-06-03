import type {
  EmployeePerformance
} from "../models/EmployeePerformance";

export function calculateAverageScore(
  employees: EmployeePerformance[]
) {
  return (
    employees.reduce(
      (sum, employee) => sum + employee.score,
      0
    ) / employees.length
  ).toFixed(2);
}

export function getTopPerformers(
  employees: EmployeePerformance[]
) {
  return employees.filter(
    employee => employee.score >= 80
  ).length;
}