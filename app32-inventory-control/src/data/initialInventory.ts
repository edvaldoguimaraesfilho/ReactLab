import type { InventoryItem } from "../models/InventoryItem";

export const initialInventory: InventoryItem[] = [
  {
    id: 1,
    productName: "Surface Laptop",
    category: "Hardware",
    quantity: 12,
    price: 5200,
  },
  {
    id: 2,
    productName: "Xbox Controller",
    category: "Accessories",
    quantity: 4,
    price: 450,
  },
  {
    id: 3,
    productName: "Office License",
    category: "Software",
    quantity: 30,
    price: 899,
  },
];