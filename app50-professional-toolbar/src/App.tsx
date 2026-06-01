import {
  FluentProvider,
  webLightTheme,
  Text,
  Title1,
} from "@fluentui/react-components";

import { EnterpriseToolbar } from "./components/EnterpriseToolbar";
import { DashboardPanel } from "./components/DashboardPanel";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div>
            <Title1>
              Professional Toolbar
            </Title1>

            <Text>
              Enterprise Fluent UI toolbar with React and TypeScript.
            </Text>
          </div>

          <EnterpriseToolbar />

          <DashboardPanel />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;