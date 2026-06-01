export type UserStatus = "Available" | "Busy" | "Offline";

export interface EnterpriseUser {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  status: UserStatus;
}