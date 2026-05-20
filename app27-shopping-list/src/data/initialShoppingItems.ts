import type { ShoppingItem } from "../models/ShoppingItem";

export const initialShoppingItems: ShoppingItem[] = [
  { id: 1, name: "Milk", quantity: 2, category: "Dairy", purchased: false },
  { id: 2, name: "Bread", quantity: 1, category: "Bakery", purchased: true },
  { id: 3, name: "Apples", quantity: 6, category: "Fruit", purchased: false },
];