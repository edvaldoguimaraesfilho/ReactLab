import {
  Body1,
  Button,
  Card,
  CardHeader,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";

interface ThemeCardProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function ThemeCard({
  darkMode,
  onToggleTheme,
}: ThemeCardProps) {
  return (
    <Card
      style={{
        width: "420px",
        padding: "32px",
        backgroundColor: darkMode ? "#1f1f1f" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        transition: "all 0.3s ease",
      }}
    >
      <CardHeader
        image={
          darkMode ? (
            <WeatherMoon24Regular />
          ) : (
            <WeatherSunny24Regular />
          )
        }
        header={
          <Title2>
            {darkMode ? "Dark Theme Enabled" : "Light Theme Enabled"}
          </Title2>
        }
        description={
          <Text>
            React automatically re-renders the UI when state changes.
          </Text>
        }
      />

      <Body1
        style={{
          marginTop: "20px",
          marginBottom: "24px",
        }}
      >
        This app demonstrates how a boolean state can dynamically change
        the appearance of the interface.
      </Body1>

      <Button
        appearance="primary"
        onClick={onToggleTheme}
      >
        Toggle Theme
      </Button>
    </Card>
  );
}