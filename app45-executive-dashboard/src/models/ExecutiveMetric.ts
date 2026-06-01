export interface ExecutiveMetric {
  id: number;
  title: string;
  value: string;
  variation: string;
  status: "Positive" | "Warning" | "Critical";
  description: string;
}