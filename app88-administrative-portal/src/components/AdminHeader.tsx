import {
  Avatar,
  Card,
  Text,
} from "@fluentui/react-components";

export function AdminHeader() {
  return (
    <Card
      style={{
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Text weight="semibold">
        Administrative Portal
      </Text>

      <Avatar
        name="Administrator"
        color="colorful"
      />
    </Card>
  );
}