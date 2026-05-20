export type FileType = "folder" | "word" | "excel" | "pdf" | "image";

export interface FileItem {
  id: number;
  name: string;
  type: FileType;
  owner: string;
  modified: string;
  size: string;
}