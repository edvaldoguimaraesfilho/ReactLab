import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { InfiniteArticleList } from "./components/InfiniteArticleList";

function App() {
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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>App 67 — Infinite Scroll</Title1>

        <Text>
          An enterprise React infinite scrolling interface using
          TypeScript, Fluent UI, custom hooks, simulated API loading,
          and IntersectionObserver.
        </Text>

        <InfiniteArticleList />
      </section>
    </main>
  );
}

export default App;