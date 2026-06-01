import { Text, Title1 } from "@fluentui/react-components";
import { ExplorerSidebar } from "./components/ExplorerSidebar";
import { ExplorerToolbar } from "./components/ExplorerToolbar";
import { ExplorerGrid } from "./components/ExplorerGrid";

function App() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <ExplorerSidebar />

      <main
        style={{
          flex: 1,
          padding: "32px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Title1>Corporate Content Explorer</Title1>
        <Text>
          A Microsoft-style enterprise explorer built with React, TypeScript,
          Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "32px" }}>
          <ExplorerToolbar />
          <ExplorerGrid />
        </div>
      </main>
    </div>
  );
}

export default App;