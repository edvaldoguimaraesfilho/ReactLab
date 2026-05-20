import { Text, Title1 } from "@fluentui/react-components";
import { FileToolbar } from "./components/FileToolbar";
import { FileGrid } from "./components/FileGrid";
import { FolderTree } from "./components/FolderTree";

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <FolderTree />

      <main
        style={{
          flex: 1,
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <Title1>Documents</Title1>
        <Text>
          A static corporate file explorer built with React, TypeScript, Vite,
          and Fluent UI.
        </Text>

        <FileToolbar />
        <FileGrid />
      </main>
    </div>
  );
}

export default App;