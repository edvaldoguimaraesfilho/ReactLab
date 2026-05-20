import {
  Badge,
  Card,
  CardHeader,
  Caption1,
  Text,
  Title3,
  Body1,
} from "@fluentui/react-components";

import type { NewsArticle } from "../models/NewsArticle";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <CardHeader
        header={<Title3>{article.title}</Title3>}
        description={
          <Caption1>
            {article.author} • {article.date}
          </Caption1>
        }
      />

      <Badge appearance="tint">{article.category}</Badge>

      <Body1 style={{ marginTop: "16px" }}>{article.summary}</Body1>

      <Text size={200} style={{ marginTop: "16px" }}>
        {article.readTime}
      </Text>
    </Card>
  );
}