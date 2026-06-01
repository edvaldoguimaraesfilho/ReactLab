import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  ArrowClockwise24Regular,
  Database24Regular,
} from "@fluentui/react-icons";

import type { DashboardPost } from "./models/DashboardPost";
import { getDashboardPosts } from "./services/dashboardService";
import { KpiCard } from "./components/KpiCard";
import { PostsPanel } from "./components/PostsPanel";

function App() {
  const [posts, setPosts] = useState<DashboardPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboardData() {
    try {
      setLoading(true);
      setError("");

      const data = await getDashboardPosts();
      setPosts(data);
    } catch {
      setError("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalPosts = posts.length;
  const totalUsers = new Set(posts.map((post) => post.userId)).size;
  const latestPost = posts[0]?.title ?? "No data";

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1180px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <div>
            <Title1>Dashboard with API</Title1>
            <Text>
              Enterprise dashboard consuming external REST data with loading
              and error states.
            </Text>
          </div>

          <Button
            appearance="primary"
            icon={<ArrowClockwise24Regular />}
            onClick={loadDashboardData}
          >
            Refresh
          </Button>
        </div>

        {loading && (
          <div style={{ marginTop: "40px" }}>
            <Spinner label="Loading dashboard data..." />
          </div>
        )}

        {error && (
          <Card style={{ marginTop: "32px", padding: "24px" }}>
            <Text weight="semibold">{error}</Text>
          </Card>
        )}

        {!loading && !error && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "20px",
                marginTop: "32px",
              }}
            >
              <KpiCard
                title="Total Posts"
                value={String(totalPosts)}
                description="Records loaded from the API."
              />

              <KpiCard
                title="Users"
                value={String(totalUsers)}
                description="Distinct users found in the response."
              />

              <KpiCard
                title="Latest Item"
                value="API"
                description={latestPost}
              />

              <KpiCard
                title="Source"
                value="REST"
                description="Data loaded with fetch and useEffect."
              />
            </div>

            <div style={{ marginTop: "40px" }}>
              <Title1>
                <Database24Regular /> Recent API Records
              </Title1>

              <PostsPanel posts={posts} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;