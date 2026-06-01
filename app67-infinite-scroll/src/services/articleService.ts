import type { ArticleItem } from "../models/ArticleItem";

const articles: ArticleItem[] = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  title: `Enterprise React Article ${index + 1}`,
  summary:
    "This article explains a modern React concept using TypeScript, Fluent UI, and enterprise architecture patterns.",
  category:
    index % 3 === 0
      ? "React"
      : index % 3 === 1
        ? "Architecture"
        : "Fluent UI",
  readTime: `${4 + (index % 6)} min read`,
}));

export interface ArticlePageResult {
  items: ArticleItem[];
  hasMore: boolean;
}

export async function getArticlesPage(
  page: number,
  pageSize: number
): Promise<ArticlePageResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const items = articles.slice(startIndex, endIndex);

  return {
    items,
    hasMore: endIndex < articles.length,
  };
}