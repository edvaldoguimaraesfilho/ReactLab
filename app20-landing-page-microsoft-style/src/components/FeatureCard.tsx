import { Card, Text, Title3 } from "@fluentui/react-components";
import type { FeatureItem } from "../models/FeatureItem";

interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card style={{ padding: "24px" }}>
      <Title3>{feature.title}</Title3>
      <Text>{feature.description}</Text>
    </Card>
  );
}