import { useState } from "react";

import {
  Title1,
  Text,
} from "@fluentui/react-components";

import { RepositorySearch } from "./components/RepositorySearch";
import { RepositoryList } from "./components/RepositoryList";

import { searchRepositories } from "./services/githubService";
import type { Repository } from "./models/Repository";

function App() {

  const [query, setQuery] =
    useState("react");

  const [repositories, setRepositories] =
    useState<Repository[]>([]);

  async function handleSearch() {

    const result =
      await searchRepositories(query);

    setRepositories(result);
  }

  return (
    <main
      style={{
        padding: "32px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title1>
        Repository Explorer
      </Title1>

      <Text>
        Search and explore GitHub repositories.
      </Text>

      <RepositorySearch
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      <RepositoryList
        repositories={repositories}
      />
    </main>
  );
}

export default App;