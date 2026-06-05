import { useMemo, useState } from "react";

import {
  FluentProvider,
  webLightTheme,
  Title1,
} from "@fluentui/react-components";

import { AuditSummary } from "./components/AuditSummary";
import { AuditFilters } from "./components/AuditFilters";
import { AuditGrid } from "./components/AuditGrid";

import { getAuditRecords } from "./services/auditService";

function App() {
  const [search, setSearch] = useState("");

  const audits = getAuditRecords();

  const filteredAudits = useMemo(() => {
    return audits.filter(
      (audit) =>
        audit.user
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        audit.action
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [audits, search]);

  const warnings = filteredAudits.filter(
    (x) => x.status === "Warning"
  ).length;

  const failures = filteredAudits.filter(
    (x) => x.status === "Failed"
  ).length;

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          padding: "32px",
        }}
      >
        <Title1>
          Enterprise Audit System
        </Title1>

        <AuditSummary
          total={filteredAudits.length}
          warnings={warnings}
          failures={failures}
        />

        <AuditFilters
          search={search}
          onSearchChange={setSearch}
        />

        <br />

        <AuditGrid
          items={filteredAudits}
        />
      </main>
    </FluentProvider>
  );
}

export default App;