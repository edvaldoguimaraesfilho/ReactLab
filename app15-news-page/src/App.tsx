import { Text, Title1 } from "@fluentui/react-components";
import { FeaturedArticle } from "./components/FeaturedArticle";
import { NewsGrid } from "./components/NewsGrid";
import { newsArticles } from "./data/newsArticles";

function App() {
  const featuredArticle = newsArticles[0];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise News Portal</Title1>

        <Text>
          A static Microsoft-style news page built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <FeaturedArticle article={featuredArticle} />
          <NewsGrid />
        </div>
      </section>
    </main>
  );
}

export default App;