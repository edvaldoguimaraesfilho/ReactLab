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

import type { HistoryItem } from "../models/HistoryItem";

export function CounterWithHistory() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function addHistory(
    action: HistoryItem["action"],
    previousValue: number,
    nextValue: number
  ) {
    const item: HistoryItem = {
      id: Date.now(),
      action,
      previousValue,
      nextValue,
      step,
    };

    setHistory([item, ...history]);
  }

  function increase() {
    const nextValue = count + step;

    addHistory("Increase", count, nextValue);
    setCount(nextValue);
  }

  function decrease() {
    const nextValue = count - step;

    addHistory("Decrease", count, nextValue);
    setCount(nextValue);
  }

  function reset() {
    addHistory("Reset", count, 0);
    setCount(0);
  }

  function clearHistory() {
    setHistory([]);
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
        maxWidth: "760px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter With History</Title3>}
        description={
          <Text>
            Exploring numbers, arrays, and state history in React.
          </Text>
        }
      />

      <div
        style={{
          textAlign: "center",
          padding: "32px 0",
        }}
      >
        <Title1>{count}</Title1>

        <div style={{ marginTop: "12px" }}>
          <Badge appearance="filled">{status}</Badge>
        </div>
      </div>

      <Field label="Step Value" style={{ marginBottom: "24px" }}>
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
        <Button icon={<Subtract24Regular />} onClick={decrease}>
          Decrease
        </Button>

        <Button appearance="primary" icon={<Add24Regular />} onClick={increase}>
          Increase
        </Button>

        <Button icon={<ArrowReset24Regular />} onClick={reset}>
          Reset
        </Button>

        <Button onClick={clearHistory}>
          Clear History
        </Button>
      </div>

      <section
        style={{
          marginTop: "32px",
          borderTop: "1px solid #ddd",
          paddingTop: "24px",
          textAlign: "left",
        }}
      >
        <Title3>History</Title3>

        {history.length === 0 ? (
          <Text>No actions yet.</Text>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {history.map((item) => (
              <Card key={item.id}>
                <Text weight="semibold">{item.action}</Text>

                <Text>
                  {item.previousValue} → {item.nextValue}
                </Text>

                <Text size={200}>Step used: {item.step}</Text>
              </Card>
            ))}
          </div>
        )}
      </section>
    </Card>
  );
}