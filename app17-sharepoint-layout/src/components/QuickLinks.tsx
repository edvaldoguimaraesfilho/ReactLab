import { Card, CardHeader, Text, Title3 } from "@fluentui/react-components";
import { Folder24Regular } from "@fluentui/react-icons";
import { portalLinks } from "../data/portalLinks";

export function QuickLinks() {
  return (
    <section>
      <Title3>Quick links</Title3>

      <div className="quick-links-grid">
        {portalLinks.map((link) => (
          <Card key={link.id} className="portal-card">
            <CardHeader
              image={<Folder24Regular />}
              header={<Text weight="semibold">{link.title}</Text>}
              description={<Text size={200}>{link.description}</Text>}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}