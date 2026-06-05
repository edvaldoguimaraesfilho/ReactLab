export interface AdminAlert {
  id: number;
  title: string;
  severity: "High" | "Medium" | "Low";
}