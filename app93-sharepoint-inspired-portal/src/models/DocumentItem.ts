export type DocumentStatus = "Current" | "Draft" | "Archived";

export interface DocumentItem {
  id: number;
  name: string;
  department: string;
  modified: string;
  status: DocumentStatus;
}