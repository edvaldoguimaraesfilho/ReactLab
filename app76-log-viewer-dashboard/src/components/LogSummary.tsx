import { Card, Text, Title3 } from "@fluentui/react-components";
import { LogEntry } from "../models/LogEntry";

interface Props {
  logs: LogEntry[];
}

export function LogSummary({ logs }: Props) {
  const errors = logs.filter(x => x.level === "Error").length;
  const warnings = logs.filter(x => x.level === "Warning").length;

  return (
    <Card>
      <Title3>System Overview</Title3>

      <Text>Total Logs: {logs.length}</Text>
      <br />
      <Text>Warnings: {warnings}</Text>
      <br />
      <Text>Errors: {errors}</Text>
    </Card>
  );
}