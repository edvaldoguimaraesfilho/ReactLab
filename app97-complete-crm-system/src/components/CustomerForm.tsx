import {
  Button,
  Field,
  Input,
  Card,
  Title3,
} from "@fluentui/react-components";

export function CustomerForm() {
  return (
    <Card
      style={{
        padding: "20px",
        marginBottom: "24px",
      }}
    >
      <Title3>New Customer</Title3>

      <Field label="Company">
        <Input />
      </Field>

      <Field label="Contact">
        <Input />
      </Field>

      <Field label="Email">
        <Input />
      </Field>

      <Button appearance="primary">
        Save Customer
      </Button>
    </Card>
  );
}