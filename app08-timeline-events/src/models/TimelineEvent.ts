export type TimelineStatus = "Completed" | "In Progress" | "Planned";

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  department: string;
  status: TimelineStatus;
}