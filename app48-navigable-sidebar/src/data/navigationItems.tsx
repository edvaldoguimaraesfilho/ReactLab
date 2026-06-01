import {
  Home24Regular,
  People24Regular,
  Document24Regular,
  Settings24Regular,
  ChartMultiple24Regular,
} from "@fluentui/react-icons";

import type { NavigationItem } from "../models/NavigationItem";

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Enterprise overview with KPIs and activity summary.",
    icon: <Home24Regular />,
  },
  {
    id: "users",
    label: "Users",
    description: "Manage enterprise users, departments, and roles.",
    icon: <People24Regular />,
  },
  {
    id: "documents",
    label: "Documents",
    description: "Access corporate files, policies, and reports.",
    icon: <Document24Regular />,
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Review business metrics and performance indicators.",
    icon: <ChartMultiple24Regular />,
  },
  {
    id: "settings",
    label: "Settings",
    description: "Configure application preferences and system options.",
    icon: <Settings24Regular />,
  },
];