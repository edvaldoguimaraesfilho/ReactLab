export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: EmployeeStatus;
}