import { useState } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import { Add24Regular, Delete24Regular } from "@fluentui/react-icons";
import { initialShoppingItems } from "../data/initialShoppingItems";
import type { ShoppingItem } from "../models/ShoppingItem";
import { ShoppingItemCard } from "./ShoppingItemCard";

export function ShoppingListApp() {
  const [items, setItems] = useState<ShoppingItem[]>(initialShoppingItems);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("");

  const totalItems = items.length;
  const purchasedItems = items.filter((item) => item.purchased).length;
  const pendingItems = items.filter((item) => !item.purchased).length;

  function handleAddItem() {
    if (!name.trim() || !category.trim()) {
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now(),
      name: name.trim(),
      quantity: Number(quantity),
      category: category.trim(),
      purchased: false,
    };

    setItems((currentItems) => [...currentItems, newItem]);

    setName("");
    setQuantity("1");
    setCategory("");
  }

  function handleTogglePurchased(id: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, purchased: !item.purchased }
          : item
      )
    );
  }

  function handleDeleteItem(id: number) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  function handleClearPurchased() {
    setItems((currentItems) =>
      currentItems.filter((item) => !item.purchased)
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Title1>Shopping List</Title1>

        <Text>
          A dynamic React shopping list using state, events, map, filter,
          controlled inputs, and Fluent UI.
        </Text>

        <Card style={{ marginTop: "32px", padding: "24px" }}>
          <Title3>Add new item</Title3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "16px",
              alignItems: "end",
            }}
          >
            <Field label="Item name">
              <Input value={name} onChange={(_, data) => setName(data.value)} />
            </Field>

            <Field label="Quantity">
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(_, data) => setQuantity(data.value)}
              />
            </Field>

            <Field label="Category">
              <Input
                value={category}
                onChange={(_, data) => setCategory(data.value)}
              />
            </Field>

            <Button
              appearance="primary"
              icon={<Add24Regular />}
              onClick={handleAddItem}
            >
              Add
            </Button>
          </div>
        </Card>

        <Card style={{ marginTop: "24px", padding: "20px" }}>
          <Text weight="semibold">Total: {totalItems}</Text>{" "}
          <Text>Purchased: {purchasedItems}</Text>{" "}
          <Text>Pending: {pendingItems}</Text>

          <Button
            style={{ marginLeft: "16px" }}
            icon={<Delete24Regular />}
            onClick={handleClearPurchased}
          >
            Clear purchased
          </Button>
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "24px",
          }}
        >
          {items.map((item) => (
            <ShoppingItemCard
              key={item.id}
              item={item}
              onTogglePurchased={handleTogglePurchased}
              onDeleteItem={handleDeleteItem}
            />
          ))}
        </div>
      </section>
    </main>
  );
}