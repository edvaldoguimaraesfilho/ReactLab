import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { useLogs } from "./hooks/useLogs";
import { LogGrid } from "./components/LogGrid";
import { LogSummary } from "./components/LogSummary";
import { LogFilters } from "./components/LogFilters";

function App() {
  const { logs, loading } = useLogs();

  const [severity, setSeverity] =
    useState("All");

  const filteredLogs = useMemo(() => {
    if (severity === "All") {
      return logs;
    }

    return logs.filter(
      x => x.level === severity
    );
  }, [logs, severity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <Title1>
          Enterprise Log Viewer
        </Title1>

        <LogSummary logs={logs} />

        <LogFilters
          value={severity}
          onChange={setSeverity}
        />

        <LogGrid logs={filteredLogs} />
      </main>
    </FluentProvider>
  );
}

export default App;