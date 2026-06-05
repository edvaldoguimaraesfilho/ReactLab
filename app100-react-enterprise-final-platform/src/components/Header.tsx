import {
  Text,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

export function Header() {
  return (
    <Toolbar>
      <ToolbarButton>
        Home
      </ToolbarButton>

      <ToolbarButton>
        Analytics
      </ToolbarButton>

      <ToolbarButton>
        Reports
      </ToolbarButton>

      <Text>
        React Enterprise Final Platform
      </Text>
    </Toolbar>
  );
}