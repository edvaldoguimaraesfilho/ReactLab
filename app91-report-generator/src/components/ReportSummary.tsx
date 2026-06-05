import { Card, Text, Title3 } from "@fluentui/react-components";
import type { Report } from "../models/Report";
import { getReadyReports, getTotalRecords } from "../services/reportService";

interface ReportSummaryProps {
  reports: Report[];
}

export function ReportSummary({ reports }: ReportSummaryProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      <Card>
        <Title3>{reports.length}</Title3>
        <Text>Total Reports</Text>
      </Card>

      <Card>
        <Title3>{getReadyReports(reports)}</Title3>
        <Text>Ready Reports</Text>
      </Card>

      <Card>
        <Title3>{getTotalRecords(reports)}</Title3>
        <Text>Total Records</Text>
      </Card>
    </div>
  );
}