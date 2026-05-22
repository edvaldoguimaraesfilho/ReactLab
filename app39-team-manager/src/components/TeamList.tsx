import type { Team } from "../models/Team";
import { TeamCard } from "./TeamCard";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
        />
      ))}
    </div>
  );
}