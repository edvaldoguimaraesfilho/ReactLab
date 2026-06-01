import {
  Badge,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import { News24Regular } from "@fluentui/react-icons";

import { newsItems } from "../data/dashboardData";

export function NewsSection() {
  return (
    <section>
      <Title2>Corporate News</Title2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {newsItems.map((news) => (
          <Card key={news.id}>
            <CardHeader
              image={<News24Regular />}
              header={<Text weight="semibold">{news.title}</Text>}
              description={<Text>{news.publishedDate}</Text>}
            />

            <Badge appearance="tint">{news.category}</Badge>

            <Text>{news.summary}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}