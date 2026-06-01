export type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

export interface ApprovalRequest {
  id: number;
  title: string;
  requester: string;
  department: string;
  status: ApprovalStatus;
  description: string;
}