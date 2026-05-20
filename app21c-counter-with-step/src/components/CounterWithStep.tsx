import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  Field,
  Input,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowReset24Regular,
  Subtract24Regular,
} from "@fluentui/react-icons";

export function CounterWithStep() {
  const [count, setCount] = useState(0);

  const [step, setStep] = useState(1);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function increase() {
    setCount(count + step);
  }

  function decrease() {
    setCount(count - step);
  }

  function reset() {
    setCount(0);
  }

  function handleStepChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = Number(event.target.value);

    if (Number.isNaN(value)) {
      return;
    }

    setStep(value);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "640px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter With Step</Title3>}
        description={
          <Text>
            Exploring multiple states and controlled inputs in React.
          </Text>
        }
      />

      <div
        style={{
          textAlign: "center",
          padding: "40px 0",
        }}
      >
        <Title1>{count}</Title1>

        <div style={{ marginTop: "16px" }}>
          <Badge appearance="filled">{status}</Badge>
        </div>
      </div>

      <Field
        label="Step Value"
        style={{
          marginBottom: "24px",
        }}
      >
        <Input
          type="number"
          value={step.toString()}
          onChange={handleStepChange}
        />
      </Field>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          icon={<Subtract24Regular />}
          onClick={decrease}
        >
          Decrease
        </Button>

        <Button
          appearance="primary"
          icon={<Add24Regular />}
          onClick={increase}
        >
          Increase
        </Button>

        <Button
          icon={<ArrowReset24Regular />}
          onClick={reset}
        >
          Reset
        </Button>
      </div>

      <div
        style={{
          marginTop: "32px",
          paddingTop: "24px",
          borderTop: "1px solid #ddd",
        }}
      >
        <Text>
          Current step: {step}
        </Text>
      </div>
    </Card>
  );
}