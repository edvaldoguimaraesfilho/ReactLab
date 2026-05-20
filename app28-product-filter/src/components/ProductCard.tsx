import {
  Badge,
  Body1,
  Card,
  CardHeader,
  Text,
  Title3,
} from "@fluentui/react-components";

import type { Product } from "../models/Product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <CardHeader
        header={<Title3>{product.name}</Title3>}
        description={
          <Text>{product.category}</Text>
        }
      />

      <Body1>
        Enterprise product catalog item.
      </Body1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
          alignItems: "center",
        }}
      >
        <Badge appearance="filled">
          ${product.price}
        </Badge>

        <Text size={200}>
          Stock: {product.stock}
        </Text>
      </div>
    </Card>
  );
}