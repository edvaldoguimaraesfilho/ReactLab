import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  Text,
  Title1,
  Title3,
} from "@fluentui/react-components";

import {
  Add24Regular,
  ArrowReset24Regular,
  Subtract24Regular,
} from "@fluentui/react-icons";

export function CounterStateLab() {
  const [count, setCount] = useState(0);

  const isPositive = count > 0;
  const isNegative = count < 0;
  const isNeutral = count === 0;

  const status = isNeutral
    ? "Neutral"
    : isPositive
      ? "Positive"
      : "Negative";

  const message = isNeutral
    ? "The counter is at the initial value."
    : isPositive
      ? "The counter is above zero."
      : "The counter is below zero.";

  function increase() {
    setCount(count + 1);
  }

  function decrease() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "600px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Counter State Lab</Title3>}
        description={
          <Text>
            Exploring React state, derived values, and conditional rendering.
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

        <Text
          style={{
            display: "block",
            marginTop: "16px",
          }}
        >
          {message}
        </Text>
      </div>

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
      </div>
    </Card>
  );
}