import { Text, Title1 } from "@fluentui/react-components";
import { TaskList } from "./components/TaskList";

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
        <Title1>Visual Task List</Title1>

        <Text>
          A static enterprise task board built with React, TypeScript, and
          Fluent UI.
        </Text>

        <TaskList />
      </section>
    </main>
  );
}

export default App;