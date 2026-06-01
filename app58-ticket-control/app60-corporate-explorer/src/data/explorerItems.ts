import type { ExplorerItem } from "../models/ExplorerItem";

export const explorerItems: ExplorerItem[] = [
  {
    id: 1,
    name: "Finance Reports",
    type: "Folder",
    owner: "Finance Team",
    modified: "2026-05-20",
    status: "Active",
  },
  {
    id: 2,
    name: "Q2 Executive Summary.docx",
    type: "Document",
    owner: "PMO Office",
    modified: "2026-05-22",
    status: "Review",
  },
  {
    id: 3,
    name: "Sales Dashboard.pdf",
    type: "Report",
    owner: "Sales Team",
    modified: "2026-05-18",
    status: "Active",
  },
  {
    id: 4,
    name: "Corporate Banner.png",
    type: "Image",
    owner: "Marketing",
    modified: "2026-05-15",
    status: "Archived",
  },
];