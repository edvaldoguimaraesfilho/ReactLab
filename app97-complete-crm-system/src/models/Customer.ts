export interface Customer {
  id: number;
  company: string;
  contact: string;
  email: string;
  status: "Lead" | "Prospect" | "Customer";
  annualRevenue: number;
}