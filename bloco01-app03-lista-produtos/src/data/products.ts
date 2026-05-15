import type { Product } from "../models/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Surface Laptop 7",
    category: "Notebook",
    price: 8999,
    stock: 12,
    isActive: true,
  },
  {
    id: 2,
    name: "Microsoft Designer Keyboard",
    category: "Accessory",
    price: 549,
    stock: 34,
    isActive: true,
  },
  {
    id: 3,
    name: "Azure DevOps License",
    category: "Software",
    price: 1200,
    stock: 0,
    isActive: false,
  },
  {
    id: 4,
    name: "Microsoft Teams Headset",
    category: "Accessory",
    price: 799,
    stock: 18,
    isActive: true,
  },
];