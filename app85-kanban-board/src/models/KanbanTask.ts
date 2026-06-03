export type TaskStatus =
  | "Backlog"
  | "To Do"
  | "In Progress"
  | "Review"
  | "Done";

export interface KanbanTask {
  id: number;
  title: string;
  description: string;
  owner: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
}