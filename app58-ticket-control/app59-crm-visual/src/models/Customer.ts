export type CustomerStatus =
  | "Active"
  | "Pending"
  | "Inactive";

export interface Customer {
  id: number;
  company: string;
  contact: string;
  email: string;
  status: CustomerStatus;
  revenue: string;
}