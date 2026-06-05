export interface SalesRecord {
  id: number;
  region: string;
  revenue: number;
  target: number;
  customers: number;
  status: "Above Target" | "Below Target";
}