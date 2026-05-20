import { Button, Text } from "@fluentui/react-components";

import {
  Home24Regular,
  Document24Regular,
  People24Regular,
  ChartMultiple24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

const navigationItems = [
  { id: 1, title: "Home", icon: <Home24Regular /> },
  { id: 2, title: "Documents", icon: <Document24Regular /> },
  { id: 3, title: "Teams", icon: <People24Regular /> },
  { id: 4, title: "Reports", icon: <ChartMultiple24Regular /> },
  { id: 5, title: "Settings", icon: <Settings24Regular /> },
];

export function LeftNavigation() {
  return (
    <aside className="left-navigation">
      <Text weight="semibold" size={300}>
        Navigation
      </Text>

      <nav className="nav-list">
        {navigationItems.map((item) => (
          <Button
            key={item.id}
            appearance="subtle"
            icon={item.icon}
            className="nav-button"
          >
            {item.title}
          </Button>
        ))}
      </nav>
    </aside>
  );
}