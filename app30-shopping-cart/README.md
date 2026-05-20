# App 30 — Shopping Cart

App 30 is **Carrinho de Compras / Shopping Cart**, in **Block 2 — Interactivity and State**. The roadmap defines App 30 as **cart and totals**, focused on **derived state** and React’s **Choosing the State Structure** concept. 

## PowerShell setup

```powershell
cd C:\ReactApps
mkdir bloco02
cd bloco02

npm create vite@latest app30-shopping-cart -- --template react-ts
cd app30-shopping-cart

npm install
npm install @fluentui/react-components @fluentui/react-icons

mkdir src\components
mkdir src\data
mkdir src\models

New-Item src\models\Product.ts -ItemType File
New-Item src\data\products.ts -ItemType File
New-Item src\components\ProductCard.tsx -ItemType File
New-Item src\components\CartSummary.tsx -ItemType File
```

## `src\models\Product.ts`

```ts
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}
```

## `src\data\products.ts`

```ts
import type { Product } from "../models/Product";

export const products: Product[] = [
  { id: 1, name: "Surface Laptop", category: "Hardware", price: 1299 },
  { id: 2, name: "Microsoft 365", category: "Software", price: 99 },
  { id: 3, name: "Teams Premium", category: "Collaboration", price: 120 },
];
```

## `src\components\ProductCard.tsx`

```tsx
import { Button, Card, Text, Title3 } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";
import type { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card style={{ padding: "20px" }}>
      <Title3>{product.name}</Title3>
      <Text>{product.category}</Text>
      <Text weight="semibold">${product.price.toFixed(2)}</Text>

      <Button
        appearance="primary"
        icon={<Add24Regular />}
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </Button>
    </Card>
  );
}
```

## `src\components\CartSummary.tsx`

```tsx
import { Button, Card, Text, Title2, Title3 } from "@fluentui/react-components";
import type { CartItem } from "../models/Product";

interface CartSummaryProps {
  cartItems: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

export function CartSummary({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
}: CartSummaryProps) {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card style={{ padding: "24px" }}>
      <Title2>Shopping Cart</Title2>

      {cartItems.length === 0 && <Text>Your cart is empty.</Text>}

      {cartItems.map((item) => (
        <Card key={item.id} style={{ padding: "16px", marginTop: "12px" }}>
          <Title3>{item.name}</Title3>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>

          <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
            <Button onClick={() => onDecrease(item.id)}>-</Button>
            <Button onClick={() => onIncrease(item.id)}>+</Button>
            <Button appearance="secondary" onClick={() => onRemove(item.id)}>
              Remove
            </Button>
          </div>
        </Card>
      ))}

      <hr />

      <Text weight="semibold">Total items: {totalItems}</Text>
      <Text weight="semibold">Total price: ${totalPrice.toFixed(2)}</Text>
    </Card>
  );
}
```

## `src\App.tsx`

```tsx
import { useState } from "react";
import { Text, Title1 } from "@fluentui/react-components";

import { products } from "./data/products";
import type { CartItem, Product } from "./models/Product";
import { ProductCard } from "./components/ProductCard";
import { CartSummary } from "./components/CartSummary";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(id: number) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(id: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: number) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "48px", background: "#f5f5f5" }}>
      <Title1>App 30 — Shopping Cart</Title1>
      <Text>
        A React cart using useState, immutable updates, events, and derived totals.
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </section>

        <CartSummary
          cartItems={cartItems}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
        />
      </div>
    </main>
  );
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

## Run and validate

```powershell
npm run dev
npm run build
npm run preview
```

## Technical summary

| Concept                | Where                           |
| ---------------------- | ------------------------------- |
| `useState<CartItem[]>` | cart memory                     |
| `setCartItems`         | state updates                   |
| functional update      | safest update pattern           |
| `map()`                | update quantity                 |
| `filter()`             | remove item                     |
| `reduce()`             | derived totals                  |
| no duplicated state    | total is calculated, not stored |
| Fluent UI              | Card, Button, Text              |

## Where we are

| App | Name               | Status    |
| --: | ------------------ | --------- |
|  21 | Modern Counter     | Completed |
|  22 | Toggle Theme       | Completed |
|  23 | React Calculator   | Completed |
|  24 | Login Form         | Completed |
|  25 | User Registration  | Completed |
|  26 | Complete ToDo List | Completed |
|  27 | Shopping List      | Completed |
|  28 | Product Filter     | Completed |
|  29 | Employee Search    | Completed |
|  30 | Shopping Cart      | Current   |
|  31 | Grade Simulator    | Next      |
