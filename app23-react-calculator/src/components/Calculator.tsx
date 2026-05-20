import { useState } from "react";
import { Card, Text, Title2 } from "@fluentui/react-components";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKeypad } from "./CalculatorKeypad";
import type { CalculatorOperator } from "../models/CalculatorOperator";

export function Calculator() {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<CalculatorOperator | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  function handleNumberClick(value: string) {
    if (waitingForSecondValue) {
      setDisplayValue(value);
      setWaitingForSecondValue(false);
      return;
    }

    setDisplayValue((currentValue) =>
      currentValue === "0" ? value : currentValue + value
    );
  }

  function handleOperatorClick(selectedOperator: CalculatorOperator) {
    setFirstValue(Number(displayValue));
    setOperator(selectedOperator);
    setWaitingForSecondValue(true);
  }

  function calculate(
    leftValue: number,
    rightValue: number,
    selectedOperator: CalculatorOperator
  ) {
    if (selectedOperator === "+") return leftValue + rightValue;
    if (selectedOperator === "-") return leftValue - rightValue;
    if (selectedOperator === "*") return leftValue * rightValue;
    if (selectedOperator === "/") return rightValue === 0 ? NaN : leftValue / rightValue;

    return rightValue;
  }

  function handleEquals() {
    if (firstValue === null || operator === null) {
      return;
    }

    const secondValue = Number(displayValue);
    const result = calculate(firstValue, secondValue, operator);

    setDisplayValue(Number.isNaN(result) ? "Error" : String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(true);
  }

  function handleClear() {
    setDisplayValue("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  }

  return (
    <Card
      style={{
        width: "420px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div>
        <Title2>React Calculator</Title2>
        <Text>
          A state-driven calculator built with React, TypeScript, and Fluent UI.
        </Text>
      </div>

      <CalculatorDisplay value={displayValue} />

      <CalculatorKeypad
        onNumberClick={handleNumberClick}
        onOperatorClick={handleOperatorClick}
        onClear={handleClear}
        onEquals={handleEquals}
      />
    </Card>
  );
}