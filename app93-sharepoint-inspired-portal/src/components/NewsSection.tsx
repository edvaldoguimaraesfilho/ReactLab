import {
  Badge,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import { newsItems } from "../data/news";

export function NewsSection() {
  return (
    <section>
      <Title3>Corporate News</Title3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "16px",
          marginTop: "12px",
        }}
      >
        {newsItems.map((news) => (
          <Card key={news.id}>
            <CardHeader
              header={<Text weight="semibold">{news.title}</Text>}
              description={<Text size={200}>{news.date}</Text>}
            />

            <Badge appearance="tint">{news.category}</Badge>

            <Text>{news.summary}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}