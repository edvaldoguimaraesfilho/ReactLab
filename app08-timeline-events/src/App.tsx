import { Text, Title1 } from "@fluentui/react-components";
import { Timeline } from "./components/Timeline";

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
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Title1>Timeline of Events</Title1>

        <Text>
          A static corporate timeline built with React, TypeScript, Vite, and
          Fluent UI.
        </Text>

        <Timeline />
      </section>
    </main>
  );
}

export default App;