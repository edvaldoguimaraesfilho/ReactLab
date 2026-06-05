import {
  Card,
  Text,
} from "@fluentui/react-components";

export function SettingsPage() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <h1>Settings</h1>

      <Text>
        Enterprise configuration area.
      </Text>
    </Card>
  );
}