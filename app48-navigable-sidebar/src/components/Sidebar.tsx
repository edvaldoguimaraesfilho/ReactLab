import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import type { NavigationItem } from "../models/NavigationItem";

interface SidebarProps {
  items: NavigationItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function Sidebar({
  items,
  selectedId,
  onSelect,
}: SidebarProps) {
  return (
    <Card
      style={{
        width: "280px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title2>ReactLab</Title2>

      <Text size={200}>
        Enterprise Navigation
      </Text>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "16px",
        }}
      >
        {items.map((item) => (
          <Button
            key={item.id}
            icon={item.icon}
            appearance={
              selectedId === item.id ? "primary" : "subtle"
            }
            onClick={() => onSelect(item.id)}
            style={{
              justifyContent: "flex-start",
            }}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}