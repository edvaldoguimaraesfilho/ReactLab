export interface FinancialMetric {
  id: number;
  title: string;
  value: string;
  description: string;
  trend: "Positive" | "Negative" | "Neutral";
}