import { Text, Title1 } from "@fluentui/react-components";
import { DashboardGrid } from "./components/DashboardGrid";

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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>Enterprise Card Grid</Title1>

        <Text>
          A responsive dashboard grid built with React, TypeScript, CSS Grid,
          and Fluent UI.
        </Text>

        <DashboardGrid />
      </section>
    </main>
  );
}

export default App;