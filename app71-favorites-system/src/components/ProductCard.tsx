import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Star24Regular,
} from "@fluentui/react-icons";

import type { Product } from "../models/Product";

import { useFavorites }
  from "../context/FavoritesContext";

interface Props {
  product: Product;
}

export function ProductCard({
  product,
}: Props) {
  const { addFavorite } =
    useFavorites();

  return (
    <Card
      style={{
        padding: "20px",
      }}
    >
      <Title3>
        {product.name}
      </Title3>

      <Text>
        {product.category}
      </Text>

      <Button
        appearance="primary"
        icon={<Star24Regular />}
        onClick={() =>
          addFavorite(product)
        }
      >
        Favorite
      </Button>
    </Card>
  );
}