import {
  Card,
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { UserDataGrid } from "./components/UserDataGrid";
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
    users,
    loading,
    error,
  } = useUsers();

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          padding: "32px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          API DataGrid Explorer
        </Title1>

        <Text>
          Corporate user directory powered by API.
        </Text>

        {loading && (
          <div style={{ marginTop: "24px" }}>
            <Spinner label="Loading users..." />
          </div>
        )}

        {error && (
          <Text>
            {error}
          </Text>
        )}

        {!loading && !error && (
          <div
            style={{
              marginTop: "24px",
            }}
          >
            <UserDataGrid users={users} />
          </div>
        )}
      </Card>
    </main>
  );
}

export default App;