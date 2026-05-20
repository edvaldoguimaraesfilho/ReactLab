import { newsArticles } from "../data/newsArticles";
import { NewsCard } from "./NewsCard";

export function NewsGrid() {
  const secondaryArticles = newsArticles.slice(1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
      }}
    >
      {secondaryArticles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}