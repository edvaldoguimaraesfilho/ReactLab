import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { ApprovalBoard } from "./components/ApprovalBoard";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "48px",
          boxSizing: "border-box",
        }}
      >
        <ApprovalBoard />
      </main>
    </FluentProvider>
  );
}

export default App;