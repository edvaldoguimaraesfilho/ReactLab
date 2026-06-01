import {
  Text,
  Title1,
} from "@fluentui/react-components";

export function CRMHeader() {
  return (
    <header
      style={{
        marginBottom: "32px",
      }}
    >
      <Title1>
        CRM Visual Dashboard
      </Title1>

      <Text>
        Enterprise customer relationship management interface.
      </Text>
    </header>
  );
}