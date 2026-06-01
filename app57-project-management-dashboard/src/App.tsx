import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { DashboardHeader } from "./components/DashboardHeader";
import { ProjectGrid } from "./components/ProjectGrid";

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
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <DashboardHeader />

          <ProjectGrid />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;