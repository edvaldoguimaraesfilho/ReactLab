import { useState } from "react";

import {
  Card,
  FluentProvider,
  Title1,
  Text,
  webLightTheme,
} from "@fluentui/react-components";

import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { LoadingState } from "./components/LoadingState";
import { ErrorMessage } from "./components/ErrorMessage";

import { searchUsers } from "./services/searchService";

import type { UserResult } from "./models/UserResult";

function App() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<UserResult[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch() {
    try {
      setLoading(true);

      setError("");

      const users =
        await searchUsers(query);

      setResults(users);
    } catch (err) {
      setError(
        "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <FluentProvider theme={webLightTheme}>
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
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <Card
            style={{
              padding: "32px",
            }}
          >
            <Title1>
              Async Enterprise Search
            </Title1>

            <Text>
              Search remote users using
              React async architecture.
            </Text>

            <div
              style={{
                marginTop: "24px",
              }}
            >
              <SearchBar
                query={query}
                onQueryChange={setQuery}
                onSearch={handleSearch}
              />
            </div>

            {loading && <LoadingState />}

            {error && (
              <div
                style={{
                  marginTop: "24px",
                }}
              >
                <ErrorMessage
                  message={error}
                />
              </div>
            )}

            {!loading &&
              !error &&
              results.length > 0 && (
                <SearchResults
                  results={results}
                />
              )}
          </Card>
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;