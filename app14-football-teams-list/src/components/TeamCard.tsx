import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import { Trophy24Regular } from "@fluentui/react-icons";

import type { FootballTeam } from "../models/FootballTeam";

interface TeamCardProps {
  team: FootballTeam;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card
      style={{
        width: "100%",
        padding: "20px",
        borderTop: `6px solid ${team.primaryColor}`,
      }}
    >
      <CardHeader
        image={<Trophy24Regular />}
        header={<Title3>{team.name}</Title3>}
        description={<Caption1>{team.country}</Caption1>}
      />

      <Body1>
        {team.name} plays in the {team.league}.
      </Body1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "16px",
        }}
      >
        <Badge appearance="filled">{team.league}</Badge>
        <Text size={200}>Stadium: {team.stadium}</Text>
        <Text size={200}>Founded: {team.founded}</Text>
      </div>
    </Card>
  );
}