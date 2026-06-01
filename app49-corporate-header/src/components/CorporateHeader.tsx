import {
  Avatar,
  Button,
  Input,
  Text,
  Title3,
  Toolbar,
  ToolbarButton,
} from "@fluentui/react-components";

import {
  Alert24Regular,
  Home24Regular,
  People24Regular,
  Search24Regular,
  Settings24Regular,
  Document24Regular,
} from "@fluentui/react-icons";

import { headerActions } from "../data/headerActions";

const icons = [
  <Home24Regular />,
  <Document24Regular />,
  <People24Regular />,
  <Alert24Regular />,
  <Settings24Regular />,
];

export function CorporateHeader() {
  return (
    <header
      style={{
        height: "72px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Title3>
          React Enterprise Portal
        </Title3>

        <Toolbar>
          {headerActions.map((action, index) => (
            <ToolbarButton
              key={action.id}
              icon={icons[index]}
            >
              {action.label}
            </ToolbarButton>
          ))}
        </Toolbar>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <Input
          contentBefore={<Search24Regular />}
          placeholder="Search"
        />

        <Button
          appearance="subtle"
          icon={<Alert24Regular />}
        />

        <Avatar
          name="Edvaldo Guimaraes"
          badge={{ status: "available" }}
        />
      </div>
    </header>
  );
}