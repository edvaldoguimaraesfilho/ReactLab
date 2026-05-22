import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialCandidates } from "../data/candidates";

import { CandidateCard } from "./CandidateCard";

import type { Candidate } from "../models/Candidate";

export function VotingBoard() {
  const [candidates, setCandidates] =
    useState<Candidate[]>(initialCandidates);

  function handleVote(id: number) {
    setCandidates((previousCandidates) =>
      previousCandidates.map((candidate) => {
        if (candidate.id === id) {
          return {
            ...candidate,
            votes: candidate.votes + 1,
          };
        }

        return candidate;
      })
    );
  }

  const totalVotes = candidates.reduce(
    (sum, candidate) => sum + candidate.votes,
    0
  );

  const highestVoteCount = Math.max(
    ...candidates.map((candidate) => candidate.votes)
  );

  return (
    <section>
      <Title1>Voting Panel</Title1>

      <Text>
        Enterprise voting dashboard built with React and Fluent UI.
      </Text>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "32px",
        }}
      >
        <Text weight="semibold">
          Total Votes: {totalVotes}
        </Text>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            totalVotes={totalVotes}
            isLeader={
              candidate.votes === highestVoteCount &&
              totalVotes > 0
            }
            onVote={handleVote}
          />
        ))}
      </div>
    </section>
  );
}