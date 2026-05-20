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