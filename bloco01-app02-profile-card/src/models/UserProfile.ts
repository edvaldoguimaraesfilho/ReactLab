export interface UserProfile {
  id: number;
  name: string;
  role: string;
  email: string;
  department: string;
  status: "Online" | "Busy" | "Offline";
}