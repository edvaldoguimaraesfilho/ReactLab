import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { ReportSummary } from "./components/ReportSummary";
import { ReportList } from "./components/ReportList";
import { ReportPreview } from "./components/ReportPreview";
import { ReportToolbar } from "./components/ReportToolbar";

import { getReports } from "./services/reportService";
import type { Report } from "./models/Report";

function App() {
  const [reports] = useState<Report[]>(getReports());
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  function handleGenerateReport() {
    alert("Report generation simulated successfully.");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Title1>App 91 — Report Generator</Title1>

        <Text>
          Enterprise report generation interface built with React,
          TypeScript, Vite, and Fluent UI.
        </Text>

        <div style={{ marginTop: "24px" }}>
          <ReportToolbar onGenerate={handleGenerateReport} />
        </div>

        <div style={{ marginTop: "24px" }}>
          <ReportSummary reports={reports} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginTop: "24px",
          }}
        >
          <ReportList
            reports={reports}
            selectedReportId={selectedReport?.id ?? null}
            onSelectReport={setSelectedReport}
          />

          <ReportPreview report={selectedReport} />
        </div>
      </section>
    </main>
  );
}

export default App;