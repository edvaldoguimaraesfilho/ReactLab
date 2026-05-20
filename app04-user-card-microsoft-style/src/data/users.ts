import type { UserCard } from "../models/UserCard";

export const users: UserCard[] = [
  {
    id: 1,
    fullName: "Ana Martins",
    jobTitle: "Project Manager",
    department: "PMO",
    email: "ana.martins@contoso.com",
    location: "São Paulo, Brazil",
    status: "Available",
    initials: "AM",
  },
  {
    id: 2,
    fullName: "Robert King",
    jobTitle: "SharePoint Architect",
    department: "Microsoft 365",
    email: "robert.king@contoso.com",
    location: "Toronto, Canada",
    status: "Busy",
    initials: "RK",
  },
  {
    id: 3,
    fullName: "Julia Santos",
    jobTitle: "Frontend Developer",
    department: "React Team",
    email: "julia.santos@contoso.com",
    location: "Lisbon, Portugal",
    status: "Away",
    initials: "JS",
  },
];