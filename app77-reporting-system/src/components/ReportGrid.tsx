import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import type { Report } from "../models/Report";

interface Props {
  reports: Report[];
}

export function ReportGrid({
  reports,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Report</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Owner</TableHeaderCell>
          <TableHeaderCell>Views</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.title}</TableCell>
            <TableCell>{report.category}</TableCell>
            <TableCell>{report.owner}</TableCell>
            <TableCell>{report.views}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}