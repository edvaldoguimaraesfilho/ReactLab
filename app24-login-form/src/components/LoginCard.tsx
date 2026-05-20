import { useState } from "react";

import {
  Button,
  Card,
  Field,
  Input,
  MessageBar,
  MessageBarBody,
  Text,
  Title1,
} from "@fluentui/react-components";

import { LockClosed24Regular } from "@fluentui/react-icons";

import type { LoginFormData } from "../models/LoginFormData";

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export function LoginCard() {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [message, setMessage] = useState("");

  const isEmailValid = formData.email.includes("@");
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  function updateField(fieldName: keyof LoginFormData, value: string) {
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      setMessage("Please enter a valid email and a password with at least 6 characters.");
      return;
    }

    setMessage(`Login simulated successfully for ${formData.email}.`);
  }

  function handleReset() {
    setFormData(initialFormData);
    setMessage("");
  }

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "420px",
        padding: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <LockClosed24Regular />
        <Title1>Login</Title1>
      </div>

      <Text>
        Controlled login form built with React state, TypeScript, and Fluent UI.
      </Text>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "18px",
          marginTop: "24px",
        }}
      >
        <Field
          label="Email"
          validationState={formData.email.length > 0 && !isEmailValid ? "error" : "none"}
          validationMessage={
            formData.email.length > 0 && !isEmailValid
              ? "Email must contain @."
              : undefined
          }
        >
          <Input
            value={formData.email}
            placeholder="user@company.com"
            onChange={(_, data) => updateField("email", data.value)}
          />
        </Field>

        <Field
          label="Password"
          validationState={
            formData.password.length > 0 && !isPasswordValid ? "error" : "none"
          }
          validationMessage={
            formData.password.length > 0 && !isPasswordValid
              ? "Password must have at least 6 characters."
              : undefined
          }
        >
          <Input
            type="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(_, data) => updateField("password", data.value)}
          />
        </Field>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <Button appearance="primary" type="submit" disabled={!isFormValid}>
            Sign in
          </Button>

          <Button type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>

        {message && (
          <MessageBar intent={isFormValid ? "success" : "error"}>
            <MessageBarBody>{message}</MessageBarBody>
          </MessageBar>
        )}
      </form>
    </Card>
  );
}