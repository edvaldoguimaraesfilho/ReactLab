import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import { useFavorites }
  from "../context/FavoritesContext";

export function FavoritesPanel() {
  const {
    favorites,
    removeFavorite,
  } = useFavorites();

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>
        Favorites ({favorites.length})
      </Title2>

      {favorites.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginTop: "12px",
          }}
        >
          <Text>
            {item.name}
          </Text>

          <Button
            appearance="secondary"
            onClick={() =>
              removeFavorite(item.id)
            }
          >
            Remove
          </Button>
        </div>
      ))}
    </Card>
  );
}