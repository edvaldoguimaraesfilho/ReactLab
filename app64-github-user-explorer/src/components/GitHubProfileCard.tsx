import {
  Avatar,
  Card,
  Link,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { GitHubUser } from "../models/GitHubUser";

interface GitHubProfileCardProps {
  user: GitHubUser;
}

export function GitHubProfileCard({
  user,
}: GitHubProfileCardProps) {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Avatar
        image={{
          src: user.avatar_url,
        }}
        size={96}
      />

      <Title2>
        {user.name || user.login}
      </Title2>

      <Text>{user.bio}</Text>

      <Text>
        Public Repositories: {user.public_repos}
      </Text>

      <Text>
        Followers: {user.followers}
      </Text>

      <Text>
        Following: {user.following}
      </Text>

      <Link
        href={user.html_url}
        target="_blank"
      >
        Open GitHub Profile
      </Link>
    </Card>
  );
}