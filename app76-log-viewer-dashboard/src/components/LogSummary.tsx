import { Card, Text, Title3 } from "@fluentui/react-components";
import type { LogEntry } from "../models/LogEntry";

interface LogSummaryProps {
  logs: LogEntry[];
}

export function LogSummary({ logs }: LogSummaryProps) {
  const total = logs.length;
  const info = logs.filter((log) => log.level === "Info").length;
  const warnings = logs.filter((log) => log.level === "Warning").length;
  const errors = logs.filter((log) => log.level === "Error").length;

  return (
    <Card className="summary-card">
      <Title3>System Overview</Title3>

      <div className="summary-grid">
        <Text>Total Logs: {total}</Text>
        <Text>Info: {info}</Text>
        <Text>Warnings: {warnings}</Text>
        <Text>Errors: {errors}</Text>
      </div>
    </Card>
  );
}