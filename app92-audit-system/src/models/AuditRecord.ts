export interface AuditRecord {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  severity: "Low" | "Medium" | "High";
  status: "Success" | "Warning" | "Failed";
}