import { Card, Text, Title3 } from "@fluentui/react-components";
import type { DashboardPost } from "../models/DashboardPost";

interface PostsPanelProps {
  posts: DashboardPost[];
}

export function PostsPanel({ posts }: PostsPanelProps) {
  return (
    <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
      {posts.slice(0, 6).map((post) => (
        <Card key={post.id} style={{ padding: "20px" }}>
          <Title3>{post.title}</Title3>
          <Text>{post.body}</Text>
        </Card>
      ))}
    </div>
  );
}