import {
  Spinner,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { useEffect, useState } from "react";

import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsGrid } from "./components/MetricsGrid";

import type { DashboardMetrics } from "./models/DashboardMetrics";

import { getDashboardMetrics }  from "./services/dashboardService";

function App() {
  const [metrics, setMetrics] =
    useState<DashboardMetrics | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMetrics() {
      const data =
        await getDashboardMetrics();

      setMetrics(data);
      setLoading(false);
    }

    loadMetrics();
  }, []);

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <DashboardHeader />

        <div
          style={{
            marginTop: "32px",
          }}
        >
          {loading && (
            <Spinner
              label="Loading analytics..."
            />
          )}

          {!loading && metrics && (
            <MetricsGrid
              metrics={metrics}
            />
          )}
        </div>
      </main>
    </FluentProvider>
  );
}

export default App;