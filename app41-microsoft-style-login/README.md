import { useState } from "react";

import {
  Body1,
  Button,
  Card,
  Field,
  Input,
  Text,
  Title2,
} from "@fluentui/react-components";

import {
  LockClosed24Regular,
  Person24Regular,
} from "@fluentui/react-icons";

import type { LoginFormData } from "../models/LoginFormData";

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export function LoginCard() {
  const [formData, setFormData] =
    useState<LoginFormData>(initialFormData);

  const [message, setMessage] = useState("");

  const isEmailValid =
    formData.email.includes("@");

  const isPasswordValid =
    formData.password.length >= 6;

  const isFormValid =
    isEmailValid && isPasswordValid;

  function handleEmailChange(value: string) {
    setFormData({
      ...formData,
      email: value,
    });
  }

  function handlePasswordChange(value: string) {
    setFormData({
      ...formData,
      password: value,
    });
  }

  function handleLogin() {
    if (!isFormValid) {
      setMessage(
        "Please provide valid credentials."
      );

      return;
    }

    setMessage(
      `Welcome ${formData.email}`
    );
  }

  return (
    <Card
      style={{
        width: "420px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Title2>
          Microsoft Style Login
        </Title2>

        <Body1>
          Sign in using your corporate account.
        </Body1>
      </div>

      <Field label="Corporate Email">
        <Input
          contentBefore={<Person24Regular />}
          placeholder="user@company.com"
          value={formData.email}
          onChange={(_, data) =>
            handleEmailChange(data.value)
          }
        />
      </Field>

      <Field label="Password">
        <Input
          type="password"
          contentBefore={<LockClosed24Regular />}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(_, data) =>
            handlePasswordChange(data.value)
          }
        />
      </Field>

      <Button
        appearance="primary"
        size="large"
        disabled={!isFormValid}
        onClick={handleLogin}
      >
        Sign In
      </Button>

      {message && (
        <Text>
          {message}
        </Text>
      )}
    </Card>
  );
}