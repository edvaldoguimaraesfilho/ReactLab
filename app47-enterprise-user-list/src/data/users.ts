import type { EnterpriseUser } from "../models/EnterpriseUser";

export const users: EnterpriseUser[] = [
  {
    id: 1,
    name: "Amanda Johnson",
    role: "Project Manager",
    department: "PMO",
    email: "amanda.johnson@contoso.com",
    status: "Available",
  },
  {
    id: 2,
    name: "Carlos Mendes",
    role: "Frontend Developer",
    department: "Engineering",
    email: "carlos.mendes@contoso.com",
    status: "Busy",
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "UX Designer",
    department: "Design",
    email: "sophia.williams@contoso.com",
    status: "Offline",
  },
];