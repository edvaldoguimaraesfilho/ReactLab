import {
  Button,
  Card,
  Text,
  Title3,
} from "@fluentui/react-components";

import {
  Document24Regular,
  Home24Regular,
  PeopleTeam24Regular,
  Settings24Regular,
  ChartMultiple24Regular,
  Folder24Regular,
} from "@fluentui/react-icons";

const navigationItems = [
  {
    id: 1,
    title: "Home",
    icon: <Home24Regular />,
  },
  {
    id: 2,
    title: "Documents",
    icon: <Document24Regular />,
  },
  {
    id: 3,
    title: "Teams",
    icon: <PeopleTeam24Regular />,
  },
  {
    id: 4,
    title: "Projects",
    icon: <Folder24Regular />,
  },
  {
    id: 5,
    title: "Reports",
    icon: <ChartMultiple24Regular />,
  },
  {
    id: 6,
    title: "Settings",
    icon: <Settings24Regular />,
  },
];

export function PortalSidebar() {
  return (
    <aside
      style={{
        width: "260px",
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <Card
        style={{
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <Title3>Corporate Site</Title3>
        <Text size={200}>SharePoint inspired navigation</Text>
      </Card>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            appearance={item.id === 1 ? "primary" : "subtle"}
            icon={item.icon}
            style={{
              justifyContent: "flex-start",
            }}
          >
            {item.title}
          </Button>
        ))}
      </nav>
    </aside>
  );
}