import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { UserDashboard }
  from "./components/UserDashboard";

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
        <UserDashboard />
      </main>
    </FluentProvider>
  );
}

export default App;