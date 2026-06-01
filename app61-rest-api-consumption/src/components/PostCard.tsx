import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  Text,
} from "@fluentui/react-components";

import type { Post } from "../models/Post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
        height: "100%",
      }}
    >
      <CardHeader
        header={
          <Text weight="semibold">
            {post.title}
          </Text>
        }
        description={
          <Caption1>
            User #{post.userId} · Post #{post.id}
          </Caption1>
        }
      />

      <Body1>
        {post.body}
      </Body1>
    </Card>
  );
}