import type { Repository } from "../models/Repository";
import { RepositoryCard } from "./RepositoryCard";

interface Props {
  repositories: Repository[];
}

export function RepositoryList({
  repositories,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
      }}
    >
      {repositories.map(repo => (
        <RepositoryCard
          key={repo.id}
          repository={repo}
        />
      ))}
    </div>
  );
}