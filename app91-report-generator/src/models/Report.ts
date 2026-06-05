export type ReportStatus = "Draft" | "Ready" | "Published";

export interface Report {
  id: number;
  title: string;
  department: string;
  owner: string;
  status: ReportStatus;
  createdAt: string;
  records: number;
}