import {
  Body1,
  Card,
  Text,
  Title2,
} from "@fluentui/react-components";

interface SimulationResultProps {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export function SimulationResult({
  monthlyPayment,
  totalPayment,
  totalInterest,
}: SimulationResultProps) {
  return (
    <Card
      style={{
        padding: "24px",
        marginTop: "24px",
      }}
    >
      <Title2>Simulation Result</Title2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <div>
          <Text weight="semibold">
            Monthly Payment
          </Text>

          <Body1>
            $
            {monthlyPayment.toFixed(2)}
          </Body1>
        </div>

        <div>
          <Text weight="semibold">
            Total Payment
          </Text>

          <Body1>
            $
            {totalPayment.toFixed(2)}
          </Body1>
        </div>

        <div>
          <Text weight="semibold">
            Total Interest
          </Text>

          <Body1>
            $
            {totalInterest.toFixed(2)}
          </Body1>
        </div>
      </div>
    </Card>
  );
}