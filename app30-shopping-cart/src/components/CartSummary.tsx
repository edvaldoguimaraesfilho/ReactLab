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