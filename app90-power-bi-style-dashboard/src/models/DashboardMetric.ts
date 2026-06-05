export interface DashboardMetric {
  id: number;
  title: string;
  value: string;
  variation: string;
  status: "positive" | "negative" | "neutral";
}