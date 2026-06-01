import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Surface Laptop",
    category: "Hardware",
    price: 2200,
    stock: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Microsoft Teams License",
    category: "Software",
    price: 35,
    stock: 240,
    status: "Active",
  },
  {
    id: 3,
    name: "Azure Subscription",
    category: "Cloud",
    price: 500,
    stock: 40,
    status: "Inactive",
  },
  {
    id: 4,
    name: "Power BI Pro",
    category: "Analytics",
    price: 18,
    stock: 180,
    status: "Active",
  },
];