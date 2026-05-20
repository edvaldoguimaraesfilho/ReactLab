import { Button } from "@fluentui/react-components";

interface CalculatorKeypadProps {
  onNumberClick: (value: string) => void;
  onOperatorClick: (operator: "+" | "-" | "*" | "/") => void;
  onClear: () => void;
  onEquals: () => void;
}

export function CalculatorKeypad({
  onNumberClick,
  onOperatorClick,
  onClear,
  onEquals,
}: CalculatorKeypadProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
      }}
    >
      <Button onClick={onClear}>C</Button>
      <Button onClick={() => onOperatorClick("/")}>÷</Button>
      <Button onClick={() => onOperatorClick("*")}>×</Button>
      <Button onClick={() => onOperatorClick("-")}>−</Button>

      <Button onClick={() => onNumberClick("7")}>7</Button>
      <Button onClick={() => onNumberClick("8")}>8</Button>
      <Button onClick={() => onNumberClick("9")}>9</Button>
      <Button onClick={() => onOperatorClick("+")}>+</Button>

      <Button onClick={() => onNumberClick("4")}>4</Button>
      <Button onClick={() => onNumberClick("5")}>5</Button>
      <Button onClick={() => onNumberClick("6")}>6</Button>
      <Button appearance="primary" onClick={onEquals}>
        =
      </Button>

      <Button onClick={() => onNumberClick("1")}>1</Button>
      <Button onClick={() => onNumberClick("2")}>2</Button>
      <Button onClick={() => onNumberClick("3")}>3</Button>
      <Button onClick={() => onNumberClick("0")}>0</Button>
    </div>
  );
}