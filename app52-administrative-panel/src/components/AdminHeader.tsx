import { Button, Text, Title1 } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

export function AdminHeader() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
      }}
    >
      <div>
        <Title1>Administrative Panel</Title1>
        <Text>Enterprise administration overview built with Fluent UI.</Text>
      </div>

      <Button appearance="primary" icon={<Add24Regular />}>
        New Request
      </Button>
    </header>
  );
}