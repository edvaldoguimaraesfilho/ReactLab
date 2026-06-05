import {
  Avatar,
  Badge,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

export function AdminHeader() {
  return (
    <Toolbar>
      <ToolbarButton>
        Refresh
      </ToolbarButton>

      <ToolbarButton>
        Export
      </ToolbarButton>

      <Badge appearance="filled">
        Administrator
      </Badge>

      <Avatar name="Admin User" />
    </Toolbar>
  );
}