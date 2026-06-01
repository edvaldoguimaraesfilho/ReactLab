import {
  Button,
  Spinner,
  Text,
} from "@fluentui/react-components";

import { ArticleCard } from "./ArticleCard";
import { useInfiniteArticles } from "../hooks/useInfiniteArticles";

export function InfiniteArticleList() {
  const {
    articles,
    hasMore,
    isLoading,
    observerTargetRef,
  } = useInfiniteArticles();

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "32px",
        }}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))}
      </div>

      <div
        ref={observerTargetRef}
        style={{
          minHeight: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "24px",
        }}
      >
        {isLoading && (
          <Spinner label="Loading more articles..." />
        )}

        {!hasMore && !isLoading && (
          <Text weight="semibold">
            All articles were loaded.
          </Text>
        )}

        {hasMore && !isLoading && (
          <Button appearance="subtle">
            Scroll down to load more
          </Button>
        )}
      </div>
    </>
  );
}