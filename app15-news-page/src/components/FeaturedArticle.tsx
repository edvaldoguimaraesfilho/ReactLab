import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title1,
  Body1,
} from "@fluentui/react-components";

import { News24Regular } from "@fluentui/react-icons";
import type { NewsArticle } from "../models/NewsArticle";

interface FeaturedArticleProps {
  article: NewsArticle;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Card
      style={{
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <CardHeader
        image={<News24Regular />}
        header={<Title1>{article.title}</Title1>}
        description={
          <Text>
            {article.author} • {article.date} • {article.readTime}
          </Text>
        }
      />

      <Badge appearance="filled">{article.category}</Badge>

      <Body1 style={{ marginTop: "20px", maxWidth: "760px" }}>
        {article.summary}
      </Body1>

      <Button appearance="primary" style={{ marginTop: "24px", width: "160px" }}>
        Read article
      </Button>
    </Card>
  );
}