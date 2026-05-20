import { Button, Text, Title1 } from "@fluentui/react-components";

export function HeroSection() {
  return (
    <section
      style={{
        padding: "72px 48px",
        background: "linear-gradient(135deg, #f3f6fb, #ffffff)",
        textAlign: "center",
      }}
    >
      <Title1>Build Modern Enterprise Apps with React</Title1>

      <Text size={500}>
        A Microsoft-style landing page built with React, TypeScript, Vite, and
        Fluent UI.
      </Text>

      <div style={{ marginTop: "32px" }}>
        <Button appearance="primary" size="large">
          Get Started
        </Button>
      </div>
    </section>
  );
}