import { useState } from "react";

import {
  Button,
  Field,
  Input,
  Card,
  Title2,
} from "@fluentui/react-components";

import type { Employee } from "../models/Employee";

interface Props {
  onSave: (employee: Employee) => void;
}

export function EmployeeForm({ onSave }: Props) {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit() {
    if (!name || !department || !email) return;

    onSave({
      id: Date.now(),
      name,
      department,
      email,
    });

    setName("");
    setDepartment("");
    setEmail("");
  }

  return (
    <Card
      style={{
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <Title2>Add Employee</Title2>

      <Field label="Name">
        <Input
          value={name}
          onChange={(_, data) => setName(data.value)}
        />
      </Field>

      <Field label="Department">
        <Input
          value={department}
          onChange={(_, data) => setDepartment(data.value)}
        />
      </Field>

      <Field label="Email">
        <Input
          value={email}
          onChange={(_, data) => setEmail(data.value)}
        />
      </Field>

      <Button
        appearance="primary"
        onClick={handleSubmit}
      >
        Save Employee
      </Button>
    </Card>
  );
}