import {
  Button,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  Document24Regular,
  Folder24Regular,
  PeopleTeam24Regular,
  ChartMultiple24Regular,
} from "@fluentui/react-icons";

import { quickLinks } from "../data/dashboardData";

const icons = [
  <Document24Regular />,
  <Folder24Regular />,
  <PeopleTeam24Regular />,
  <ChartMultiple24Regular />,
];

export function QuickLinks() {
  return (
    <section>
      <Title2>Quick Links</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {quickLinks.map((item, index) => (
          <Card key={item.id}>
            <CardHeader
              image={icons[index]}
              header={<Text weight="semibold">{item.title}</Text>}
              description={<Text>{item.description}</Text>}
            />

            <Button appearance="primary">Open</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}