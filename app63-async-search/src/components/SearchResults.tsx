import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { UserResult } from "../models/UserResult";

interface SearchResultsProps {
  results: UserResult[];
}

export function SearchResults({
  results,
}: SearchResultsProps) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {results.map((user) => (
        <Card
          key={user.id}
          style={{
            padding: "20px",
          }}
        >
          <Title3>{user.name}</Title3>

          <Text>{user.email}</Text>

          <br />

          <Text>
            Company: {user.company.name}
          </Text>
        </Card>
      ))}
    </div>
  );
}