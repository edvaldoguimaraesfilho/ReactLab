import type { DocumentItem } from "../models/DocumentItem";

export const documents: DocumentItem[] = [
  {
    id: 1,
    name: "Corporate Policy Handbook.pdf",
    department: "HR",
    modified: "Today",
    status: "Current",
  },
  {
    id: 2,
    name: "Quarterly Budget.xlsx",
    department: "Finance",
    modified: "Yesterday",
    status: "Draft",
  },
  {
    id: 3,
    name: "Project Roadmap.docx",
    department: "PMO",
    modified: "This week",
    status: "Current",
  },
  {
    id: 4,
    name: "Legacy Migration Notes.pdf",
    department: "IT",
    modified: "Last month",
    status: "Archived",
  },
];