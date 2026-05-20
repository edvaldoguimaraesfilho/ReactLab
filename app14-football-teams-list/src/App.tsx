import { Text, Title1 } from "@fluentui/react-components";
import { TeamList } from "./components/TeamList";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Football Teams List</Title1>

        <Text>
          A static React and Fluent UI application that displays football teams
          using reusable typed components.
        </Text>

        <TeamList />
      </section>
    </main>
  );
}

export default App;