import {
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { UserCard }
  from "./components/UserCard";

import { useFetch }
  from "./hooks/useFetch";

import type { User }
  from "./models/User";

function App() {
  const {
    data,
    loading,
    error,
  } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>
        Custom Fetch Hook
      </Title1>

      <Text>
        Reusable API Consumption Logic
      </Text>

      {loading && (
        <div
          style={{
            marginTop: "24px",
          }}
        >
          <Spinner
            label="Loading users..."
          />
        </div>
      )}

      {error && (
        <Text>
          Error: {error}
        </Text>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {data?.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </main>
  );
}

export default App;