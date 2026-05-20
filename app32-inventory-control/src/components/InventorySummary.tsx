import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { InventoryItem } from "../models/InventoryItem";

interface InventorySummaryProps {
  items: InventoryItem[];
}

export function InventorySummary({
  items,
}: InventorySummaryProps) {
  const totalProducts = items.length;

  const totalUnits = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalInventoryValue = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "32px",
      }}
    >
      <Card>
        <Title3>Total Products</Title3>

        <Text>{totalProducts}</Text>
      </Card>

      <Card>
        <Title3>Total Units</Title3>

        <Text>{totalUnits}</Text>
      </Card>

      <Card>
        <Title3>Total Inventory Value</Title3>

        <Text>
          $
          {totalInventoryValue.toFixed(2)}
        </Text>
      </Card>
    </div>
  );
}