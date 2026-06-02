import { useMemo, useState } from "react";

import {
  Spinner,
  Text,
  Title1,
} from "@fluentui/react-components";

import { useLogs } from "./hooks/useLogs";
import { LogGrid } from "./components/LogGrid";
import { LogSummary } from "./components/LogSummary";
import {
  LogFilters,
  type SeverityFilter,
} from "./components/LogFilters";

function App() {
  const { logs, loading } = useLogs();

  const [severity, setSeverity] =
    useState<SeverityFilter>("All");

  const filteredLogs = useMemo(() => {
    if (severity === "All") {
      return logs;
    }

    return logs.filter((log) => log.level === severity);
  }, [logs, severity]);

  if (loading) {
    return (
      <main className="page-center">
        <Spinner label="Loading logs..." />
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="page-header">
        <Title1>Enterprise Log Viewer</Title1>

        <Text>
          App 76 demonstrates log monitoring, filtering,
          derived state, custom hooks, and Fluent UI tables.
        </Text>
      </section>

      <LogSummary logs={logs} />

      <section className="filter-area">
        <LogFilters
          value={severity}
          onChange={setSeverity}
        />
      </section>

      <LogGrid logs={filteredLogs} />
    </main>
  );
}

export default App;