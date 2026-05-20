import { Badge, Card, Text, Title3 } from "@fluentui/react-components";
import { newsItems } from "../data/newsItems";

export function NewsSection() {
  return (
    <section>
      <Title3>Latest news</Title3>

      <div className="news-list">
        {newsItems.map((item) => (
          <Card key={item.id} className="news-card">
            <div className="news-card-header">
              <Badge appearance="tint">{item.category}</Badge>
              <Text size={200}>{item.date}</Text>
            </div>

            <Text weight="semibold">{item.title}</Text>
            <Text size={300}>{item.summary}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}