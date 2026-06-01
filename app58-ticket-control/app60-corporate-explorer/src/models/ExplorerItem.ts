export type ExplorerItemType = "Folder" | "Document" | "Report" | "Image";

export interface ExplorerItem {
  id: number;
  name: string;
  type: ExplorerItemType;
  owner: string;
  modified: string;
  status: "Active" | "Archived" | "Review";
}