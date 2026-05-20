import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
} from "@fluentui/react-components";

import { Board24Regular } from "@fluentui/react-icons";

import type { DashboardCard } from "../models/DashboardCard";

interface DashboardCardItemProps {
  card: DashboardCard;
}

export function DashboardCardItem({ card }: DashboardCardItemProps) {
  return (
    <Card
      style={{
        padding: "20px",
        minHeight: "180px",
      }}
    >
      <CardHeader
        image={<Board24Regular />}
        header={<Title3>{card.title}</Title3>}
        description={<Caption1>{card.category}</Caption1>}
      />

      <Text
        size={900}
        weight="semibold"
        style={{
          marginTop: "12px",
        }}
      >
        {card.value}
      </Text>

      <Body1>{card.description}</Body1>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance="tint">{card.category}</Badge>
      </div>
    </Card>
  );
}