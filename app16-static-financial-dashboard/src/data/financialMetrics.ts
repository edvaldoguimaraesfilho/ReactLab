import type { FinancialMetric } from "../models/FinancialMetric";

export const financialMetrics: FinancialMetric[] = [
  {
    id: 1,
    title: "Revenue",
    value: "$128,400",
    description: "Monthly consolidated revenue",
    trend: "Positive",
  },
  {
    id: 2,
    title: "Expenses",
    value: "$42,900",
    description: "Operational monthly expenses",
    trend: "Negative",
  },
  {
    id: 3,
    title: "Profit",
    value: "$85,500",
    description: "Estimated monthly net profit",
    trend: "Positive",
  },
  {
    id: 4,
    title: "Cash Flow",
    value: "$31,200",
    description: "Available cash flow balance",
    trend: "Neutral",
  },
];