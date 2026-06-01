import {
  Avatar,
  Button,
  Text,
  Title1,
} from "@fluentui/react-components";

import {
  Search24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function DashboardHeader() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Title1>SharePoint Inspired Dashboard</Title1>

        <Text>
          Corporate portal experience built with React and Fluent UI.
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <Button icon={<Search24Regular />}>Search</Button>
        <Button icon={<Settings24Regular />}>Settings</Button>
        <Avatar name="Portal Admin" />
      </div>
    </header>
  );
}