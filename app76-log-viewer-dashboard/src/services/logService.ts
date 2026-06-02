import { LogEntry } from "../models/LogEntry";

export async function getLogs(): Promise<LogEntry[]> {
  return [
    {
      id: 1,
      timestamp: "2026-06-01 09:30",
      level: "Info",
      source: "Authentication",
      message: "User login successful"
    },
    {
      id: 2,
      timestamp: "2026-06-01 10:15",
      level: "Warning",
      source: "Workflow",
      message: "Approval timeout detected"
    },
    {
      id: 3,
      timestamp: "2026-06-01 11:45",
      level: "Error",
      source: "API Gateway",
      message: "External API unavailable"
    }
  ];
}