import {
  Card,
  Text,
  Title3,
  Button,
} from "@fluentui/react-components";

import type { Repository } from "../models/Repository";

interface Props {
  repository: Repository;
}

export function RepositoryCard({
  repository,
}: Props) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {repository.name}
      </Title3>

      <Text>
        {repository.description}
      </Text>

      <Text>
        ⭐ Stars: {repository.stargazers_count}
      </Text>

      <Text>
        🍴 Forks: {repository.forks_count}
      </Text>

      <Text>
        Language: {repository.language}
      </Text>

      <Button
        as="a"
        href={repository.html_url}
        target="_blank"
      >
        Open Repository
      </Button>
    </Card>
  );
}