import {
  Badge,
  Card,
} from "@fluentui/react-components";

import type { CatalogItem } from "../models/CatalogItem";

interface Props {
  items: CatalogItem[];
}

export function CatalogGrid({
  items,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {items.map((item) => (
        <Card key={item.id}>
          <h3>{item.name}</h3>

          <p>Category: {item.category}</p>

          <p>Owner: {item.owner}</p>

          <p>${item.price}</p>

          <Badge
            appearance={
              item.status === "Available"
                ? "filled"
                : "outline"
            }
          >
            {item.status}
          </Badge>
        </Card>
      ))}
    </div>
  );
}