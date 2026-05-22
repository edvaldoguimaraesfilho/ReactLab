import type { Team } from "../models/Team";

export const initialTeams: Team[] = [
  {
    id: 1,
    name: "Frontend Team",
    department: "Engineering",
    leader: "Sophia Turner",
    members: 8,
  },
  {
    id: 2,
    name: "Backend Team",
    department: "Engineering",
    leader: "Daniel Brooks",
    members: 6,
  },
  {
    id: 3,
    name: "Design Team",
    department: "UX/UI",
    leader: "Emma Johnson",
    members: 4,
  },
];