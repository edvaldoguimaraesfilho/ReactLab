import { Title1, Text } from "@fluentui/react-components";

type AppHeaderProps = {
  appNumber: string;
  appName: string;
  block: string;
};

export function AppHeader({ appNumber, appName, block }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Text size={300} weight="semibold">
        {block}
      </Text>

      <Title1>
        {appNumber} — {appName}
      </Title1>
    </header>
  );
}