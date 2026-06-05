import {
  Button,
  Input
} from "@fluentui/react-components";

export function UserForm() {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px"
      }}
    >
      <Input placeholder="Name" />
      <Input placeholder="Email" />

      <Button appearance="primary">
        Add User
      </Button>
    </div>
  );
}