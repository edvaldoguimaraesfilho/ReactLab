import { footballTeams } from "../data/footballTeams";
import { TeamCard } from "./TeamCard";

export function TeamList() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      {footballTeams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}