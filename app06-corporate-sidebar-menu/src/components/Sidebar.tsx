import {
  Button,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  Home24Regular,
  Folder24Regular,
  People24Regular,
  Document24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

import {
  navigationItems,
} from "../data/navigationItems";

const icons = [
  <Home24Regular />,
  <Folder24Regular />,
  <People24Regular />,
  <Document24Regular />,
  <Settings24Regular />,
];

export function Sidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: "0",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <Title2>Enterprise Portal</Title2>

        <Text>
          Microsoft Style Navigation
        </Text>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        {navigationItems.map((item, index) => (
          <Button
            key={item.id}
            appearance="subtle"
            icon={icons[index]}
            style={{
              justifyContent: "flex-start",
            }}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </Card>
  );
}