export type ProjectStatus =
  | "Completed"
  | "In Progress"
  | "Pending";

export interface Project {
  id: number;
  title: string;
  manager: string;
  department: string;
  progress: number;
  status: ProjectStatus;
}