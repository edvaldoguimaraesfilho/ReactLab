import {
  Card,
  CardHeader,
  Text,
  Body1,
  Button,
} from "@fluentui/react-components";

import { Sparkle24Regular } from "@fluentui/react-icons";

type InfoCardProps = {
  title: string;
  description: string;
  concept: string;
};

export function InfoCard({ title, description, concept }: InfoCardProps) {
  return (
    <Card className="info-card">
      <CardHeader
        image={<Sparkle24Regular />}
        header={<Text weight="semibold">{title}</Text>}
        description={<Text>{concept}</Text>}
      />

      <Body1>{description}</Body1>

      <Button appearance="primary">
        React + Fluent UI funcionando
      </Button>
    </Card>
  );
}