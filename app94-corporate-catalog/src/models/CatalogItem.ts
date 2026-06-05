export interface CatalogItem {
  id: number;
  name: string;
  category: string;
  owner: string;
  price: number;
  status: "Available" | "Retired";
}