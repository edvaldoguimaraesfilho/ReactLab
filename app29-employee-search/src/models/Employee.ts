export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  location: string;
  status: "Active" | "On Leave" | "Remote";
}