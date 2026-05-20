import { useState } from "react";

import {
  Body1,
  Card,
  Field,
  Input,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  calculateBmi,
  getBmiClassification,
} from "../utils/bmiUtils";

export function BmiCalculatorCard() {
  const [weight, setWeight] = useState("80");
  const [height, setHeight] = useState("1.75");

  const weightValue = Number(weight);
  const heightValue = Number(height);

  const bmi = calculateBmi(
    weightValue,
    heightValue
  );

  const classification =
    getBmiClassification(bmi);

  return (
    <Card
      style={{
        width: "420px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Title2>BMI Calculator</Title2>

      <Body1>
        Calculate Body Mass Index using
        React state and derived calculations.
      </Body1>

      <Field label="Weight (kg)">
        <Input
          value={weight}
          onChange={(_, data) =>
            setWeight(data.value)
          }
        />
      </Field>

      <Field label="Height (m)">
        <Input
          value={height}
          onChange={(_, data) =>
            setHeight(data.value)
          }
        />
      </Field>

      <div
        style={{
          marginTop: "12px",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text
          size={500}
          weight="semibold"
        >
          BMI: {bmi.toFixed(2)}
        </Text>

        <div style={{ marginTop: "12px" }}>
          <Text
            style={{
              color: classification.color,
              fontWeight: 700,
            }}
          >
            {classification.label}
          </Text>
        </div>
      </div>
    </Card>
  );
}