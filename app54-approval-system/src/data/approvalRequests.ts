import type { ApprovalRequest } from "../models/ApprovalRequest";

export const approvalRequests: ApprovalRequest[] = [
  {
    id: 1,
    title: "Budget Expansion",
    requester: "Maria Johnson",
    department: "Finance",
    status: "Pending",
    description:
      "Request for additional quarterly operational budget.",
  },
  {
    id: 2,
    title: "Hardware Purchase",
    requester: "David Wilson",
    department: "Infrastructure",
    status: "Pending",
    description:
      "Approval required for enterprise workstation acquisition.",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    requester: "Sophia Miller",
    department: "Marketing",
    status: "Approved",
    description:
      "Digital campaign approved for Q4 execution.",
  },
];