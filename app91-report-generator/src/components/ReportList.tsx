import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Report } from "../models/Report";

interface ReportListProps {
  reports: Report[];
  selectedReportId: number | null;
  onSelectReport: (report: Report) => void;
}

export function ReportList({
  reports,
  selectedReportId,
  onSelectReport,
}: ReportListProps) {
  return (
    <Card style={{ padding: "16px" }}>
      <Table aria-label="Reports Table">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Department</TableHeaderCell>
            <TableHeaderCell>Owner</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Records</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reports.map((report) => (
            <TableRow
              key={report.id}
              onClick={() => onSelectReport(report)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedReportId === report.id
                    ? "#eef6ff"
                    : "transparent",
              }}
            >
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.department}</TableCell>
              <TableCell>{report.owner}</TableCell>
              <TableCell>
                <Badge appearance="tint">
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell>{report.records}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}