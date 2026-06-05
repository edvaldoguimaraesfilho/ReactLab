import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { AdminSidebar } from "./components/AdminSidebar";
import { AdminHeader } from "./components/AdminHeader";
import { AdminDashboard } from "./components/AdminDashboard";
import { AlertsPanel } from "./components/AlertsPanel";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <AdminSidebar />

        <main
          style={{
            flex: 1,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <AdminHeader />

          <AdminDashboard />

          <AlertsPanel />
        </main>
      </div>
    </FluentProvider>
  );
}

export default App;