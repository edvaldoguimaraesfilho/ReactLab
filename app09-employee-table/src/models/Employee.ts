export type EmployeeStatus = "Active" | "On Leave" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: EmployeeStatus;
}