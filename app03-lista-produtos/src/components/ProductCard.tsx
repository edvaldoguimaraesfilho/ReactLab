import {
  Badge,
  Body1,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Caption1,
  Text,
} from "@fluentui/react-components";

import { Box24Regular } from "@fluentui/react-icons";

import type { Product } from "../models/Product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Card className="product-card">
      <CardHeader
        image={<Box24Regular />}
        header={<Text weight="semibold">{product.name}</Text>}
        description={<Caption1>{product.category}</Caption1>}
      />

      <Body1>{formattedPrice}</Body1>

      <Text size={200}>Estoque: {product.stock}</Text>

      <Badge appearance="filled" color={product.isActive ? "success" : "danger"}>
        {product.isActive ? "Disponível" : "Indisponível"}
      </Badge>

      <CardFooter>
        <Button appearance="primary" disabled={!product.isActive}>
          Ver produto
        </Button>
      </CardFooter>
    </Card>
  );
}