import type { FileItem } from "../models/FileItem";

export const files: FileItem[] = [
  {
    id: 1,
    name: "Project Documents",
    type: "folder",
    owner: "PMO Team",
    modified: "Today",
    size: "--",
  },
  {
    id: 2,
    name: "Quarterly Report.docx",
    type: "word",
    owner: "Finance Team",
    modified: "Yesterday",
    size: "245 KB",
  },
  {
    id: 3,
    name: "Budget Forecast.xlsx",
    type: "excel",
    owner: "Controlling",
    modified: "2 days ago",
    size: "1.2 MB",
  },
  {
    id: 4,
    name: "Compliance Guide.pdf",
    type: "pdf",
    owner: "Legal Team",
    modified: "Last week",
    size: "980 KB",
  },
  {
    id: 5,
    name: "Portal Screenshot.png",
    type: "image",
    owner: "UX Team",
    modified: "Last month",
    size: "540 KB",
  },
];