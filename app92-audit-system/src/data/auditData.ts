import type { AuditRecord } from "../models/AuditRecord";

export const auditData: AuditRecord[] = [
  {
    id: 1,
    timestamp: "2026-06-01 08:30",
    user: "admin@company.com",
    action: "User Created",
    resource: "Employee Portal",
    severity: "Low",
    status: "Success",
  },
  {
    id: 2,
    timestamp: "2026-06-01 10:15",
    user: "security@company.com",
    action: "Permission Changed",
    resource: "Finance Site",
    severity: "High",
    status: "Warning",
  },
  {
    id: 3,
    timestamp: "2026-06-01 11:45",
    user: "john@company.com",
    action: "File Deleted",
    resource: "HR Documents",
    severity: "High",
    status: "Failed",
  },
];