export type Department = "Sales" | "Finance" | "Operations" | "Technology";

export interface DashboardMetric {
  id: number;
  title: string;
  department: Department;
  month: string;
  value: number;
  target: number;
  unit: string;
}