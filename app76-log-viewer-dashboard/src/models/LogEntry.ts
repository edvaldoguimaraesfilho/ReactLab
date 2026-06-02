export interface LogEntry {
  id: number;
  timestamp: string;
  level: "Info" | "Warning" | "Error";
  source: string;
  message: string;
}