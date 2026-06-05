import {
  Button,
  Card,
  Title2,
} from "@fluentui/react-components";

import {
  Home24Regular,
  People24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

import { Link } from "react-router-dom";

export function AdminSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "24px",
        borderRadius: 0,
      }}
    >
      <Title2>Admin Portal</Title2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        <Link to="/">
          <Button icon={<Home24Regular />}>
            Dashboard
          </Button>
        </Link>

        <Link to="/users">
          <Button icon={<People24Regular />}>
            Users
          </Button>
        </Link>

        <Link to="/settings">
          <Button icon={<Settings24Regular />}>
            Settings
          </Button>
        </Link>
      </div>
    </Card>
  );
}