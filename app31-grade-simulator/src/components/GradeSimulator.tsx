import { useState } from "react";

import {
  Button,
  Card,
  Field,
  Input,
  Text,
  Title1,
} from "@fluentui/react-components";

import type { GradeForm } from "../models/GradeForm";
import { GradeResultCard } from "./GradeResultCard";

const initialForm: GradeForm = {
  firstExam: "",
  secondExam: "",
  project: "",
  attendance: "",
};

function toNumber(value: string) {
  return Number(value || 0);
}

export function GradeSimulator() {
  const [form, setForm] = useState<GradeForm>(initialForm);

  const firstExam = toNumber(form.firstExam);
  const secondExam = toNumber(form.secondExam);
  const project = toNumber(form.project);
  const attendance = toNumber(form.attendance);

  const average =
    firstExam * 0.35 +
    secondExam * 0.35 +
    project * 0.2 +
    attendance * 0.1;

  const status =
    average >= 7 ? "Approved" : average >= 5 ? "Recovery" : "Failed";

  const hasInvalidGrade =
    firstExam > 10 ||
    secondExam > 10 ||
    project > 10 ||
    attendance > 10 ||
    firstExam < 0 ||
    secondExam < 0 ||
    project < 0 ||
    attendance < 0;

  function updateField(field: keyof GradeForm, value: string) {
    setForm({
      ...form,
      [field]: value,
    });
  }

  function resetForm() {
    setForm(initialForm);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px",
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
    >
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <Title1>Grade Simulator</Title1>

        <Text>
          Enter the student grades and React will calculate the final average
          automatically using derived state.
        </Text>

        <Card style={{ padding: "24px", marginTop: "32px" }}>
          <Field label="First Exam - 35%">
            <Input
              type="number"
              value={form.firstExam}
              onChange={(_, data) => updateField("firstExam", data.value)}
            />
          </Field>

          <Field label="Second Exam - 35%">
            <Input
              type="number"
              value={form.secondExam}
              onChange={(_, data) => updateField("secondExam", data.value)}
            />
          </Field>

          <Field label="Project - 20%">
            <Input
              type="number"
              value={form.project}
              onChange={(_, data) => updateField("project", data.value)}
            />
          </Field>

          <Field label="Attendance - 10%">
            <Input
              type="number"
              value={form.attendance}
              onChange={(_, data) => updateField("attendance", data.value)}
            />
          </Field>

          <Button appearance="secondary" onClick={resetForm}>
            Reset
          </Button>
        </Card>

        {hasInvalidGrade ? (
          <Card style={{ padding: "24px", marginTop: "24px" }}>
            <Text>
              Grades must be between 0 and 10.
            </Text>
          </Card>
        ) : (
          <div style={{ marginTop: "24px" }}>
            <GradeResultCard average={average} status={status} />
          </div>
        )}
      </section>
    </main>
  );
}