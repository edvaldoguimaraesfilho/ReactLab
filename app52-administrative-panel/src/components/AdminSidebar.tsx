import { Button, Card, Title3 } from "@fluentui/react-components";
import {
  Home24Regular,
  People24Regular,
  TicketDiagonal24Regular,
  Shield24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";

export function AdminSidebar() {
  return (
    <Card
      style={{
        width: "260px",
        minHeight: "100vh",
        borderRadius: 0,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Title3>Admin Center</Title3>

      <Button appearance="subtle" icon={<Home24Regular />}>Overview</Button>
      <Button appearance="subtle" icon={<People24Regular />}>Users</Button>
      <Button appearance="subtle" icon={<TicketDiagonal24Regular />}>Tickets</Button>
      <Button appearance="subtle" icon={<Shield24Regular />}>Security</Button>
      <Button appearance="subtle" icon={<Settings24Regular />}>Settings</Button>
    </Card>
  );
}