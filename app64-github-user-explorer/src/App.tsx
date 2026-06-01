import { useEffect, useState } from "react";

import {
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { SearchBar } from "./components/SearchBar";
import { GitHubProfileCard } from "./components/GitHubProfileCard";

import type { GitHubUser } from "./models/GitHubUser";

import { fetchGitHubUser } from "./services/githubService";

function App() {
  const [username, setUsername] =
    useState("microsoft");

  const [searchUsername, setSearchUsername] =
    useState("microsoft");

  const [user, setUser] =
    useState<GitHubUser | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const data =
          await fetchGitHubUser(searchUsername);

        setUser(data);
      } catch (err) {
        setError(
          "Unable to load GitHub profile."
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [searchUsername]);

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
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <Title1>
          GitHub User Explorer
        </Title1>

        <Text>
          Search GitHub users using React,
          TypeScript, Fluent UI, and Effects.
        </Text>

        <div
          style={{
            marginTop: "24px",
          }}
        >
          <SearchBar
            username={username}
            onUsernameChange={setUsername}
            onSearch={() =>
              setSearchUsername(username)
            }
          />
        </div>

        {loading && (
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <Spinner label="Loading profile..." />
          </div>
        )}

        {error && (
          <Text
            style={{
              color: "red",
              marginTop: "24px",
              display: "block",
            }}
          >
            {error}
          </Text>
        )}

        {user && !loading && (
          <GitHubProfileCard user={user} />
        )}
      </section>
    </main>
  );
}

export default App;