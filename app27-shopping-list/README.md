# App 27 — Shopping List

App 27 is **Lista de Compras / Shopping List**, inside **Block 2 — Interactivity and State**. The roadmap defines App 27 as a dynamic list focused on `map()` and `filter()` rendering. 

## PowerShell setup

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app27-shopping-list -- --template react-ts
cd app27-shopping-list

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\models
mkdir src\data
mkdir src\styles

New-Item src\models\ShoppingItem.ts -ItemType File
New-Item src\data\initialShoppingItems.ts -ItemType File
New-Item src\components\ShoppingListApp.tsx -ItemType File
New-Item src\components\ShoppingItemCard.tsx -ItemType File
```

## `src\models\ShoppingItem.ts`

```ts
export interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
  purchased: boolean;
}
```

## `src\data\initialShoppingItems.ts`

```ts
import type { ShoppingItem } from "../models/ShoppingItem";

export const initialShoppingItems: ShoppingItem[] = [
  { id: 1, name: "Milk", quantity: 2, category: "Dairy", purchased: false },
  { id: 2, name: "Bread", quantity: 1, category: "Bakery", purchased: true },
  { id: 3, name: "Apples", quantity: 6, category: "Fruit", purchased: false },
];
```

## `src\components\ShoppingItemCard.tsx`

```tsx
import {
  Button,
  Card,
  Checkbox,
  Text,
  Badge,
} from "@fluentui/react-components";
import { Delete24Regular } from "@fluentui/react-icons";
import type { ShoppingItem } from "../models/ShoppingItem";

interface ShoppingItemCardProps {
  item: ShoppingItem;
  onTogglePurchased: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

export function ShoppingItemCard({
  item,
  onTogglePurchased,
  onDeleteItem,
}: ShoppingItemCardProps) {
  return (
    <Card style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
        <Checkbox
          checked={item.purchased}
          onChange={() => onTogglePurchased(item.id)}
          label={
            <Text
              weight="semibold"
              style={{
                textDecoration: item.purchased ? "line-through" : "none",
              }}
            >
              {item.name}
            </Text>
          }
        />

        <Button
          appearance="subtle"
          icon={<Delete24Regular />}
          onClick={() => onDeleteItem(item.id)}
        />
      </div>

      <Text size={300}>Quantity: {item.quantity}</Text>

      <Badge appearance={item.purchased ? "filled" : "outline"}>
        {item.category}
      </Badge>
    </Card>
  );
}
```

## `src\components\ShoppingListApp.tsx`

```tsx
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
```

## `src\App.tsx`

```tsx
import { ShoppingListApp } from "./components/ShoppingListApp";

function App() {
  return <ShoppingListApp />;
}

export default App;
```

## `src\main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </React.StrictMode>
);
```

## `src\index.css`

```css
body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
}

* {
  box-sizing: border-box;
}
```

## Validate

```powershell
npm run dev
npm run build
npm run preview
```

## Technical focus

| Concept           | Used in                                        |
| ----------------- | ---------------------------------------------- |
| `useState`        | Stores shopping items and form fields          |
| Controlled inputs | `name`, `quantity`, `category`                 |
| `map()`           | Renders shopping cards                         |
| `filter()`        | Deletes items and clears purchased items       |
| Derived state     | `totalItems`, `purchasedItems`, `pendingItems` |
| Immutable update  | `{ ...item, purchased: !item.purchased }`      |
| Fluent UI         | `Card`, `Button`, `Input`, `Checkbox`, `Badge` |

## Where we are

| Block   | App | Name               | Status    |
| ------- | --: | ------------------ | --------- |
| Block 2 |  21 | Modern Counter     | Completed |
| Block 2 |  22 | Toggle Theme       | Completed |
| Block 2 |  23 | React Calculator   | Completed |
| Block 2 |  24 | Login Form         | Completed |
| Block 2 |  25 | User Registration  | Completed |
| Block 2 |  26 | Complete ToDo List | Completed |
| Block 2 |  27 | Shopping List      | Current   |
| Block 2 |  28 | Product Filter     | Next      |
