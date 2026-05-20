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

export function CounterPanel() {
  const [count, setCount] = useState(0);

  const status =
    count === 0
      ? "Neutral"
      : count > 0
        ? "Positive"
        : "Negative";

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "520px",
        padding: "32px",
      }}
    >
      <CardHeader
        header={<Title3>Interactive Counter</Title3>}
        description={
          <Text>
            First state-driven React component using useState and events.
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

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button icon={<Subtract24Regular />} onClick={decrement}>
          Decrease
        </Button>

        <Button appearance="primary" icon={<Add24Regular />} onClick={increment}>
          Increase
        </Button>

        <Button icon={<ArrowReset24Regular />} onClick={reset}>
          Reset
        </Button>
      </div>
    </Card>
  );
}