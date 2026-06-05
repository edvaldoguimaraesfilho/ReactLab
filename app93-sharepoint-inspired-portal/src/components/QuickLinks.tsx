import {
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import { LinkSquare24Regular } from "@fluentui/react-icons";

import { quickLinks } from "../data/quickLinks";

export function QuickLinks() {
  return (
    <section>
      <Title3>Quick Links</Title3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "12px",
        }}
      >
        {quickLinks.map((link) => (
          <Card key={link.id}>
            <CardHeader
              image={<LinkSquare24Regular />}
              header={<Text weight="semibold">{link.title}</Text>}
              description={<Text size={200}>{link.description}</Text>}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}