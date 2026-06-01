import type {
  ActivityItem,
  MetricItem,
  NewsItem,
  QuickLinkItem,
} from "../models/DashboardModels";

export const quickLinks: QuickLinkItem[] = [
  {
    id: 1,
    title: "Documents",
    description: "Access corporate document libraries.",
    url: "#",
  },
  {
    id: 2,
    title: "Projects",
    description: "Open the project management workspace.",
    url: "#",
  },
  {
    id: 3,
    title: "Teams",
    description: "View department and team resources.",
    url: "#",
  },
  {
    id: 4,
    title: "Reports",
    description: "Open business reports and dashboards.",
    url: "#",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "New SharePoint Portal Layout Released",
    category: "Intranet",
    summary:
      "The corporate portal now includes improved navigation, quick links, and dashboard sections.",
    publishedDate: "May 24, 2026",
  },
  {
    id: 2,
    title: "Document Governance Update",
    category: "Compliance",
    summary:
      "New metadata standards were introduced for corporate document libraries.",
    publishedDate: "May 22, 2026",
  },
  {
    id: 3,
    title: "Executive Dashboard Improvements",
    category: "Analytics",
    summary:
      "The analytics team updated KPI cards and activity tracking sections.",
    publishedDate: "May 20, 2026",
  },
];

export const metrics: MetricItem[] = [
  {
    id: 1,
    label: "Active Sites",
    value: "48",
    description: "SharePoint-style workspaces currently active.",
  },
  {
    id: 2,
    label: "Documents",
    value: "12.4K",
    description: "Indexed files across corporate libraries.",
  },
  {
    id: 3,
    label: "Departments",
    value: "16",
    description: "Business areas connected to the portal.",
  },
  {
    id: 4,
    label: "Monthly Visits",
    value: "8.7K",
    description: "Estimated portal visits this month.",
  },
];

export const activities: ActivityItem[] = [
  {
    id: 1,
    user: "Ana Martins",
    action: "updated",
    target: "Project Governance Library",
    time: "10 minutes ago",
  },
  {
    id: 2,
    user: "Carlos Silva",
    action: "published",
    target: "Monthly Operations Report",
    time: "32 minutes ago",
  },
  {
    id: 3,
    user: "Microsoft 365 Admin",
    action: "created",
    target: "Finance Department Workspace",
    time: "1 hour ago",
  },
];