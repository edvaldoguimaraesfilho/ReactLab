import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import { People24Regular } from "@fluentui/react-icons";

import type { Team } from "../models/Team";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<People24Regular />}
        header={<Title3>{team.name}</Title3>}
        description={<Text>{team.department}</Text>}
      />

      <Body1>
        Team Leader: {team.leader}
      </Body1>

      <div
        style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge appearance="filled">
          {team.members} Members
        </Badge>
      </div>
    </Card>
  );
}