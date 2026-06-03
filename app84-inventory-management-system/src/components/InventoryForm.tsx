import {
  Button,
  Field,
  Input,
} from "@fluentui/react-components";

import { useState } from "react";

interface Props {
  onAdd: (
    name: string,
    category: string,
    quantity: number,
    price: number
  ) => void;
}

export function InventoryForm({
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("");
  const [quantity, setQuantity] =
    useState("");
  const [price, setPrice] =
    useState("");

  function handleSubmit() {
    onAdd(
      name,
      category,
      Number(quantity),
      Number(price)
    );

    setName("");
    setCategory("");
    setQuantity("");
    setPrice("");
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      <Field label="Product Name">
        <Input
          value={name}
          onChange={(_, data) =>
            setName(data.value)
          }
        />
      </Field>

      <Field label="Category">
        <Input
          value={category}
          onChange={(_, data) =>
            setCategory(data.value)
          }
        />
      </Field>

      <Field label="Quantity">
        <Input
          value={quantity}
          onChange={(_, data) =>
            setQuantity(data.value)
          }
        />
      </Field>

      <Field label="Price">
        <Input
          value={price}
          onChange={(_, data) =>
            setPrice(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Add Product
      </Button>
    </div>
  );
}