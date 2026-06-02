import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { CryptoDashboard }
  from "./components/CryptoDashboard";

function App() {
  return (
    <FluentProvider
      theme={webLightTheme}
    >
      <main
        style={{
          padding: "40px",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CryptoDashboard />
      </main>
    </FluentProvider>
  );
}

export default App;