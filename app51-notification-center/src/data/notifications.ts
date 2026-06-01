import type { NotificationItem } from "../models/NotificationItem";

export const notifications: NotificationItem[] = [
  {
    id: 1,
    title: "Deployment Completed",
    message:
      "The production deployment completed successfully.",
    type: "success",
    createdAt: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "Storage Warning",
    message:
      "The storage usage exceeded 80% of the allocated quota.",
    type: "warning",
    createdAt: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "Authentication Failure",
    message:
      "Multiple failed login attempts were detected.",
    type: "error",
    createdAt: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System Update",
    message:
      "A new enterprise dashboard update is available.",
    type: "info",
    createdAt: "2 hours ago",
    read: true,
  },
];