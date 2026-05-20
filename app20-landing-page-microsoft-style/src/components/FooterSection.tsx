import { Text } from "@fluentui/react-components";

export function FooterSection() {
  return (
    <footer
      style={{
        padding: "32px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Text size={200}>
        App 20 — Landing Page Microsoft Style | React + Fluent UI
      </Text>
    </footer>
  );
}