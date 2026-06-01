import {
  Card,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import type { NavigationItem } from "../models/NavigationItem";

interface PageContentProps {
  selectedItem: NavigationItem;
}

export function PageContent({
  selectedItem,
}: PageContentProps) {
  return (
    <main
      style={{
        flex: 1,
        padding: "40px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title1>{selectedItem.label}</Title1>

      <Text>{selectedItem.description}</Text>

      <Card
        style={{
          marginTop: "32px",
          padding: "32px",
        }}
      >
        <Title3>Current Section</Title3>

        <Text>
          You are viewing the {selectedItem.label} area.
          The visible content changes because React state controls
          which navigation item is selected.
        </Text>
      </Card>
    </main>
  );
}