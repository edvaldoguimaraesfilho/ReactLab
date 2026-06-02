import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Badge,
} from "@fluentui/react-components";

import type { LogEntry } from "../models/LogEntry";

interface LogGridProps {
  logs: LogEntry[];
}

export function LogGrid({ logs }: LogGridProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Time</TableHeaderCell>
            <TableHeaderCell>Level</TableHeaderCell>
            <TableHeaderCell>Source</TableHeaderCell>
            <TableHeaderCell>Message</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <Badge appearance="filled">{log.level}</Badge>
              </TableCell>
              <TableCell>{log.source}</TableCell>
              <TableCell>{log.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}