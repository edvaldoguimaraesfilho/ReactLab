import { Badge, Button, Card, Text, Title1 } from "@fluentui/react-components";

export function HeroSection() {
  return (
    <Card className="hero-card">
      <Badge appearance="filled">Corporate Portal</Badge>

      <Title1>Welcome to the SharePoint Style Layout</Title1>

      <Text size={400}>
        This static React page simulates a modern intranet landing experience
        using Fluent UI, reusable components, typed data, and enterprise layout
        composition.
      </Text>

      <div className="hero-actions">
        <Button appearance="primary">Open Documents</Button>
        <Button appearance="secondary">View Reports</Button>
      </div>
    </Card>
  );
}