import { useState } from "react";

import {
  Title1,
} from "@fluentui/react-components";

import { InventoryForm } from "./components/InventoryForm";
import { InventoryGrid } from "./components/InventoryGrid";
import { InventorySummary } from "./components/InventorySummary";

import { getInventory } from "./services/inventoryService";

import type { Product } from "./models/Product";

function App() {
  const [products, setProducts] =
    useState<Product[]>(getInventory());

  function addProduct(
    name: string,
    category: string,
    quantity: number,
    price: number
  ) {
    const product: Product = {
      id: products.length + 1,
      name,
      category,
      quantity,
      price,
    };

    setProducts([...products, product]);
  }

  const totalProducts =
    products.length;

  const totalItems =
    products.reduce(
      (sum, p) => sum + p.quantity,
      0
    );

  const totalValue =
    products.reduce(
      (sum, p) =>
        sum + p.quantity * p.price,
      0
    );

  return (
    <main
      style={{
        padding: "32px",
      }}
    >
      <Title1>
        Inventory Management System
      </Title1>

      <InventorySummary
        totalProducts={totalProducts}
        totalItems={totalItems}
        totalValue={totalValue}
      />

      <InventoryForm
        onAdd={addProduct}
      />

      <InventoryGrid
        products={products}
      />
    </main>
  );
}

export default App;