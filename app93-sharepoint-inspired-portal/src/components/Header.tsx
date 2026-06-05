import {
  Avatar,
  Badge,
  Button,
  Input,
  Toolbar,
  ToolbarButton,
  Title3,
} from "@fluentui/react-components";

import {
  Alert24Regular,
  Search24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function PortalHeader() {
  return (
    <header
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      <Title3>Contoso SharePoint Portal</Title3>

      <Input
        contentBefore={<Search24Regular />}
        placeholder="Search this site"
        style={{
          width: "360px",
        }}
      />

      <Toolbar>
        <ToolbarButton icon={<Settings24Regular />} />

        <Button
          appearance="subtle"
          icon={
            <span style={{ position: "relative" }}>
              <Alert24Regular />
              <Badge
                size="extra-small"
                appearance="filled"
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                }}
              >
                3
              </Badge>
            </span>
          }
        />

        <Avatar name="Edvaldo Guimaraes" />
      </Toolbar>
    </header>
  );
}