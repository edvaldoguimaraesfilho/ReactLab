export type TaskStatus = "Not Started" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  owner: string;
  department: string;
  status: TaskStatus;
  priority: TaskPriority;
}