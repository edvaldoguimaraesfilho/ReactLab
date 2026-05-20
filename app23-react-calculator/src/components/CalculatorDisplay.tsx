import { Card, Text } from "@fluentui/react-components";

interface CalculatorDisplayProps {
  value: string;
}

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <Card
      style={{
        padding: "20px",
        textAlign: "right",
        backgroundColor: "#111827",
      }}
    >
      <Text
        size={800}
        weight="semibold"
        style={{
          color: "white",
          wordBreak: "break-all",
        }}
      >
        {value}
      </Text>
    </Card>
  );
}