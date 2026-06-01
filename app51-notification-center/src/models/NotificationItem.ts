export type NotificationType =
  | "success"
  | "warning"
  | "error"
  | "info";

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
  read: boolean;
}