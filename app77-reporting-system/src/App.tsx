import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Title1,
} from "@fluentui/react-components";

import { getReports } from "./services/reportService";

import { ReportFilter } from "./components/ReportFilter";
import { ReportGrid } from "./components/ReportGrid";
import { ReportSummary } from "./components/ReportSummary";

import type { Report } from "./models/Report";

function App() {
  const [reports, setReports] =
    useState<Report[]>([]);

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    getReports().then(setReports);
  }, []);

  const filteredReports = useMemo(() => {
    if (!category) {
      return reports;
    }

    return reports.filter(
      (report) => report.category === category
    );
  }, [reports, category]);

  const totalViews = useMemo(() => {
    return filteredReports.reduce(
      (sum, report) => sum + report.views,
      0
    );
  }, [filteredReports]);

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <Title1>
        Reporting System
      </Title1>

      <Card
        style={{
          padding: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <ReportFilter
          value={category}
          onChange={setCategory}
        />
      </Card>

      <ReportSummary
        totalReports={filteredReports.length}
        totalViews={totalViews}
      />

      <ReportGrid
        reports={filteredReports}
      />
    </main>
  );
}

export default App;