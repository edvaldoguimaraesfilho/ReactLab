import { Text, Title1 } from "@fluentui/react-components";
import { UserList } from "./components/UserList";

function App() {
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
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise User List</Title1>

        <Text>
          A Microsoft-style user directory built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <UserList />
      </section>
    </main>
  );
}

export default App;