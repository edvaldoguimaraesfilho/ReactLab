import {
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

interface Props {
  totalItems: number;
  availableItems: number;
}

export function CatalogDashboard({
  totalItems,
  availableItems,
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
        <Title3>Total Items</Title3>
        <Text>{totalItems}</Text>
      </Card>

      <Card>
        <Title3>Available</Title3>
        <Text>{availableItems}</Text>
      </Card>
    </div>
  );
}