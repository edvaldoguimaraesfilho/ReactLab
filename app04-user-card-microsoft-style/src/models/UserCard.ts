export type UserCard = {
  id: number;
  fullName: string;
  jobTitle: string;
  department: string;
  email: string;
  location: string;
  status: "Available" | "Busy" | "Away" | "Offline";
  initials: string;
};