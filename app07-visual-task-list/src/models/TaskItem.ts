export type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  owner: string;
  status: TaskStatus;
  priority: "High" | "Medium" | "Low";
}