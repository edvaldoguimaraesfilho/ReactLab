import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { ArrowClockwise24Regular } from "@fluentui/react-icons";

import { PostList } from "./components/PostList";
import type { Post } from "./models/Post";
import { getPosts } from "./services/postService";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadPosts() {
    try {
      setLoading(true);
      setError(null);

      const data = await getPosts();

      setPosts(data.slice(0, 12));
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unexpected error while loading posts.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

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
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <header>
          <Title1>
            REST API Consumption
          </Title1>

          <Text>
            App 61 demonstrates how to consume a REST API using React,
            TypeScript, Vite, Fluent UI, a service layer, loading state,
            error state, and useEffect.
          </Text>
        </header>

        <div>
          <Button
            appearance="primary"
            icon={<ArrowClockwise24Regular />}
            onClick={loadPosts}
          >
            Reload posts
          </Button>
        </div>

        {loading && (
          <Card
            style={{
              padding: "32px",
            }}
          >
            <Spinner label="Loading posts from the API..." />
          </Card>
        )}

        {error && (
          <Card
            style={{
              padding: "24px",
            }}
          >
            <Text weight="semibold">
              Error
            </Text>

            <Text>
              {error}
            </Text>
          </Card>
        )}

        {!loading && !error && (
          <PostList posts={posts} />
        )}
      </section>
    </main>
  );
}

export default App;