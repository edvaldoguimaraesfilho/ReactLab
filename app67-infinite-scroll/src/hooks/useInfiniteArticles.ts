import { useCallback, useEffect, useRef, useState } from "react";
import type { ArticleItem } from "../models/ArticleItem";
import { getArticlesPage } from "../services/articleService";

const PAGE_SIZE = 8;

export function useInfiniteArticles() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const loadArticles = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    const result = await getArticlesPage(page, PAGE_SIZE);

    setArticles((currentArticles) => [
      ...currentArticles,
      ...result.items,
    ]);

    setHasMore(result.hasMore);
    setPage((currentPage) => currentPage + 1);
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    const target = observerTargetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting) {
          loadArticles();
        }
      },
      {
        root: null,
        rootMargin: "120px",
        threshold: 0.1,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [loadArticles]);

  return {
    articles,
    hasMore,
    isLoading,
    observerTargetRef,
  };
}