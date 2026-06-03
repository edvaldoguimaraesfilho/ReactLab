import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalProducts: number;
  totalItems: number;
  totalValue: number;
}

export function InventorySummary({
  totalProducts,
  totalItems,
  totalValue,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "24px",
      }}
    >
      <Card>
        <Title3>Products</Title3>
        <Text>{totalProducts}</Text>
      </Card>

      <Card>
        <Title3>Stock Units</Title3>
        <Text>{totalItems}</Text>
      </Card>

      <Card>
        <Title3>Total Value</Title3>
        <Text>
          ${totalValue.toLocaleString()}
        </Text>
      </Card>
    </div>
  );
}