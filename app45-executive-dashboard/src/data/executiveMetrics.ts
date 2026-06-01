import type { ExecutiveMetric } from "../models/ExecutiveMetric";

export const executiveMetrics: ExecutiveMetric[] = [
  {
    id: 1,
    title: "Revenue",
    value: "$1.2M",
    variation: "+18%",
    status: "Positive",
    description: "Monthly revenue performance compared to the previous period.",
  },
  {
    id: 2,
    title: "Customer Satisfaction",
    value: "91%",
    variation: "+6%",
    status: "Positive",
    description: "Average satisfaction score across enterprise accounts.",
  },
  {
    id: 3,
    title: "Open Risks",
    value: "14",
    variation: "-3",
    status: "Warning",
    description: "Active business risks currently under executive review.",
  },
  {
    id: 4,
    title: "Delayed Projects",
    value: "5",
    variation: "+2",
    status: "Critical",
    description: "Projects requiring immediate leadership attention.",
  },
];