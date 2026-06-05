import type { CatalogItem } from "../models/CatalogItem";

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    name: "Microsoft 365 License",
    category: "Software",
    owner: "IT",
    price: 150,
    status: "Available",
  },
  {
    id: 2,
    name: "Corporate Laptop",
    category: "Hardware",
    owner: "Infrastructure",
    price: 1200,
    status: "Available",
  },
  {
    id: 3,
    name: "SharePoint Consulting",
    category: "Services",
    owner: "Consulting",
    price: 3000,
    status: "Retired",
  },
];