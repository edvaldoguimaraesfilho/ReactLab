export type LogLevel = "Info" | "Warning" | "Error";

export interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  source: string;
  message: string;
}