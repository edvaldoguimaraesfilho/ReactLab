import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
 PersonNote24Regular,
  Trophy24Regular,
} from "@fluentui/react-icons";

import type { Candidate } from "../models/Candidate";

interface CandidateCardProps {
  candidate: Candidate;
  totalVotes: number;
  isLeader: boolean;
  onVote: (id: number) => void;
}

export function CandidateCard({
  candidate,
  totalVotes,
  isLeader,
  onVote,
}: CandidateCardProps) {
  const percentage =
    totalVotes === 0
      ? 0
      : ((candidate.votes / totalVotes) * 100).toFixed(1);

  return (
    <Card
      style={{
        padding: "24px",
        border: isLeader
          ? "2px solid #0f6cbd"
          : "1px solid #d6d6d6",
      }}
    >
      <CardHeader
        image={
          isLeader ? (
            <Trophy24Regular />
          ) : (
            <PersonNote24Regular />
          )
        }
        header={<Title3>{candidate.name}</Title3>}
        description={<Text>{candidate.party}</Text>}
      />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <Badge appearance="filled">
          Votes: {candidate.votes}
        </Badge>

        <Text>
          Percentage: {percentage}%
        </Text>

        {isLeader && totalVotes > 0 && (
          <Badge appearance="tint">
            Current Leader
          </Badge>
        )}

        <Button
          appearance="primary"
          onClick={() => onVote(candidate.id)}
        >
          Vote
        </Button>
      </div>
    </Card>
  );
}