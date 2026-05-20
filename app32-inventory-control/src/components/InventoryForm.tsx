import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

interface InventoryFormProps {
  productName: string;
  setProductName: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  quantity: string;
  setQuantity: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  onAddItem: () => void;
}

export function InventoryForm({
  productName,
  setProductName,
  category,
  setCategory,
  quantity,
  setQuantity,
  price,
  setPrice,
  onAddItem,
}: InventoryFormProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      <Field label="Product Name">
        <Input
          value={productName}
          onChange={(_, data) => setProductName(data.value)}
        />
      </Field>

      <Field label="Category">
        <Input
          value={category}
          onChange={(_, data) => setCategory(data.value)}
        />
      </Field>

      <Field label="Quantity">
        <Input
          type="number"
          value={quantity}
          onChange={(_, data) => setQuantity(data.value)}
        />
      </Field>

      <Field label="Price">
        <Input
          type="number"
          value={price}
          onChange={(_, data) => setPrice(data.value)}
        />
      </Field>

      <div
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Button
          appearance="primary"
          onClick={onAddItem}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}