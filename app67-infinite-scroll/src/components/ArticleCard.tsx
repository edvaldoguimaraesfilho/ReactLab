import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import { DocumentText24Regular } from "@fluentui/react-icons";

import type { ArticleItem } from "../models/ArticleItem";

interface ArticleCardProps {
  article: ArticleItem;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        image={<DocumentText24Regular />}
        header={<Text weight="semibold">{article.title}</Text>}
        description={<Caption1>{article.readTime}</Caption1>}
      />

      <Body1>{article.summary}</Body1>

      <div style={{ marginTop: "16px" }}>
        <Badge appearance="tint">{article.category}</Badge>
      </div>
    </Card>
  );
}