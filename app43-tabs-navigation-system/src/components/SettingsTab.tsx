import {
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

export function SettingsTab() {
  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title2>System Settings</Title2>

      <Text>
        Configure enterprise preferences and platform options.
      </Text>
    </Card>
  );
}