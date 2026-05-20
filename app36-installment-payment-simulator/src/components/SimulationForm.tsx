import {
  Field,
  Input,
  Card,
  Title1,
} from "@fluentui/react-components";

import type { InstallmentSimulation } from "../models/InstallmentSimulation";

interface SimulationFormProps {
  simulation: InstallmentSimulation;

  onSimulationChange: (
    simulation: InstallmentSimulation
  ) => void;
}

export function SimulationForm({
  simulation,
  onSimulationChange,
}: SimulationFormProps) {
  function updateField(
    field: keyof InstallmentSimulation,
    value: number
  ) {
    onSimulationChange({
      ...simulation,
      [field]: value,
    });
  }

  return (
    <Card
      style={{
        padding: "24px",
      }}
    >
      <Title1>
        Installment Payment Simulator
      </Title1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginTop: "24px",
        }}
      >
        <Field label="Loan Amount">
          <Input
            type="number"
            value={simulation.amount.toString()}
            onChange={(_, data) =>
              updateField(
                "amount",
                Number(data.value)
              )
            }
          />
        </Field>

        <Field label="Installments">
          <Input
            type="number"
            value={simulation.installments.toString()}
            onChange={(_, data) =>
              updateField(
                "installments",
                Number(data.value)
              )
            }
          />
        </Field>

        <Field label="Interest Rate (%)">
          <Input
            type="number"
            value={simulation.interestRate.toString()}
            onChange={(_, data) =>
              updateField(
                "interestRate",
                Number(data.value)
              )
            }
          />
        </Field>
      </div>
    </Card>
  );
}