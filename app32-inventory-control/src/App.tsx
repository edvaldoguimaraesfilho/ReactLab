import { useState } from "react";

import {
  Text,
  Title1,
} from "@fluentui/react-components";

import { initialInventory } from "./data/initialInventory";

import { InventoryForm } from "./components/InventoryForm";
import { InventorySummary } from "./components/InventorySummary";
import { InventoryTable } from "./components/InventoryTable";

import type { InventoryItem } from "./models/InventoryItem";

function App() {
  const [items, setItems] =
    useState<InventoryItem[]>(initialInventory);

  const [productName, setProductName] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [price, setPrice] =
    useState("");

  function handleAddItem() {
    if (
      !productName ||
      !category ||
      !quantity ||
      !price
    ) {
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now(),
      productName,
      category,
      quantity: Number(quantity),
      price: Number(price),
    };

    setItems([...items, newItem]);

    setProductName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Title1>
          Inventory Control
        </Title1>

        <Text>
          Enterprise inventory management interface
          built with React and Fluent UI.
        </Text>

        <InventoryForm
          productName={productName}
          setProductName={setProductName}
          category={category}
          setCategory={setCategory}
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setPrice={setPrice}
          onAddItem={handleAddItem}
        />

        <InventorySummary items={items} />

        <InventoryTable items={items} />
      </section>
    </main>
  );
}

export default App;