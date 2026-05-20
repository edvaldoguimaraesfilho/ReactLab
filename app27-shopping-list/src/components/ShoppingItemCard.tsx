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