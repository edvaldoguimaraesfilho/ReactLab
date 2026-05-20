import {
  Avatar,
  Button,
  Text,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  AppFolder24Regular,
  Search24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="brand-area">
        <AppFolder24Regular />
        <Text weight="semibold" size={500}>
          Contoso SharePoint Portal
        </Text>
      </div>

      <Toolbar>
        <ToolbarButton icon={<Search24Regular />}>Search</ToolbarButton>
        <ToolbarButton icon={<Settings24Regular />}>Settings</ToolbarButton>
        <Button appearance="primary">New</Button>
        <Avatar name="Edvaldo Guimaraes" />
      </Toolbar>
    </header>
  );
}