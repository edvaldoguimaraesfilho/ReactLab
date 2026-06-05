import { Card, Text, Title2, Title3 } from "@fluentui/react-components";
import type { Report } from "../models/Report";

interface ReportPreviewProps {
  report: Report | null;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  if (!report) {
    return (
      <Card>
        <Title3>No report selected</Title3>
        <Text>Select a report to preview its details.</Text>
      </Card>
    );
  }

  return (
    <Card style={{ padding: "24px" }}>
      <Title2>{report.title}</Title2>
      <Text>Department: {report.department}</Text>
      <Text>Owner: {report.owner}</Text>
      <Text>Status: {report.status}</Text>
      <Text>Created at: {report.createdAt}</Text>
      <Text>Records: {report.records}</Text>
    </Card>
  );
}