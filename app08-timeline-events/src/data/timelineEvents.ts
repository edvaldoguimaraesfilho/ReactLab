import type { TimelineEvent } from "../models/TimelineEvent";

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2026-05-01",
    title: "Project kickoff",
    description: "Initial planning meeting with the product and development teams.",
    department: "Project Management",
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-05-05",
    title: "UI structure defined",
    description: "Base layout, component responsibilities, and Fluent UI visual pattern were approved.",
    department: "Design System",
    status: "Completed",
  },
  {
    id: 3,
    date: "2026-05-10",
    title: "Timeline component implementation",
    description: "React renders events from a typed data source using map() and reusable components.",
    department: "Frontend Team",
    status: "In Progress",
  },
  {
    id: 4,
    date: "2026-05-15",
    title: "Architecture review",
    description: "Review component hierarchy before moving to more complex UI examples.",
    department: "Engineering",
    status: "Planned",
  },
];